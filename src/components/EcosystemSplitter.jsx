import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Film,
  Sparkles,
  ArrowRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Activity,
  Layers,
  Flame,
} from 'lucide-react';

export default function EcosystemSplitter({ activeVertical = 'all', onSelectIT, onSelectFilms, onOpenTrailer }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timecode, setTimecode] = useState({ h: 0, m: 24, s: 18, f: 2 });
  const [activeTabA, setActiveTabA] = useState('performance');

  // Realistic ticking cinematic timecode (24 frames per second)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimecode((prev) => {
        let f = prev.f + 1;
        let s = prev.s;
        let m = prev.m;
        let h = prev.h;
        if (f >= 24) {
          f = 0;
          s += 1;
        }
        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        return { h, m, s, f };
      });
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const pad = (n) => n.toString().padStart(2, '0');

  return (
    <section id="ecosystem" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6 border-b border-white/[0.08] pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-cyan-accent mb-2 sm:mb-3">
            <Layers className="w-3.5 h-3.5" />
            Dual-Vertical Synergistic Architecture
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Two Pillars. One Singular Vision.
          </h2>
        </div>
        <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-md">
          Whether scaling enterprise revenue through ruthless algorithmic performance or crafting timeless 
          cinema for global audiences, Prodyum operates at the bleeding edge.
        </p>
      </div>

      {/* Monumental Dual Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* CARD A: ProDyum IT & Creative Services */}
        <div className={`group relative rounded-3xl p-5 sm:p-8 md:p-10 glass-card transition-all duration-300 flex flex-col justify-between overflow-hidden ${
          activeVertical === 'it'
            ? 'border-cyan-accent ring-2 ring-cyan-accent/50 shadow-[0_0_50px_rgba(0,240,255,0.4)] bg-cyan-950/20'
            : 'hover:border-cyan-accent/50 hover:shadow-[0_0_50px_rgba(0,240,255,0.25)]'
        }`}>
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-accent/20 transition-colors" />

          <div>
            {/* Header Badge & Title */}
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <span className="glass-pill text-cyan-accent border-cyan-accent/30 text-[10px] sm:text-xs px-3 py-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Division 01 // Tech
                </span>
                {activeVertical === 'it' && (
                  <span className="glass-pill text-cyan-accent border-cyan-accent/60 text-[9px] font-mono animate-pulse">
                    ACTIVE FOCUS
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                99.98% SLA Uptime
              </span>
            </div>

            <h3 className="font-syne font-bold text-xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3">
              ProDyum IT & Creative
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-300 mb-6 sm:mb-8 leading-relaxed">
              Engineered for aggressive scale. We construct proprietary web infrastructure, execute high-ROAS Meta & Google advertising, and design award-winning brand systems.
            </p>

            {/* Micro-Metric Interactive Matrix */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-accent/30 transition-colors">
                <span className="font-mono text-xl sm:text-3xl font-bold text-cyan-accent">
                  +340%
                </span>
                <span className="block font-jakarta text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Average Client ROAS
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] group-hover:border-cyan-accent/30 transition-colors">
                <span className="font-mono text-xl sm:text-3xl font-bold text-white">
                  &lt;100ms
                </span>
                <span className="block font-jakarta text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1">
                  Edge Global Latency
                </span>
              </div>
            </div>

            {/* Core Capabilities List */}
            <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              {[
                { title: 'Custom Web Apps & Headless Commerce', tag: 'React • Cloud' },
                { title: 'Meta & Google Performance Ads Scaling', tag: 'Full-Funnel' },
                { title: 'Search Engine Dominance & Technical SEO', tag: 'Top-3 Moat' },
                { title: 'Brand Strategy & Spatial 3D Aesthetics', tag: 'Awwwards UI' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 sm:p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/15 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0" />
                    <span className="font-jakarta text-xs sm:text-sm font-medium text-slate-200">
                      {item.title}
                    </span>
                  </div>
                  <span className="hidden sm:inline-block font-mono text-[10px] uppercase text-slate-400 bg-white/[0.05] px-2.5 py-0.5 rounded-full shrink-0">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 sm:pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={onSelectIT}
              className="inline-flex items-center gap-2 font-jakarta font-semibold text-xs sm:text-sm text-cyan-accent group-hover:text-white transition-colors"
            >
              <span>Explore Tech Capabilities</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <span className="font-mono text-[10px] sm:text-xs text-slate-500">
              HYDERABAD • 2024
            </span>
          </div>
        </div>

        {/* CARD B: ProDyum Entertainments */}
        <div className={`group relative rounded-3xl p-5 sm:p-8 md:p-10 glass-card transition-all duration-300 flex flex-col justify-between overflow-hidden ${
          activeVertical === 'entertainments'
            ? 'border-amber-accent ring-2 ring-amber-accent/50 shadow-[0_0_50px_rgba(255,184,0,0.4)] bg-amber-950/20'
            : 'hover:border-amber-accent/50 hover:shadow-[0_0_50px_rgba(255,184,0,0.25)]'
        }`}>
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-amber-accent/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-accent/20 transition-colors" />

          <div>
            {/* Header Badge & Title */}
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <span className="glass-pill text-amber-accent border-amber-accent/30 text-[10px] sm:text-xs px-3 py-1 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  Division 02 // Cinema
                </span>
                {activeVertical === 'entertainments' && (
                  <span className="glass-pill text-amber-accent border-amber-accent/60 text-[9px] font-mono animate-pulse">
                    ACTIVE FOCUS
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] sm:text-xs text-amber-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-ping" />
                4K HDR • 24 FPS
              </span>
            </div>

            <h3 className="font-syne font-bold text-xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3">
              ProDyum Entertainments
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-300 mb-5 sm:mb-6 leading-relaxed">
              Cinematic storytelling for global screens. Developing feature films, premium OTT web series, cutting-edge music videos, and providing complete production execution.
            </p>

            {/* Mock Cinema Player Interface */}
            <div className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/15 p-3 sm:p-4 mb-5 sm:mb-6 shadow-2xl">
              {/* Cinema Header Bar */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 text-[11px] sm:text-xs font-mono">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
                  <span className="text-white font-semibold truncate">CAM A // ARRI ALEXA LF</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-slate-400 shrink-0">
                  <span className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 text-[9px] sm:text-[10px] text-amber-accent font-bold">
                    2.39:1
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded bg-white/10 text-[9px] sm:text-[10px] text-white">
                    4K
                  </span>
                </div>
              </div>

              {/* Simulated Screen Canvas with Dynamic Visualizer (Responsive Aspect Ratio) */}
              <div className="relative aspect-[16/10] sm:aspect-[2.39/1] rounded-xl overflow-hidden bg-gradient-to-tr from-amber-950/40 via-obsidian-surface to-black flex items-center justify-center border border-white/10 p-2 sm:p-4">
                {/* Cinema Overlay Grain & Bars */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-2.5 sm:p-3">
                  <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-mono text-white/50">
                    <span>TC: PRODYUM_CAM_01</span>
                    <span>SHUTTER: 180°</span>
                  </div>
                  <div className="flex justify-between items-center text-[8px] sm:text-[10px] font-mono text-white/50">
                    <span>ISO: 800</span>
                    <span>WB: 5600K</span>
                  </div>
                </div>

                {/* Central Play Trigger / Slate Info */}
                <div className="text-center z-10 px-2">
                  <span className="font-mono text-[9px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-amber-accent block mb-0.5 sm:mb-1">
                    Current Focus Slate
                  </span>
                  <span className="font-syne font-bold text-base sm:text-xl text-white block">
                    Chronicles of Deccan
                  </span>
                  <span className="font-jakarta text-[11px] sm:text-xs text-slate-400 block mt-0.5">
                    Directed by Srikanth Singam
                  </span>

                  <button
                    onClick={() => onOpenTrailer('deccan-chronicles')}
                    className="mt-2.5 sm:mt-3 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-amber-accent/20 hover:bg-amber-accent/30 border border-amber-accent/50 text-amber-accent font-jakarta text-[11px] sm:text-xs font-semibold tracking-wider transition-all"
                  >
                    <Play className="w-3 h-3 fill-amber-accent" />
                    Preview Teaser
                  </button>
                </div>
              </div>

              {/* Player Scrubber & Timecode Controls */}
              <div className="pt-2.5 mt-2.5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label={isPlaying ? 'Pause timecode' : 'Play timecode'}
                  >
                    {isPlaying ? <Pause className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                  </button>

                  {/* Cinematic Live Timecode Display */}
                  <div className="font-mono font-timecode text-[11px] sm:text-xs text-amber-accent tracking-wider sm:tracking-widest ml-1">
                    {pad(timecode.h)}:{pad(timecode.m)}:{pad(timecode.s)}:{pad(timecode.f)}
                  </div>
                </div>

                <div className="text-right ml-auto sm:ml-0">
                  <span className="font-mono text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wider sm:tracking-widest">
                    DOLBY ATMOS 7.1
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="pt-4 sm:pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={onSelectFilms}
              className="inline-flex items-center gap-2 font-jakarta font-semibold text-xs sm:text-sm text-amber-accent group-hover:text-white transition-colors"
            >
              <span>View Production Slate</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <span className="font-mono text-[10px] sm:text-xs text-slate-500">
              FEATURE • OTT • SHORTS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
