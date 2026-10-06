/**
 * CMS Pages — admin-editable policy/content pages (Privacy Policy, Terms, Refund…).
 * Content is authored in the admin panel with CKEditor 4 and stored as HTML.
 */
export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pages (
      id               INT AUTO_INCREMENT PRIMARY KEY,
      slug             VARCHAR(140) NOT NULL UNIQUE,
      title            VARCHAR(200) NOT NULL,
      content          LONGTEXT NOT NULL,
      meta_description VARCHAR(300) DEFAULT '',
      is_published     TINYINT(1) NOT NULL DEFAULT 1,
      created_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const defaults = [
    {
      slug: 'privacy-policy',
      title: 'Privacy Policy',
      meta_description:
        'How Prodyum Pvt. Ltd. collects, uses and safeguards your personal information.',
      content: `<h2>1. Introduction</h2><p>Prodyum Pvt. Ltd. (&ldquo;Prodyum&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains what information we collect when you visit <strong>prodyum.in</strong>, submit an enquiry, apply for a role, or register for a casting call &mdash; and how we use, store and safeguard it.</p><h2>2. Information We Collect</h2><ul><li><strong>Contact details</strong> &mdash; name, email address, phone number submitted through our forms.</li><li><strong>Project enquiries</strong> &mdash; company, budget range and project description you share with us.</li><li><strong>Career applications</strong> &mdash; résumé, portfolio links and experience details.</li><li><strong>Casting applications</strong> &mdash; photographs, showreel links, age range and performance background.</li><li><strong>Technical data</strong> &mdash; IP address, browser type and pages visited, used for analytics and security.</li></ul><h2>3. How We Use Your Information</h2><ul><li>To respond to enquiries and project requests.</li><li>To evaluate applications for employment and casting opportunities.</li><li>To send service-related and (with consent) marketing communications.</li><li>To improve our website, services and customer experience.</li><li>To comply with legal and regulatory obligations in India.</li></ul><h2>4. Data Sharing</h2><p>We do <strong>not</strong> sell or rent your personal data. Information is shared only with trusted service providers (hosting, email delivery) under contract, or where required by law.</p><h2>5. Data Retention &amp; Security</h2><p>Enquiries and applications are retained only as long as needed for the purposes above. We apply industry-standard measures (encrypted transport, access controls) to protect your data.</p><h2>6. Your Rights</h2><p>You may request access to, correction of, or deletion of your personal data at any time by writing to our contact address listed on this site.</p><h2>7. Changes to This Policy</h2><p>We may update this policy from time to time. The latest version is always published on this page.</p><h2>8. Contact</h2><p>Prodyum Pvt. Ltd., Kukatpally, Hyderabad &mdash; 500072, Telangana, India.</p>`,
    },
    {
      slug: 'terms-conditions',
      title: 'Terms & Conditions',
      meta_description:
        'Terms governing the use of the Prodyum website and engagement of our services.',
      content: `<h2>1. Acceptance of Terms</h2><p>By accessing <strong>prodyum.in</strong> you agree to these Terms &amp; Conditions. If you do not agree, please discontinue use of the site.</p><h2>2. Services</h2><p>Prodyum operates two divisions: (a) IT &amp; Creative Services &mdash; web development, marketing, design; and (b) Entertainments &mdash; film and content production. Details of any engagement are governed by a separate written agreement or Statement of Work.</p><h2>3. Intellectual Property</h2><p>All site content &mdash; text, graphics, logos, film artwork and showreels &mdash; is the property of Prodyum Pvt. Ltd. or its licensors and may not be reproduced without written permission.</p><h2>4. Submissions</h2><p>When you submit an enquiry, application or casting entry you confirm the information is accurate and that you own the rights to the materials you share (including photographs and showreels).</p><h2>5. Quotes &amp; Payments</h2><p>Project quotes are valid for 15 days unless stated otherwise. Payment schedules follow the signed agreement. Applicable taxes are extra as per Indian law.</p><h2>6. Limitation of Liability</h2><p>The website is provided &ldquo;as is&rdquo;. Prodyum is not liable for indirect or consequential damages arising from the use of this site.</p><h2>7. Governing Law</h2><p>These terms are governed by the laws of India; courts of Hyderabad, Telangana have exclusive jurisdiction.</p>`,
    },
    {
      slug: 'refund-policy',
      title: 'Refund & Cancellation Policy',
      meta_description:
        'Refund and cancellation terms for Prodyum services and engagements.',
      content: `<h2>1. Service Engagements</h2><p>Project cancellations must be sent in writing. Work completed up to the cancellation date is billable; any unearned advance is refunded within <strong>14 business days</strong>.</p><h2>2. Retainers &amp; Subscriptions</h2><p>Monthly retainers (marketing, SEO, maintenance) may be cancelled with 30 days&rsquo; notice. Paid months are non-refundable pro-rata unless agreed otherwise.</p><h2>3. Casting &amp; Events</h2><p>Fees for casting registrations or event participation are refundable only if the event is cancelled by Prodyum.</p><h2>4. How Refunds Are Processed</h2><p>Approved refunds are returned via the original payment method within 14 business days of approval.</p><h2>5. Contact</h2><p>For refund questions, reach us through the contact details on this site with your invoice or registration reference.</p>`,
    },
  ];

  for (const p of defaults) {
    await pool.query(
      `INSERT INTO pages (slug, title, content, meta_description)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE slug = slug`, // keep admin edits on re-run
      [p.slug, p.title, p.content, p.meta_description]
    );
  }
}

export async function down(pool) {
  await pool.query('DROP TABLE IF EXISTS pages');
}
