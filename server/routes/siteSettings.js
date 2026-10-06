import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { imageUpload, deleteUploadImage } from '../lib/uploads.js';

export const SETTINGS_FIELDS = [
  // Website identity (Admin → Settings → Website Settings)
  'site_name',
  'site_tagline',
  'logo_url',
  // Social links (shown as footer icons)
  'facebook_link',
  'instagram_link',
  'twitter_link',
  'linkedin_link',
  'youtube_link',
  'whatsapp_link',
];

const SOCIAL_FIELDS = SETTINGS_FIELDS.slice(3);

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

async function readSettings(pool) {
  const cols = SETTINGS_FIELDS.join(', ');
  const [rows] = await pool.query(`SELECT ${cols} FROM site_settings WHERE id = 1`);
  return (
    rows[0] || {
      site_name: 'Prodyum',
      site_tagline: 'IT · Media · Entertainments',
      logo_url: '',
      ...Object.fromEntries(SOCIAL_FIELDS.map((f) => [f, ''])),
    }
  );
}

/* ================= PUBLIC: /api/site-settings ================= */

export const siteSettingsPublicRouter = Router();

// GET /api/site-settings — branding + social links for the public site
siteSettingsPublicRouter.get('/', async (req, res, next) => {
  try {
    res.json({ ok: true, data: await readSettings(pool) });
  } catch (err) {
    next(err);
  }
});

/* ================= ADMIN: /api/admin/site-settings ================= */

export const siteSettingsAdminRouter = Router();
siteSettingsAdminRouter.use(requireAdmin);

// PUT /api/admin/site-settings — update site identity + social links
siteSettingsAdminRouter.put('/', async (req, res, next) => {
  try {
    const body = req.body || {};
    const values = {};

    // Website identity fields
    if (body.site_name !== undefined) {
      const name = String(body.site_name).trim();
      if (!name) {
        return res.status(400).json({ ok: false, error: 'Site name cannot be empty' });
      }
      values.site_name = name.slice(0, 120);
    }
    if (body.site_tagline !== undefined) {
      values.site_tagline = String(body.site_tagline).trim().slice(0, 200);
    }
    if (body.logo_url !== undefined) {
      const url = String(body.logo_url || '').trim();
      // Explicit removal: clean up the old logo file
      if (!url) {
        const current = await readSettings(pool);
        if (current.logo_url) {
          await deleteUploadImage(current.logo_url.replace(/^\/uploads\//, ''));
        }
      }
      values.logo_url = url;
    }

    // Social link fields
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
      const setFields = Object.keys(values);
      const sets = setFields.map((f) => `${f} = ?`).join(', ');
      await pool.query(`UPDATE site_settings SET ${sets} WHERE id = 1`, setFields.map((f) => values[f]));
    }

    res.json({ ok: true, data: await readSettings(pool) });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/site-settings/logo — upload a new logo image (multipart, field: logo)
siteSettingsAdminRouter.post('/logo', imageUpload.single('logo'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: 'No image file received' });
    }
    const current = await readSettings(pool);
    // Replace: remove previous logo file
    if (current.logo_url) {
      await deleteUploadImage(current.logo_url.replace(/^\/uploads\//, ''));
    }
    const logoUrl = `/uploads/${req.file.filename}`;
    await pool.query('UPDATE site_settings SET logo_url = ? WHERE id = 1', [logoUrl]);
    res.json({ ok: true, data: await readSettings(pool) });
  } catch (err) {
    next(err);
  }
});
