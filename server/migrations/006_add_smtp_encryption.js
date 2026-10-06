/** Adds the encryption selector (tls | ssl | none) to the SMTP settings row. */
export async function up(pool) {
  const [cols] = await pool.query("SHOW COLUMNS FROM email_settings LIKE 'smtp_encryption'");
  if (cols.length === 0) {
    await pool.query(
      "ALTER TABLE email_settings ADD COLUMN smtp_encryption VARCHAR(10) NOT NULL DEFAULT 'tls' AFTER smtp_port"
    );
  }
}

export async function down(pool) {
  await pool.query('ALTER TABLE email_settings DROP COLUMN smtp_encryption');
}
