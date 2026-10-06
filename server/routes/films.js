import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { imageUpload, deleteUploadImage } from '../lib/uploads.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// Multipart bodies deliver booleans as strings ('1'/'0'/'true') — coerce safely
const toBool = (v) => v === true || v === 1 || v === '1' || v === 'true';

const validProjectId = (id) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(id);

const PROJECT_COLS = `
  p.id, p.category_id, c.name AS category_name, p.title, p.type, p.genre, p.director,
  p.release_date, p.aspect_ratio, p.resolution, p.audio, p.status, p.timecode,
  p.synopsis, p.cast_info, p.poster_gradient, p.priority, p.published, p.created_at,
  p.meta_title, p.meta_description, p.meta_image
`;

/* ================= PUBLIC: /api/films ================= */

export const filmPublicRouter = Router();

// GET /api/films/categories — published, priority order (public filter pills)
filmPublicRouter.get('/categories', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, name, slug, priority FROM film_categories WHERE published = 1 ORDER BY priority ASC, name ASC'
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/films — published projects with category names, priority order
filmPublicRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${PROJECT_COLS} FROM film_projects p
       LEFT JOIN film_categories c ON c.id = p.category_id
       WHERE p.published = 1
       ORDER BY p.priority ASC, p.created_at ASC`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

/* ================= ADMIN: /api/admin/film-categories ================= */

export const categoryAdminRouter = Router();
categoryAdminRouter.use(requireAdmin);

categoryAdminRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT c.*, (SELECT COUNT(*) FROM film_projects p WHERE p.category_id = c.id) AS project_count
       FROM film_categories c ORDER BY c.priority ASC, c.name ASC`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

categoryAdminRouter.post('/', async (req, res, next) => {
  try {
    const { name = '', slug = '', priority = 100, published = 1 } = req.body || {};
    if (!name.trim()) {
      return res.status(400).json({ ok: false, error: 'Category name is required.' });
    }
    const finalSlug = slugify(slug.trim() || name);
    if (!finalSlug) {
      return res.status(400).json({ ok: false, error: 'Could not derive a valid slug.' });
    }

    try {
      const [result] = await pool.query(
        'INSERT INTO film_categories (name, slug, priority, published) VALUES (?, ?, ?, ?)',
        [String(name).slice(0, 100), finalSlug, Math.max(0, parseInt(priority, 10) || 0), published ? 1 : 0]
      );
      res.json({ ok: true, id: result.insertId });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ ok: false, error: 'A category with this name/slug already exists.' });
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

categoryAdminRouter.patch('/:id', async (req, res, next) => {
  try {
    const { name, slug, priority, published } = req.body || {};
    const sets = [];
    const params = [];

    if (name !== undefined) {
      if (!String(name).trim()) {
        return res.status(400).json({ ok: false, error: 'Name cannot be empty.' });
      }
      sets.push('name = ?');
      params.push(String(name).slice(0, 100));
    }
    if (slug !== undefined) {
      sets.push('slug = ?');
      params.push(slugify(slug));
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
      `UPDATE film_categories SET ${sets.join(', ')} WHERE id = ?`,
      params
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Category not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// DELETE: projects keep existing (category_id set to NULL by FK rule)
categoryAdminRouter.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM film_categories WHERE id = ?', [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Category not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

/* ================= ADMIN: /api/admin/films ================= */

export const filmAdminRouter = Router();
filmAdminRouter.use(requireAdmin);

filmAdminRouter.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT ${PROJECT_COLS} FROM film_projects p
       LEFT JOIN film_categories c ON c.id = p.category_id
       ORDER BY p.priority ASC, p.created_at ASC`
    );
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

filmAdminRouter.post('/', imageUpload.single('meta_image'), async (req, res, next) => {
  try {
    const b = req.body || {};
    const id = slugify(b.id || b.title || '');
    if (!b.title || !String(b.title).trim()) {
      return res.status(400).json({ ok: false, error: 'Title is required.' });
    }
    if (!validProjectId(id)) {
      return res
        .status(400)
        .json({ ok: false, error: 'Project ID may only contain lowercase letters, numbers and hyphens.' });
    }

    const categoryId = b.category_id ? parseInt(b.category_id, 10) : null;

    try {
      await pool.query(
        `INSERT INTO film_projects
          (id, category_id, title, type, genre, director, release_date, aspect_ratio,
           resolution, audio, status, timecode, synopsis, cast_info, poster_gradient,
           priority, published, meta_title, meta_description, meta_image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          Number.isFinite(categoryId) ? categoryId : null,
          String(b.title).slice(0, 200),
          String(b.type || '').slice(0, 120),
          String(b.genre || '').slice(0, 120),
          String(b.director || '').slice(0, 150),
          String(b.release_date || '').slice(0, 120),
          String(b.aspect_ratio || '').slice(0, 80),
          String(b.resolution || '').slice(0, 120),
          String(b.audio || '').slice(0, 120),
          String(b.status || '').slice(0, 120),
          String(b.timecode || '').slice(0, 40),
          String(b.synopsis || ''),
          String(b.cast_info || '').slice(0, 300),
          String(b.poster_gradient || 'from-amber-900/60 via-obsidian-surface to-black').slice(0, 300),
          Math.max(0, parseInt(b.priority, 10) || 0),
          toBool(b.published) ? 1 : 0,
          String(b.meta_title || '').slice(0, 100),
          String(b.meta_description || ''),
          req.file ? `/uploads/${req.file.filename}` : '',
        ]
      );
      res.json({ ok: true, id });
    } catch (err) {
      if (req.file) await deleteUploadImage(`/uploads/${req.file.filename}`);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ ok: false, error: 'A project with this ID already exists.' });
      }
      if (err.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(400).json({ ok: false, error: 'Selected category does not exist.' });
      }
      throw err;
    }
  } catch (err) {
    next(err);
  }
});

filmAdminRouter.patch('/:id', imageUpload.single('meta_image'), async (req, res, next) => {
  try {
    const b = req.body || {};
    const sets = [];
    const params = [];

    const TEXT_FIELDS = [
      ['title', 200], ['type', 120], ['genre', 120], ['director', 150], ['release_date', 120],
      ['aspect_ratio', 80], ['resolution', 120], ['audio', 120], ['status', 120],
      ['timecode', 40], ['synopsis', null], ['cast_info', 300], ['poster_gradient', 300],
      ['meta_title', 100], ['meta_description', null],
    ];

    for (const [field, max] of TEXT_FIELDS) {
      if (b[field] !== undefined) {
        sets.push(`${field} = ?`);
        params.push(max ? String(b[field]).slice(0, max) : String(b[field]));
      }
    }
    if (b.category_id !== undefined) {
      const cid = b.category_id ? parseInt(b.category_id, 10) : null;
      sets.push('category_id = ?');
      params.push(Number.isFinite(cid) ? cid : null);
    }
    if (b.priority !== undefined) {
      const p = parseInt(b.priority, 10);
      if (!Number.isFinite(p) || p < 0) {
        return res.status(400).json({ ok: false, error: 'Priority must be a number ≥ 0.' });
      }
      sets.push('priority = ?');
      params.push(p);
    }
    if (b.published !== undefined) {
      sets.push('published = ?');
      params.push(toBool(b.published) ? 1 : 0);
    }

    // Meta image: new upload replaces old; explicit remove flag clears it
    if (req.file || b.remove_meta_image === '1' || b.remove_meta_image === 1) {
      const [current] = await pool.query('SELECT meta_image FROM film_projects WHERE id = ?', [
        req.params.id,
      ]);
      const oldImage = current[0]?.meta_image || '';
      if (req.file) {
        sets.push('meta_image = ?');
        params.push(`/uploads/${req.file.filename}`);
      } else {
        sets.push("meta_image = ''");
      }
      if (oldImage) await deleteUploadImage(oldImage);
    }

    if (!sets.length) {
      return res.status(400).json({ ok: false, error: 'Nothing to update.' });
    }

    params.push(req.params.id);
    const [result] = await pool.query(
      `UPDATE film_projects SET ${sets.join(', ')} WHERE id = ?`,
      params
    );
    if (result.affectedRows === 0) {
      if (req.file) await deleteUploadImage(`/uploads/${req.file.filename}`);
      return res.status(404).json({ ok: false, error: 'Project not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    if (req.file) await deleteUploadImage(`/uploads/${req.file.filename}`);
    next(err);
  }
});

// DELETE project — also deletes its videos (and uploaded files from disk)
filmAdminRouter.delete('/:id', async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const [videos] = await pool.query(
      'SELECT file_path FROM project_videos WHERE project_id = ? AND source = ?',
      [projectId, 'upload']
    );

    await pool.query('DELETE FROM project_videos WHERE project_id = ?', [projectId]);
    const [result] = await pool.query('DELETE FROM film_projects WHERE id = ?', [projectId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Project not found.' });
    }

    for (const v of videos) {
      if (v.file_path) {
        const abs = path.join(UPLOADS_DIR, path.basename(v.file_path));
        await fs.promises.unlink(abs).catch(() => {});
      }
    }

    res.json({ ok: true, videosRemoved: videos.length });
  } catch (err) {
    next(err);
  }
});
