import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, ensureDatabase } from './db.js';
import { runMigrations } from './migrate.js';
import authRoutes from './routes/auth.js';
import submissionRoutes from './routes/submissions.js';
import adminRoutes from './routes/admin.js';
import emailSettingsRoutes from './routes/emailSettings.js';
import emailTemplateRoutes from './routes/emailTemplates.js';
import { videoPublicRouter, videoAdminRouter, UPLOADS_DIR } from './routes/videos.js';
import { pagesPublicRouter, pagesAdminRouter } from './routes/pages.js';
import {
  filmPublicRouter,
  filmAdminRouter,
  categoryAdminRouter,
} from './routes/films.js';
import { seoPublicRouter, seoAdminRouter } from './routes/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.set('trust proxy', 1);

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
    credentials: true,
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

// Uploaded videos (supports HTTP Range requests so <video> seeking works)
app.use('/uploads', express.static(UPLOADS_DIR));

// ---------- API ----------
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'prodyum-api' }));

app.use('/api/videos', videoPublicRouter);
app.use('/api/films', filmPublicRouter);
app.use('/api/seo', seoPublicRouter);
app.use('/api/pages', pagesPublicRouter);

// Dynamic robots.txt served from admin-managed content (StackFood-style robot meta)
app.get('/robots.txt', async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT robots_txt FROM seo_settings WHERE page_key = 'robots'"
    );
    const txt = rows[0]?.robots_txt;
    res.type('text/plain');
    res.send(txt && txt.trim() ? txt : 'User-agent: *\nAllow: /\n');
  } catch {
    res.type('text/plain');
    res.send('User-agent: *\nAllow: /\n');
  }
});

app.use('/api/admin/videos', videoAdminRouter); // must be before generic /api/admin router
app.use('/api/admin/pages', pagesAdminRouter); // must be before generic /api/admin router
app.use('/api/admin/films', filmAdminRouter); // must be before generic /api/admin router
app.use('/api/admin/seo', seoAdminRouter); // must be before generic /api/admin router
app.use('/api/admin/film-categories', categoryAdminRouter); // must be before generic /api/admin router
app.use('/api/auth', authRoutes);
app.use('/api', submissionRoutes);
// Mounted BEFORE /api/admin so the generic /:resource routes don't shadow it
app.use('/api/admin/email-settings', emailSettingsRoutes);
app.use('/api/admin/email-templates', emailTemplateRoutes);
app.use('/api/admin', adminRoutes);

// Uploaded email assets (logos, banners, attachments) — referenced by URL inside emails
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', (req, res) => res.status(404).json({ ok: false, error: 'Unknown API endpoint.' }));

// ---------- Serve production build (npm run build && npm start) ----------
const distDir = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// ---------- Error handler ----------
app.use((err, req, res, next) => {
  console.error('[api]', err.message || err);
  if (res.headersSent) return next(err);
  const badJson = err?.type === 'entity.parse.failed';
  const videoReject = err?.message === 'Only video files are allowed.';
  const tooLarge = err?.code === 'LIMIT_FILE_SIZE';
  res.status(err.status || 500).json({
    ok: false,
    error: badJson
      ? 'Invalid JSON body.'
      : videoReject
        ? 'Only video files are allowed.'
        : tooLarge
          ? 'File exceeds the 500MB upload limit.'
          : 'Server error. Please try again.',
  });
});

// ---------- Boot ----------
const PORT = process.env.PORT || 5000;

// Retry DB connection so the API comes alive automatically once MySQL starts
// (e.g. XAMPP MySQL is started after a reboot while dev:all is already running)
const MAX_DB_ATTEMPTS = 900; // ~30 minutes of patience (2s apart)
const boot = async (attempt = 1) => {
  try {
    await ensureDatabase();
    await runMigrations(pool); // creates/updates schema via server/migrations/*
    app.listen(PORT, () => {
      console.log(`[api] Prodyum API listening on http://localhost:${PORT}`);
      console.log(`[api] Admin console: http://localhost:5173/admin (dev) or http://localhost:${PORT}/admin (production)`);
    });
  } catch (err) {
    if (attempt < MAX_DB_ATTEMPTS) {
      console.error(
        `[db] MySQL not ready (attempt ${attempt}/${MAX_DB_ATTEMPTS}) — retrying in 2s…`
      );
      setTimeout(() => boot(attempt + 1), 2000);
    } else {
      console.error('[db] Could not initialize MySQL database.');
      console.error('[db] → Is XAMPP running with the MySQL module started?');
      console.error('[db] → Check DB_* values in .env');
      console.error('[db] Detail:', err.message);
      process.exit(1);
    }
  }
};
boot();
