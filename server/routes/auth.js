import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
import { COOKIE_NAME, requireAdmin } from '../middleware/auth.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function setSessionCookie(res, token) {
  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SEVEN_DAYS_MS,
    path: '/',
  });
}

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ ok: false, error: 'Username and password are required.' });
    }

    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [username]);
    const admin = rows[0];

    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ ok: false, error: 'Invalid username or password.' });
    }

    const token = jwt.sign({ sub: admin.username, role: 'superadmin' }, JWT_SECRET, {
      expiresIn: '7d',
    });
    setSessionCookie(res, token);

    res.json({ ok: true, user: { username: admin.username, role: 'superadmin' } });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/change-password (requires session)
router.post('/change-password', requireAdmin, async (req, res, next) => {
  try {
    const { currentPassword = '', newPassword = '' } = req.body || {};
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ ok: false, error: 'Current and new password are required.' });
    }
    if (String(newPassword).length < 8) {
      return res
        .status(400)
        .json({ ok: false, error: 'New password must be at least 8 characters.' });
    }

    const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? LIMIT 1', [
      req.admin.sub,
    ]);
    const admin = rows[0];

    if (!admin || !(await bcrypt.compare(currentPassword, admin.password_hash))) {
      return res.status(401).json({ ok: false, error: 'Current password is incorrect.' });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query('UPDATE admins SET password_hash = ? WHERE id = ?', [hash, admin.id]);

    res.json({ ok: true, message: 'Password updated successfully.' });
  } catch (err) {
    next(err);
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { path: '/' });
  res.json({ ok: true });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  const token = req.cookies?.[COOKIE_NAME] || '';
  if (!token) return res.status(401).json({ ok: false, error: 'Not signed in.' });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    res.json({ ok: true, user: { username: payload.sub, role: payload.role } });
  } catch {
    res.status(401).json({ ok: false, error: 'Session expired.' });
  }
});

export default router;
