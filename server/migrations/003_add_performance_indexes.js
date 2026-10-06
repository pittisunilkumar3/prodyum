/**
 * Performance indexes added after launch:
 * - created_at: inbox listing sorts by newest first
 * - status:     status-filtered queries (new/reviewed/contacted/archived)
 */

const INDEXES = [
  ['inquiries', 'idx_inquiries_created_at', 'created_at'],
  ['inquiries', 'idx_inquiries_status', 'status'],
  ['project_requests', 'idx_projects_created_at', 'created_at'],
  ['project_requests', 'idx_projects_status', 'status'],
  ['career_applications', 'idx_careers_created_at', 'created_at'],
  ['career_applications', 'idx_careers_status', 'status'],
  ['casting_applications', 'idx_casting_created_at', 'created_at'],
  ['casting_applications', 'idx_casting_status', 'status'],
];

export async function up(pool) {
  for (const [table, index, column] of INDEXES) {
    await pool.query(`CREATE INDEX ${index} ON ${table} (${column})`);
  }
}

export async function down(pool) {
  // Reverse order for tidy rollback
  for (const [table, index] of [...INDEXES].reverse()) {
    await pool.query(`DROP INDEX ${index} ON ${table}`);
  }
}
