import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, Phone, Mail, MapPin } from 'lucide-react';
import { IT_SERVICES, COMPANY_INFO } from '../data/content';
import { applyMeta } from '../lib/seo';

const slugify = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/**
 * Individual service page at /services/<slug>.
 * Unique title, description and H1 per service (client brief §6).
 */
export default function ServicePage({ slug }) {
  const service = IT_SERVICES.find((s) => slugify(s.title) === slug);

  useEffect(() => {
    if (service) {
      applyMeta({
        title: `${service.title} in Hyderabad | ProDyum IT`,
        description: service.description,
        keywords: `${service.title}, ${service.subtitle}, ProDyum, Hyderabad`,
        ogType: 'website',
      });
    } else {
      applyMeta({ title: 'Service Not Found | ProDyum IT' });
    }
    return () => applyMeta({});
  }, [service]);

  if (!service) {
    return (
      <div className="min-h-screen bg-[#06080D] flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-syne font-bold text-2xl text-white mb-3">Service not found</h1>
          <p className="font-jakarta text-sm text-slate-400 mb-6">
            The page you requested doesn't exist. Browse our services instead.
          </p>
          <a href="/" className="font-jakarta text-sm text-cyan-accent hover:underline">
            ← Back to prodyum.in
          </a>
        </div>
      </div>
    );
  }

  const others = IT_SERVICES.filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen bg-[#06080D] text-white">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 font-jakarta text-xs text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to prodyum.in
        </a>

        <span className="inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/30 px-3 py-1 rounded-full mb-5">
          ProDyum IT Service
        </span>

        <h1 className="font-syne font-extrabold text-3xl sm:text-5xl tracking-tight mb-3">
          {service.title}
        </h1>
        <p className="font-mono text-xs uppercase tracking-wider text-cyan-accent mb-6">
          {service.subtitle} · Hyderabad
        </p>

        <p className="font-jakarta text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-10">
          {service.description}
        </p>

        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 mb-10">
          <h2 className="font-syne font-bold text-lg sm:text-xl text-white mb-4">
            What this includes
          </h2>
          <ul className="space-y-2.5">
            {service.tags.map((tag) => (
              <li key={tag} className="flex items-center gap-2.5 font-jakarta text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-accent shrink-0" />
                {tag}
              </li>
            ))}
          </ul>
          <p className="font-jakarta text-xs text-slate-500 mt-5">
            Scope, deliverables and reporting are agreed before work begins. Estimates are
            project-based unless agreed otherwise; advertising spend is separate and billed by the platform.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-2xl border border-cyan-accent/30 mb-12">
          <h2 className="font-syne font-bold text-lg sm:text-xl text-white mb-2">
            Discuss your project
          </h2>
          <p className="font-jakarta text-sm text-slate-400 mb-5">
            Tell us what your business needs — we reply with a clear scope and estimate.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-accent hover:bg-cyan-400 text-black font-jakarta font-bold text-xs uppercase tracking-wider transition-all"
            >
              Send Enquiry
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${(COMPANY_INFO.itPhone || '+919949590033').replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 hover:border-cyan-accent/40 text-white font-jakarta text-xs font-semibold transition-all"
            >
              <Phone className="w-4 h-4 text-cyan-accent" />
              {COMPANY_INFO.itPhone || '+91 99495 90033'}
            </a>
            <a
              href={`mailto:${COMPANY_INFO.itEmail}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 hover:border-cyan-accent/40 text-white font-jakarta text-xs font-semibold transition-all"
            >
              <Mail className="w-4 h-4 text-cyan-accent" />
              {COMPANY_INFO.itEmail}
            </a>
          </div>
        </div>

        <h2 className="font-syne font-bold text-lg text-white mb-4">Other services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {others.map((s) => (
            <a
              key={s.id}
              href={`/services/${slugify(s.title)}`}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-accent/40 transition-all group"
            >
              <span className="font-jakarta text-sm font-semibold text-white group-hover:text-cyan-accent transition-colors">
                {s.title}
              </span>
              <span className="block font-mono text-[10px] uppercase text-slate-500 mt-1">
                {s.subtitle}
              </span>
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 font-jakarta text-xs text-slate-500 space-y-1">
          <p className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
            {COMPANY_INFO.addressLines ? COMPANY_INFO.addressLines.join(', ') : 'Kukatpally, Hyderabad'}
          </p>
          <p>
            © {new Date().getFullYear()} ProDyum IT Private Limited · CIN {COMPANY_INFO.cin} ·{' '}
            <a href="/privacy-policy" className="hover:text-cyan-accent">Privacy Policy</a> ·{' '}
            <a href="/terms-conditions" className="hover:text-cyan-accent">Terms</a>
          </p>
        </div>
      </div>
    </div>
  );
}
