import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/* ================= PUBLIC: /api/pages ================= */

export const pagesPublicRouter = Router();

// GET /api/pages — slim list of published pages (for footers/menus)
pagesPublicRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT slug, title, meta_description, updated_at
       FROM pages WHERE is_published = 1
       ORDER BY FIELD(slug, 'privacy-policy', 'terms-conditions', 'refund-policy'), title`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/pages/:slug — full published page by slug
pagesPublicRouter.get('/:slug', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT slug, title, content, meta_description, updated_at
       FROM pages WHERE slug = ? AND is_published = 1 LIMIT 1`,
      [req.params.slug]
    );
    if (rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'Page not found' });
    }
    res.json({ ok: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
});

/* ================= ADMIN: /api/admin/pages ================= */

export const pagesAdminRouter = Router();
pagesAdminRouter.use(requireAdmin);

// GET /api/admin/pages — all pages incl. unpublished
pagesAdminRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, slug, title, content, meta_description, is_published, created_at, updated_at
       FROM pages
       ORDER BY FIELD(slug, 'privacy-policy', 'terms-conditions', 'refund-policy'), title`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/pages — create a new page
pagesAdminRouter.post('/', async (req, res, next) => {
  try {
    const { slug, title, content = '', meta_description = '', is_published = 1 } = req.body || {};
    if (!slug || !SLUG_RE.test(slug)) {
      return res.status(400).json({ ok: false, error: 'Invalid slug (lowercase letters, numbers, hyphens)' });
    }
    if (!title || !String(title).trim()) {
      return res.status(400).json({ ok: false, error: 'Title is required' });
    }
    const [result] = await pool.query(
      `INSERT INTO pages (slug, title, content, meta_description, is_published) VALUES (?, ?, ?, ?, ?)`,
      [slug, String(title).trim(), content, meta_description, is_published ? 1 : 0]
    );
    const [rows] = await pool.query('SELECT * FROM pages WHERE id = ?', [result.insertId]);
    res.status(201).json({ ok: true, data: rows[0] });
  } catch (err) {
    if (err && err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ ok: false, error: 'A page with this slug already exists' });
    }
    next(err);
  }
});

// PUT /api/admin/pages/:slug — update page content/title/meta/published
pagesAdminRouter.put('/:slug', async (req, res, next) => {
  try {
    const { title, content, meta_description, is_published } = req.body || {};
    const [result] = await pool.query(
      `UPDATE pages SET
         title = COALESCE(?, title),
         content = COALESCE(?, content),
         meta_description = COALESCE(?, meta_description),
         is_published = COALESCE(?, is_published)
       WHERE slug = ?`,
      [
        title !== undefined ? String(title).trim() : null,
        content !== undefined ? content : null,
        meta_description !== undefined ? meta_description : null,
        is_published !== undefined ? (is_published ? 1 : 0) : null,
        req.params.slug,
      ]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Page not found' });
    }
    const [rows] = await pool.query('SELECT * FROM pages WHERE slug = ?', [req.params.slug]);
    res.json({ ok: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/pages/:slug — remove a page (cannot delete a system page)
const SYSTEM_SLUGS = ['privacy-policy', 'terms-conditions', 'refund-policy'];
pagesAdminRouter.delete('/:slug', async (req, res, next) => {
  try {
    if (SYSTEM_SLUGS.includes(req.params.slug)) {
      return res.status(400).json({ ok: false, error: 'System pages cannot be deleted' });
    }
    const [result] = await pool.query('DELETE FROM pages WHERE slug = ?', [req.params.slug]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Page not found' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
