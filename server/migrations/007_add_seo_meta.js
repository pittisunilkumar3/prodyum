/**
 * SEO & Meta management (StackFood-style):
 * - seo_settings : one row per page/site + robots.txt row
 * - film_projects: per-entity meta_title / meta_description / meta_image
 */

export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS seo_settings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      page_key VARCHAR(80) NOT NULL UNIQUE,
      page_label VARCHAR(120) NOT NULL DEFAULT '',
      section_id VARCHAR(80) DEFAULT NULL,
      meta_title VARCHAR(100) DEFAULT '',
      meta_description TEXT,
      meta_keywords VARCHAR(300) DEFAULT '',
      meta_image VARCHAR(255) DEFAULT '',
      robots ENUM('index','noindex') NOT NULL DEFAULT 'index',
      robots_txt TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await pool.query(`
    INSERT IGNORE INTO seo_settings (page_key, page_label, section_id) VALUES
      ('site',        'Site Default (Home)', NULL),
      ('it-services', 'IT Services',         'services'),
      ('film-slate',  'Production Slate',    'film-slate'),
      ('casting',     'Casting Portal',      'casting'),
      ('careers',     'Careers',             'careers'),
      ('contact',     'Contact & Booking',   'contact'),
      ('robots',      'Robots.txt',          NULL)
  `);

  // Portable column-add (MySQL 8 lacks ADD COLUMN IF NOT EXISTS)
  const [cols] = await pool.query(
    `SELECT COLUMN_NAME FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'film_projects'
       AND COLUMN_NAME IN ('meta_title','meta_description','meta_image')`
  );
  const existing = new Set(cols.map((c) => c.COLUMN_NAME));
  if (!existing.has('meta_title')) {
    await pool.query("ALTER TABLE film_projects ADD COLUMN meta_title VARCHAR(100) DEFAULT ''");
  }
  if (!existing.has('meta_description')) {
    await pool.query('ALTER TABLE film_projects ADD COLUMN meta_description TEXT');
  }
  if (!existing.has('meta_image')) {
    await pool.query("ALTER TABLE film_projects ADD COLUMN meta_image VARCHAR(255) DEFAULT ''");
  }
}

export async function down(pool) {
  await pool.query(`
    ALTER TABLE film_projects
      DROP COLUMN IF EXISTS meta_title,
      DROP COLUMN IF EXISTS meta_description,
      DROP COLUMN IF EXISTS meta_image
  `);
  await pool.query('DROP TABLE IF EXISTS seo_settings');
}
