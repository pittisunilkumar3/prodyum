import React, { useEffect, useState } from 'react';
import {
  Popcorn,
  Plus,
  Trash2,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Pencil,
  X,
  Search,
  Image as ImageIcon,
} from 'lucide-react';
import { ADMIN_API } from '../lib/api';

const GRADIENT_PRESETS = [
  { label: 'Amber Epic', value: 'from-amber-900/60 via-obsidian-surface to-black' },
  { label: 'Blue Noir', value: 'from-blue-950/70 via-obsidian-surface to-black' },
  { label: 'Orange Pulse', value: 'from-orange-950/60 via-obsidian-surface to-black' },
  { label: 'Royal Fusion', value: 'from-amber-950/60 via-purple-950/40 to-black' },
  { label: 'Violet Dream', value: 'from-violet-950/70 via-obsidian-surface to-black' },
  { label: 'Crimson Dawn', value: 'from-red-950/60 via-obsidian-surface to-black' },
];

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const EMPTY_FORM = {
  id: '',
  title: '',
  category_id: '',
  type: '',
  genre: '',
  director: '',
  release_date: '',
  aspect_ratio: '2.39:1 Anamorphic',
  resolution: '4K Ultra-HD HDR',
  audio: 'Dolby Atmos 7.1',
  status: 'Pre-Production',
  timecode: '00:00:00:00',
  synopsis: '',
  cast_info: '',
  poster_gradient: GRADIENT_PRESETS[0].value,
  priority: 100,
  published: true,
  meta_title: '',
  meta_description: '',
};

export default function FilmProjectsPanel({ onUnauthorized }) {
  const [projects, setProjects] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [listBusy, setListBusy] = useState(false);

  // Form state (add + edit share one form)
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null); // null = adding
  const [formOpen, setFormOpen] = useState(true);
  const [saveBusy, setSaveBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [formOk, setFormOk] = useState('');
  // SEO meta image
  const [metaImageFile, setMetaImageFile] = useState(null);
  const [metaImagePreview, setMetaImagePreview] = useState('');
  const [removeMetaImage, setRemoveMetaImage] = useState(false);

  const load = async () => {
    setListBusy(true);
    setError('');
    try {
      const [filmsRes, catsRes] = await Promise.all([
        fetch(`${ADMIN_API}/films`, { credentials: 'include' }),
        fetch(`${ADMIN_API}/film-categories`, { credentials: 'include' }),
      ]);
      if (filmsRes.status === 401 || catsRes.status === 401) {
        onUnauthorized();
        return;
      }
      const filmsData = await filmsRes.json();
      const catsData = await catsRes.json();
      if (!filmsRes.ok || !filmsData.ok) throw new Error(filmsData.error || 'Failed to load projects.');
      setProjects(filmsData.data);
      if (catsData.ok) setCategories(catsData.data);
    } catch (err) {
      setError(err.message || 'Could not reach the API server.');
    } finally {
      setListBusy(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const startAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormOpen(true);
    setFormError('');
    setFormOk('');
    setMetaImageFile(null);
    setMetaImagePreview('');
    setRemoveMetaImage(false);
  };

  const startEdit = (p) => {
    setForm({
      id: p.id,
      title: p.title || '',
      category_id: p.category_id || '',
      type: p.type || '',
      genre: p.genre || '',
      director: p.director || '',
      release_date: p.release_date || '',
      aspect_ratio: p.aspect_ratio || '',
      resolution: p.resolution || '',
      audio: p.audio || '',
      status: p.status || '',
      timecode: p.timecode || '',
      synopsis: p.synopsis || '',
      cast_info: p.cast_info || '',
      poster_gradient: p.poster_gradient || GRADIENT_PRESETS[0].value,
      priority: p.priority ?? 100,
      published: !!p.published,
      meta_title: p.meta_title || '',
      meta_description: p.meta_description || '',
    });
    setEditingId(p.id);
    setFormOpen(true);
    setFormError('');
    setFormOk('');
    setMetaImageFile(null);
    setMetaImagePreview(p.meta_image || '');
    setRemoveMetaImage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const saveProject = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormOk('');

    if (!form.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (!editingId && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(form.id)) {
      setFormError('Project ID may only contain lowercase letters, numbers and hyphens (e.g. my-new-film).');
      return;
    }

    setSaveBusy(true);
    try {
      // Multipart form (supports meta image upload)
      const fd = new FormData();
      // NOTE: 'published' & 'category_id' are appended explicitly below —
      // including them in the loop would create duplicate FormData entries.
      for (const [k, v] of Object.entries(form)) {
        if (k === 'published' || k === 'category_id') continue;
        fd.append(k, v ?? '');
      }
      fd.append('published', form.published ? '1' : '0');
      fd.append('category_id', form.category_id != null ? String(form.category_id) : '');
      if (metaImageFile) fd.append('meta_image', metaImageFile);
      if (removeMetaImage) fd.append('remove_meta_image', '1');

      const res = await fetch(
        editingId ? `${ADMIN_API}/films/${encodeURIComponent(editingId)}` : `${ADMIN_API}/films`,
        {
          method: editingId ? 'PATCH' : 'POST',
          credentials: 'include',
          body: fd,
        }
      );
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to save project.');

      setFormOk(editingId ? `"${form.title}" updated.` : `"${form.title}" added to the public slate.`);
      setForm(EMPTY_FORM);
      setEditingId(null);
      setMetaImageFile(null);
      setMetaImagePreview('');
      setRemoveMetaImage(false);
      load();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaveBusy(false);
    }
  };

  const togglePublished = async (p) => {
    setBusyId(p.id);
    try {
      const res = await fetch(`${ADMIN_API}/films/${encodeURIComponent(p.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ published: p.published ? 0 : 1 }),
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      if (res.ok) {
        setProjects((ps) => ps.map((x) => (x.id === p.id ? { ...x, published: p.published ? 0 : 1 } : x)));
      }
    } finally {
      setBusyId(null);
    }
  };

  const removeProject = async (p) => {
    if (
      !window.confirm(
        `Delete "${p.title}"? Its videos in the Video Library will be deleted too (uploaded files removed from disk).`
      )
    ) {
      return;
    }
    setBusyId(p.id);
    try {
      const res = await fetch(`${ADMIN_API}/films/${encodeURIComponent(p.id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      if (res.ok) {
        setProjects((ps) => ps.filter((x) => x.id !== p.id));
        if (editingId === p.id) startAdd();
      }
    } catch {
      /* ignore */
    } finally {
      setBusyId(null);
    }
  };

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600';
  const labelCls = 'block text-[10px] font-mono uppercase text-slate-400 mb-1.5';

  const TextField = ({ label, k, placeholder = '', textarea = false, rows = 3, disabled = false }) => (
    <div className={textarea ? 'md:col-span-2' : ''}>
      <label className={labelCls}>{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          value={form[k]}
          onChange={(e) => set(k, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputCls}
        />
      ) : (
        <input
          type="text"
          value={form[k]}
          onChange={(e) => set(k, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={inputCls}
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-accent block mb-1">
            Production Slate CMS
          </span>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight">
            Film Projects
          </h2>
          <p className="font-jakarta text-xs text-slate-400 mt-1">
            Everything you enter here appears on the public Production Slate, priority-ordered.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!formOpen && (
            <button
              onClick={startAdd}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-accent/15 hover:bg-amber-accent/25 border border-amber-accent/40 text-xs font-jakarta font-semibold text-amber-accent transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Film
            </button>
          )}
          <button
            onClick={load}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${listBusy ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Add / Edit form */}
      {formOpen && (
        <form
          onSubmit={saveProject}
          className="glass-card p-5 sm:p-7 rounded-3xl border border-amber-accent/20"
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-accent/10 border border-amber-accent/30 text-amber-accent">
                {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
              <h3 className="font-syne font-bold text-base text-white">
                {editingId ? `Editing: ${projects?.find((p) => p.id === editingId)?.title || editingId}` : 'Add New Film Project'}
              </h3>
            </div>
            {editingId && (
              <button
                type="button"
                onClick={startAdd}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] font-jakarta text-slate-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <TextField label="Film Title *" k="title" placeholder="e.g. Chronicles of Deccan" />
            <div>
              <label className={labelCls}>
                Project ID {editingId ? <span className="text-slate-500 normal-case">(locked — videos link to it)</span> : <span className="text-amber-accent normal-case">(lowercase-with-hyphens)</span>}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={form.id}
                  onChange={(e) => set('id', e.target.value)}
                  onBlur={(e) => {
                    if (!editingId && !form.id && e.target.value === '' && form.title) {
                      set('id', slugify(form.title));
                    }
                  }}
                  placeholder="chronicles-of-deccan"
                  disabled={!!editingId}
                  className={`${inputCls} font-mono ${editingId ? 'opacity-60' : ''}`}
                />
                {!editingId && form.title && (
                  <button
                    type="button"
                    onClick={() => set('id', slugify(form.title))}
                    className="px-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[10px] font-mono uppercase text-slate-400 hover:text-white shrink-0"
                    title="Generate from title"
                  >
                    Auto
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className={labelCls}>Category</label>
              <select
                value={form.category_id}
                onChange={(e) => set('category_id', e.target.value)}
                className={inputCls}
              >
                <option value="" className="bg-[#0C101A]">— Uncategorized —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0C101A]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <TextField label="Type" k="type" placeholder="e.g. Web Series (Season 1)" />
            <TextField label="Genre" k="genre" placeholder="e.g. Epic Historical Drama" />
            <TextField label="Director" k="director" placeholder="e.g. Srikanth Singam" />
            <TextField label="Release / Timeline" k="release_date" placeholder="e.g. Q4 2026" />
            <TextField label="Status" k="status" placeholder="e.g. Post-Production" />
            <TextField label="Timecode" k="timecode" placeholder="01:42:19:14" />
            <TextField label="Aspect Ratio" k="aspect_ratio" placeholder="2.39:1 Anamorphic" />
            <TextField label="Resolution" k="resolution" placeholder="4K Ultra-HD HDR" />
            <TextField label="Audio" k="audio" placeholder="Dolby Atmos 7.1" />
            <TextField label="Cast & Language" k="cast_info" placeholder="Regional Ensemble • Telugu / Hindi / Tamil" />

            <div className="md:col-span-2">
              <label className={labelCls}>Synopsis</label>
              <textarea
                rows={3}
                value={form.synopsis}
                onChange={(e) => set('synopsis', e.target.value)}
                placeholder="Short cinematic synopsis shown on the public card…"
                className={inputCls}
              />
            </div>

            {/* Poster gradient */}
            <div className="md:col-span-2">
              <label className={labelCls}>Poster Gradient (card artwork)</label>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                {GRADIENT_PRESETS.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => set('poster_gradient', p.value)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-[11px] font-jakarta transition-all ${
                      form.poster_gradient === p.value
                        ? 'border-amber-accent text-amber-accent bg-amber-accent/10'
                        : 'border-white/10 text-slate-400 hover:text-white hover:border-white/25'
                    }`}
                  >
                    <span className={`w-8 h-4 rounded bg-gradient-to-r ${p.value} border border-white/20`} />
                    {p.label}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={form.poster_gradient}
                onChange={(e) => set('poster_gradient', e.target.value)}
                placeholder="from-amber-900/60 via-obsidian-surface to-black"
                className={`${inputCls} font-mono text-xs`}
              />
            </div>

            <div>
              <label className={labelCls}>
                Priority <span className="text-amber-accent normal-case">(1 = first card)</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.priority}
                onChange={(e) => set('priority', e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Visibility</label>
              <button
                type="button"
                onClick={() => set('published', !form.published)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-jakarta font-medium flex items-center justify-center gap-2 transition-all ${
                  form.published
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/[0.04] border-white/15 text-slate-400'
                }`}
              >
                {form.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                {form.published ? 'Published' : 'Hidden'}
              </button>
            </div>

            {/* ---- SEO / Meta Data (StackFood-style per-entity meta) ---- */}
            <div className="md:col-span-2 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-3.5 h-3.5 text-amber-accent" />
                <h4 className="font-syne font-bold text-sm text-white">SEO / Meta Data</h4>
                <span className="font-jakarta text-[10px] text-slate-500">
                  used by search engines & social shares when this film is opened
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label className={labelCls}>Meta Title</label>
                    <span className={`text-[10px] font-mono ${(form.meta_title || '').length > 100 ? 'text-red-400' : 'text-slate-500'}`}>
                      {(form.meta_title || '').length}/100
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={100}
                    value={form.meta_title}
                    onChange={(e) => set('meta_title', e.target.value)}
                    placeholder={`${form.title || 'Film title'} — Prodyum`}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Meta Image <span className="normal-case text-slate-500">(social share)</span></label>
                  <div className="flex items-center gap-3">
                    {metaImagePreview && !removeMetaImage ? (
                      <div className="relative shrink-0">
                        <img
                          src={metaImagePreview}
                          alt=""
                          className="w-24 h-16 object-cover rounded-lg border border-white/15"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setMetaImageFile(null);
                            setRemoveMetaImage(true);
                            setMetaImagePreview('');
                          }}
                          className="absolute -top-2 -right-2 p-1 rounded-full bg-red-500/80 hover:bg-red-500 text-white"
                          title="Remove image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="w-24 h-16 rounded-lg border border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center text-slate-600 shrink-0">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setMetaImageFile(f);
                        setRemoveMetaImage(false);
                        setMetaImagePreview(f ? URL.createObjectURL(f) : '');
                      }}
                      className="flex-1 text-xs font-jakarta text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-amber-accent/15 file:text-amber-accent file:font-semibold file:cursor-pointer hover:file:bg-amber-accent/25"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className={labelCls}>Meta Description</label>
                    <span className={`text-[10px] font-mono ${(form.meta_description || '').length > 160 ? 'text-red-400' : 'text-slate-500'}`}>
                      {(form.meta_description || '').length}/160
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={form.meta_description}
                    onChange={(e) => set('meta_description', e.target.value)}
                    placeholder="Short summary for search results & link previews (recommended 120–160 characters)"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </div>

          {formError && (
            <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-jakarta text-red-300">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {formError}
            </div>
          )}
          {formOk && (
            <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-jakarta text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              {formOk}
            </div>
          )}

          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              disabled={saveBusy}
              className="px-6 py-2.5 rounded-xl bg-amber-accent hover:bg-amber-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all"
            >
              {saveBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {editingId ? 'Save Changes' : 'Add to Slate'}
            </button>
            {!editingId && (
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors"
              >
                Hide Form
              </button>
            )}
          </div>
        </form>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* List */}
      <div className="glass-card overflow-hidden rounded-3xl">
        {projects === null && !error ? (
          <div className="flex items-center justify-center gap-2 py-14 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading slate…
          </div>
        ) : projects && projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-slate-500">
            <Popcorn className="w-8 h-8 opacity-50" />
            <span className="font-jakarta text-sm">No film projects yet — add your first above.</span>
          </div>
        ) : (
          projects && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[760px]">
                <thead>
                  <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.08]">
                    <th className="px-4 py-3 font-medium w-24">Priority</th>
                    <th className="px-4 py-3 font-medium">Film</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Live</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                      <td className="px-4 py-3 font-mono text-xs text-amber-accent text-center">
                        {p.priority}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className={`w-10 h-6 rounded bg-gradient-to-t shrink-0 border border-white/15 ${p.poster_gradient}`} />
                          <span className="min-w-0">
                            <span className="block font-jakarta text-[13px] font-semibold text-white truncate max-w-[220px]">
                              {p.title}
                            </span>
                            <span className="block font-mono text-[10px] text-slate-500 truncate max-w-[220px]">
                              {p.id} • {p.type || '—'}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[10px] text-slate-300">
                          {p.category_name || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-jakarta text-xs text-emerald-400">{p.status || '—'}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => togglePublished(p)}
                          disabled={busyId === p.id}
                          className={`p-1.5 rounded-lg border transition-colors ${
                            p.published
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                              : 'bg-white/[0.05] border-white/10 text-slate-500'
                          }`}
                          title={p.published ? 'Published — click to hide' : 'Hidden — click to publish'}
                        >
                          {busyId === p.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : p.published ? (
                            <Eye className="w-3.5 h-3.5" />
                          ) : (
                            <EyeOff className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => startEdit(p)}
                            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors"
                            title="Edit project"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeProject(p)}
                            disabled={busyId === p.id}
                            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors disabled:opacity-40"
                            title="Delete project"
                          >
                            {busyId === p.id ? (
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
