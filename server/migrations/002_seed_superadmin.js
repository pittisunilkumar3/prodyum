import bcrypt from 'bcryptjs';

/**
 * Seeds the first superadmin from environment variables.
 * Idempotent: INSERT IGNORE keeps an existing account untouched on re-runs.
 */
export async function up(pool) {
  const username = process.env.ADMIN_USERNAME || 'superadmin';
  const password = process.env.ADMIN_PASSWORD || 'Prodyum@2025';
  const hash = await bcrypt.hash(password, 10);

  await pool.query('INSERT IGNORE INTO admins (username, password_hash) VALUES (?, ?)', [
    username,
    hash,
  ]);

  console.log(`     ↳ superadmin account ready → "${username}" (password from ADMIN_PASSWORD env)`);
}

export async function down(pool) {
  const username = process.env.ADMIN_USERNAME || 'superadmin';
  await pool.query('DELETE FROM admins WHERE username = ?', [username]);
}
