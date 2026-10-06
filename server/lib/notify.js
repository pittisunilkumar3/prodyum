/**
 * Automated template emails for public form submissions.
 *
 * Fire-and-forget by design: a submission must NEVER fail or hang because
 * mail is unconfigured / the SMTP server is slow / the template is disabled.
 * `sendTemplateEmail` never throws; `fireTemplateEmail` runs it in the
 * background and logs any problem.
 */
import { pool } from '../db.js';
import { renderPlaceholders, generateEmailHTML } from './emailRenderer.js';
import { getSavedCredentials, buildTransport, friendlySmtpError } from './mailer.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Turns any form value into a safe placeholder string. */
const val = (v) => String(v ?? '').slice(0, 600);

/**
 * Sends one designed template (from the Email Templates admin page) to a
 * recipient with real placeholder values.
 *
 * @param {string} templateName  e.g. 'inquiry_acknowledgement'
 * @param {string|null} toEmail  recipient; null/'' → business inbox (Reply-To, else From)
 * @param {object} placeholders  {{token}} → value map from the form submission
 * @returns {Promise<{sent:boolean, skipped?:string, error?:string}>}
 */
export async function sendTemplateEmail(templateName, toEmail, placeholders = {}) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM email_templates WHERE template_name = ? LIMIT 1',
      [templateName]
    );
    const tpl = rows[0];
    if (!tpl) return { sent: false, skipped: `template "${templateName}" not found` };
    if (!tpl.is_active) return { sent: false, skipped: `template "${templateName}" is disabled` };

    const creds = await getSavedCredentials();
    if (!creds || !creds.pass) {
      return { sent: false, skipped: 'SMTP is not configured' };
    }

    const to = toEmail ? String(toEmail).trim() : creds.replyTo || creds.fromEmail;
    if (!to || !EMAIL_RE.test(to)) return { sent: false, skipped: 'no valid recipient' };

    const subject = renderPlaceholders(tpl.subject, placeholders);
    const filled = {
      ...tpl,
      subject,
      body: renderPlaceholders(tpl.body, placeholders),
      footer_text: renderPlaceholders(tpl.footer_text, placeholders),
    };
    const html = generateEmailHTML(filled);

    const transporter = buildTransport(creds);
    const info = await transporter.sendMail({
      from: `"${creds.fromName}" <${creds.fromEmail}>`,
      to,
      replyTo: creds.replyTo || undefined,
      subject,
      html,
      attachments: tpl.attachment_url
        ? [{ path: tpl.attachment_url }]
        : undefined,
    });

    console.log(`[mail] ${templateName} → ${to} (${info.messageId})`);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[mail] ${templateName} failed:`, friendlySmtpError(err));
    return { sent: false, error: friendlySmtpError(err) };
  }
}

/** Fire-and-forget variant for request handlers — never await this. */
export function fireTemplateEmail(templateName, toEmail, placeholders = {}) {
  sendTemplateEmail(templateName, toEmail, placeholders).catch((err) => {
    console.error(`[mail] ${templateName} unexpected error:`, err?.message || err);
  });
}
