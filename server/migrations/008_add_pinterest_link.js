/** Adds the Pinterest social link to email templates (StackFood parity). */
export async function up(pool) {
  const [cols] = await pool.query("SHOW COLUMNS FROM email_templates LIKE 'pinterest_link'");
  if (cols.length === 0) {
    await pool.query(
      "ALTER TABLE email_templates ADD COLUMN pinterest_link VARCHAR(500) DEFAULT '' AFTER linkedin_link"
    );
  }
}

export async function down(pool) {
  await pool.query('ALTER TABLE email_templates DROP COLUMN pinterest_link');
}
