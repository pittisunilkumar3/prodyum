import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';
import { encryptSecret } from '../lib/crypto.js';
import {
  getEmailSettingsRow,
  getSavedCredentials,
  buildTransport,
  friendlySmtpError,
} from '../lib/mailer.js';

const router = Router();
router.use(requireAdmin);

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const ENCRYPTIONS = ['tls', 'ssl', 'none'];

/** Safe view of the saved row — the password is NEVER returned, only its presence. */
function publicView(row) {
  if (!row) return { configured: false };
  return {
    configured: true,
    smtpHost: row.smtp_host,
    smtpPort: row.smtp_port,
    smtpEncryption: row.smtp_encryption || 'tls',
    smtpSecure: !!row.smtp_secure,
    smtpUser: row.smtp_user,
    fromName: row.from_name || '',
    fromEmail: row.from_email || '',
    replyTo: row.reply_to || '',
    enabled: !!row.enabled,
    hasPassword: !!row.smtp_password_enc,
    lastTestedAt: row.last_tested_at || null,
    lastTestStatus: row.last_test_status || null,
    lastTestMessage: row.last_test_message || null,
  };
}

function validate(body) {
  const errors = [];
  const host = String(body.smtpHost || '').trim();
  const port = parseInt(body.smtpPort, 10);
  const user = String(body.smtpUser || '').trim();
  const fromEmail = String(body.fromEmail || '').trim();
  const replyTo = String(body.replyTo || '').trim();
  const encryption = ENCRYPTIONS.includes(body.smtpEncryption) ? body.smtpEncryption
    : (body.smtpSecure ? 'ssl' : 'tls');

  if (!host) errors.push('SMTP host is required.');
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    errors.push('SMTP port must be a number between 1 and 65535.');
  }
  if (!user) errors.push('SMTP username is required.');
  if (fromEmail && !isEmail(fromEmail)) errors.push('"From" email is not a valid address.');
  if (replyTo && !isEmail(replyTo)) errors.push('Reply-To is not a valid address.');

  return { errors, host, port, user, fromEmail, replyTo, encryption };
}

async function markTest(status, message) {
  try {
    await pool.query(
      `UPDATE email_settings
         SET last_tested_at = NOW(), last_test_status = ?, last_test_message = ?
       WHERE id = 1`,
      [status, String(message).slice(0, 500)]
    );
  } catch {
    /* non-fatal — never block the response on bookkeeping */
  }
}

/** Maps low-level nodemailer errors to actionable messages. */
// GET /api/admin/email-settings — current configuration (password masked)
router.get('/', async (req, res, next) => {
  try {
    const row = await getEmailSettingsRow();
    res.json({ ok: true, settings: publicView(row) });
  } catch (err) {
    next(err);
  }
});

// PUT /api/admin/email-settings — save (upsert singleton row)
// An empty smtpPassword keeps the previously stored password.
router.put('/', async (req, res, next) => {
  try {
    const body = req.body || {};
    const { errors, host, port, user, fromEmail, replyTo, encryption } = validate(body);
    const password = typeof body.smtpPassword === 'string' ? body.smtpPassword : '';
    const existing = await getEmailSettingsRow();

    if (!password && !existing) {
      errors.push('SMTP password is required for first-time setup.');
    }
    if (errors.length) {
      return res.status(400).json({ ok: false, error: errors.join(' '), errors });
    }

    const encPassword = password ? encryptSecret(password) : existing?.smtp_password_enc;
    if (!encPassword) {
      return res.status(400).json({ ok: false, error: 'Password is required for first-time setup.' });
    }

    // Only overwrite optional fields when the client actually sends them
    const nextReplyTo = body.replyTo !== undefined ? (replyTo || null) : (existing?.reply_to ?? null);
    const nextEnabled = body.enabled !== undefined ? (body.enabled === false ? 0 : 1) : (existing?.enabled ?? 1);

    await pool.query(
      `INSERT INTO email_settings
        (id, smtp_host, smtp_port, smtp_encryption, smtp_secure, smtp_user, smtp_password_enc,
         from_name, from_email, reply_to, enabled)
       VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         smtp_host = VALUES(smtp_host),
         smtp_port = VALUES(smtp_port),
         smtp_encryption = VALUES(smtp_encryption),
         smtp_secure = VALUES(smtp_secure),
         smtp_user = VALUES(smtp_user),
         smtp_password_enc = VALUES(smtp_password_enc),
         from_name = VALUES(from_name),
         from_email = VALUES(from_email),
         reply_to = VALUES(reply_to),
         enabled = VALUES(enabled)`,
      [
        host,
        port,
        encryption,
        encryption === 'ssl' ? 1 : 0,
        user,
        encPassword,
        String(body.fromName || '').slice(0, 120) || null,
        fromEmail || null,
        nextReplyTo,
        nextEnabled,
      ]
    );

    const row = await getEmailSettingsRow();
    res.json({ ok: true, settings: publicView(row), message: 'Email settings saved.' });
  } catch (err) {
    next(err);
  }
});

// POST /api/admin/email-settings/test
// Body: { to, override?: { smtpHost, smtpPort, smtpSecure, smtpUser, smtpPassword, fromName?, fromEmail?, replyTo? } }
// - with `override`: verifies + sends WITHOUT saving (test-before-save)
// - without:         uses the saved configuration and records the result
router.post('/test', async (req, res, next) => {
  try {
    const body = req.body || {};
    const to = String(body.to || '').trim();
    if (!isEmail(to)) {
      return res.status(400).json({ ok: false, error: 'A valid recipient email address is required.' });
    }

    const saved = await getEmailSettingsRow();
    const o = body.override || {};
    const hasOverride = !!(o.smtpHost && o.smtpUser && o.smtpPassword);

    let creds, usedSaved;
    if (hasOverride) {
      usedSaved = false;
      creds = {
        host: String(o.smtpHost).trim(),
        port: parseInt(o.smtpPort, 10) || 587,
        encryption: ENCRYPTIONS.includes(o.smtpEncryption) ? o.smtpEncryption : (o.smtpSecure ? 'ssl' : 'tls'),
        secure: !!(o.smtpSecure || o.smtpEncryption === 'ssl'),
        user: String(o.smtpUser).trim(),
        pass: String(o.smtpPassword),
        fromName: String(o.fromName || '').trim() || 'Prodyum',
        fromEmail: String(o.fromEmail || '').trim() || String(o.smtpUser).trim(),
        replyTo: String(o.replyTo || '').trim() || null,
      };
    } else {
      if (!saved) {
        return res.status(400).json({
          ok: false,
          error: 'No saved SMTP settings found. Save your settings first, or tick "use the form values" to test unsaved credentials.',
        });
      }
      usedSaved = true;
      creds = await getSavedCredentials();
      if (!creds?.pass) {
        return res.status(400).json({
          ok: false,
          error: 'Saved SMTP password could not be decrypted (was it stored with a different ENCRYPTION_KEY?). Re-enter the password and save again.',
        });
      }
    }

    const transporter = buildTransport(creds);

    // Step 1: verify connectivity + authentication
    try {
      await transporter.verify();
    } catch (err) {
      if (usedSaved) markTest('failed', friendlySmtpError(err));
      return res.status(400).json({ ok: false, stage: 'connect', error: friendlySmtpError(err) });
    }

    // Step 2: deliver a branded test message
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    try {
      const info = await transporter.sendMail({
        from: `"${creds.fromName}" <${creds.fromEmail}>`,
        to,
        replyTo: creds.replyTo || undefined,
        subject: 'Prodyum SMTP test — connection successful ✓',
        text:
          `SMTP test from the Prodyum admin console.\n\n` +
          `Host: ${creds.host}:${creds.port} (${(creds.encryption || (creds.secure ? 'ssl' : 'tls')).toUpperCase()})\n` +
          `User: ${creds.user}\nSent: ${now} IST\n\n` +
          `If you received this message, your SMTP configuration works.`,
        html: `
          <div style="font-family:Arial,Helvetica,sans-serif;background:#0C101A;padding:32px;border-radius:12px;color:#fff;max-width:560px;margin:auto">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:2px;color:#00F0FF;text-transform:uppercase">Prodyum Admin Console</p>
            <h2 style="margin:0 0 16px;font-size:20px;color:#fff">SMTP configuration works ✓</h2>
            <p style="margin:0 0 14px;font-size:14px;color:#CBD5E1;line-height:1.6">
              This is a test email triggered from the Prodyum superadmin dashboard.
              Your outbound email settings are valid and mail can be delivered.
            </p>
            <table style="font-size:12px;color:#94A3B8;border-collapse:collapse">
              <tr><td style="padding:3px 12px 3px 0">Host</td><td style="color:#fff">${creds.host}:${creds.port} (${(creds.encryption || (creds.secure ? 'ssl' : 'tls')).toUpperCase()})</td></tr>
              <tr><td style="padding:3px 12px 3px 0">User</td><td style="color:#fff">${creds.user}</td></tr>
              <tr><td style="padding:3px 12px 3px 0">Sent</td><td style="color:#fff">${now} IST</td></tr>
            </table>
          </div>`,
      });

      if (usedSaved) markTest('success', `Delivered to ${to} (${info.messageId})`);

      res.json({
        ok: true,
        stage: 'delivered',
        messageId: info.messageId,
        response: info.response,
        usingSavedSettings: usedSaved,
      });
    } catch (err) {
      if (usedSaved) markTest('failed', friendlySmtpError(err));
      res.status(400).json({ ok: false, stage: 'send', error: friendlySmtpError(err) });
    }
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/email-settings — remove stored configuration entirely
router.delete('/', async (req, res, next) => {
  try {
    await pool.query('DELETE FROM email_settings WHERE id = 1');
    res.json({ ok: true, message: 'Email settings removed.' });
  } catch (err) {
    next(err);
  }
});

export default router;
