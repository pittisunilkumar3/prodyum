import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { imageUpload, deleteUploadImage } from '../lib/uploads.js';

const PAGE_KEYS = [
  'site',
  'it-services',
  'film-slate',
  'casting',
  'careers',
  'contact',
  'robots',
];

/* ================= PUBLIC: /api/seo ================= */

export const seoPublicRouter = Router();

// GET /api/seo — all page meta (public site injects these at runtime)
seoPublicRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT page_key, page_label, section_id, meta_title, meta_description,
              meta_keywords, meta_image, robots
       FROM seo_settings WHERE page_key != 'robots'`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

/* ================= ADMIN: /api/admin/seo ================= */

export const seoAdminRouter = Router();
seoAdminRouter.use(requireAdmin);

seoAdminRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, page_key, page_label, section_id, meta_title, meta_description,
              meta_keywords, meta_image, robots, robots_txt, updated_at
       FROM seo_settings
       ORDER BY FIELD(page_key, 'site','it-services','film-slate','casting','careers','contact','robots')`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// PATCH /:pageKey — accepts multipart (meta_image file) or JSON
seoAdminRouter.patch('/:pageKey', imageUpload.single('meta_image'), async (req, res, next) => {
  try {
    const pageKey = req.params.pageKey;
    if (!PAGE_KEYS.includes(pageKey)) {
      return res.status(404).json({ ok: false, error: 'Unknown page key.' });
    }

    const b = req.body || {};
    const sets = [];
    const params = [];

    if (b.meta_title !== undefined) {
      sets.push('meta_title = ?');
      params.push(String(b.meta_title).slice(0, 100));
    }
    if (b.meta_description !== undefined) {
      sets.push('meta_description = ?');
      params.push(String(b.meta_description).slice(0, 2000));
    }
    if (b.meta_keywords !== undefined) {
      sets.push('meta_keywords = ?');
      params.push(String(b.meta_keywords).slice(0, 300));
    }
    if (b.robots !== undefined && ['index', 'noindex'].includes(b.robots)) {
      sets.push('robots = ?');
      params.push(b.robots);
    }
    if (pageKey === 'robots' && b.robots_txt !== undefined) {
      sets.push('robots_txt = ?');
      params.push(String(b.robots_txt).slice(0, 8000));
    }

    // Image handling: new upload replaces old; explicit remove flag clears it
    const [current] = await pool.query(
      'SELECT meta_image FROM seo_settings WHERE page_key = ?',
      [pageKey]
    );
    const oldImage = current[0]?.meta_image || '';

    if (req.file) {
      sets.push('meta_image = ?');
      params.push(`/uploads/${req.file.filename}`);
      if (oldImage) await deleteUploadImage(oldImage);
    } else if (b.remove_meta_image === '1' || b.remove_meta_image === 1) {
      sets.push("meta_image = ''");
      if (oldImage) await deleteUploadImage(oldImage);
    }

    if (!sets.length) {
      return res.status(400).json({ ok: false, error: 'Nothing to update.' });
    }

    params.push(pageKey);
    const [result] = await pool.query(
      `UPDATE seo_settings SET ${sets.join(', ')} WHERE page_key = ?`,
      params
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Page not found.' });
    }

    const [updated] = await pool.query('SELECT * FROM seo_settings WHERE page_key = ?', [
      pageKey,
    ]);
    res.json({ ok: true, data: updated[0] });
  } catch (err) {
    next(err);
  }
});
