import React from 'react';
import {
  Share2, PenTool, Clapperboard, Camera, TrendingUp, Compass, Code2, Youtube,
  ArrowRight, Layers,
} from 'lucide-react';
import { IT_SERVICES } from '../data/content';

const ICONS = {
  Share2, PenTool, Clapperboard, Camera, TrendingUp, Compass, Code2, Youtube,
};

/**
 * Services section — the eight approved ProDyum IT services, plain names
 * and descriptions (client brief §2). Replaces the old enterprise bento grid.
 */
export default function ITBentoGrid({ onOpenProjectModal }) {
  return (
    <section id="services" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 border-b border-white/[0.08] pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-cyan-accent mb-2 sm:mb-3">
            <Layers className="w-3.5 h-3.5" />
            What we do
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Digital Marketing and Creative Services
          </h2>
        </div>
        <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-md">
          Choose the services your business needs, from consistent social content to websites and
          advertising campaigns. We agree the scope, deliverables and reporting before work begins.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {IT_SERVICES.map((service, idx) => {
          const Icon = ICONS[service.icon] || Layers;
          return (
            <div
              key={service.id}
              className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-cyan-accent/40 transition-all duration-300 group flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-slate-600">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="font-syne font-bold text-base sm:text-lg text-white mb-1.5 leading-snug">
                {service.title}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-cyan-accent mb-3">
                {service.subtitle}
              </p>
              <p className="font-jakarta text-xs sm:text-[13px] text-slate-400 leading-relaxed mb-4 flex-1">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-wide text-slate-400 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <p className="font-jakarta text-sm text-slate-400">
          Not sure which service fits? Tell us your goal — we'll suggest the right mix.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-accent hover:bg-cyan-400 text-black font-jakarta font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.3)] transition-all"
        >
          Discuss Your Project
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
