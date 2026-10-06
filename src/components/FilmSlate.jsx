import React, { useState, useEffect } from 'react';
import {
  Film,
  Play,
  Clock,
  Sparkles,
  Volume2,
  Calendar,
  Layers,
  ChevronRight,
  Video,
} from 'lucide-react';
import { ENTERTAINMENTS_SLATE } from '../data/content';
import { API_BASE } from '../lib/api';

// Offline / API-down fallback (mirrors migration 006 seed data)
const FALLBACK_CATEGORIES = [
  { id: 'series', name: 'Web Series' },
  { id: 'shorts', name: 'Feature & Shorts' },
  { id: 'music', name: 'Musical Cinema' },
];
const FALLBACK_CATEGORY_MAP = {
  'deccan-chronicles': 'series',
  'echoes-silence': 'shorts',
  'project-kukatpally': 'shorts',
  'rhythm-telangana': 'music',
};

const mapDbProject = (r) => ({
  id: r.id,
  title: r.title,
  type: r.type || '',
  genre: r.genre || '',
  director: r.director || '',
  releaseDate: r.release_date || '',
  aspectRatio: r.aspect_ratio || '',
  resolution: r.resolution || '',
  audio: r.audio || '',
  status: r.status || '',
  timecode: r.timecode || '',
  synopsis: r.synopsis || '',
  cast: r.cast_info || '',
  posterGradient: r.poster_gradient || 'from-amber-900/60 via-obsidian-surface to-black',
  categoryId: r.category_id,
  metaTitle: r.meta_title || '',
  metaDescription: r.meta_description || '',
  metaImage: r.meta_image || '',
});

export default function FilmSlate({ onOpenTrailer, onOpenCasting }) {
  const [categories, setCategories] = useState(null); // null until first load attempt
  const [projects, setProjects] = useState(null);
  const [activeFilter, setActiveFilter] = useState('');
  const [videoCounts, setVideoCounts] = useState({});

  // Slate categories + film projects from the CMS (admin-managed), static fallback if API is down
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [catsRes, filmsRes] = await Promise.all([
          fetch(`${API_BASE}/films/categories`),
          fetch(`${API_BASE}/films`),
        ]);
        const catsData = await catsRes.json();
        const filmsData = await filmsRes.json();
        if (cancelled) return;
        if (catsData.ok && filmsData.ok && filmsData.data.length > 0) {
          setCategories(catsData.data);
          setProjects(filmsData.data.map(mapDbProject));
        } else {
          setCategories(FALLBACK_CATEGORIES);
          setProjects(ENTERTAINMENTS_SLATE);
        }
      } catch {
        if (!cancelled) {
          setCategories(FALLBACK_CATEGORIES);
          setProjects(ENTERTAINMENTS_SLATE);
        }
      }
    })();
    // Client brief: hide the slate entirely while no verified productions are published
  if (!loading && projects.length === 0) return null;

  return () => {
      cancelled = true;
    };
  }, []);

  // Published video counts per project (fed by admin Video Library)
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/videos`);
        const data = await res.json();
        if (!cancelled && data.ok) {
          const counts = {};
          for (const v of data.data) counts[v.project_id] = (counts[v.project_id] || 0) + 1;
          setVideoCounts(counts);
        }
      } catch {
        /* slate still renders without badges */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filterOptions = [
    { id: '', label: 'All Productions' },
    ...(categories || FALLBACK_CATEGORIES).map((c) => ({ id: c.id, label: c.name })),
  ];

  const slate = projects || ENTERTAINMENTS_SLATE;
  const isFallback = projects === ENTERTAINMENTS_SLATE;

  const filteredSlate = slate.filter((project) => {
    if (!activeFilter) return true;
    const catId = isFallback ? FALLBACK_CATEGORY_MAP[project.id] : project.categoryId;
    return catId === activeFilter;
  });

  return (
    <section id="film-slate" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 border-b border-white/[0.08] pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-amber-accent mb-2 sm:mb-3">
            <Film className="w-3.5 h-3.5" />
            Studio Slates & Intellectual Properties
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            The Production Slate
          </h2>
        </div>

        {/* Filter Pills with Horizontal Touch Scrolling on Mobile */}
        <div className="w-full md:w-auto overflow-x-auto no-scrollbar -mx-1 px-1 py-1">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/10 backdrop-blur-md w-max">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActiveFilter(opt.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium font-jakarta tracking-wide whitespace-nowrap shrink-0 transition-all duration-300 ${
                  activeFilter === opt.id
                    ? 'bg-amber-accent/20 text-amber-accent border border-amber-accent/40 shadow-[0_0_15px_rgba(255,184,0,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Production Slate Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredSlate.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-amber-accent/50 hover:shadow-[0_20px_60px_rgba(255,184,0,0.2)] transition-all duration-500 flex flex-col justify-between"
          >
            {/* Cinematic Poster Backdrop with Artistic Gradient & Film Grain */}
            <div className={`relative min-h-[220px] sm:h-72 w-full bg-gradient-to-t ${project.posterGradient} p-3.5 sm:p-7 flex flex-col justify-between overflow-hidden border-b border-white/10`}>
              {/* Subtle Film Grain Pattern */}
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Top Meta Badges - Fully Responsive */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-amber-accent/30 text-amber-accent text-[10px] sm:text-[11px] font-mono whitespace-nowrap shrink-0 shadow-lg">
                  {project.type}
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[9px] sm:text-[10px] text-white whitespace-nowrap">
                    {project.aspectRatio}
                  </span>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-amber-accent/20 border border-amber-accent/40 font-mono text-[9px] sm:text-[10px] text-amber-300 font-bold whitespace-nowrap">
                    {project.resolution}
                  </span>
                </div>
              </div>

              {/* Central Play Trigger Button (Hover Reveal) */}
              <div className="relative z-10 self-center my-auto py-2">
                <button
                  onClick={() => onOpenTrailer(project)}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-accent/20 group-hover:bg-amber-accent group-hover:scale-110 border border-amber-accent/50 text-amber-accent group-hover:text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,184,0,0.3)] transition-all duration-300"
                  aria-label={`Play trailer for ${project.title}`}
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                </button>
              </div>

              {/* Bottom Specs Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-xs font-mono text-slate-300 bg-black/50 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-lg border border-white/10">
                <div className="flex items-center gap-1.5 truncate">
                  <Volume2 className="w-3.5 h-3.5 text-amber-accent shrink-0" />
                  <span className="truncate">{project.audio}</span>
                </div>
                {videoCounts[project.id] > 0 && (
                  <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-accent/15 border border-amber-accent/40 text-amber-300 font-semibold whitespace-nowrap">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    {videoCounts[project.id]} Video{videoCounts[project.id] > 1 ? 's' : ''}
                  </span>
                )}
                <div className="flex items-center gap-1 text-amber-300 shrink-0 font-semibold">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>TC {project.timecode}</span>
                </div>
              </div>
            </div>

            {/* Project Details & Synopsis */}
            <div className="p-4 sm:p-6 md:p-8 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2 mb-2">
                  <h3 className="font-syne font-bold text-lg sm:text-2xl text-white group-hover:text-amber-accent transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[10px] sm:text-xs text-amber-accent font-semibold self-start sm:self-auto shrink-0 whitespace-nowrap">
                    {project.genre}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-y-1 gap-x-3 sm:gap-x-4 text-[11px] sm:text-xs font-jakarta text-slate-400 mb-3 sm:mb-4">
                  <span>
                    <strong className="text-slate-200">Director:</strong> {project.director}
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-slate-200">Timeline:</strong> {project.releaseDate}
                  </span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">
                    {project.status}
                  </span>
                </div>

                <p className="font-jakarta text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {project.synopsis}
                </p>

                <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[11px] sm:text-xs font-jakarta text-slate-400 mb-5 sm:mb-6">
                  <span className="text-white font-medium">Cast & Language:</span> {project.cast}
                </div>
              </div>

              {/* Action Buttons with Mobile-Friendly Layout */}
              <div className="pt-3 sm:pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-4">
                <button
                  onClick={() => onOpenTrailer(project)}
                  className="w-full sm:w-auto py-2.5 sm:py-1.5 px-4 rounded-xl bg-amber-accent/10 sm:bg-transparent hover:bg-amber-accent/20 border border-amber-accent/30 sm:border-0 inline-flex items-center justify-center gap-2 text-xs font-semibold text-amber-accent hover:text-white uppercase tracking-wider font-jakarta transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Preview Reel</span>
                </button>

                <button
                  onClick={onOpenCasting}
                  className="w-full sm:w-auto py-2.5 sm:py-1.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/10 border border-white/15 text-xs text-slate-200 font-jakarta text-center transition-all"
                >
                  Audition for Role
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
