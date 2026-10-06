import { Router } from 'express';
import { pool } from '../db.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();
router.use(requireAdmin);

const STATUSES = ['new', 'reviewed', 'contacted', 'archived'];

const RESOURCES = {
  inquiries: {
    table: 'inquiries',
    cols: [
      'id', 'category', 'category_name', 'budget_tier', 'name', 'email', 'phone',
      'company', 'timeline', 'message', 'status', 'created_at',
    ],
    search: ['name', 'email', 'phone', 'company', 'message'],
  },
  projects: {
    table: 'project_requests',
    cols: [
      'id', 'vertical', 'vertical_name', 'name', 'email', 'phone',
      'service', 'timeline', 'details', 'status', 'created_at',
    ],
    search: ['name', 'email', 'phone', 'service', 'details'],
  },
  careers: {
    table: 'career_applications',
    cols: [
      'id', 'job_id', 'job_title', 'vertical', 'name', 'email', 'phone',
      'portfolio', 'note', 'status', 'created_at',
    ],
    search: ['name', 'email', 'phone', 'job_title', 'portfolio', 'note'],
  },
  casting: {
    table: 'casting_applications',
    cols: [
      'id', 'full_name', 'email', 'phone', 'city', 'role_category', 'portfolio_url',
      'experience', 'headshot_name', 'headshot_uploaded', 'bio', 'status', 'created_at',
    ],
    search: ['full_name', 'email', 'phone', 'city', 'role_category', 'experience', 'bio'],
  },
};

const getResource = (key) => RESOURCES[key] || null;

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM inquiries)                                  AS inquiries_total,
        (SELECT COUNT(*) FROM inquiries WHERE status = 'new')             AS inquiries_new,
        (SELECT COUNT(*) FROM inquiries WHERE created_at >= CURDATE())    AS inquiries_today,
        (SELECT COUNT(*) FROM project_requests)                           AS projects_total,
        (SELECT COUNT(*) FROM project_requests WHERE status = 'new')      AS projects_new,
        (SELECT COUNT(*) FROM project_requests WHERE created_at >= CURDATE()) AS projects_today,
        (SELECT COUNT(*) FROM career_applications)                        AS careers_total,
        (SELECT COUNT(*) FROM career_applications WHERE status = 'new')   AS careers_new,
        (SELECT COUNT(*) FROM career_applications WHERE created_at >= CURDATE()) AS careers_today,
        (SELECT COUNT(*) FROM casting_applications)                       AS casting_total,
        (SELECT COUNT(*) FROM casting_applications WHERE status = 'new')  AS casting_new,
        (SELECT COUNT(*) FROM casting_applications WHERE created_at >= CURDATE()) AS casting_today
    `);

    const [weekRows] = await pool.query(`
      SELECT SUM(c) AS week_total FROM (
        (SELECT COUNT(*) AS c FROM inquiries WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY))
        UNION ALL
        (SELECT COUNT(*) AS c FROM project_requests WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY))
        UNION ALL
        (SELECT COUNT(*) AS c FROM career_applications WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY))
        UNION ALL
        (SELECT COUNT(*) AS c FROM casting_applications WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY))
      ) AS t
    `);

    const r = rows[0];
    const stats = {};
    for (const key of ['inquiries', 'projects', 'careers', 'casting']) {
      stats[key] = {
        total: Number(r[`${key}_total`] || 0),
        new: Number(r[`${key}_new`] || 0),
        today: Number(r[`${key}_today`] || 0),
      };
    }

    res.json({ ok: true, stats, weekTotal: Number(weekRows[0]?.week_total || 0) });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/recent — latest submissions across all channels (for Dashboard feed)
router.get('/recent', async (req, res, next) => {
  try {
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 8, 1), 25);
    const [rows] = await pool.query(`
      (SELECT 'inquiries' AS kind, id, name AS person,
              IFNULL(NULLIF(category_name, ''), 'Contact Inquiry') AS detail, status, created_at
         FROM inquiries)
      UNION ALL
      (SELECT 'projects', id, name,
              IFNULL(NULLIF(service, ''), 'Project Request'), status, created_at
         FROM project_requests)
      UNION ALL
      (SELECT 'careers', id, name,
              IFNULL(NULLIF(job_title, ''), 'Job Application'), status, created_at
         FROM career_applications)
      UNION ALL
      (SELECT 'casting', id, full_name,
              IFNULL(NULLIF(role_category, ''), 'Casting Audition'), status, created_at
         FROM casting_applications)
      ORDER BY created_at DESC
      LIMIT ${limit}
    `);
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/system — environment & storage info (for Settings page)
router.get('/system', async (req, res, next) => {
  try {
    const [[mig]] = await pool.query('SELECT COUNT(*) AS c FROM schema_migrations');
    const [[t]] = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM inquiries) +
        (SELECT COUNT(*) FROM project_requests) +
        (SELECT COUNT(*) FROM career_applications) +
        (SELECT COUNT(*) FROM casting_applications) AS total_records
    `);
    res.json({
      ok: true,
      system: {
        dbHost: process.env.DB_HOST || '127.0.0.1',
        dbPort: process.env.DB_PORT || '3306',
        dbName: process.env.DB_NAME || 'prodyum',
        node: process.version,
        uptimeSeconds: Math.floor(process.uptime()),
        migrationsApplied: Number(mig.c),
        totalRecords: Number(t.total_records),
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/:resource/export  (CSV download)
router.get('/:resource/export', async (req, res, next) => {
  const r = getResource(req.params.resource);
  if (!r) return res.status(404).json({ ok: false, error: 'Unknown resource.' });

  try {
    const [rows] = await pool.query(
      `SELECT ${r.cols.join(', ')} FROM ${r.table} ORDER BY created_at DESC`
    );
    const esc = (v) => {
      if (v === null || v === undefined) return '';
      const s = String(v);
      return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      r.cols.join(','),
      ...rows.map((row) => r.cols.map((c) => esc(row[c])).join(',')),
    ].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="prodyum-${req.params.resource}-${new Date()
        .toISOString()
        .slice(0, 10)}.csv"`
    );
    res.send('\ufeff' + csv); // BOM so Excel opens UTF-8 correctly
  } catch (err) {
    next(err);
  }
});

// GET /api/admin/:resource?status=&q=&limit=
router.get('/:resource', async (req, res, next) => {
  const r = getResource(req.params.resource);
  if (!r) return res.status(404).json({ ok: false, error: 'Unknown resource.' });

  try {
    const { status = '', q = '' } = req.query;
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 200, 1), 500);

    const where = [];
    const params = [];
    if (status && STATUSES.includes(status)) {
      where.push('status = ?');
      params.push(status);
    }
    if (q && q.trim()) {
      where.push('(' + r.search.map((c) => `${c} LIKE ?`).join(' OR ') + ')');
      for (let i = 0; i < r.search.length; i++) params.push(`%${q.trim()}%`);
    }

    const sql = `SELECT ${r.cols.join(', ')} FROM ${r.table}${
      where.length ? ' WHERE ' + where.join(' AND ') : ''
    } ORDER BY created_at DESC LIMIT ${limit}`;

    const [rows] = await pool.query(sql, params);
    res.json({ ok: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/:resource/:id  { status }
router.patch('/:resource/:id', async (req, res, next) => {
  const r = getResource(req.params.resource);
  if (!r) return res.status(404).json({ ok: false, error: 'Unknown resource.' });

  const { status } = req.body || {};
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ ok: false, error: 'Invalid status value.' });
  }

  try {
    const [result] = await pool.query(`UPDATE ${r.table} SET status = ? WHERE id = ?`, [
      status,
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Record not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/:resource/:id
router.delete('/:resource/:id', async (req, res, next) => {
  const r = getResource(req.params.resource);
  if (!r) return res.status(404).json({ ok: false, error: 'Unknown resource.' });

  try {
    const [result] = await pool.query(`DELETE FROM ${r.table} WHERE id = ?`, [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, error: 'Record not found.' });
    }
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
