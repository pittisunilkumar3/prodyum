/**
 * Site Settings — singleton row (id = 1) holding admin-managed global config.
 * First use case: social media URLs shown as icons in the public footer.
 */
export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      id             INT PRIMARY KEY DEFAULT 1,
      facebook_link  VARCHAR(500) NOT NULL DEFAULT '',
      instagram_link VARCHAR(500) NOT NULL DEFAULT '',
      twitter_link   VARCHAR(500) NOT NULL DEFAULT '',
      linkedin_link  VARCHAR(500) NOT NULL DEFAULT '',
      youtube_link   VARCHAR(500) NOT NULL DEFAULT '',
      whatsapp_link  VARCHAR(500) NOT NULL DEFAULT '',
      updated_at     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  // Ensure the singleton row exists
  await pool.query(`INSERT IGNORE INTO site_settings (id) VALUES (1)`);
}

export async function down(pool) {
  await pool.query('DROP TABLE IF EXISTS site_settings');
}
