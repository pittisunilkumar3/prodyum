import React, { useEffect, useState } from 'react';
import {
  KeyRound,
  Database,
  Server,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Info,
} from 'lucide-react';
import { API_BASE, ADMIN_API } from '../lib/api';

const fmtUptime = (s) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
};

export default function Settings({ user }) {
  // Change password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwBusy, setPwBusy] = useState(false);
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');

  // System info state
  const [system, setSystem] = useState(null);
  const [sysBusy, setSysBusy] = useState(true);
  const [sysError, setSysError] = useState('');

  const loadSystem = async () => {
    setSysBusy(true);
    setSysError('');
    try {
      const res = await fetch(`${ADMIN_API}/system`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load system info.');
      setSystem(data.system);
    } catch (err) {
      setSysError(err.message || 'Could not reach the API server.');
    } finally {
      setSysBusy(false);
    }
  };

  useEffect(() => {
    loadSystem();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (newPassword.length < 8) {
      setPwError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPwError('New password and confirmation do not match.');
      return;
    }

    setPwBusy(true);
    try {
      const res = await fetch(`${API_BASE}/auth/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setPwError(data.error || 'Password change failed.');
        return;
      }
      setPwSuccess('Password updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      setPwError('Could not reach the API server.');
    } finally {
      setPwBusy(false);
    }
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm placeholder:text-slate-600';

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6">
      {/* Account / Security */}
      <div className="glass-card p-5 sm:p-7 rounded-3xl border border-white/10">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="p-2.5 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-lg text-white">Account & Security</h3>
            <p className="font-jakarta text-xs text-slate-400">
              Update your superadmin credentials
            </p>
          </div>
        </div>

        <div className="mt-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
            Signed in as
          </span>
          <span className="font-jakarta text-sm text-white font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {user?.username || 'admin'}
          </span>
        </div>

        <form onSubmit={handleChangePassword} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              New Password <span className="text-slate-500 normal-case">(min 8 characters)</span>
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••"
              className={inputCls}
            />
          </div>

          {pwError && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {pwError}
            </div>
          )}
          {pwSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-jakarta text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {pwSuccess}
            </div>
          )}

          <button
            type="submit"
            disabled={pwBusy}
            className="w-full py-3 rounded-xl bg-cyan-accent hover:bg-cyan-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
          >
            {pwBusy ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Updating…</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Update Password</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* System Information */}
      <div className="glass-card p-5 sm:p-7 rounded-3xl border border-white/10">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-accent/10 border border-amber-accent/30 text-amber-accent">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg text-white">System Information</h3>
              <p className="font-jakarta text-xs text-slate-400">
                Backend & database environment
              </p>
            </div>
          </div>
          <button
            onClick={loadSystem}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${sysBusy ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {sysError && (
          <div className="mt-5 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {sysError}
          </div>
        )}

        {sysBusy && !system ? (
          <div className="mt-6 flex items-center justify-center gap-2 py-10 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading system info…
          </div>
        ) : system ? (
          <>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ['Database Host', `${system.dbHost}:${system.dbPort}`, <Database className="w-3.5 h-3.5" key="db" />],
                ['Database Name', system.dbName, null],
                ['Node.js Runtime', system.node, null],
                ['API Uptime', fmtUptime(system.uptimeSeconds), null],
                ['Migrations Applied', `${system.migrationsApplied}`, null],
                ['Total Records Stored', `${system.totalRecords}`, null],
              ].map(([label, value, icon]) => (
                <div key={label} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                    {icon}
                    {label}
                  </span>
                  <span className="font-jakarta text-sm text-white font-semibold break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 p-3.5 rounded-xl bg-amber-accent/5 border border-amber-accent/20 text-[11px] font-jakarta text-amber-200/90">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-accent" />
              <span>
                Running on <strong>local XAMPP MySQL</strong>. When you're ready to go live,
                point the <code className="font-mono">DB_*</code> variables in <code className="font-mono">.env</code> at a
                cloud MySQL host and run <code className="font-mono">npm run db:migrate</code> — no code changes needed.
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
