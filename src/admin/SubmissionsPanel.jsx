import React, { useEffect, useRef, useState } from 'react';
import {
  Inbox,
  Search,
  Download,
  RefreshCw,
  Trash2,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Loader2,
  ExternalLink,
  FileWarning,
} from 'lucide-react';
import { ADMIN_API } from '../lib/api';

const STATUS_META = {
  new: { label: 'New', pill: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40' },
  reviewed: { label: 'Reviewed', pill: 'bg-amber-500/15 text-amber-300 border-amber-500/40' },
  contacted: { label: 'Contacted', pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40' },
  archived: { label: 'Archived', pill: 'bg-slate-500/15 text-slate-400 border-slate-500/40' },
};
const STATUS_KEYS = ['new', 'reviewed', 'contacted', 'archived'];

const CONFIG = {
  inquiries: {
    heading: 'Contact Inquiries',
    searchPlaceholder: 'Search name, email, company, message…',
    title: (r) => r.name || 'Unnamed',
    subtitle: (r) => `${r.email || '—'} • ${r.phone || '—'}`,
    tag: (r) => r.category_name || (r.category === 'film' ? 'Entertainments' : 'IT & Marketing'),
    meta: (r) => r.budget_tier || '',
    fields: [
      ['Category', 'category_name'],
      ['Budget Tier', 'budget_tier'],
      ['Company', 'company'],
      ['Timeline', 'timeline'],
      ['Email', 'email'],
      ['Phone', 'phone'],
    ],
    bodyKey: 'message',
    bodyLabel: 'Message',
  },
  projects: {
    heading: 'Project Requests',
    searchPlaceholder: 'Search name, email, service…',
    title: (r) => r.name || 'Unnamed',
    subtitle: (r) => `${r.email || '—'} • ${r.phone || '—'}`,
    tag: (r) => r.service || '—',
    meta: (r) => r.vertical_name || '',
    fields: [
      ['Division', 'vertical_name'],
      ['Service', 'service'],
      ['Timeline', 'timeline'],
      ['Email', 'email'],
      ['Phone', 'phone'],
    ],
    bodyKey: 'details',
    bodyLabel: 'Scope Details',
  },
  careers: {
    heading: 'Career Applications',
    searchPlaceholder: 'Search name, email, position…',
    title: (r) => r.name || 'Unnamed',
    subtitle: (r) => `${r.email || '—'} • ${r.phone || '—'}`,
    tag: (r) => r.job_title || '—',
    meta: (r) => r.vertical || '',
    fields: [
      ['Position', 'job_title'],
      ['Vertical', 'vertical'],
      ['Email', 'email'],
      ['Phone', 'phone'],
      ['Portfolio', 'portfolio', 'link'],
    ],
    bodyKey: 'note',
    bodyLabel: 'Cover Note',
  },
  casting: {
    heading: 'Casting Auditions',
    searchPlaceholder: 'Search name, city, role…',
    title: (r) => r.full_name || 'Unnamed',
    subtitle: (r) => `${r.email || '—'} • ${r.phone || '—'}`,
    tag: (r) => r.role_category || '—',
    meta: (r) => [r.city, r.experience].filter(Boolean).join(' • '),
    fields: [
      ['Role', 'role_category'],
      ['City', 'city'],
      ['Experience', 'experience'],
      ['Headshot', 'headshot_name'],
      ['Showreel', 'portfolio_url', 'link'],
      ['Email', 'email'],
      ['Phone', 'phone'],
    ],
    bodyKey: 'bio',
    bodyLabel: 'Credits & Bio',
  },
};

export default function SubmissionsPanel({ resource, onUnauthorized, onDataChanged }) {
  const cfg = CONFIG[resource];
  const [rows, setRows] = useState(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [input, setInput] = useState('');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const searchRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => setQuery(input.trim()), 350);
    return () => clearTimeout(t);
  }, [input]);

  const load = async () => {
    setRefreshing(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (status) params.set('status', status);
      if (query) params.set('q', query);
      const res = await fetch(`${ADMIN_API}/${resource}?${params}`, { credentials: 'include' });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load records.');
      setRows(data.data);
    } catch (err) {
      setError(err.message || 'Could not reach the API server.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource, status, query]);

  const changeStatus = async (row, next) => {
    setBusyId(row.id);
    try {
      const res = await fetch(`${ADMIN_API}/${resource}/${encodeURIComponent(row.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: next }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (res.ok && data.ok) {
        setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status: next } : r)));
        if (onDataChanged) onDataChanged(); // refresh sidebar badges
      }
    } catch {
      /* leave row as-is on failure */
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (row) => {
    if (!window.confirm(`Permanently delete record ${row.id}? This cannot be undone.`)) return;
    setBusyId(row.id);
    try {
      const res = await fetch(`${ADMIN_API}/${resource}/${encodeURIComponent(row.id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      if (res.ok) {
        setRows((rs) => rs.filter((r) => r.id !== row.id));
        if (onDataChanged) onDataChanged(); // refresh sidebar badges
      }
    } catch {
      /* ignore */
    } finally {
      setBusyId(null);
    }
  };

  const exportHref = `${ADMIN_API}/${resource}/export${status ? `?status=${status}` : ''}`;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-accent block mb-1">
            Inbox • MySQL
          </span>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight">
            {cfg.heading}
            {rows && (
              <span className="ml-3 font-mono text-sm text-slate-500 align-middle">
                {rows.length} record{rows.length === 1 ? '' : 's'}
              </span>
            )}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search */}
          <div className="relative flex-1 md:flex-none min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            <input
              ref={searchRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={cfg.searchPlaceholder}
              className="w-full md:w-64 pl-9 pr-3 py-2 rounded-lg bg-white/[0.04] border border-white/10 focus:border-cyan-accent focus:outline-none text-white text-xs placeholder:text-slate-600"
            />
          </div>

          <a
            href={exportHref}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">CSV</span>
          </a>

          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors"
            title="Refresh"
          >
            {refreshing ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex items-center gap-1.5 flex-wrap mb-5">
        {['', ...STATUS_KEYS].map((s) => (
          <button
            key={s || 'all'}
            onClick={() => setStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-jakarta font-medium border transition-all ${
              status === s
                ? 'bg-white/15 text-white border-white/25'
                : 'text-slate-400 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            {s ? STATUS_META[s].label : 'All Statuses'}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300 mb-5">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {rows === null && !error ? (
          <div className="flex items-center justify-center gap-2 py-16 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading records…
          </div>
        ) : rows && rows.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
            {query || status ? (
              <Search className="w-8 h-8 opacity-50" />
            ) : (
              <Inbox className="w-8 h-8 opacity-50" />
            )}
            <span className="font-jakarta text-sm">
              {query || status ? 'No records match your filters.' : 'No submissions yet.'}
            </span>
            {!query && !status && (
              <span className="font-mono text-[10px] uppercase tracking-wider">
                New form entries from the website will appear here
              </span>
            )}
          </div>
        ) : (
          rows && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.08]">
                    <th className="px-4 py-3 font-medium">Received</th>
                    <th className="px-4 py-3 font-medium">Applicant / Contact</th>
                    <th className="px-4 py-3 font-medium">Assignment</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const isExpanded = expanded === row.id;
                    const meta = STATUS_META[row.status] || STATUS_META.new;
                    return (
                      <React.Fragment key={row.id}>
                        <tr
                          onClick={() => setExpanded(isExpanded ? null : row.id)}
                          className="border-b border-white/[0.05] hover:bg-white/[0.03] cursor-pointer transition-colors"
                        >
                          <td className="px-4 py-3 font-mono text-[11px] text-slate-400 whitespace-nowrap align-top">
                            {(row.created_at || '').slice(0, 16)}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span className="block font-jakarta font-semibold text-white text-[13px]">
                              {cfg.title(row)}
                            </span>
                            <span className="block font-jakarta text-[11px] text-slate-400 mt-0.5">
                              {cfg.subtitle(row)}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top max-w-[220px]">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[10px] text-slate-200">
                              {cfg.tag(row)}
                            </span>
                            {cfg.meta(row) && (
                              <span className="block font-jakarta text-[10px] text-slate-500 mt-1 truncate">
                                {cfg.meta(row)}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 align-top" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={STATUS_KEYS.includes(row.status) ? row.status : 'new'}
                              onChange={(e) => changeStatus(row, e.target.value)}
                              disabled={busyId === row.id}
                              className={`px-2 py-1 rounded-md border text-[10px] font-mono uppercase cursor-pointer focus:outline-none ${meta.pill} bg-transparent appearance-none`}
                            >
                              {STATUS_KEYS.map((s) => (
                                <option key={s} value={s} className="bg-[#0C101A] text-white">
                                  {STATUS_META[s].label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 align-top">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  remove(row);
                                }}
                                disabled={busyId === row.id}
                                className="p-1.5 rounded-md bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors disabled:opacity-40"
                                title="Delete record"
                              >
                                {busyId === row.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <span className="p-1.5 rounded-md bg-white/[0.05] border border-white/10 text-slate-400">
                                {isExpanded ? (
                                  <ChevronDown className="w-3.5 h-3.5" />
                                ) : (
                                  <ChevronRight className="w-3.5 h-3.5" />
                                )}
                              </span>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded detail */}
                        {isExpanded && (
                          <tr className="border-b border-white/[0.05] bg-[#080B12]">
                            <td colSpan={5} className="px-4 sm:px-6 py-5">
                              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                {cfg.fields.map(([label, key, kind]) => {
                                  const value = row[key];
                                  return (
                                    <div
                                      key={key}
                                      className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]"
                                    >
                                      <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1">
                                        {label}
                                      </span>
                                      {kind === 'link' && value ? (
                                        <a
                                          href={value}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="flex items-center gap-1 font-jakarta text-xs text-cyan-accent hover:underline break-all"
                                          onClick={(e) => e.stopPropagation()}
                                        >
                                          <span className="truncate max-w-[180px]">{value}</span>
                                          <ExternalLink className="w-3 h-3 shrink-0" />
                                        </a>
                                      ) : (
                                        <span className="font-jakarta text-xs text-white break-words">
                                          {value || '—'}
                                        </span>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>

                              {row[cfg.bodyKey] && (
                                <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-500 mb-1.5">
                                    {cfg.bodyLabel}
                                  </span>
                                  <p className="font-jakarta text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                                    {row[cfg.bodyKey]}
                                  </p>
                                </div>
                              )}

                              <div className="mt-3 flex items-center gap-3 font-mono text-[9px] text-slate-600 uppercase tracking-wider">
                                <span>ID: {row.id}</span>
                                <span>•</span>
                                <span>Received: {row.created_at}</span>
                                {resource === 'casting' && !row.headshot_uploaded && (
                                  <>
                                    <span>•</span>
                                    <span className="text-amber-400/80 flex items-center gap-1">
                                      <FileWarning className="w-3 h-3" /> No headshot attached
                                    </span>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
