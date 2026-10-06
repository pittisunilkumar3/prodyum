import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const SOCIAL_FIELDS = [
  'facebook_link',
  'instagram_link',
  'twitter_link',
  'linkedin_link',
  'youtube_link',
  'whatsapp_link',
];

// Accept http(s) URLs (allow wa.me / x.com etc.) or empty string
function validLink(v) {
  if (v === undefined || v === null || v === '') return '';
  const s = String(v).trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) return null; // invalid → caller returns 400
  try {
    const u = new URL(s);
    return u.href;
  } catch {
    return null;
  }
}

/* ================= PUBLIC: /api/site-settings ================= */

export const siteSettingsPublicRouter = Router();

// GET /api/site-settings — social links for the public footer
siteSettingsPublicRouter.get('/', async (req, res, next) => {
  try {
    const cols = SOCIAL_FIELDS.join(', ');
    const [rows] = await pool.query(`SELECT ${cols} FROM site_settings WHERE id = 1`);
    res.json({
      ok: true,
      data: rows[0] || Object.fromEntries(SOCIAL_FIELDS.map((f) => [f, ''])),
    });
  } catch (err) {
    next(err);
  }
});

/* ================= ADMIN: /api/admin/site-settings ================= */

export const siteSettingsAdminRouter = Router();
siteSettingsAdminRouter.use(requireAdmin);

// PUT /api/admin/site-settings — update social links
siteSettingsAdminRouter.put('/', async (req, res, next) => {
  try {
    const body = req.body || {};
    const values = {};
    for (const field of SOCIAL_FIELDS) {
      if (body[field] === undefined) continue; // partial updates allowed
      const clean = validLink(body[field]);
      if (clean === null) {
        return res
          .status(400)
          .json({ ok: false, error: `${field} must be a valid http(s) URL (or empty)` });
      }
      values[field] = clean;
    }

    if (Object.keys(values).length > 0) {
      const setFields = SOCIAL_FIELDS.filter((f) => f in values);
      const sets = setFields.map((f) => `${f} = ?`).join(', ');
      await pool.query(
        `UPDATE site_settings SET ${sets} WHERE id = 1`,
        setFields.map((f) => values[f])
      );
    }

    const cols = SOCIAL_FIELDS.join(', ');
    const [rows] = await pool.query(`SELECT ${cols} FROM site_settings WHERE id = 1`);
    res.json({ ok: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
});
