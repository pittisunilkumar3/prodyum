import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// ---------- Public router: /api/videos ----------
export const videoPublicRouter = Router();

const VIDEO_COLS = `id, project_id, title, url, file_path, source, priority, published, created_at`;

// GET /api/videos — all published (light payload, for slate card badges)
videoPublicRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, project_id, title, priority FROM project_videos WHERE published = 1 ORDER BY priority ASC, created_at ASC'
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/videos/:projectId — published videos for one project, priority order
videoPublicRouter.get('/:projectId', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${VIDEO_COLS} FROM project_videos
       WHERE project_id = ? AND published = 1
       ORDER BY priority ASC, created_at ASC`,
      [req.params.projectId]
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// ---------- Admin router: /api/admin/videos ----------
export const videoAdminRouter = Router();
videoAdminRouter.use(requireAdmin);

const newId = () => `VID-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

// Multer: videos saved to server/uploads with unique names, 500MB cap
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = (path.extname(file.originalname || '').slice(0, 10) || '.mp4').toLowerCase();
    cb(null, `vid-${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if ((file.mimetype || '').startsWith('video/')) return cb(null, true);
    cb(new Error('Only video files are allowed.'));
  },
});

async function deleteUploadedFile(filePath) {
  if (!filePath) return;
  const abs = path.join(UPLOADS_DIR, path.basename(filePath)); // basename prevents traversal
  await fs.promises.unlink(abs).catch(() => {});
}

// GET /api/admin/videos — every video, including unpublished
videoAdminRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${VIDEO_COLS} FROM project_videos ORDER BY priority ASC, created_at DESC`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/videos — attach a linked video (YouTube/Vimeo/direct URL)
videoAdminRouter.post('/', async (req, res, next) => {
  try {
    const {
      project_id = '',
      title = '',
      url = '',
      priority = 100,
      published = 1,
    } = req.body || {};

    if (!project_id || !url.trim()) {
      return res.status(400).json({ ok: false, error: 'Project and video URL are required.' });
    }

    const id = newId();
    await pool.query(
      `INSERT INTO project_videos (id, project_id, title, url, source, priority, published)
       VALUES (?, ?, ?, ?, 'link', ?, ?)`,
      [
        id,
        String(project_id).slice(0, 80),
        String(title).slice(0, 200),
        String(url).slice(0, 600),
        Number.isFinite(Number(priority)) ? Math.max(0, parseInt(priority, 10)) : 100,
        published ? 1 : 0,
      ]
    );
    res.json({ ok: true, id });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/videos/upload — attach an uploaded video file (multipart)
videoAdminRouter.post('/upload', upload.single('video'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'No video file received.' });
    }

    const { project_id = '', title = '', priority = 100, published = 1 } = req.body || {};
    if (!project_id) {
      await deleteUploadedFile(req.file.filename);
      return res.status(400).json({ ok: false, error: 'Project is required.' });
    }

    const id = newId();
    const filePath = `/uploads/${req.file.filename}`;
    await pool.query(
      `INSERT INTO project_videos (id, project_id, title, url, file_path, source, priority, published)
       VALUES (?, ?, ?, NULL, ?, 'upload', ?, ?)`,
      [
        id,
        String(project_id).slice(0, 80),
        String(title || req.file.originalname).slice(0, 200),
        filePath,
        Number.isFinite(Number(priority)) ? Math.max(0, parseInt(priority, 10)) : 100,
        published === '1' || published === 1 || published === true ? 1 : 0,
      ]
    );

    res.json({ ok: true, id, file: filePath });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/videos/:id — title / priority / published
videoAdminRouter.patch('/:id', async (req, res, next) => {
  try {
    const { title, priority, published } = req.body || {};
    const sets = [];
    const params = [];

    if (title !== undefined) {
      sets.push('title = ?');
      params.push(String(title).slice(0, 200));
    }
    if (priority !== undefined) {
      const p = parseInt(priority, 10);
      if (!Number.isFinite(p) || p < 0) {
        return res.status(400).json({ ok: false, error: 'Priority must be a number ≥ 0.' });
      }
      sets.push('priority = ?');
      params.push(p);
    }
    if (published !== undefined) {
      sets.push('published = ?');
      params.push(published ? 1 : 0);
    }

    if (!sets.length) {
      return res.status(400).json({ ok: false, error: 'Nothing to update.' });
    }

    params.push(req.params.id);
    const [result] = await pool.query(
      `UPDATE project_videos SET ${sets.join(', ')} WHERE id = ?`,
      params
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Video not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/videos/:id — also removes uploaded file from disk
videoAdminRouter.delete('/:id', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM project_videos WHERE id = ? LIMIT 1', [
      req.params.id,
    ]);
    if (!rows.length) {
      return res.status(404).json({ ok: false, error: 'Video not found.' });
    }

    await pool.query('DELETE FROM project_videos WHERE id = ?', [req.params.id]);
    if (rows[0].source === 'upload') {
      await deleteUploadedFile(rows[0].file_path);
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
