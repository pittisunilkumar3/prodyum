import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Info, Trash2, ShieldCheck, Mail } from 'lucide-react';
import { ADMIN_API } from '../lib/api';

const inputCls =
  'w-full px-4 py-2.5 rounded-lg bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm placeholder:text-slate-600';
const labelCls = 'block text-[13px] font-semibold text-slate-300 mb-1.5';

const fmtWhen = (v) => {
  if (!v) return '—';
  try {
    return new Date(v).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST';
  } catch {
    return v;
  }
};

export default function EmailSettings() {
  const [form, setForm] = useState({
    smtpHost: '',
    smtpPort: '587',
    smtpEncryption: 'tls',
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: 'Prodyum Pvt. Ltd.',
  });
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const [saveBusy, setSaveBusy] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveOk, setSaveOk] = useState('');

  const [testBusy, setTestBusy] = useState(false);
  const [testResult, setTestResult] = useState(null); // { type, text }

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  // Port auto-suggest when the encryption type changes
  const changeEncryption = (enc) => {
    setForm((f) => {
      const typical = { tls: '587', ssl: '465', none: '25' };
      const wasTypical = Object.values(typical).includes(String(f.smtpPort));
      return {
        ...f,
        smtpEncryption: enc,
        smtpPort: wasTypical ? typical[enc] : f.smtpPort,
      };
    });
  };

  const load = async () => {
    setLoading(true);
    setLoadError('');
    try {
      const res = await fetch(`${ADMIN_API}/email-settings`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load email settings.');
      setSettings(data.settings);
      if (data.settings.configured) {
        const s = data.settings;
        setForm((f) => ({
          ...f,
          smtpHost: s.smtpHost,
          smtpPort: String(s.smtpPort),
          smtpEncryption: s.smtpEncryption || 'tls',
          smtpUser: s.smtpUser,
          fromName: s.fromName || f.fromName,
          fromEmail: s.fromEmail || '',
          smtpPassword: '', // never echoed back
        }));
      }
    } catch (err) {
      setLoadError(err.message || 'Could not reach the API server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    for (const field of ['smtpHost', 'smtpPort', 'smtpUser', 'fromEmail']) {
      if (!String(form[field]).trim()) {
        setSaveError(`${field.replace('smtp', 'SMTP ').replace('fromEmail', 'From email')} is required.`);
        return;
      }
    }
    if (!form.smtpPassword && !settings?.hasPassword) {
      setSaveError('Password is required for first-time setup.');
      return;
    }
    setSaveBusy(true);
    setSaveError('');
    setSaveOk('');
    try {
      const res = await fetch(`${ADMIN_API}/email-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Save failed.');
      setSettings(data.settings);
      setForm((f) => ({ ...f, smtpPassword: '' }));
      setSaveOk('SMTP configuration saved successfully!');
    } catch (err) {
      setSaveError(err.message || 'Could not reach the API server.');
    } finally {
      setSaveBusy(false);
    }
  };

  const handleTestEmail = async () => {
    const to = window.prompt('Enter email address to send test email:');
    if (!to) return;
    setTestBusy(true);
    setTestResult(null);
    try {
      const res = await fetch(`${ADMIN_API}/email-settings/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ to: to.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Test failed.');
      setTestResult({ type: 'success', text: `Test email sent successfully to ${to.trim()}!` });
      load(); // refresh last-test badge
    } catch (err) {
      setTestResult({ type: 'error', text: err.message || 'Failed to send test email.' });
    } finally {
      setTestBusy(false);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('Remove the saved SMTP settings? The stored password will be deleted permanently.')) return;
    try {
      await fetch(`${ADMIN_API}/email-settings`, { method: 'DELETE', credentials: 'include' });
      setForm({
        smtpHost: '',
        smtpPort: '587',
        smtpEncryption: 'tls',
        smtpUser: '',
        smtpPassword: '',
        fromEmail: '',
        fromName: 'Prodyum Pvt. Ltd.',
      });
      setSettings({ configured: false });
      setTestResult(null);
      setSaveOk('');
      setSaveError('');
    } catch {
      /* ignore */
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 py-24 font-mono text-xs text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading email configuration…
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* ---- SMTP Configuration Card (CINICA-style layout) ---- */}
      <div className="glass-card rounded-2xl border border-white/10 p-6 sm:p-7 max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3.5 pb-4 mb-6 border-b border-white/[0.08]">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-accent to-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.35)]">
            <Mail className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-lg text-white leading-tight">SMTP Email Configuration</h3>
            <p className="font-jakarta text-[13px] text-slate-500">Configure email sending settings</p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          {/* Host | Port */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>SMTP Host <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="smtp.gmail.com"
                value={form.smtpHost}
                onChange={(e) => set('smtpHost', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Port <span className="text-red-400">*</span></label>
              <input
                type="number"
                placeholder="587"
                value={form.smtpPort}
                onChange={(e) => set('smtpPort', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Encryption */}
          <div className="mb-4">
            <label className={labelCls}>Encryption</label>
            <select
              value={form.smtpEncryption}
              onChange={(e) => changeEncryption(e.target.value)}
              className={`${inputCls} cursor-pointer appearance-none`}
            >
              <option value="tls" className="bg-[#0C101A]">TLS (STARTTLS — port 587)</option>
              <option value="ssl" className="bg-[#0C101A]">SSL (implicit — port 465)</option>
              <option value="none" className="bg-[#0C101A]">None (no encryption)</option>
            </select>
          </div>

          {/* Username | Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Username <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="your-email@gmail.com"
                value={form.smtpUser}
                onChange={(e) => set('smtpUser', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>
                Password{' '}
                {settings?.hasPassword ? (
                  <span className="text-[11px] font-normal text-emerald-400 normal-case">(saved — leave blank to keep)</span>
                ) : (
                  <span className="text-red-400">*</span>
                )}
              </label>
              <input
                type="password"
                placeholder="App password"
                value={form.smtpPassword}
                onChange={(e) => set('smtpPassword', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* From Email | From Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>From Email <span className="text-red-400">*</span></label>
              <input
                type="email"
                placeholder="noreply@prodyum.in"
                value={form.fromEmail}
                onChange={(e) => set('fromEmail', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>From Name</label>
              <input
                type="text"
                placeholder="Prodyum Pvt. Ltd."
                value={form.fromName}
                onChange={(e) => set('fromName', e.target.value)}
                className={inputCls}
              />
            </div>
          </div>

          {/* Gmail info box */}
          <div className="flex items-start gap-2 p-3.5 rounded-xl bg-cyan-accent/[0.07] border border-cyan-accent/20 mb-6">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-cyan-accent" />
            <p className="text-xs font-jakarta text-cyan-200/90 leading-relaxed">
              <strong>Gmail Users:</strong> Use an App Password (not your regular password). Generate at
              Google Account → Security → 2-Step Verification → App Passwords.
            </p>
          </div>

          {/* Messages */}
          {loadError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {loadError}
            </div>
          )}
          {saveError && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {saveError}
            </div>
          )}
          {saveOk && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-jakarta text-emerald-300 mb-4">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              {saveOk}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={saveBusy}
              className="px-6 py-2.5 rounded-lg bg-cyan-accent hover:bg-cyan-400 disabled:opacity-50 text-black font-jakarta font-semibold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
            >
              {saveBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
              Save SMTP Settings
            </button>
            <button
              type="button"
              onClick={handleTestEmail}
              disabled={testBusy}
              className="px-5 py-2.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 disabled:opacity-50 text-slate-300 hover:text-white font-jakarta font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              {testBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              Send Test Email
            </button>
            {settings?.configured && (
              <button
                type="button"
                onClick={handleRemove}
                className="p-2.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors ml-auto"
                title="Remove saved settings"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* ---- Status strip ---- */}
      <div className="flex flex-wrap items-center gap-3 max-w-3xl">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono uppercase ${
            settings?.configured
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}
        >
          {settings?.configured ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" /> Configured — {settings.smtpHost}:{settings.smtpPort} ({(settings.smtpEncryption || 'tls').toUpperCase()})
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5" /> Not configured
            </>
          )}
        </span>

        {settings?.configured && settings.lastTestStatus && (
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-mono ${
              settings.lastTestStatus === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
            title={settings.lastTestMessage || ''}
          >
            Last SMTP test: {settings.lastTestStatus} • {fmtWhen(settings.lastTestedAt)}
          </span>
        )}
      </div>

      {/* ---- Template test result banner ---- */}
      {testResult && (
        <div
          className={`flex items-start gap-2 p-4 rounded-2xl border text-sm font-jakarta max-w-3xl ${
            testResult.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {testResult.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span className="break-words">{testResult.text}</span>
        </div>
      )}
    </div>
  );
}
