import React, { useEffect, useRef, useState } from 'react';
import {
  Globe,
  Loader2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Pencil,
  X,
  Image as ImageIcon,
  Trash2,
  Bot,
  Search,
} from 'lucide-react';
import { ADMIN_API } from '../lib/api';

const PAGE_ICONS = { site: Globe, 'it-services': Search };

function Counter({ value, max }) {
  const len = (value || '').length;
  const over = len > max;
  return (
    <span className={`text-[10px] font-mono ${over ? 'text-red-400' : 'text-slate-500'}`}>
      {len}/{max}
    </span>
  );
}

const inputCls =
  'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600';
const labelCls = 'block text-[10px] font-mono uppercase text-slate-400 mb-1.5';

export default function SeoPanel({ onUnauthorized }) {
  const [pages, setPages] = useState(null);
  const [error, setError] = useState('');
  const [editingKey, setEditingKey] = useState(null); // page_key being edited
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null); // File object
  const [imagePreview, setImagePreview] = useState(''); // object URL or existing path
  const [removeImage, setRemoveImage] = useState(false);
  const [saveBusy, setSaveBusy] = useState(false);
  const [formError, setFormError] = useState('');
  const [formOk, setFormOk] = useState('');
  const fileInputRef = useRef(null);

  const load = async () => {
    setError('');
    try {
      const res = await fetch(`${ADMIN_API}/seo`, { credentials: 'include' });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load SEO settings.');
      setPages(data.data);
    } catch (err) {
      setError(err.message || 'Could not reach the API server.');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rowByKey = (key) => pages?.find((p) => p.page_key === key);

  const startEdit = (row) => {
    setEditingKey(row.page_key);
    setForm({
      meta_title: row.meta_title || '',
      meta_description: row.meta_description || '',
      meta_keywords: row.meta_keywords || '',
      robots: row.robots || 'index',
      robots_txt: row.robots_txt || '',
    });
    setImageFile(null);
    setImagePreview(row.meta_image || '');
    setRemoveImage(false);
    setFormError('');
    setFormOk('');
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setForm({});
    setImageFile(null);
    setImagePreview('');
    setRemoveImage(false);
    setFormError('');
    setFormOk('');
  };

  const pickImage = (file) => {
    setImageFile(file);
    setRemoveImage(false);
    if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    setImagePreview(file ? URL.createObjectURL(file) : '');
  };

  const clearImage = () => {
    setImageFile(null);
    setRemoveImage(true);
    if (imagePreview && imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
    setImagePreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const savePage = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormOk('');
    setSaveBusy(true);
    try {
      const fd = new FormData();
      fd.append('meta_title', form.meta_title || '');
      fd.append('meta_description', form.meta_description || '');
      fd.append('meta_keywords', form.meta_keywords || '');
      fd.append('robots', form.robots || 'index');
      if (editingKey === 'robots') fd.append('robots_txt', form.robots_txt || '');
      if (imageFile) fd.append('meta_image', imageFile);
      if (removeImage) fd.append('remove_meta_image', '1');

      const res = await fetch(`${ADMIN_API}/seo/${editingKey}`, {
        method: 'PATCH',
        credentials: 'include',
        body: fd,
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to save.');

      setFormOk('Saved — live on the site now.');
      load();
      setTimeout(() => setEditingKey(null), 700);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaveBusy(false);
    }
  };

  const pagesList = (pages || []).filter((p) => p.page_key !== 'robots');
  const robotsRow = rowByKey('robots');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-accent block mb-1">
            Search Engine Visibility
          </span>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight">
            SEO & Meta Data
          </h2>
          <p className="font-jakarta text-xs text-slate-400 mt-1">
            Meta title, description & social-share image per page — applied live on the site.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${pages === null ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Pages table */}
      <div className="glass-card overflow-hidden rounded-3xl">
        {pages === null && !error ? (
          <div className="flex items-center justify-center gap-2 py-14 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading pages…
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[680px]">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.08]">
                  <th className="px-4 py-3 font-medium">Page</th>
                  <th className="px-4 py-3 font-medium">Meta Title</th>
                  <th className="px-4 py-3 font-medium w-24 text-center">Share Image</th>
                  <th className="px-4 py-3 font-medium w-20 text-center">Robots</th>
                  <th className="px-4 py-3 font-medium text-right w-28">Action</th>
                </tr>
              </thead>
              <tbody>
                {pagesList.map((row) => {
                  const Icon = PAGE_ICONS[row.page_key] || Globe;
                  return (
                    <tr key={row.page_key} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-amber-accent/10 border border-amber-accent/20 text-amber-accent">
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="font-jakarta text-[13px] font-semibold text-white">
                            {row.page_label}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-jakarta text-xs text-slate-300 max-w-[260px] truncate">
                        {row.meta_title || <span className="text-slate-500 italic">— not set —</span>}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.meta_image ? (
                          <img
                            src={row.meta_image}
                            alt=""
                            className="w-12 h-8 object-cover rounded-md border border-white/15 inline-block"
                          />
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[10px] border ${
                            row.robots === 'index'
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                              : 'bg-red-500/10 border-red-500/30 text-red-300'
                          }`}
                        >
                          {row.robots}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end">
                          <button
                            onClick={() => startEdit(row)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-jakarta font-semibold transition-colors ${
                              row.meta_title
                                ? 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white hover:border-amber-accent/40'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20'
                            }`}
                          >
                            {row.meta_title ? (
                              <>
                                <Pencil className="w-3 h-3" /> Edit
                              </>
                            ) : (
                              <>
                                <Pencil className="w-3 h-3" /> Add
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit form */}
      {editingKey && editingKey !== 'robots' && (
        <form
          onSubmit={savePage}
          className="glass-card p-5 sm:p-7 rounded-3xl border border-amber-accent/25"
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-accent/10 border border-amber-accent/30 text-amber-accent">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="font-syne font-bold text-base text-white">
                Meta Data — {rowByKey(editingKey)?.page_label || editingKey}
              </h3>
            </div>
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] font-jakarta text-slate-300 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <div>
              <div className="flex items-center justify-between">
                <label className={labelCls}>Meta Title *</label>
                <Counter value={form.meta_title} max={100} />
              </div>
              <input
                type="text"
                maxLength={100}
                value={form.meta_title}
                onChange={(e) => setForm((f) => ({ ...f, meta_title: e.target.value }))}
                placeholder="Shows in browser tabs, search results & link previews"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Robots</label>
              <select
                value={form.robots}
                onChange={(e) => setForm((f) => ({ ...f, robots: e.target.value }))}
                className={inputCls}
              >
                <option value="index" className="bg-[#0C101A]">index — allow search engines</option>
                <option value="noindex" className="bg-[#0C101A]">noindex — hide from search engines</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center justify-between">
                <label className={labelCls}>Meta Description *</label>
                <Counter value={form.meta_description} max={160} />
              </div>
              <textarea
                rows={3}
                maxLength={2000}
                value={form.meta_description}
                onChange={(e) => setForm((f) => ({ ...f, meta_description: e.target.value }))}
                placeholder="Short summary shown under the title in search results (recommended 120–160 characters)"
                className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Meta Keywords <span className="normal-case text-slate-500">(comma separated)</span></label>
              <input
                type="text"
                value={form.meta_keywords}
                onChange={(e) => setForm((f) => ({ ...f, meta_keywords: e.target.value }))}
                placeholder="prodyum, films, it services, …"
                className={inputCls}
              />
            </div>
            {/* Meta image */}
            <div>
              <label className={labelCls}>Meta / Social Share Image <span className="normal-case text-slate-500">(OG image)</span></label>
              <div className="flex items-center gap-3">
                {imagePreview ? (
                  <div className="relative shrink-0">
                    <img
                      src={imagePreview}
                      alt="meta preview"
                      className="w-24 h-16 object-cover rounded-lg border border-white/15"
                    />
                    <button
                      type="button"
                      onClick={clearImage}
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
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => pickImage(e.target.files?.[0] || null)}
                  className="flex-1 text-xs font-jakarta text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-amber-accent/15 file:text-amber-accent file:font-semibold file:cursor-pointer hover:file:bg-amber-accent/25"
                />
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

          <button
            type="submit"
            disabled={saveBusy}
            className="mt-5 px-6 py-2.5 rounded-xl bg-amber-accent hover:bg-amber-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all"
          >
            {saveBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Save Meta Data
          </button>
        </form>
      )}

      {/* Robots.txt */}
      {robotsRow && editingKey !== 'robots' && (
        <div className="glass-card p-5 sm:p-7 rounded-3xl">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-lg bg-white/[0.05] border border-white/15 text-slate-300 shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-syne font-bold text-base text-white">Robots.txt</h3>
                <p className="font-mono text-[10px] text-slate-500 truncate max-w-[380px]">
                  served live at /robots.txt — {robotsRow.robots_txt ? 'custom rules active' : 'default (allow all)'}
                </p>
              </div>
            </div>
            <button
              onClick={() => startEdit(robotsRow)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] font-jakarta font-semibold text-slate-300 hover:text-white shrink-0"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </button>
          </div>
        </div>
      )}

      {/* Robots edit form replaces the read-only box when active */}
      {editingKey === 'robots' && (
        <form
          onSubmit={savePage}
          className="glass-card p-5 sm:p-7 rounded-3xl border border-amber-accent/25"
        >
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-accent/10 border border-amber-accent/30 text-amber-accent">
                <Bot className="w-4 h-4" />
              </div>
              <h3 className="font-syne font-bold text-base text-white">Editing Robots.txt</h3>
            </div>
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-[11px] font-jakarta text-slate-300 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
              Close
            </button>
          </div>
          <textarea
            rows={5}
            value={form.robots_txt || ''}
            onChange={(e) => setForm((f) => ({ ...f, robots_txt: e.target.value }))}
            placeholder={'User-agent: *\nAllow: /\nDisallow: /admin'}
            className={`${inputCls} font-mono text-xs`}
          />
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
          <button
            type="submit"
            disabled={saveBusy}
            className="mt-4 px-6 py-2.5 rounded-xl bg-amber-accent hover:bg-amber-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2"
          >
            {saveBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            Save Robots.txt
          </button>
        </form>
      )}
    </div>
  );
}
