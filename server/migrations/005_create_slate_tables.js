/**
 * CMS tables for the Production Slate:
 * - film_categories : admin-managed buckets shown as public filter pills
 * - film_projects   : admin-managed films/series (replaces hardcoded slate)
 */

export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS film_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      slug VARCHAR(100) NOT NULL UNIQUE,
      priority INT NOT NULL DEFAULT 100,
      published TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS film_projects (
      id VARCHAR(80) PRIMARY KEY,
      category_id INT DEFAULT NULL,
      title VARCHAR(200) NOT NULL,
      type VARCHAR(120) DEFAULT '',
      genre VARCHAR(120) DEFAULT '',
      director VARCHAR(150) DEFAULT '',
      release_date VARCHAR(120) DEFAULT '',
      aspect_ratio VARCHAR(80) DEFAULT '',
      resolution VARCHAR(120) DEFAULT '',
      audio VARCHAR(120) DEFAULT '',
      status VARCHAR(120) DEFAULT '',
      timecode VARCHAR(40) DEFAULT '',
      synopsis TEXT,
      cast_info VARCHAR(300) DEFAULT '',
      poster_gradient VARCHAR(300) DEFAULT 'from-amber-900/60 via-obsidian-surface to-black',
      priority INT NOT NULL DEFAULT 100,
      published TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES film_categories(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await pool.query(
    'CREATE INDEX idx_film_projects_pub ON film_projects (published, priority)'
  );
  await pool.query('CREATE INDEX idx_film_projects_cat ON film_projects (category_id)');
}

export async function down(pool) {
  await pool.query('DROP TABLE IF EXISTS film_projects');
  await pool.query('DROP TABLE IF EXISTS film_categories');
}
