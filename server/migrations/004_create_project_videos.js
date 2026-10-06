/**
 * Videos for the Production Slate.
 * Admins can attach YouTube/Vimeo links or uploaded video files to any
 * film project. `priority` controls public display order (1 = shown first).
 */

export async function up(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS project_videos (
      id VARCHAR(60) PRIMARY KEY,
      project_id VARCHAR(80) NOT NULL,
      title VARCHAR(200) DEFAULT '',
      url VARCHAR(600) DEFAULT NULL,
      file_path VARCHAR(400) DEFAULT NULL,
      source ENUM('link','upload') NOT NULL DEFAULT 'link',
      priority INT NOT NULL DEFAULT 100,
      published TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);

  await pool.query(
    'CREATE INDEX idx_project_videos_lookup ON project_videos (project_id, priority)'
  );
}

export async function down(pool) {
  await pool.query('DROP TABLE IF EXISTS project_videos');
}
