import nodemailer from 'nodemailer';
import { pool } from '../db.js';
import { decryptSecret } from './crypto.js';

/**
 * Central place for outbound email.
 * - Loads the singleton `email_settings` row (written from the admin console)
 * - Builds a nodemailer transport from saved (or ad-hoc) credentials
 * - Maps low-level SMTP errors to actionable messages
 */

export async function getEmailSettingsRow() {
  const [rows] = await pool.query('SELECT * FROM email_settings WHERE id = 1 LIMIT 1');
  return rows[0] || null;
}

/**
 * Saved settings → plain credentials object (password decrypted in memory only).
 * Returns null when no settings have been saved yet.
 */
export async function getSavedCredentials() {
  const row = await getEmailSettingsRow();
  if (!row) return null;
  return {
    host: row.smtp_host,
    port: Number(row.smtp_port),
    // 'ssl' = implicit TLS on connect (usually 465), 'tls' = STARTTLS (usually 587),
    // 'none' = no encryption (local dev relays)
    encryption: row.smtp_encryption || 'tls',
    secure: (row.smtp_encryption || 'tls') === 'ssl',
    user: row.smtp_user,
    pass: decryptSecret(row.smtp_password_enc),
    fromName: row.from_name || 'Prodyum',
    fromEmail: row.from_email || row.smtp_user,
    replyTo: row.reply_to || null,
  };
}

export function buildTransport(creds) {
  const encryption = creds.encryption || (creds.secure ? 'ssl' : 'tls');
  const options = {
    host: creds.host,
    port: Number(creds.port) || 587,
    secure: encryption === 'ssl',
    auth: { user: creds.user, pass: creds.pass },
    connectionTimeout: 12_000,
    greetingTimeout: 12_000,
    socketTimeout: 20_000,
  };
  if (encryption === 'none') options.ignoreTLS = true; // plain connection (dev relays)
  return nodemailer.createTransport(options);
}

/** Maps low-level nodemailer errors to actionable messages. */
export function friendlySmtpError(err) {
  const code = err?.code || '';
  const msg = err?.message || 'Unknown SMTP error';
  if (code === 'EAUTH' || /535|530|Invalid login|Username and Password not accepted/i.test(msg)) {
    return `Authentication failed — check the username/password. ${msg} ` +
      `(For Gmail you must use a 16-character App Password, not your normal login.)`;
  }
  if (code === 'ETIMEDOUT' || code === 'ESOCKET') {
    return `Connection timed out — check the host/port and any firewall. ${msg}`;
  }
  if (code === 'ECONNREFUSED') {
    return `Connection refused — is the host/port correct? ${msg}`;
  }
  if (code === 'ENOTFOUND' || code === 'EAI_AGAIN') {
    return `Host not found — check the SMTP hostname spelling. ${msg}`;
  }
  if (code === 'ECERT' || /certificate/i.test(msg)) {
    return `TLS/certificate problem — try the correct port with the matching encryption setting. ${msg}`;
  }
  return msg;
}
