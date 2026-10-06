import React, { useEffect, useState } from 'react';
import {
  Mail,
  Rocket,
  Briefcase,
  Film,
  CalendarClock,
  RefreshCw,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Activity,
} from 'lucide-react';
import { ADMIN_API } from '../lib/api';

const CARDS = [
  {
    key: 'inquiries',
    tab: 'inquiries',
    label: 'Contact Inquiries',
    icon: Mail,
    cardCls: 'border-cyan-accent/30 hover:border-cyan-accent/60',
    iconCls: 'bg-cyan-accent/10 text-cyan-accent border-cyan-accent/30',
    valueCls: 'text-cyan-accent',
  },
  {
    key: 'projects',
    tab: 'projects',
    label: 'Project Requests',
    icon: Rocket,
    cardCls: 'border-violet-accent/30 hover:border-violet-accent/60',
    iconCls: 'bg-violet-accent/10 text-violet-300 border-violet-accent/30',
    valueCls: 'text-violet-300',
  },
  {
    key: 'careers',
    tab: 'careers',
    label: 'Career Applications',
    icon: Briefcase,
    cardCls: 'border-emerald-500/30 hover:border-emerald-500/60',
    iconCls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    valueCls: 'text-emerald-300',
  },
  {
    key: 'casting',
    tab: 'casting',
    label: 'Casting Auditions',
    icon: Film,
    cardCls: 'border-amber-accent/30 hover:border-amber-accent/60',
    iconCls: 'bg-amber-accent/10 text-amber-accent border-amber-accent/30',
    valueCls: 'text-amber-accent',
  },
];

const KIND_META = {
  inquiries: { icon: Mail, cls: 'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/30' },
  projects: { icon: Rocket, cls: 'text-violet-300 bg-violet-accent/10 border-violet-accent/30' },
  careers: { icon: Briefcase, cls: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' },
  casting: { icon: Film, cls: 'text-amber-accent bg-amber-accent/10 border-amber-accent/30' },
};

const STATUS_PILL = {
  new: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40',
  reviewed: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
  contacted: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40',
  archived: 'bg-slate-500/15 text-slate-400 border-slate-500/40',
};

export default function Overview({ onSelectTab, stats }) {
  const [weekTotal, setWeekTotal] = useState(0);
  const [recent, setRecent] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [recentBusy, setRecentBusy] = useState(false);

  const loadWeek = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/stats`, { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load stats.');
      setWeekTotal(data.weekTotal);
    } catch (err) {
      setError(err.message || 'Could not reach the API server.');
    } finally {
      setLoading(false);
    }
  };

  const loadRecent = async () => {
    setRecentBusy(true);
    try {
      const res = await fetch(`${ADMIN_API}/recent?limit=8`, { credentials: 'include' });
      const data = await res.json();
      if (res.ok && data.ok) setRecent(data.data);
    } catch {
      /* feed just stays empty on failure */
    } finally {
      setRecentBusy(false);
    }
  };

  useEffect(() => {
    loadWeek();
    loadRecent();
  }, []);

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-accent block mb-1">
            Submission Analytics
          </span>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight">
            Ecosystem Overview
          </h2>
        </div>
        <button
          onClick={() => {
            loadWeek();
            loadRecent();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {CARDS.map((c) => {
          const s = stats?.[c.key];
          const Icon = c.icon;
          return (
            <button
              key={c.key}
              onClick={() => onSelectTab(c.tab)}
              className={`text-left glass-card p-5 border ${c.cardCls} group cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl border ${c.iconCls}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              {!s ? (
                <span className="block h-9 w-16 rounded bg-white/10 animate-pulse" />
              ) : (
                <span className={`font-mono text-3xl font-bold tracking-tight ${c.valueCls}`}>
                  {s.total}
                </span>
              )}
              <span className="block font-jakarta text-xs uppercase tracking-wider text-slate-400 mt-1">
                {c.label}
              </span>
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/[0.08] font-mono text-[10px]">
                <span className="text-emerald-300">{s ? `${s.new} new` : '—'}</span>
                <span className="text-slate-500">{s ? `${s.today} today` : '—'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Week Aggregate */}
      <div className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-300">
            <CalendarClock className="w-5 h-5" />
          </div>
          <div>
            <span className="font-jakarta text-sm text-white font-semibold block">
              Submissions this week
            </span>
            <span className="font-mono text-[10px] uppercase text-slate-500">
              All channels • rolling 7 days
            </span>
          </div>
        </div>
        <span className="font-mono text-2xl font-bold text-white">
          {loading ? '…' : weekTotal}
        </span>
      </div>

      {/* Recent Activity Feed */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-cyan-accent" />
            <h3 className="font-syne font-bold text-base text-white">Recent Submissions</h3>
          </div>
          <button
            onClick={loadRecent}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
            title="Refresh feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${recentBusy ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {recent === null ? (
          <div className="flex items-center justify-center gap-2 py-12 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading feed…
          </div>
        ) : recent.length === 0 ? (
          <div className="py-12 text-center font-jakarta text-sm text-slate-500">
            No submissions yet — entries from the website will appear here.
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {recent.map((row) => {
              const meta = KIND_META[row.kind] || KIND_META.inquiries;
              const Icon = meta.icon;
              return (
                <li key={`${row.kind}-${row.id}`}>
                  <button
                    onClick={() => onSelectTab(row.kind)}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 hover:bg-white/[0.03] transition-colors text-left"
                  >
                    <span
                      className={`p-2 rounded-lg border shrink-0 ${meta.cls}`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-jakarta text-[13px] font-semibold text-white truncate">
                        {row.person || 'Unnamed'}
                      </span>
                      <span className="block font-jakarta text-[11px] text-slate-400 truncate">
                        {row.detail}
                      </span>
                    </span>

                    <span
                      className={`hidden sm:inline-block px-2 py-0.5 rounded-md border text-[10px] font-mono uppercase ${
                        STATUS_PILL[row.status] || STATUS_PILL.new
                      }`}
                    >
                      {row.status}
                    </span>

                    <span className="font-mono text-[10px] text-slate-500 whitespace-nowrap shrink-0">
                      {(row.created_at || '').slice(5, 16)}
                    </span>

                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <p className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">
        Data source: local XAMPP MySQL • database "prodyum"
      </p>
    </div>
  );
}
