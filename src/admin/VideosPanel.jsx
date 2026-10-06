import React, { useEffect, useRef, useState } from 'react';
import {
  Clapperboard,
  Plus,
  Trash2,
  Loader2,
  RefreshCw,
  Link2,
  Upload,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Film,
} from 'lucide-react';
import { ADMIN_API } from '../lib/api';

const FALLBACK_PROJECTS = [
  { id: 'deccan-chronicles', title: 'Chronicles of Deccan' },
  { id: 'echoes-silence', title: 'Echoes of Silence' },
  { id: 'project-kukatpally', title: 'Project Kukatpally' },
  { id: 'rhythm-telangana', title: 'Rhythm of Telangana' },
];

export default function VideosPanel({ onUnauthorized }) {
  const [videos, setVideos] = useState(null);
  const [films, setFilms] = useState(FALLBACK_PROJECTS); // DB-driven slate projects
  const [filter, setFilter] = useState('');
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);
  const fileInputRef = useRef(null);

  // ----- Add form state -----
  const [projectId, setProjectId] = useState('');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState(10);
  const [published, setPublished] = useState(true);
  const [mode, setMode] = useState('link'); // 'link' | 'upload'
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [addBusy, setAddBusy] = useState(false);
  const [addError, setAddError] = useState('');
  const [addOk, setAddOk] = useState('');

  const load = async () => {
    setError('');
    try {
      const [videosRes, filmsRes] = await Promise.all([
        fetch(`${ADMIN_API}/videos`, { credentials: 'include' }),
        fetch(`${ADMIN_API}/films`, { credentials: 'include' }),
      ]);
      if (videosRes.status === 401 || filmsRes.status === 401) {
        onUnauthorized();
        return;
      }
      const videosData = await videosRes.json();
      const filmsData = await filmsRes.json();
      if (!videosRes.ok || !videosData.ok) throw new Error(videosData.error || 'Failed to load videos.');
      setVideos(videosData.data);
      if (filmsData.ok && filmsData.data.length > 0) {
        setFilms(filmsData.data.map((f) => ({ id: f.id, title: f.title })));
        setProjectId((cur) => cur || filmsData.data[0].id);
      }
    } catch (err) {
      setError(err.message || 'Could not reach the API server.');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ----- Add video -----
  const addVideo = async (e) => {
    e.preventDefault();
    setAddError('');
    setAddOk('');

    if (mode === 'link' && !url.trim()) {
      setAddError('Paste a video URL (YouTube, Vimeo, or direct .mp4 link).');
      return;
    }
    if (mode === 'upload' && !file) {
      setAddError('Choose a video file to upload.');
      return;
    }

    setAddBusy(true);
    try {
      let res;
      if (mode === 'link') {
        res = await fetch(`${ADMIN_API}/videos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            project_id: projectId,
            title: title.trim(),
            url: url.trim(),
            priority: Number(priority) || 0,
            published,
          }),
        });
      } else {
        const fd = new FormData();
        fd.append('video', file);
        fd.append('project_id', projectId);
        fd.append('title', title.trim());
        fd.append('priority', String(Number(priority) || 0));
        fd.append('published', published ? '1' : '0');
        res = await fetch(`${ADMIN_API}/videos/upload`, {
          method: 'POST',
          credentials: 'include',
          body: fd,
        });
      }

      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to add video.');

      setAddOk('Video added to the slate.');
      setTitle('');
      setUrl('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      load();
    } catch (err) {
      setAddError(err.message || 'Upload failed.');
    } finally {
      setAddBusy(false);
    }
  };

  // ----- Row actions -----
  const patchRow = async (row, payload) => {
    setBusyId(row.id);
    try {
      const res = await fetch(`${ADMIN_API}/videos/${encodeURIComponent(row.id)}`, {
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
        setVideos((vs) => vs.map((v) => (v.id === row.id ? { ...v, ...payload } : v)));
      }
    } catch {
      /* keep old value */
    } finally {
      setBusyId(null);
    }
  };

  const removeRow = async (row) => {
    if (!window.confirm(`Delete video "${row.title || row.id}"? Uploaded files are removed from disk too.`)) {
      return;
    }
    setBusyId(row.id);
    try {
      const res = await fetch(`${ADMIN_API}/videos/${encodeURIComponent(row.id)}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.status === 401) {
        onUnauthorized();
        return;
      }
      if (res.ok) setVideos((vs) => vs.filter((v) => v.id !== row.id));
    } catch {
      /* ignore */
    } finally {
      setBusyId(null);
    }
  };

  const updateLocal = (id, patch) =>
    setVideos((vs) => vs.map((v) => (v.id === id ? { ...v, ...patch } : v)));

  const projectTitle = (id) => films.find((f) => f.id === id)?.title || id || '—';

  const filtered = (videos || [])
    .filter((v) => !filter || v.project_id === filter)
    .sort((a, b) => a.priority - b.priority || (a.created_at || '').localeCompare(b.created_at || ''));

  const inputCls =
    'w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-accent block mb-1">
            Production Slate Media
          </span>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl tracking-tight">
            Video Library
          </h2>
          <p className="font-jakarta text-xs text-slate-400 mt-1">
            Attach teasers, trailers & songs to each film. Priority 1 plays first on the public site.
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 border border-white/10 text-xs font-jakarta text-slate-300 hover:text-white transition-colors shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${videos === null ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Add Video Form */}
      <form
        onSubmit={addVideo}
        className="glass-card p-5 sm:p-6 rounded-3xl border border-amber-accent/20"
      >
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-lg bg-amber-accent/10 border border-amber-accent/30 text-amber-accent">
            <Plus className="w-4 h-4" />
          </div>
          <h3 className="font-syne font-bold text-base text-white">Add Video to Slate</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Project */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
              Film Project *
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className={inputCls}
            >
              {films.map((p) => (
                <option key={p.id} value={p.id} className="bg-[#0C101A]">
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
              Video Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Official Teaser / Trailer 2 / Song…"
              className={inputCls}
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-slate-400 mb-1.5">
              Priority <span className="text-amber-accent normal-case">(1 = first)</span>
            </label>
            <input
              type="number"
              min="0"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={inputCls}
            />
          </div>

          {/* Published */}
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

        {/* Source mode */}
        <div className="mt-3 flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-1.5 bg-white/[0.03] p-1 rounded-xl border border-white/10 shrink-0 self-start">
            <button
              type="button"
              onClick={() => setMode('link')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jakarta font-medium transition-all ${
                mode === 'link' ? 'bg-amber-accent/20 text-amber-accent' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              Link (YouTube / Vimeo / MP4)
            </button>
            <button
              type="button"
              onClick={() => setMode('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-jakarta font-medium transition-all ${
                mode === 'upload' ? 'bg-amber-accent/20 text-amber-accent' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload File (max 500MB)
            </button>
          </div>

          <div className="flex-1">
            {mode === 'link' ? (
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=… or https://cdn.site.com/trailer.mp4"
                className={inputCls}
              />
            ) : (
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 text-slate-300 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-amber-accent/20 file:text-amber-accent file:text-xs file:font-semibold file:cursor-pointer cursor-pointer"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={addBusy}
            className="px-5 py-2.5 rounded-xl bg-amber-accent hover:bg-amber-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.3)] transition-all shrink-0 self-stretch sm:self-auto"
          >
            {addBusy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            Add
          </button>
        </div>

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

      {/* Filter pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {[{ id: '', title: 'All Projects' }, ...films].map((p) => (
          <button
            key={p.id || 'all'}
            onClick={() => setFilter(p.id)}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-jakarta font-medium border transition-all ${
              filter === p.id
                ? 'bg-amber-accent/15 text-amber-accent border-amber-accent/40'
                : 'text-slate-400 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-jakarta text-red-300">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Video list */}
      <div className="glass-card overflow-hidden rounded-3xl">
        {videos === null && !error ? (
          <div className="flex items-center justify-center gap-2 py-14 font-mono text-xs text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading videos…
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 gap-3 text-slate-500">
            <Clapperboard className="w-8 h-8 opacity-50" />
            <span className="font-jakarta text-sm">
              {filter ? 'No videos for this project yet.' : 'No videos added yet.'}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider">
              Add one above — it appears on the public slate instantly
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/[0.08]">
                  <th className="px-4 py-3 font-medium w-24">Priority</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Project</th>
                  <th className="px-4 py-3 font-medium">Source</th>
                  <th className="px-4 py-3 font-medium">Live</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.id} className="border-b border-white/[0.05] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        value={v.priority}
                        onChange={(e) => updateLocal(v.id, { priority: e.target.value })}
                        onBlur={(e) => {
                          const n = parseInt(e.target.value, 10);
                          if (Number.isFinite(n) && n >= 0 && n !== v.priority) {
                            patchRow(v, { priority: n });
                          }
                        }}
                        disabled={busyId === v.id}
                        className="w-16 px-2 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 focus:border-amber-accent focus:outline-none text-amber-accent font-mono text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="text"
                        value={v.title || ''}
                        onChange={(e) => updateLocal(v.id, { title: e.target.value })}
                        onBlur={(e) => {
                          if ((e.target.value || '') !== (v.title || '')) {
                            patchRow(v, { title: e.target.value });
                          }
                        }}
                        placeholder="Untitled video"
                        disabled={busyId === v.id}
                        className="w-full min-w-[160px] px-2 py-1.5 rounded-lg bg-transparent border border-transparent hover:border-white/10 focus:border-amber-accent focus:bg-white/[0.04] focus:outline-none text-white text-[13px] font-jakarta font-medium"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 font-jakarta text-xs text-slate-300">
                        <Film className="w-3.5 h-3.5 text-amber-accent/70 shrink-0" />
                        {projectTitle(v.project_id)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border font-mono text-[10px] uppercase ${
                          v.source === 'upload'
                            ? 'bg-violet-accent/10 border-violet-accent/30 text-violet-300'
                            : 'bg-cyan-accent/10 border-cyan-accent/30 text-cyan-accent'
                        }`}
                      >
                        {v.source === 'upload' ? (
                          <>
                            <Upload className="w-3 h-3" /> Upload
                          </>
                        ) : (
                          <>
                            <Link2 className="w-3 h-3" /> Link
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => patchRow(v, { published: v.published ? 0 : 1 })}
                        disabled={busyId === v.id}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          v.published
                            ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                            : 'bg-white/[0.05] border-white/10 text-slate-500'
                        }`}
                        title={v.published ? 'Published — click to hide' : 'Hidden — click to publish'}
                      >
                        {v.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {v.source === 'link' && v.url && (
                          <a
                            href={v.url}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md bg-white/[0.05] hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white"
                            title="Open link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => removeRow(v)}
                          disabled={busyId === v.id}
                          className="p-1.5 rounded-md bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-400 hover:text-red-300 transition-colors disabled:opacity-40"
                          title="Delete video"
                        >
                          {busyId === v.id ? (
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
        )}
      </div>
    </div>
  );
}
