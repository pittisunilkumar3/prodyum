import React from 'react';
import {
  LayoutDashboard,
  Mail,
  Rocket,
  Briefcase,
  Film,
  Popcorn,
  Tags,
  Clapperboard,
  Search,
  FileText,
  Send,
  LayoutTemplate,
  Settings as SettingsIcon,
  LogOut,
  X,
} from 'lucide-react';

export const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [{ id: 'overview', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Inbox',
    items: [
      { id: 'inquiries', label: 'Inquiries', icon: Mail, badgeKey: 'inquiries' },
      { id: 'projects', label: 'Project Requests', icon: Rocket, badgeKey: 'projects' },
      { id: 'careers', label: 'Career Applications', icon: Briefcase, badgeKey: 'careers' },
      { id: 'casting', label: 'Casting Auditions', icon: Film, badgeKey: 'casting' },
    ],
  },
  {
    label: 'Film Studio',
    items: [
      { id: 'films', label: 'Film Projects', icon: Popcorn },
      { id: 'film-categories', label: 'Slate Categories', icon: Tags },
      { id: 'videos', label: 'Video Library', icon: Clapperboard },
    ],
  },
  {
    label: 'Growth',
    items: [
      { id: 'seo', label: 'SEO & Meta', icon: Search },
      { id: 'pages', label: 'Policy Pages', icon: FileText },
    ],
  },
  {
    label: 'Communication',
    items: [
      { id: 'email', label: 'Email / SMTP', icon: Send },
      { id: 'email-templates', label: 'Email Templates', icon: LayoutTemplate },
    ],
  },
  {
    label: 'System',
    items: [{ id: 'settings', label: 'Settings', icon: SettingsIcon }],
  },
];

export default function Sidebar({ tab, onNavigate, stats, user, onLogout, mobile = false, onClose }) {
  return (
    <div className="flex flex-col h-full bg-[#080B12]">
      {/* Logo / Brand */}
      <div className="h-14 px-4 flex items-center gap-2.5 border-b border-white/[0.08] shrink-0">
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 100 100" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 12L85 48L50 84L15 48Z" stroke="#00F0FF" strokeWidth="6" strokeLinejoin="round" opacity="0.9" />
            <polygon points="50,30 76,75 24,75" fill="#FFB800" fillOpacity="0.75" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <span className="font-syne font-extrabold text-sm tracking-tight block leading-none">
            PRODYUM <span className="text-cyan-accent">ADMIN</span>
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-500 block mt-0.5">
            Superadmin Console
          </span>
        </div>
        {mobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Sections — grouped by category with divider lines */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={section.label} className={idx > 0 ? 'mt-4 pt-4 border-t border-white/[0.06]' : ''}>
            <span className="px-2 font-mono text-[9px] uppercase tracking-[0.25em] text-slate-600 block mb-2">
              {section.label}
            </span>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                const badge = item.badgeKey ? stats?.[item.badgeKey]?.new ?? 0 : null;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-jakarta font-medium transition-all border ${
                      active
                        ? 'bg-cyan-accent/10 text-cyan-accent border-cyan-accent/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04] border-transparent'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    {badge !== null && badge > 0 && (
                      <span className="px-1.5 min-w-[20px] text-center rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] leading-4 py-px">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-white/[0.08] shrink-0">
        <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-accent/40 to-amber-accent/40 border border-white/20 flex items-center justify-center font-syne font-bold text-xs text-white shrink-0">
            {(user?.username || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <span className="block font-jakarta text-xs font-semibold text-white truncate">
              {user?.username || 'admin'}
            </span>
            <span className="flex items-center gap-1 font-mono text-[9px] uppercase text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Superadmin
            </span>
          </div>
          <button
            onClick={onLogout}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors"
            title="Logout"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
