/**
 * Website Settings — adds site identity fields to the site_settings singleton.
 * Admin can change the site name, tagline and logo; the whole website
 * (navbar, footer, policy pages, login) reflects it instantly.
 */
export async function up(pool) {
  const columns = [
    ["site_name", "VARCHAR(120) NOT NULL DEFAULT 'Prodyum'"],
    ["site_tagline", "VARCHAR(200) NOT NULL DEFAULT 'IT · Media · Entertainments'"],
    ["logo_url", "VARCHAR(500) NOT NULL DEFAULT ''"],
  ];
  for (const [name, definition] of columns) {
    const [cols] = await pool.query(
      'SHOW COLUMNS FROM site_settings LIKE ?',
      [name]
    );
    if (cols.length === 0) {
      await pool.query(`ALTER TABLE site_settings ADD COLUMN ${name} ${definition} AFTER id`);
    }
  }
  // Ensure the singleton row exists
  await pool.query('INSERT IGNORE INTO site_settings (id) VALUES (1)');
}

export async function down(pool) {
  await pool.query(
    'ALTER TABLE site_settings DROP COLUMN site_name, DROP COLUMN site_tagline, DROP COLUMN logo_url'
  );
}
