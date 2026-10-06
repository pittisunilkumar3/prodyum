import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { renderPlaceholders, generateEmailHTML } from '../lib/emailRenderer.js';
import {
  getEmailSettingsRow,
  getSavedCredentials,
  buildTransport,
  friendlySmtpError,
} from '../lib/mailer.js';

const router = Router();
router.use(requireAdmin);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'email_templates');

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ---------- File uploads (images for logo/icon/banner + attachments) ----------
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    cb(null, `${isImage ? 'email_' : 'attach_'}${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.doc', '.docx', '.xls', '.xlsx', '.zip'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowed.includes(ext)) {
      return cb(new Error('Invalid file type. Allowed: jpg, jpeg, png, gif, webp, pdf, doc, docx, xls, xlsx, zip'));
    }
    cb(null, true);
  },
});

// ---------- Helpers ----------
const EDITABLE_TEXT_FIELDS = [
  'subject', 'body', 'logo_url', 'icon_url', 'banner_url', 'button_name', 'button_url',
  'attachment_url', 'footer_text', 'copyright_text', 'privacy_link', 'terms_link',
  'contact_link', 'facebook_link', 'instagram_link', 'twitter_link', 'linkedin_link',
  'pinterest_link',
];

function pickFields(body = {}) {
  const out = {};
  for (const f of EDITABLE_TEXT_FIELDS) {
    if (body[f] !== undefined) out[f] = String(body[f]);
  }
  if (body.email_template !== undefined) {
    const fmt = parseInt(body.email_template, 10);
    if (Number.isInteger(fmt) && fmt >= 1 && fmt <= 11) out.email_template = fmt;
  }
  return out;
}

async function getTemplateByName(name) {
  const [rows] = await pool.query('SELECT * FROM email_templates WHERE template_name = ? LIMIT 1', [name]);
  return rows[0] || null;
}

// Sample placeholder values used when sending a test (mirrors CINICA settings.php)
const SAMPLE_PLACEHOLDERS = {
  name: 'Vikram Reddy',
  full_name: 'Jane Smith',
  email: 'vikram@example.com',
  phone: '+91 98765 43210',
  company: 'Nexus Ventures',
  category_name: 'IT & Growth Strategy',
  budget_tier: '₹12,00,000 - ₹25,00,000 ($15k - $30k)',
  message: 'We need a high-performance e-commerce platform with headless architecture.',
  service: 'High-Performance Web App (React/Node)',
  timeline: '1 - 3 Months',
  details: 'Replatform our storefront with sub-second LCP and CAPI tracking.',
  job_title: 'Senior Full-Stack Web Engineer',
  vertical: 'Creative & IT',
  portfolio: 'https://github.com/example',
  city: 'Hyderabad',
  role_category: 'Lead / Supporting Actor',
  experience: 'Professional (3-7 years)',
};

// ---------- Routes ----------

// GET /api/admin/email-templates — all templates (used to populate the editor)
router.get('/', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM email_templates ORDER BY id ASC');
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/email-templates/upload-image — logo/icon/banner/attachment upload
router.post('/upload-image', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ ok: false, error: err.message });
    if (!req.file) return res.status(400).json({ ok: false, error: 'No file uploaded.' });
    const absolute = `${req.protocol}://${req.get('host')}/uploads/email_templates/${req.file.filename}`;
    res.json({ ok: true, url: absolute, file: req.file.filename });
  });
});

// POST /api/admin/email-templates/:templateName/test — send a preview with sample data
router.post('/:templateName/test', async (req, res, next) => {
  try {
    const tpl = await getTemplateByName(req.params.templateName);
    if (!tpl) return res.status(404).json({ ok: false, error: 'Template not found.' });

    const to = String(req.body?.to || '').trim();
    if (!isEmail(to)) {
      return res.status(400).json({ ok: false, error: 'A valid recipient email address is required.' });
    }

    const settingsRow = await getEmailSettingsRow();
    if (!settingsRow) {
      return res.status(400).json({ ok: false, error: 'SMTP is not configured yet. Save your settings in "Email / SMTP" first.' });
    }
    if (!settingsRow.enabled) {
      return res.status(400).json({ ok: false, error: 'Outbound email is disabled in "Email / SMTP". Enable it and save.' });
    }
    const creds = await getSavedCredentials();
    if (!creds?.pass) {
      return res.status(400).json({ ok: false, error: 'Saved SMTP password could not be decrypted. Re-enter the password in "Email / SMTP" and save.' });
    }

    // Fill placeholders with realistic sample values
    const subject = renderPlaceholders(tpl.subject, SAMPLE_PLACEHOLDERS);
    const filled = { ...tpl, subject, body: renderPlaceholders(tpl.body, SAMPLE_PLACEHOLDERS) };
    const html = generateEmailHTML(filled);

    try {
      const transporter = buildTransport(creds);
      const info = await transporter.sendMail({
        from: `"${creds.fromName}" <${creds.fromEmail}>`,
        to,
        replyTo: creds.replyTo || undefined,
        subject,
        html,
        attachments: tpl.attachment_url
          ? [{ path: tpl.attachment_url.startsWith('http') ? tpl.attachment_url : path.join(UPLOAD_DIR, path.basename(tpl.attachment_url)) }]
          : undefined,
      });
      res.json({ ok: true, messageId: info.messageId, subject });
    } catch (err) {
      res.status(400).json({ ok: false, error: friendlySmtpError(err) });
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/email-templates/:templateName — upsert template fields
router.put('/:templateName', async (req, res, next) => {
  try {
    const name = req.params.templateName;
    const fields = pickFields(req.body);
    const onlyStatusChange =
      req.body.is_active !== undefined && Object.keys(fields).length === 0;

    // Full/form saves require subject + body; status-only toggles don't
    if (!onlyStatusChange) {
      if (!fields.subject?.trim()) {
        return res.status(400).json({ ok: false, error: 'Subject (Main Title) is required.' });
      }
      if (!fields.body?.trim()) {
        return res.status(400).json({ ok: false, error: 'Mail body is required.' });
      }
    }

    const existing = await getTemplateByName(name);
    const isActive = req.body.is_active !== undefined ? (req.body.is_active ? 1 : 0) : existing?.is_active ?? 1;

    if (existing) {
      const sets = Object.keys(fields).map((f) => `${f} = ?`).join(', ');
      const params = Object.values(fields);
      const setSql = sets ? `${sets}, ` : '';
      await pool.query(
        `UPDATE email_templates SET ${setSql}is_active = ? WHERE template_name = ?`,
        [...params, isActive, name]
      );
    } else {
      const cols = ['template_name', ...Object.keys(fields), 'is_active'];
      const placeholders = cols.map(() => '?').join(', ');
      await pool.query(
        `INSERT INTO email_templates (${cols.join(', ')}) VALUES (${placeholders})`,
        [name, ...Object.values(fields), isActive]
      );
    }

    const tpl = await getTemplateByName(name);
    res.json({ ok: true, template: tpl, message: 'Email template saved.' });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/email-templates/:templateName
router.delete('/:templateName', async (req, res, next) => {
  try {
    const [result] = await pool.query('DELETE FROM email_templates WHERE template_name = ?', [
      req.params.templateName,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Template not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
