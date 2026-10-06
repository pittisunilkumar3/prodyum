/**
 * Email (SMTP) settings — singleton configuration row written from the
 * admin console. The SMTP password is stored AES-256-GCM encrypted
 * (see server/lib/crypto.js), never in plain text.
 */
export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_settings (
      id TINYINT UNSIGNED PRIMARY KEY,
      smtp_host VARCHAR(255) NOT NULL,
      smtp_port INT NOT NULL DEFAULT 587,
      smtp_secure TINYINT(1) NOT NULL DEFAULT 0,
      smtp_user VARCHAR(255) NOT NULL,
      smtp_password_enc TEXT NOT NULL,
      from_name VARCHAR(120) DEFAULT NULL,
      from_email VARCHAR(200) DEFAULT NULL,
      reply_to VARCHAR(200) DEFAULT NULL,
      enabled TINYINT(1) NOT NULL DEFAULT 1,
      last_tested_at DATETIME DEFAULT NULL,
      last_test_status VARCHAR(20) DEFAULT NULL,
      last_test_message VARCHAR(500) DEFAULT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

export async function down(pool) {
  await pool.query('DROP TABLE IF EXISTS email_settings');
}
