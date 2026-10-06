const API_BASE = import.meta.env.VITE_API_URL || '/api';

export { API_BASE };
export const ADMIN_API = `${API_BASE}/admin`;

/**
 * Submit a form to the Prodyum API.
 * Falls back to localStorage if the API server is unreachable,
 * so the public site never breaks while the backend is offline.
 *
 * @param {string} endpoint   e.g. 'inquiries' | 'projects' | 'applications' | 'casting'
 * @param {object} payload    form data
 * @param {string} fallbackKey localStorage key used when offline
 * @returns {{persisted: 'server'|'local', id?: string}}
 */
export async function submitToApi(endpoint, payload, fallbackKey) {
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `API responded with ${res.status}`);
    }
    const data = await res.json();
    return { persisted: 'server', id: data.id };
  } catch {
    // Offline fallback: keep the existing localStorage behaviour
    try {
      const existing = JSON.parse(localStorage.getItem(fallbackKey) || '[]');
      const record = {
        id: `LOCAL-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...payload,
      };
      localStorage.setItem(fallbackKey, JSON.stringify([record, ...existing]));
    } catch {
      /* storage unavailable — nothing else we can do */
    }
    return { persisted: 'local' };
  }
}
