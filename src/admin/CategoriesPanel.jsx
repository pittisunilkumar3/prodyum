import React, { useEffect, useState } from 'react';
import {
  Tags,
  Plus,
  Trash2,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Film,
} from 'lucide-react';
import { ADMIN_API } from '../lib/api';

export default function CategoriesPanel({ onUnauthorized }) {
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  // Add form
  const [name, setName] = useState('');
  const [priority, setPriority] = useState(10);
  const [published, setPublished] = useState(true);
  const [addBusy, setAddBusy] = useState(false);
  const [addError, setAddError] = useState('');
  const [addOk, setAddOk] = useState('');

  const load = async () => {
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/film-categories`, { credentials: 'include' });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load categories.');
      setCategories(data.data);
    } catch (err) {
      setError(err.message || 'Could not reach the API server.');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addCategory = async (e) => {
    e.preventDefault();
    setAddError('');
    setAddOk('');
    if (!name.trim()) {
      setAddError('Category name is required.');
      return;
    }
    setAddBusy(true);
    try {
      const res = await fetch(`${ADMIN_API}/film-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: name.trim(), priority: Number(priority) || 0, published }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to add category.');
      setAddOk(`"${name.trim()}" added — it now appears as a filter on the public slate.`);
      setName('');
      load();
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddBusy(false);
    }
  };

  const patchRow = async (row, payload) => {
    setBusyId(row.id);
    try {
      const res = await fetch(`${ADMIN_API}/film-categories/${row.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (res.ok && data.ok) {
        setCategories((cs) => cs.map((c) => (c.id === row.id ? { ...c, ...payload } : c)));
      }
    } catch {
      /* keep old value */
    } finally {
      setBusyId(null);
    }
  };

  const updateLocal = (id, patch) =>
    setCategories((cs) => cs.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const removeRow = async (row) => {
    if (
      !window.confirm(
        `Delete category "${row.name}"? Films in it will stay but become uncategorized.`
      )
    ) {
      return;
    }
    setBusyId(row.id);
    try {
      const res = await fetch(`${ADMIN_API}/film-categories/${row.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      if (res.ok) setCategories((cs) => cs.filter((c) => c.id !== row.id));
    } catch {
      /* ignore */
    } finally {
      setBusyId(null);
    }
  };

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-accent block mb-1">
            Production Slate Taxonomy
          </span>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight">
            Slate Categories
          </h2>
          <p className="font-jakarta text-xs text-slate-400 mt-1">
            These appear as filter pills on the public Production Slate. Lower priority shows first.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${categories === null ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Add form */}
      <form
        onSubmit={addCategory}
        className="glass-card p-5 sm:p-6 rounded-3xl border border-amber-accent/20"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-lg bg-amber-accent/10 border border-amber-accent/30 text-amber-accent">
            <Plus className="w-4 h-4" />
          </div>
          <h3 className="font-syne font-bold text-base text-white">Add Category</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Web Series, Documentaries, Thrillers…"
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
              Priority <span className="text-amber-accent normal-case">(1 = first pill)</span>
            </label>
            <input
              type="number"
              min="0"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={inputCls}
            />
          </div>
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
              Visibility
            </label>
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-jakarta font-medium flex items-center justify-center gap-2 transition-all ${
                published
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/[0.04] border-white/15 text-slate-400'
              }`}
            >
              {published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {published ? 'Published' : 'Hidden'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={addBusy}
          className="mt-3 px-5 py-2.5 rounded-xl bg-amber-accent hover:bg-amber-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all"
        >
          {addBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          Add Category
        </button>

        {addError && (
          <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            {addError}
          </div>
        )}
        {addOk && (
          <div className="mt-3 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-jakarta text-emerald-300">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {addOk}
          </div>
        )}
      </form>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* List */}
      <div className="glass-card overflow-hidden rounded-3xl">
        {categories === null && !error ? (
          <div className="flex items-center justify-center gap-2 py-14 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading categories…
          </div>
        ) : categories && categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-slate-500">
            <Tags className="w-8 h-8 opacity-50" />
            <span className="font-jakarta text-sm">No categories yet — add your first above.</span>
          </div>
        ) : (
          categories && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[680px]">
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.08]">
                    <th className="px-4 py-3 font-medium w-24">Priority</th>
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Slug</th>
                    <th className="px-4 py-3 font-medium">Films</th>
                    <th className="px-4 py-3 font-medium">Live</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          min="0"
                          value={c.priority}
                          onChange={(e) => updateLocal(c.id, { priority: e.target.value })}
                          onBlur={(e) => {
                            const n = parseInt(e.target.value, 10);
                            if (Number.isFinite(n) && n >= 0 && n !== c.priority) {
                              patchRow(c, { priority: n });
                            }
                          }}
                          disabled={busyId === c.id}
                          className="w-16 px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-amber-accent focus:outline-none text-amber-accent font-mono text-xs text-center"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={c.name}
                          onChange={(e) => updateLocal(c.id, { name: e.target.value })}
                          onBlur={(e) => {
                            if (e.target.value.trim() && e.target.value !== c.name) {
                              patchRow(c, { name: e.target.value.trim() });
                            }
                          }}
                          disabled={busyId === c.id}
                          className="w-full min-w-[140px] px-2 py-1.5 rounded-lg bg-transparent border border-transparent hover:border-white/10 focus:border-amber-accent focus:bg-white/[0.04] focus:outline-none text-white text-[13px] font-jakarta font-medium"
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-slate-500">{c.slug}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[11px] text-slate-300">
                          <Film className="w-3 h-3 text-amber-accent/70" />
                          {c.project_count}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => patchRow(c, { published: c.published ? 0 : 1 })}
                          disabled={busyId === c.id}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            c.published
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                              : 'bg-white/[0.05] border-white/10 text-slate-500'
                          }`}
                          title={c.published ? 'Published — click to hide' : 'Hidden — click to publish'}
                        >
                          {c.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            onClick={() => removeRow(c)}
                            disabled={busyId === c.id}
                            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors disabled:opacity-40"
                            title="Delete category"
                          >
                            {busyId === c.id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </div>
  );
}
