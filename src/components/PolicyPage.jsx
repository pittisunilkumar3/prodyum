import React, { useEffect, useState } from 'react';
import { ArrowLeft, Loader2, Triangle } from 'lucide-react';
import { API_BASE } from '../lib/api';

/**
 * Public policy/content page — renders a CMS `pages` row by slug.
 * URL patterns: /privacy-policy · /terms-conditions · /refund-policy · /p/<slug>
 */
export default function PolicyPage({ slug }) {
  const [state, setState] = useState({ status: 'loading', page: null });

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading', page: null });
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/pages/${encodeURIComponent(slug)}`);
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setState({ status: 'error', page: null });
          return;
        }
        setState({ status: 'ready', page: data.data });
      } catch {
        if (!cancelled) setState({ status: 'error', page: null });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Document title + meta from the DB row
  useEffect(() => {
    if (state.status !== 'ready') return;
    document.title = `${state.page.title} | Prodyum`;
    if (state.page.meta_description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = state.page.meta_description;
    }
  }, [state]);

  return (
    <div className="min-h-screen bg-[#06080D] text-white">
      {/* Minimal top bar */}
      <header className="border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <svg viewBox="0 0 100 100" className="w-7 h-7">
              <polygon points="50,10 90,85 10,85" fill="none" stroke="#00F0FF" strokeWidth="8" />
              <polygon points="50,30 75,75 25,75" fill="#FFB800" opacity="0.8" />
            </svg>
            <span className="font-syne font-bold text-lg tracking-wide group-hover:text-cyan-accent transition-colors">
              PRODYUM
            </span>
          </a>
          <a
            href="/"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/12 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Site
          </a>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-3xl mx-auto px-6 py-14">
        {state.status === 'loading' && (
          <div className="flex items-center justify-center gap-3 py-32 text-slate-400">
            <Loader2 className="w-5 h-5 animate-spin text-cyan-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em]">Loading…</span>
          </div>
        )}

        {state.status === 'error' && (
          <div className="text-center py-32">
            <Triangle className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h1 className="font-syne text-2xl font-bold mb-2">Page not available</h1>
            <p className="text-slate-400 text-sm mb-6">
              This page doesn't exist or isn't published yet.
            </p>
            <a
              href="/"
              className="inline-block px-5 py-2.5 rounded-lg bg-cyan-accent text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition"
            >
              Go Home
            </a>
          </div>
        )}

        {state.status === 'ready' && (
          <article>
            <div className="mb-10 pb-8 border-b border-white/10">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-accent mb-3">
                {siteName} Pvt. Ltd. — Legal
              </p>
              <h1 className="font-syne text-3xl sm:text-4xl font-bold leading-tight">
                {state.page.title}
              </h1>
              <p className="mt-3 font-mono text-[11px] text-slate-500">
                Last updated:{' '}
                {new Date(state.page.updated_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div
              className="policy-content text-slate-300 leading-relaxed space-y-0"
              dangerouslySetInnerHTML={{ __html: state.page.content }}
            />
          </article>
        )}
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/10 mt-10">
        <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-jakarta text-slate-500">
            © {new Date().getFullYear()} Srikanth Singam &amp; {siteName} Pvt. Ltd. All rights reserved.
          </p>
          <nav className="flex items-center gap-5 text-xs font-jakarta text-slate-400">
            <a href="/privacy-policy" className="hover:text-cyan-accent transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-cyan-accent transition-colors">Terms</a>
            <a href="/refund-policy" className="hover:text-cyan-accent transition-colors">Refunds</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
