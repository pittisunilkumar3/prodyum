import mysql from 'mysql2/promise';

export const DB_CONFIG = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};

export const DB_NAME = process.env.DB_NAME || 'prodyum';

export const pool = mysql.createPool({
  ...DB_CONFIG,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true, // return DATETIME as readable strings
});

/**
 * Creates the database itself if it doesn't exist (XAMPP-friendly:
 * no manual phpMyAdmin setup needed). Tables are managed by migrations.
 */
export async function ensureDatabase() {
  const bootstrap = await mysql.createConnection(DB_CONFIG);
  await bootstrap.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
  );
  await bootstrap.end();
}
