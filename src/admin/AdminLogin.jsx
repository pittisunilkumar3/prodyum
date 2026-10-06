import React, { useState } from 'react';
import { ShieldCheck, Lock, User, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { API_BASE } from '../lib/api';

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setError(data.error || 'Sign in failed. Please try again.');
        return;
      }
      onLogin(data.user);
    } catch {
      setError('Could not reach the API server. Is `npm run server` running?');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        {/* Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/15 flex items-center justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-7 h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 12L85 48L50 84L15 48Z" stroke="#00F0FF" strokeWidth="6" strokeLinejoin="round" opacity="0.9" />
              <polygon points="50,30 76,75 24,75" fill="#FFB800" fillOpacity="0.75" />
            </svg>
          </div>
          <h1 className="font-syne font-extrabold text-2xl tracking-tight">Superadmin Console</h1>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-1.5">
            Prodyum Pvt. Ltd. // Restricted Area
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="glass-modal rounded-3xl p-6 sm:p-8 border border-white/15 space-y-4"
        >
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="superadmin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-cyan-accent hover:bg-cyan-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.35)] transition-all"
          >
            {busy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating…</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-slate-500 pt-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            JWT httpOnly session • 7 day expiry
          </p>
        </form>

        <a
          href="/"
          className="block text-center mt-6 font-jakarta text-xs text-slate-500 hover:text-white transition-colors"
        >
          ← Back to prodyum.in
        </a>
      </div>
    </div>
  );
}
