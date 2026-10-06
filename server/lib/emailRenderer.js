/**
 * Structured email renderer — Prodyum-branded (dark obsidian theme).
 * Ported from the CINICA/StackFood `generateEmailHTML()` engine, restyled to
 * match the prodyum.in website: obsidian surfaces, cyan-accent CTAs,
 * amber highlights, Syne display headings + Plus Jakarta Sans body.
 *
 * A template = subject + rich-text body + layout format (1-11) + brand assets
 * (logo / icon / banner) + button + footer + page/social links. This module
 * composes the final email HTML, exactly mirroring the React-side preview in
 * src/admin/EmailTemplates.jsx.
 */

export const TEMPLATE_FORMATS = [
  { id: 1, name: 'Format 1', desc: 'Banner + Logo + Title + Body + Button' },
  { id: 2, name: 'Format 2', desc: 'Banner + Logo + Title + Body' },
  { id: 3, name: 'Format 3', desc: 'Banner + Title + Body + Button' },
  { id: 4, name: 'Format 4', desc: 'Banner + Icon + Title + Body' },
  { id: 5, name: 'Format 5', desc: 'Banner + Icon + Title | Body + Button' },
  { id: 6, name: 'Format 6', desc: 'Banner + Icon + Title + Body' },
  { id: 7, name: 'Format 7', desc: 'Logo + Title + Body + Button' },
  { id: 8, name: 'Format 8', desc: 'Title + Body + Button' },
  { id: 9, name: 'Format 9', desc: 'Icon + Title | Body + Button' },
  { id: 10, name: 'Format 10', desc: 'Icon + Title + Body' },
  { id: 11, name: 'Format 11', desc: 'Title + Body' },
];

// ---- Prodyum brand tokens (keep in sync with tailwind.config.js) ----
export const BRAND = {
  pageBg: '#06080D', // obsidian-void
  cardBg: '#0C101A', // obsidian-surface
  elevatedBg: '#121826', // obsidian-elevated
  border: '#1E2636',
  heading: '#F8FAFC',
  text: '#94A3B8',
  textSoft: '#CBD5E1',
  muted: '#64748B',
  cyan: '#00F0FF',
  amber: '#FFB800',
  fontBody: "'Plus Jakarta Sans','Segoe UI',Helvetica,Arial,sans-serif",
  fontDisplay: "'Syne','Plus Jakarta Sans','Segoe UI',Arial,sans-serif",
};

/** Replaces {{placeholder}} tokens in subject/body/footer text. */
export function renderPlaceholders(text, placeholders = {}) {
  let out = String(text ?? '');
  for (const [key, value] of Object.entries(placeholders)) {
    out = out.split(`{{${key}}}`).join(String(value ?? ''));
  }
  return out;
}

/**
 * Generates the full email HTML from the structured template row.
 * Mirrors the React-side preview (generatePreviewHTML) 1:1.
 */
export function generateEmailHTML(tpl, companyName = 'Prodyum Pvt. Ltd.') {
  const fmt = parseInt(tpl.email_template) || 1;
  const title = tpl.subject || '';
  const body = tpl.body || '';
  const B = BRAND;

  // Banner at TOP - full width, flush edges
  const bannerRow = tpl.banner_url
    ? `<tr><td style="padding:0;font-size:0;line-height:0"><img src="${tpl.banner_url}" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block" alt="Banner" /></td></tr>`
    : '';

  // Cyan → amber brand accent strip (like the site's gradient accents)
  const accentBar = `<tr><td style="padding:0;font-size:0;line-height:0"><span style="display:block;height:3px;background:linear-gradient(90deg,${B.cyan},${B.amber})"></span></td></tr>`;

  const logoImg = tpl.logo_url
    ? `<img src="${tpl.logo_url}" style="width:140px;height:60px;object-fit:contain;display:block;margin:0 auto 10px" alt="Logo" />`
    : '';
  const iconImg = tpl.icon_url
    ? `<img src="${tpl.icon_url}" style="width:130px;height:45px;object-fit:contain;display:block;margin:0 auto 10px" alt="Icon" />`
    : '';
  const btnHtml = tpl.button_name
    ? `<span style="display:block;text-align:center;margin-top:22px"><a href="${tpl.button_url || '#'}" style="background:${B.cyan};color:${B.pageBg};padding:12px 32px;display:inline-block;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.5px;border-radius:8px;font-family:${B.fontBody}">${tpl.button_name}</a></span>`
    : '';

  const footerLinksArr = [];
  if (tpl.privacy_link)
    footerLinksArr.push(`<a href="${tpl.privacy_link}" style="text-decoration:none;color:${B.cyan};font-size:12px;font-family:${B.fontBody}">Privacy Policy</a>`);
  if (tpl.terms_link)
    footerLinksArr.push(`<a href="${tpl.terms_link}" style="text-decoration:none;color:${B.cyan};font-size:12px;font-family:${B.fontBody}">Terms &amp; Conditions</a>`);
  if (tpl.contact_link)
    footerLinksArr.push(`<a href="${tpl.contact_link}" style="text-decoration:none;color:${B.cyan};font-size:12px;font-family:${B.fontBody}">Contact Us</a>`);
  const dot = `<span style="width:4px;height:4px;border-radius:50%;background:${B.muted};display:inline-block;margin:0 8px;vertical-align:middle"></span>`;
  const footerLinks = footerLinksArr.join(dot);

  const socialArr = [];
  if (tpl.facebook_link)
    socialArr.push(`<a href="${tpl.facebook_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/facebook.png" alt="Facebook" style="width:22px;height:22px" /></a>`);
  if (tpl.instagram_link)
    socialArr.push(`<a href="${tpl.instagram_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/instagram.png" alt="Instagram" style="width:22px;height:22px" /></a>`);
  if (tpl.twitter_link)
    socialArr.push(`<a href="${tpl.twitter_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/twitter.png" alt="Twitter" style="width:22px;height:22px" /></a>`);
  if (tpl.linkedin_link)
    socialArr.push(`<a href="${tpl.linkedin_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/linkedin.png" alt="LinkedIn" style="width:22px;height:22px" /></a>`);
  if (tpl.pinterest_link)
    socialArr.push(`<a href="${tpl.pinterest_link}" style="margin:0 6px;text-decoration:none"><img src="https://img.icons8.com/color/24/pinterest.png" alt="Pinterest" style="width:22px;height:22px" /></a>`);
  const socialHtml = socialArr.join('');

  const footerBlock = `
        <span style="border-top:1px solid ${B.border};display:block;margin-top:24px"></span>
        <span style="display:block;margin:16px 0;color:${B.text};font-size:12px;line-height:19px;font-family:${B.fontBody}">${tpl.footer_text || ''}</span>
        <span style="display:block;color:${B.textSoft};font-size:12px;font-family:${B.fontBody}">Thanks &amp; Regards,</span>
        <span style="display:block;color:${B.heading};font-size:13px;font-weight:700;margin-bottom:20px;font-family:${B.fontDisplay}">${companyName}</span>
        <span style="display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;margin:10px 0">${footerLinks}</span>
        <span style="display:block;text-align:center;margin:15px 0 8px">${socialHtml}</span>
        <span style="text-align:center;display:block;color:${B.muted};font-size:11px;margin-top:8px;font-family:${B.fontBody}">${tpl.copyright_text || ''}</span>`;

  const titleH2 = `<h2 style="font-size:20px;font-weight:700;color:${B.heading};margin:8px 0;line-height:1.35;font-family:${B.fontDisplay}">${title}</h2>`;
  const titleH3 = `<h3 style="font-size:20px;font-weight:700;color:${B.heading};margin-top:8px;line-height:1.35;font-family:${B.fontDisplay}">${title}</h3>`;
  const titleH2b = `<h2 style="font-size:20px;font-weight:700;color:${B.heading};margin-bottom:15px;line-height:1.35;font-family:${B.fontDisplay}">${title}</h2>`;
  const bd = `<span style="display:block;margin:20px 0 11px;color:${B.text};font-size:14px;line-height:24px;font-family:${B.fontBody}">${body}</span>`;

  let bodyHtml = '';

  switch (fmt) {
    case 1: // Banner + Logo + Title + Body + Button
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
    case 2: // Banner + Logo + Title + Body
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${footerBlock}</td></tr>`;
      break;
    case 3: // Banner + Title + Body + Button
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${titleH2b}${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
    case 4: // Banner + Icon + Title + Body
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}</td></tr><tr><td style="padding:0 30px 30px;text-align:left">${bd}${footerBlock}</td></tr>`;
      break;
    case 5: // Banner + Icon + Title | Body + Button
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}</td></tr><tr><td style="padding:0 30px 30px;text-align:left">${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
    case 6: // Banner + Icon + Title + Body
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}${bd}${footerBlock}</td></tr>`;
      break;
    case 7: // Logo + Title + Body + Button (no banner)
      bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
    case 8: // Title + Body + Button (minimal)
      bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0">${titleH2b}${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
    case 9: // Icon + Title | Body + Button (default)
      bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}</td></tr><tr><td style="padding:0 30px 30px;text-align:left">${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
    case 10: // Icon + Title + Body
      bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0;text-align:center">${iconImg}${titleH3}${bd}${footerBlock}</td></tr>`;
      break;
    case 11: // Title + Body
      bodyHtml = `${accentBar}<tr><td style="padding:30px 30px 0">${titleH2b}${bd}${footerBlock}</td></tr>`;
      break;
    default:
      bodyHtml = `${bannerRow}${accentBar}<tr><td style="padding:30px 30px 0">${logoImg}${titleH2}${bd}${btnHtml}${footerBlock}</td></tr>`;
      break;
  }

  const fontStyle = `<style>@import url("https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&amp;family=Plus+Jakarta+Sans:wght@400;500;700&amp;display=swap");body{font-family:${B.fontBody};width:100%!important;height:100%!important;padding:0!important;margin:0!important;background:${B.pageBg};color:${B.text};font-size:14px;line-height:1.6}table{border-collapse:collapse!important}img{-ms-interpolation-mode:bicubic}a{color:${B.cyan}}</style>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">${fontStyle}</head><body style="background-color:${B.pageBg};padding:24px 12px"><table role="presentation" style="width:100%;max-width:560px;margin:0 auto;text-align:center;background:${B.cardBg};border:1px solid ${B.border};border-radius:14px;overflow:hidden">${bodyHtml}</table></body></html>`;
}
