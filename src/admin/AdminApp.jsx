import React, { useEffect, useState } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';
import { API_BASE } from '../lib/api';

export default function AdminApp() {
  const [auth, setAuth] = useState('checking'); // 'checking' | 'guest' | 'authed'
  const [user, setUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data?.user) {
          setUser(data.user);
          setAuth('authed');
        } else {
          setAuth('guest');
        }
      } catch {
        if (!cancelled) setAuth('guest');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (auth === 'checking') {
    return (
      <div className="min-h-screen bg-[#06080D] flex flex-col items-center justify-center gap-4 text-slate-400">
        <ShieldCheck className="w-8 h-8 text-cyan-accent animate-pulse" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] flex items-center gap-2">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          Verifying session
        </span>
      </div>
    );
  }

  if (auth === 'guest') {
    return (
      <AdminLogin
        onLogin={(u) => {
          setUser(u);
          setAuth('authed');
        }}
      />
    );
  }

  return (
    <AdminDashboard
      user={user}
      onLogout={() => {
        setUser(null);
        setAuth('guest');
      }}
    />
  );
}
