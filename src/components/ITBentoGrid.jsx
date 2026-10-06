import React, { useState } from 'react';
import {
  Code2,
  TrendingUp,
  Sparkles,
  Compass,
  ArrowUpRight,
  Terminal,
  ShieldAlert,
  BarChart3,
  Cpu,
  Layers,
  Zap,
} from 'lucide-react';
import { IT_SERVICES, IT_METRICS } from '../data/content';

export default function ITBentoGrid({ onOpenProjectModal }) {
  const [activeCodeTab, setActiveCodeTab] = useState('config');

  return (
    <section id="services" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Sub-heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-cyan-accent mb-2 sm:mb-3">
            <Cpu className="w-3.5 h-3.5" />
            Engineering & Growth Infrastructure
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            IT & Creative Services Bento
          </h2>
        </div>
        <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-md">
          A full-funnel digital powerhouse in Hyderabad. We build enterprise web software that scales, 
          deploy ads that print profit, and sculpt brand visual identities that command respect.
        </p>
      </div>

      {/* Bento Grid Layout (1 col mobile, 3 cols desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">
        {/* BOX 1 (Large - Col Span 2): High-Performance Web Development */}
        <div className="lg:col-span-2 glass-card p-5 sm:p-8 md:p-10 relative overflow-hidden flex flex-col justify-between group hover:border-cyan-accent/50">
          <div className="absolute top-0 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-3 mb-4 sm:mb-6">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
                <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="font-mono text-[10px] sm:text-xs text-cyan-accent bg-cyan-accent/10 px-2.5 sm:px-3 py-1 rounded-full border border-cyan-accent/20">
                LCP &lt; 0.8s • 99.99% SLA
              </span>
            </div>

            <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-white mb-2">
              High-Performance Web Development
            </h3>
            <p className="font-jakarta text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6 max-w-2xl">
              We design and construct headless web applications, high-throughput digital commerce systems, 
              and WebGL-powered 3D interactive applications with obsessive latency engineering.
            </p>

            {/* Interactive Code / Architecture Terminal */}
            <div className="rounded-2xl bg-[#04060A] border border-white/10 p-4 mb-6 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-slate-300">prodyum-architecture.config.ts</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveCodeTab('config')}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      activeCodeTab === 'config' ? 'bg-white/15 text-cyan-accent font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Stack
                  </button>
                  <button
                    onClick={() => setActiveCodeTab('metrics')}
                    className={`px-2 py-0.5 rounded text-[11px] ${
                      activeCodeTab === 'metrics' ? 'bg-white/15 text-cyan-accent font-semibold' : 'text-slate-500'
                    }`}
                  >
                    Telemetry
                  </button>
                </div>
              </div>

              {activeCodeTab === 'config' ? (
                <div className="space-y-1 text-slate-300 leading-relaxed overflow-x-auto">
                  <p className="text-slate-500">// Enterprise Headless Deployment Spec</p>
                  <p>
                    <span className="text-cyan-accent">const</span>{' '}
                    <span className="text-yellow-400">ProdyumCloud</span> = {'{'}
                  </p>
                  <p className="pl-4">
                    coreEngine: <span className="text-emerald-400">'React 18 + Next.js App Router'</span>,
                  </p>
                  <p className="pl-4">
                    graphicsPipeline: <span className="text-emerald-400">'Custom WebGL + Three.js Canvas'</span>,
                  </p>
                  <p className="pl-4">
                    cloudDistribution: <span className="text-emerald-400">'AWS Edge CloudFront + Lambda@Edge'</span>,
                  </p>
                  <p className="pl-4">
                    databaseCluster: <span className="text-emerald-400">'PostgreSQL High-Availability Shards'</span>,
                  </p>
                  <p>{'}'};</p>
                </div>
              ) : (
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between items-center text-emerald-400">
                    <span>STATUS: 200 OK • ALL MICROSERVICES ONLINE</span>
                    <span className="font-bold">RTT: 18ms</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>DOM CONTENT LOADED:</span>
                    <span className="text-white">210ms</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400">
                    <span>LARGEST CONTENTFUL PAINT (LCP):</span>
                    <span className="text-cyan-accent font-bold">0.74s (99th percentile)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['React', 'Node.js', 'WebGL', 'AWS', 'TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 font-mono text-xs text-slate-300 hover:border-cyan-accent/40 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">
              Full-Stack Architecture & Security Audited
            </span>
            <button
              onClick={onOpenProjectModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-accent hover:underline uppercase tracking-wider font-jakarta"
            >
              Start Architecture Build
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BOX 2: Data-Driven Performance Marketing */}
        <div className="glass-card p-8 relative overflow-hidden flex flex-col justify-between group hover:border-cyan-accent/50">
          <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-bold text-cyan-accent bg-cyan-accent/15 px-3 py-1 rounded-full border border-cyan-accent/30">
                +340% ROAS
              </span>
            </div>

            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-2">
              Performance Marketing
            </h3>
            <p className="font-jakarta text-slate-300 text-sm leading-relaxed mb-6">
              Full-funnel Meta Ads and Google Performance Max campaigns engineered with conversion API tracking, 
              creative velocity testing, and mathematical ROAS scaling.
            </p>

            {/* Performance Metric Bar */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 space-y-3">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Attributed Revenue Multiple</span>
                <span className="text-cyan-accent font-bold">4.2x Target</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-cyan-accent to-emerald-400 rounded-full w-[85%]" />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>Baseline: 1.2x</span>
                <span>Prodyum Avg: 4.2x</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-jakarta text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
                <span>Meta CAPI Server-Side Data Feeds</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
                <span>High-Intent Google Ads Keyword Domination</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent" />
                <span>Creative Fatigue Rotation Algorithms</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] mt-6">
            <button
              onClick={onOpenProjectModal}
              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-cyan-accent/20 border border-white/10 hover:border-cyan-accent/40 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all font-jakarta"
            >
              <span>Audit Your Ad Spend</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BOX 3: Brand Identity & Cinematic 3D Visuals */}
        <div className="glass-card p-8 relative overflow-hidden flex flex-col justify-between group hover:border-violet-accent/50">
          <div className="absolute top-0 right-0 w-52 h-52 bg-violet-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-violet-accent/10 border border-violet-accent/30 text-violet-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs font-bold text-violet-300 bg-violet-accent/15 px-3 py-1 rounded-full border border-violet-accent/30">
                Aesthetic Mastery
              </span>
            </div>

            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white mb-2">
              Brand Identity & 3D Visuals
            </h3>
            <p className="font-jakarta text-slate-300 text-sm leading-relaxed mb-6">
              Creating digital brand moats through spatial design systems, high-fashion typography, 
              interactive 3D assets, and award-winning user interfaces.
            </p>

            {/* Design Spec Highlights */}
            <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">Tokens</span>
                <span className="text-white font-bold">Physical Glass</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">3D Pipeline</span>
                <span className="text-violet-300 font-bold">Blender / C4D</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">Motion</span>
                <span className="text-white font-bold">Fluid Springs</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase">Figma</span>
                <span className="text-cyan-accent font-bold">Component Lib</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08]">
            <button
              onClick={onOpenProjectModal}
              className="w-full py-2.5 rounded-xl bg-white/[0.05] hover:bg-violet-accent/20 border border-white/10 hover:border-violet-accent/40 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-all font-jakarta"
            >
              <span>Commission Brand System</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* BOX 4: Strategic SEO & Market Dominance */}
        <div className="lg:col-span-2 glass-card p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group hover:border-cyan-accent/50">
          <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent">
                <Compass className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                84% Top-3 Rank Capture
              </span>
            </div>

            <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white mb-2">
              Strategic SEO & Market Dominance
            </h3>
            <p className="font-jakarta text-slate-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              We engineer programmatic SEO and semantic entity graphs that capture commercial-intent searches 
              across Google, Bing, and emergent AI answer engines (ChatGPT, Perplexity, Gemini).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs uppercase text-slate-400 block mb-1">Entity Authority</span>
                <span className="font-syne font-bold text-lg text-white">Semantic Knowledge</span>
                <p className="font-jakarta text-xs text-slate-400 mt-1">Schema.org microdata injection with zero hallucinations.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs uppercase text-slate-400 block mb-1">Programmatic SEO</span>
                <span className="font-syne font-bold text-lg text-white">10,000+ Landers</span>
                <p className="font-jakarta text-xs text-slate-400 mt-1">Dynamic data-backed landing pages targeting high-intent long-tail keywords.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs uppercase text-slate-400 block mb-1">AI Engine Readiness</span>
                <span className="font-syne font-bold text-lg text-cyan-accent">LLM Citation Moat</span>
                <p className="font-jakarta text-xs text-slate-400 mt-1">Direct inclusion in generative search answer citation sources.</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <span className="font-mono text-xs text-slate-400">
              Zero-Penalty Organic Growth Strategies
            </span>
            <button
              onClick={onOpenProjectModal}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-accent hover:underline uppercase tracking-wider font-jakarta"
            >
              Analyze Keyword Opportunities
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
