import React, { useCallback, useEffect, useState } from 'react';
import { Menu, ExternalLink, LogOut, Loader2 } from 'lucide-react';
import Sidebar from './Sidebar.jsx';
import Overview from './Overview.jsx';
import SubmissionsPanel from './SubmissionsPanel.jsx';
import Settings from './Settings.jsx';
import VideosPanel from './VideosPanel.jsx';
import FilmProjectsPanel from './FilmProjectsPanel.jsx';
import CategoriesPanel from './CategoriesPanel.jsx';
import SeoPanel from './SeoPanel.jsx';
import PagesPanel from './PagesPanel.jsx';
import EmailSettings from './EmailSettings.jsx';
import EmailTemplates from './EmailTemplates.jsx';
import { API_BASE, ADMIN_API } from '../lib/api';

const PAGES = {
  overview: { title: 'Dashboard', subtitle: 'Ecosystem overview & recent activity' },
  inquiries: { title: 'Inquiries', subtitle: 'Contact form submissions' },
  projects: { title: 'Project Requests', subtitle: '"Initiate Project" submissions' },
  careers: { title: 'Career Applications', subtitle: 'Applicants for open positions' },
  casting: { title: 'Casting Auditions', subtitle: 'Talent registry submissions' },
  films: { title: 'Film Projects', subtitle: 'Production slate entries & metadata' },
  'film-categories': { title: 'Slate Categories', subtitle: 'Public filter pills for the Production Slate' },
  videos: { title: 'Video Library', subtitle: 'Production slate videos • priority-ordered playback' },
  seo: { title: 'SEO & Meta Data', subtitle: 'Meta titles, descriptions & social images — live on the site' },
  pages: { title: 'Policy Pages', subtitle: 'Privacy Policy, Terms, Refunds — CKEditor, stored in database' },
  settings: { title: 'Settings', subtitle: 'Account & system configuration' },
  email: { title: 'Email & SMTP', subtitle: 'Outbound mail configuration & testing' },
  'email-templates': { title: 'Email Templates', subtitle: 'Design & customize email templates' },
};

const INBOX_RESOURCES = ['inquiries', 'projects', 'careers', 'casting'];

const tabFromHash = () => {
  const h = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  return PAGES[h] ? h : 'overview';
};

export default function AdminDashboard({ user, onLogout }) {
  const [tab, setTab] = useState(tabFromHash);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [stats, setStats] = useState(null); // drives sidebar "new" badges
  const [loggingOut, setLoggingOut] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const res = await fetch(`${ADMIN_API}/stats`, { credentials: 'include' });
      if (res.status === 401) {
        onLogout();
        return;
      }
      const data = await res.json();
      if (data.ok) setStats(data.stats);
    } catch {
      /* ignore — badges just stay stale */
    }
  }, [onLogout]);

  // Fetch badge counts now + poll every 30s
  useEffect(() => {
    loadStats();
    const t = setInterval(loadStats, 30000);
    return () => clearInterval(t);
  }, [loadStats]);

  // Keep page in sync with #/hash (refresh-safe)
  useEffect(() => {
    const onHash = () => setTab(tabFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next) => {
    setTab(next);
    setSidebarOpen(false);
    if (window.location.hash !== `#/${next}`) {
      window.location.hash = `/${next}`;
    }
    loadStats(); // refresh badges when returning to dashboard etc.
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
    } catch {
      /* clear local state regardless */
    }
    onLogout();
  };

  const page = PAGES[tab];

  const sidebarProps = {
    tab,
    onNavigate: navigate,
    stats,
    user,
    onLogout: handleLogout,
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-white">
      {/* ---- Desktop Sidebar (fixed) ---- */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-40 w-64 border-r border-white/[0.08]">
        <Sidebar {...sidebarProps} />
      </aside>

      {/* ---- Mobile Sidebar Drawer ---- */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 border-r border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <Sidebar {...sidebarProps} mobile onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ---- Main Column ---- */}
      <div className="lg:pl-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-[#06080D]/85 backdrop-blur-2xl border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Mobile hamburger */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300 hover:text-white shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-4.5 h-4.5 w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="font-syne font-bold text-base sm:text-lg tracking-tight leading-none truncate">
                  {page.title}
                </h1>
                <p className="font-jakarta text-[10px] sm:text-[11px] text-slate-500 mt-0.5 truncate">
                  {page.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] font-jakarta text-slate-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Site
              </a>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-[11px] font-jakarta text-red-300 hover:text-red-200 transition-colors disabled:opacity-50"
              >
                {loggingOut ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {tab === 'overview' && <Overview onSelectTab={navigate} stats={stats} />}
          {INBOX_RESOURCES.includes(tab) && (
            <SubmissionsPanel
              key={tab}
              resource={tab}
              onUnauthorized={onLogout}
              onDataChanged={loadStats}
            />
          )}
          {tab === 'videos' && <VideosPanel onUnauthorized={onLogout} />}
          {tab === 'films' && <FilmProjectsPanel onUnauthorized={onLogout} />}
          {tab === 'film-categories' && <CategoriesPanel onUnauthorized={onLogout} />}
          {tab === 'seo' && <SeoPanel onUnauthorized={onLogout} />}
          {tab === 'pages' && <PagesPanel onUnauthorized={onLogout} />}
          {tab === 'settings' && <Settings user={user} />}
          {tab === 'email' && <EmailSettings />}
          {tab === 'email-templates' && <EmailTemplates />}
        </main>
      </div>
    </div>
  );
}
