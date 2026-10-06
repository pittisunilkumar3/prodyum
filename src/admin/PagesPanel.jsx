import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileText, Loader2, Save, Plus, Trash2, Eye, EyeOff, RefreshCw, ExternalLink } from 'lucide-react';
import { ADMIN_API } from '../lib/api';
import CKEditor4 from './CKEditor4.jsx';

const SYSTEM_SLUGS = ['privacy-policy', 'terms-conditions', 'refund-policy'];

/**
 * Policy / CMS Pages panel — edit Privacy Policy, Terms, Refund policy and
 * any custom pages with CKEditor 4. Content is stored in the `pages` table.
 */
export default function PagesPanel({ onUnauthorized }) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  // currently selected page + its editable draft
  const [slug, setSlug] = useState(null);
  const [draft, setDraft] = useState(null);

  const [creating, setCreating] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/pages`, { credentials: 'include' });
      if (res.status === 401) return onUnauthorized?.();
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setPages(data.data);
      // auto-select first page if nothing selected or selection vanished
      setSlug((cur) => (cur && data.data.some((p) => p.slug === cur) ? cur : data.data[0]?.slug || null));
    } catch (e) {
      setError(`Failed to load pages: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }, [onUnauthorized]);

  useEffect(() => {
    load();
  }, [load]);

  // Load draft when selection changes
  useEffect(() => {
    if (!slug) {
      setDraft(null);
      return;
    }
    const page = pages.find((p) => p.slug === slug);
    if (page) {
      setDraft({
        title: page.title,
        content: page.content || '',
        meta_description: page.meta_description || '',
        is_published: !!page.is_published,
      });
    }
  }, [slug, pages]);

  const isDirty = useMemo(() => {
    if (!slug || !draft) return false;
    const page = pages.find((p) => p.slug === slug);
    if (!page) return false;
    return (
      draft.title !== page.title ||
      draft.content !== (page.content || '') ||
      draft.meta_description !== (page.meta_description || '') ||
      draft.is_published !== !!page.is_published
    );
  }, [slug, draft, pages]);

  const flash = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(''), 3000);
  };

  const save = async () => {
    if (!slug || !draft) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/pages/${encodeURIComponent(slug)}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      if (res.status === 401) return onUnauthorized?.();
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setPages((prev) => prev.map((p) => (p.slug === slug ? { ...p, ...draft } : p)));
      flash('✓ Saved — live on the site');
    } catch (e) {
      setError(`Save failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  };

  const createPage = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/pages`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: newSlug.trim(), title: newTitle.trim(), content: '' }),
      });
      if (res.status === 401) return onUnauthorized?.();
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setCreating(false);
      setNewSlug('');
      setNewTitle('');
      await load();
      setSlug(data.data.slug);
      flash('✓ Page created');
    } catch (e2) {
      setError(`Create failed: ${e2.message}`);
    }
  };

  const removePage = async (delSlug) => {
    if (!window.confirm(`Delete page "${delSlug}"? This cannot be undone.`)) return;
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/pages/${encodeURIComponent(delSlug)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 401) return onUnauthorized?.();
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || `HTTP ${res.status}`);
      if (slug === delSlug) setSlug(null);
      await load();
      flash('✓ Page deleted');
    } catch (e) {
      setError(`Delete failed: ${e.message}`);
    }
  };

  if (loading && pages.length === 0) {
    return (
      <div className="flex items-center gap-3 py-16 justify-center text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="font-mono text-xs uppercase tracking-[0.2em]">Loading pages…</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-300">
          <FileText className="w-4 h-4 text-cyan-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.2em]">
            {pages.length} page{pages.length === 1 ? '' : 's'} — stored in database
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={load}
            className="p-2 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition"
            title="Reload"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setCreating((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-accent/10 hover:bg-cyan-accent/20 border border-cyan-accent/30 text-cyan-accent font-mono text-xs uppercase tracking-wider transition"
          >
            <Plus className="w-4 h-4" /> New Page
          </button>
        </div>
      </div>

      {notice && (
        <div className="px-4 py-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
          {notice}
        </div>
      )}
      {error && (
        <div className="px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Create form */}
      {creating && (
        <form
          onSubmit={createPage}
          className="p-4 rounded-xl bg-white/[0.03] border border-white/10 grid sm:grid-cols-[1fr_1.4fr_auto] gap-3 items-end"
        >
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Slug (URL)</span>
            <input
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              placeholder="about-us"
              className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-accent/50 outline-none text-sm font-mono"
            />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Title</span>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              placeholder="About Us"
              className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-accent/50 outline-none text-sm"
            />
          </label>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-cyan-accent/20 border border-cyan-accent/40 text-cyan-accent font-mono text-xs uppercase tracking-wider hover:bg-cyan-accent/30 transition"
          >
            Create
          </button>
        </form>
      )}

      <div className="grid lg:grid-cols-[280px_1fr] gap-4">
        {/* Page list */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/5 overflow-hidden">
          {pages.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSlug(p.slug)}
              className={`w-full text-left px-4 py-3 flex items-center justify-between gap-2 transition ${
                slug === p.slug ? 'bg-cyan-accent/10 border-l-2 border-cyan-accent' : 'hover:bg-white/[0.04] border-l-2 border-transparent'
              }`}
            >
              <span className="min-w-0">
                <span className="block text-sm text-white truncate">{p.title}</span>
                <span className="block font-mono text-[10px] text-slate-500 truncate">/{p.slug}</span>
              </span>
              {p.is_published ? (
                <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0" title="Published" />
              ) : (
                <EyeOff className="w-3.5 h-3.5 text-slate-600 shrink-0" title="Draft (hidden)" />
              )}
            </button>
          ))}
        </div>

        {/* Editor */}
        {slug && draft ? (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-500">
                  {SYSTEM_SLUGS.includes(slug) ? 'SYSTEM PAGE' : 'CUSTOM PAGE'}
                </span>
                <a
                  href={`/${slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 font-mono text-xs text-cyan-accent hover:underline"
                >
                  /{slug} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                {!SYSTEM_SLUGS.includes(slug) && (
                  <button
                    onClick={() => removePage(slug)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 transition"
                    title="Delete page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={save}
                  disabled={saving || !isDirty}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-accent text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isDirty ? 'Save Changes' : 'Saved'}
                </button>
              </div>
            </div>

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Page Title</span>
              <input
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-accent/50 outline-none text-sm"
              />
            </label>

            <label className="block">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Meta Description (SEO)
              </span>
              <textarea
                value={draft.meta_description}
                onChange={(e) => setDraft({ ...draft, meta_description: e.target.value })}
                rows={2}
                maxLength={300}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 focus:border-cyan-accent/50 outline-none text-sm resize-none"
              />
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
              <input
                type="checkbox"
                checked={draft.is_published}
                onChange={(e) => setDraft({ ...draft, is_published: e.target.checked })}
                className="w-4 h-4 accent-cyan-400"
              />
              <span className="text-sm text-slate-300">
                Published {draft.is_published ? '(visible on site)' : '(hidden from site)'}
              </span>
            </label>

            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 block mb-1.5">
                Content (CKEditor)
              </span>
              <div className="rounded-lg overflow-hidden border border-white/10">
                <CKEditor4
                  value={draft.content}
                  onChange={(html) => setDraft((d) => (d ? { ...d, content: html } : d))}
                  height={420}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center py-16 text-slate-500 font-mono text-xs uppercase tracking-[0.2em]">
            Select a page to edit
          </div>
        )}
      </div>
    </div>
  );
}
