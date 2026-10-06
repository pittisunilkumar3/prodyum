import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { pool, ensureDatabase, DB_NAME } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

const isMigrationFile = (f) => /^\d{3}_[a-zA-Z0-9_]+\.js$/.test(f);

function listMigrationFiles() {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter(isMigrationFile)
    .sort();
}

async function loadMigration(file) {
  return import(pathToFileURL(path.join(MIGRATIONS_DIR, file)).href);
}

async function ensureTrackingTable(db) {
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
}

async function getAppliedMap(db) {
  const [rows] = await db.query('SELECT name, applied_at FROM schema_migrations');
  return new Map(rows.map((r) => [r.name, r.applied_at]));
}

/**
 * Applies all pending migrations in filename order.
 * Each migration is recorded in `schema_migrations` after it succeeds.
 * @returns {number} count of migrations applied
 */
export async function runMigrations(db, log = console.log) {
  await ensureTrackingTable(db);
  const applied = await getAppliedMap(db);
  const files = listMigrationFiles();

  let ran = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const mod = await loadMigration(file);
    log(`[migrate] Applying  ${file} …`);
    await mod.up(db);
    await db.query('INSERT INTO schema_migrations (name) VALUES (?)', [file]);
    log(`[migrate] ✓ Applied  ${file}`);
    ran++;
  }

  if (ran === 0) {
    log('[migrate] Database is up to date — no pending migrations.');
  } else {
    log(`[migrate] Done — ${ran} migration${ran === 1 ? '' : 's'} applied.`);
  }
  return ran;
}

/** Prints applied / pending status for every migration file. */
export async function migrationStatus(db, log = console.log) {
  await ensureTrackingTable(db);
  const applied = await getAppliedMap(db);
  const files = listMigrationFiles();

  log(`[migrate] Status for database "${DB_NAME}":`);
  for (const file of files) {
    const at = applied.get(file);
    log(`  ${at ? '✓ applied' : '• pending'}  ${file}${at ? `  (${at})` : ''}`);
  }
  const pending = files.filter((f) => !applied.has(f)).length;
  log(`[migrate] ${files.length - pending}/${files.length} applied, ${pending} pending.`);
}

/** Rolls back the most recently applied migration via its down(). */
export async function rollbackLast(db, log = console.log) {
  await ensureTrackingTable(db);
  const [rows] = await db.query(
    'SELECT name FROM schema_migrations ORDER BY id DESC LIMIT 1'
  );
  if (!rows.length) {
    log('[migrate] Nothing to roll back — no migrations applied.');
    return;
  }

  const file = rows[0].name;
  const mod = await loadMigration(file);
  if (typeof mod.down !== 'function') {
    log(`[migrate] ✗ ${file} has no down() — cannot roll back.`);
    return;
  }

  log(`[migrate] Rolling back ${file} …`);
  await mod.down(db);
  await db.query('DELETE FROM schema_migrations WHERE name = ?', [file]);
  log(`[migrate] ✓ Rolled back ${file}`);
}

// ---------------- CLI ----------------
// Runs only when executed directly: `node server/migrate.js [up|status|rollback]`
const invokedPath = process.argv[1] ? path.resolve(process.argv[1]) : '';
const isCli = invokedPath && import.meta.url === pathToFileURL(invokedPath).href;

if (isCli) {
  const command = (process.argv[2] || 'up').replace(/^--/, '').toLowerCase();

  try {
    await ensureDatabase();

    if (command === 'status') {
      await migrationStatus(pool);
    } else if (command === 'rollback') {
      await rollbackLast(pool);
    } else if (command === 'up') {
      await runMigrations(pool);
    } else {
      console.error(`[migrate] Unknown command "${command}". Use: up | status | rollback`);
      process.exitCode = 1;
    }

    await pool.end();
  } catch (err) {
    console.error('[migrate] Failed — is XAMPP MySQL running? Check DB_* values in .env');
    console.error('[migrate] Detail:', err.message);
    process.exit(1);
  }
}
