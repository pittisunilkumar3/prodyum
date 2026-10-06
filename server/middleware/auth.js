import jwt from 'jsonwebtoken';

const COOKIE_NAME = 'prodyum_admin_token';

export function requireAdmin(req, res, next) {
  const bearer = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  const token = req.cookies?.[COOKIE_NAME] || bearer;

  if (!token) {
    return res.status(401).json({ ok: false, error: 'Authentication required.' });
  }

  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret-change-me');
    return next();
  } catch {
    return res.status(401).json({ ok: false, error: 'Session expired. Please sign in again.' });
  }
}

export { COOKIE_NAME };
