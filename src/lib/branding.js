import { useEffect, useState } from 'react';
import { API_BASE } from './api';

/**
 * Site branding (Admin → Settings → Website Settings).
 * One shared fetch for the whole app: navbar, footer, policy pages and
 * login screen all render the admin-managed site name, tagline and logo.
 *
 * `setBrandingCache` lets the admin panel push updates instantly
 * (no reload needed after saving).
 */

const DEFAULTS = {
  site_name: 'ProDyum',
  site_tagline: 'IT · Media · Entertainments',
  logo_url: '',
};

let cache = null;
let inflight = null;
const listeners = new Set();

export function setBrandingCache(data) {
  cache = data || DEFAULTS;
  listeners.forEach((listener) => listener(cache));
}

export function useBranding() {
  const [settings, setSettings] = useState(cache);

  useEffect(() => {
    listeners.add(setSettings);
    if (!cache && !inflight) {
      inflight = fetch(`${API_BASE}/site-settings`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok) setBrandingCache(data.data);
        })
        .catch(() => {
          /* offline → defaults are used */
        })
        .finally(() => {
          inflight = null;
        });
    }
    return () => listeners.delete(setSettings);
  }, []);

  return settings || DEFAULTS;
}
