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
  Globe,
  Image as ImageIcon,
  Share2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { API_BASE, ADMIN_API } from '../lib/api';
import { useBranding, setBrandingCache } from '../lib/branding';

const WEBSITE_FIELDS = [
  { key: 'site_name', label: 'Site Name', placeholder: 'Prodyum' },
  { key: 'site_tagline', label: 'Tagline', placeholder: 'IT · Media · Entertainments' },
];

const SOCIAL_FIELDS = [
  { key: 'facebook_link', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/prodyum' },
  { key: 'instagram_link', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/prodyum' },
  { key: 'twitter_link', label: 'Twitter / X', icon: Twitter, placeholder: 'https://x.com/prodyum' },
  { key: 'linkedin_link', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/company/prodyum' },
  { key: 'youtube_link', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/@prodyum' },
  { key: 'whatsapp_link', label: 'WhatsApp', icon: MessageCircle, placeholder: 'https://wa.me/919999999999' },
];

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

  // Social media links state
  const [social, setSocial] = useState(null);
  const [socialBusy, setSocialBusy] = useState(true);
  const [socialSaving, setSocialSaving] = useState(false);
  const [socialError, setSocialError] = useState('');
  const [socialSuccess, setSocialSuccess] = useState('');

  // Website settings (name / tagline / logo) state
  const brand = useBranding();
  const [siteName, setSiteName] = useState('');
  const [siteTagline, setSiteTagline] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [siteBusy, setSiteBusy] = useState(true);
  const [siteSaving, setSiteSaving] = useState(false);
  const [siteError, setSiteError] = useState('');
  const [siteSuccess, setSiteSuccess] = useState('');

  // Seed form from the shared branding cache (filled by public fetch)
  useEffect(() => {
    if (brand && !siteName && !siteTagline && !logoPreview) {
      setSiteName(brand.site_name || '');
      setSiteTagline(brand.site_tagline || '');
      setLogoPreview(brand.logo_url || '');
      setSiteBusy(false);
    }
  }, [brand]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file)); // instant preview
  };

  const handleRemoveLogo = async () => {
    setSiteError('');
    setSiteSuccess('');
    setSiteSaving(true);
    try {
      const res = await fetch(`${ADMIN_API}/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ logo_url: '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to remove logo.');
      setLogoPreview('');
      setLogoFile(null);
      setBrandingCache(data.data);
      setSiteSuccess('Logo removed.');
      setTimeout(() => setSiteSuccess(''), 3000);
    } catch (err) {
      setSiteError(err.message || 'Could not reach the API server.');
    } finally {
      setSiteSaving(false);
    }
  };

  const handleSaveWebsite = async (e) => {
    e.preventDefault();
    setSiteError('');
    setSiteSuccess('');
    if (!siteName.trim()) {
      setSiteError('Site name cannot be empty.');
      return;
    }
    setSiteSaving(true);
    try {
      let current = null;
      // 1) upload new logo first (if a file was chosen)
      if (logoFile) {
        const fd = new FormData();
        fd.append('logo', logoFile);
        const up = await fetch(`${ADMIN_API}/site-settings/logo`, {
          method: 'POST',
          credentials: 'include',
          body: fd,
        });
        const upData = await up.json().catch(() => ({}));
        if (!up.ok || !upData.ok) throw new Error(upData.error || 'Logo upload failed.');
        current = upData.data;
        setLogoFile(null);
      }
      // 2) save name + tagline
      const res = await fetch(`${ADMIN_API}/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ site_name: siteName, site_tagline: siteTagline }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Save failed.');
      current = current ? { ...current, ...data.data } : data.data;
      setBrandingCache(current); // navbar/footer update instantly, no reload
      setSiteSuccess('Saved — the whole website now shows the new branding.');
      setTimeout(() => setSiteSuccess(''), 3500);
    } catch (err) {
      setSiteError(err.message || 'Could not reach the API server.');
    } finally {
      setSiteSaving(false);
    }
  };

  const loadSocial = async () => {
    setSocialBusy(true);
    setSocialError('');
    try {
      const res = await fetch(`${API_BASE}/site-settings`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load social links.');
      setSocial(data.data);
    } catch (err) {
      setSocialError(err.message || 'Could not load social links.');
    } finally {
      setSocialBusy(false);
    }
  };

  useEffect(() => {
    loadSocial();
  }, []);

  const handleSaveSocial = async (e) => {
    e.preventDefault();
    setSocialError('');
    setSocialSuccess('');
    setSocialSaving(true);
    try {
      const res = await fetch(`${ADMIN_API}/site-settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(social),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Save failed.');
      setSocial(data.data);
      setSocialSuccess('Saved — social icons are live in the footer.');
      setTimeout(() => setSocialSuccess(''), 3500);
    } catch (err) {
      setSocialError(err.message || 'Could not reach the API server.');
    } finally {
      setSocialSaving(false);
    }
  };

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

      {/* Website Settings — site name, tagline, logo */}
      <div className="glass-card p-5 sm:p-7 rounded-3xl border border-white/10 xl:col-span-2">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="p-2.5 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-syne font-bold text-lg text-white">Website Settings</h3>
            <p className="font-jakarta text-xs text-slate-400">
              Site name, tagline & logo — updates the entire website instantly
            </p>
          </div>
        </div>

        {siteError && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {siteError}
          </div>
        )}
        {siteSuccess && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-jakarta text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {siteSuccess}
          </div>
        )}

        {siteBusy ? (
          <div className="flex items-center justify-center gap-2 py-10 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading website settings…
          </div>
        ) : (
          <form onSubmit={handleSaveWebsite} className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Identity fields */}
              <div className="space-y-4">
                <label className="block">
                  <span className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Site Name</span>
                  <input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Prodyum"
                    required
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Tagline <span className="text-slate-500 normal-case">(shows beside the name in the navbar)</span>
                  </span>
                  <input
                    value={siteTagline}
                    onChange={(e) => setSiteTagline(e.target.value)}
                    placeholder="IT · Media · Entertainments"
                    className={inputCls}
                  />
                </label>
              </div>

              {/* Logo upload + preview */}
              <div>
                <span className="block text-xs font-mono uppercase text-slate-300 mb-1.5">Logo</span>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="w-20 h-20 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <ImageIcon className="w-7 h-7 text-slate-600" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 min-w-0">
                    <label className="cursor-pointer px-3.5 py-2 rounded-lg bg-cyan-accent/10 hover:bg-cyan-accent/20 border border-cyan-accent/30 text-cyan-accent font-mono text-[11px] uppercase tracking-wider transition w-fit">
                      {logoPreview ? 'Change Logo' : 'Upload Logo'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="hidden"
                      />
                    </label>
                    {logoPreview && (
                      <button
                        type="button"
                        onClick={handleRemoveLogo}
                        disabled={siteSaving}
                        className="px-3.5 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-[11px] uppercase tracking-wider transition disabled:opacity-50 w-fit"
                      >
                        Remove Logo
                      </button>
                    )}
                    <span className="font-jakarta text-[10px] text-slate-500">PNG / JPG / SVG / WEBP — shown in navbar, footer & pages</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={siteSaving}
              className="mt-5 px-6 py-3 rounded-xl bg-cyan-accent hover:bg-cyan-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
            >
              {siteSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Save Website Settings</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Social Media URLs — shown as icons in the public footer */}
      <div className="glass-card p-5 sm:p-7 rounded-3xl border border-white/10 xl:col-span-2">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-syne font-bold text-lg text-white">Social Media URLs</h3>
              <p className="font-jakarta text-xs text-slate-400">
                Set your profiles — icons appear in the website footer automatically
              </p>
            </div>
          </div>
          <button
            onClick={loadSocial}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Reload"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${socialBusy ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {socialError && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {socialError}
          </div>
        )}
        {socialSuccess && (
          <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-jakarta text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {socialSuccess}
          </div>
        )}

        {socialBusy && !social ? (
          <div className="flex items-center justify-center gap-2 py-10 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading social links…
          </div>
        ) : social ? (
          <form onSubmit={handleSaveSocial} className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {SOCIAL_FIELDS.map(({ key, label, icon: Icon, placeholder }) => {
                const current = (social[key] || '').trim();
                return (
                  <div key={key}>
                    <label className="flex items-center justify-between text-xs font-mono uppercase text-slate-300 mb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Icon className="w-3.5 h-3.5 text-slate-500" />
                        {label}
                      </span>
                      {current && (
                        <a
                          href={current}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-[9px] normal-case text-emerald-400 hover:underline"
                        >
                          live <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </label>
                    <input
                      type="url"
                      value={social[key] || ''}
                      onChange={(e) => setSocial({ ...social, [key]: e.target.value })}
                      placeholder={placeholder}
                      className={inputCls}
                    />
                  </div>
                );
              })}
            </div>
            <p className="mt-3 font-jakarta text-[11px] text-slate-500">
              Leave a field empty to hide that icon from the footer. Use full URLs (https://…).
              WhatsApp tip: use <code className="font-mono">https://wa.me/&lt;number&gt;</code>.
            </p>
            <button
              type="submit"
              disabled={socialSaving}
              className="mt-4 px-6 py-3 rounded-xl bg-cyan-accent hover:bg-cyan-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all"
            >
              {socialSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving…</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Save Social Links</span>
                </>
              )}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
