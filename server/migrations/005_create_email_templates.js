/**
 * Email templates — StackFood/CINICA-style structured templates.
 * The admin designs a template from structured fields (title, rich-text body,
 * format layout, logo/banner images, button, footer, social links) and the
 * server generates the full email HTML (see server/lib/emailRenderer.js).
 */
export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_templates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      template_name VARCHAR(100) NOT NULL UNIQUE,
      subject VARCHAR(255) NOT NULL DEFAULT '',
      body TEXT NOT NULL,
      email_template TINYINT NOT NULL DEFAULT 1,
      logo_url VARCHAR(500) DEFAULT '',
      icon_url VARCHAR(500) DEFAULT '',
      banner_url VARCHAR(500) DEFAULT '',
      button_name VARCHAR(150) DEFAULT '',
      button_url VARCHAR(500) DEFAULT '',
      attachment_url VARCHAR(500) DEFAULT '',
      footer_text TEXT,
      copyright_text VARCHAR(300) DEFAULT '',
      privacy_link VARCHAR(500) DEFAULT '',
      terms_link VARCHAR(500) DEFAULT '',
      contact_link VARCHAR(500) DEFAULT '',
      facebook_link VARCHAR(500) DEFAULT '',
      instagram_link VARCHAR(500) DEFAULT '',
      twitter_link VARCHAR(500) DEFAULT '',
      linkedin_link VARCHAR(500) DEFAULT '',
      pinterest_link VARCHAR(500) DEFAULT '',
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  // Seed the Prodyum template set (idempotent)
  const defaults = [
    // ---- Customer mail templates ----
    {
      template_name: 'inquiry_acknowledgement',
      subject: 'Thank you for contacting Prodyum Pvt. Ltd.',
      body: `<p>Dear <strong>{{name}}</strong>,</p>
<p>Thank you for reaching out to <strong>Prodyum Pvt. Ltd.</strong> Our <strong>{{category_name}}</strong> desk at Kukatpally, Hyderabad has received your inquiry and the leadership team is reviewing it.</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Company:</strong> {{company}}</p>
<p style="margin:0 0 6px;"><strong>Division:</strong> {{category_name}}</p>
<p style="margin:0;"><strong>Your message:</strong> {{message}}</p>
</div>
<p>We typically respond within <strong>24 hours</strong>. For anything urgent, write to contact@prodyum.in.</p>`,
      button_name: 'Visit prodyum.in',
      button_url: 'https://prodyum.in',
      email_template: 1,
    },
    {
      template_name: 'project_request_received',
      subject: 'Your project request has been received — Prodyum',
      body: `<p>Dear <strong>{{name}}</strong>,</p>
<p>Your request for <strong>{{service}}</strong> has been logged with our executive desk. Srikanth Singam &amp; the senior team will evaluate the scope and contact you within <strong>24 hours</strong>.</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Service:</strong> {{service}}</p>
<p style="margin:0 0 6px;"><strong>Target timeline:</strong> {{timeline}}</p>
</div>
<p>Meanwhile, explore our recent work at prodyum.in.</p>`,
      button_name: 'Explore Our Work',
      button_url: 'https://prodyum.in',
      email_template: 1,
    },
    {
      template_name: 'career_application_received',
      subject: 'Application received — {{job_title}} at Prodyum',
      body: `<p>Dear <strong>{{name}}</strong>,</p>
<p>Thank you for applying for the <strong>{{job_title}}</strong> position ({{vertical}} division). Our HR team reviews every application and will reach out within <strong>48 hours</strong> if your profile matches.</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0;"><strong>Position:</strong> {{job_title}}</p>
</div>
<p>— Team Prodyum, Kukatpally Studio, Hyderabad</p>`,
      button_name: '',
      button_url: '',
      email_template: 9,
    },
    {
      template_name: 'casting_audition_received',
      subject: 'Audition submission received — Prodyum Entertainments',
      body: `<p>Dear <strong>{{full_name}}</strong>,</p>
<p>Your audition package for <strong>{{role_category}}</strong> has entered the Prodyum Casting registry. Submissions are reviewed weekly by Srikanth Singam &amp; the direction team.</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Role category:</strong> {{role_category}}</p>
<p style="margin:0 0 6px;"><strong>Base:</strong> {{city}}</p>
</div>
<p>Shortlisted applicants receive a formal audition call slip for a screen test at our Kukatpally studio.</p>`,
      button_name: '',
      button_url: '',
      email_template: 4,
    },
    // ---- Admin mail templates ----
    {
      template_name: 'admin_new_inquiry',
      subject: '🔔 New inquiry from {{name}} — Prodyum Admin',
      body: `<p>New contact inquiry received on prodyum.in:</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Name:</strong> {{name}}</p>
<p style="margin:0 0 6px;"><strong>Email:</strong> {{email}}</p>
<p style="margin:0 0 6px;"><strong>Phone:</strong> {{phone}}</p>
<p style="margin:0 0 6px;"><strong>Company:</strong> {{company}}</p>
<p style="margin:0 0 6px;"><strong>Budget tier:</strong> {{budget_tier}}</p>
<p style="margin:0;"><strong>Message:</strong> {{message}}</p>
</div>
<p>Open the admin console to manage this lead.</p>`,
      button_name: 'Open Admin Console',
      button_url: 'https://prodyum.in/admin',
      email_template: 8,
    },
    {
      template_name: 'admin_new_project',
      subject: '🔔 New project request — {{service}}',
      body: `<p>New "Initiate Project" request received:</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Name:</strong> {{name}}</p>
<p style="margin:0 0 6px;"><strong>Email:</strong> {{email}}</p>
<p style="margin:0 0 6px;"><strong>Phone:</strong> {{phone}}</p>
<p style="margin:0 0 6px;"><strong>Service:</strong> {{service}}</p>
<p style="margin:0 0 6px;"><strong>Timeline:</strong> {{timeline}}</p>
<p style="margin:0;"><strong>Scope:</strong> {{details}}</p>
</div>`,
      button_name: 'Open Admin Console',
      button_url: 'https://prodyum.in/admin',
      email_template: 8,
    },
    {
      template_name: 'admin_new_career',
      subject: '🔔 New career application — {{job_title}}',
      body: `<p>New career application received:</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Name:</strong> {{name}}</p>
<p style="margin:0 0 6px;"><strong>Email:</strong> {{email}}</p>
<p style="margin:0 0 6px;"><strong>Phone:</strong> {{phone}}</p>
<p style="margin:0 0 6px;"><strong>Position:</strong> {{job_title}}</p>
<p style="margin:0;"><strong>Portfolio:</strong> {{portfolio}}</p>
</div>`,
      button_name: 'Open Admin Console',
      button_url: 'https://prodyum.in/admin',
      email_template: 8,
    },
    {
      template_name: 'admin_new_casting',
      subject: '🔔 New casting audition — {{role_category}}',
      body: `<p>New casting audition received:</p>
<div style="background:#121826;border-left:3px solid #00F0FF;border-radius:8px;padding:16px 20px;margin:18px 0;text-align:left;color:#CBD5E1;font-size:13px;line-height:22px;">
<p style="margin:0 0 6px;"><strong>Name:</strong> {{full_name}}</p>
<p style="margin:0 0 6px;"><strong>Email:</strong> {{email}}</p>
<p style="margin:0 0 6px;"><strong>Phone:</strong> {{phone}}</p>
<p style="margin:0 0 6px;"><strong>City:</strong> {{city}}</p>
<p style="margin:0 0 6px;"><strong>Role:</strong> {{role_category}}</p>
<p style="margin:0;"><strong>Experience:</strong> {{experience}}</p>
</div>`,
      button_name: 'Open Admin Console',
      button_url: 'https://prodyum.in/admin',
      email_template: 8,
    },
  ];

  for (const t of defaults) {
    await pool.query(
      `INSERT IGNORE INTO email_templates
        (template_name, subject, body, email_template, button_name, button_url,
         footer_text, copyright_text)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        t.template_name,
        t.subject,
        t.body,
        t.email_template,
        t.button_name,
        t.button_url,
        'Please contact us for any queries, we are always happy to help.',
        '© ' + new Date().getFullYear() + ' Prodyum Pvt. Ltd. All rights reserved.',
      ]
    );
  }
}

export async function down(pool) {
  await pool.query('DROP TABLE IF EXISTS email_templates');
}
