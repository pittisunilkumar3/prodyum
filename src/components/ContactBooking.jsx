import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  Globe,
  Youtube,
  Instagram,
  Linkedin,
  Clock,
  Building2,
  ShieldCheck,
  Compass,
  MessageCircle,
  Facebook,
  Twitter,
} from 'lucide-react';
import { COMPANY_INFO, ENQUIRY_SERVICES, BUDGET_OPTIONS_IT, TIMELINE_OPTIONS, SOCIAL_DIRECTORY } from '../data/content';
import { submitToApi } from '../lib/api';
import { useBranding } from '../lib/branding';

export default function ContactBooking({ onShowToast }) {
  const brand = useBranding(); // admin-managed social links (same source as footer)
  const [category, setCategory] = useState('it');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    timeline: 'Immediate',
    budget: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeBudgetTiers =
    category === 'it' ? BUDGET_OPTIONS_IT : ['To be discussed during our call'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const verticalName = category === 'it' ? 'IT & Digital Marketing' : 'Entertainments & Media Production';

    const newInquiry = {
      category,
      categoryName: verticalName,
      budgetTier: formData.budget || activeBudgetTiers[0],
      ...formData,
    };

    // Persist inquiry via API (falls back to localStorage if server unreachable)
    const result = await submitToApi('inquiries', newInquiry, 'prodyum_inquiries');
    setIsSubmitting(false);

    onShowToast(
      result.persisted === 'server'
        ? `Thank you ${formData.name || 'there'}! Your enquiry has been sent — we will get back to you soon.`
        : `Server offline — your enquiry was saved on this device instead.`,
      result.persisted === 'server' ? 'success' : 'info'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      timeline: 'Immediate',
      budget: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 border-b border-white/[0.08] pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-cyan-accent mb-2 sm:mb-3">
            <Building2 className="w-3.5 h-3.5" />
            Executive Inquiries & Engagements
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Let’s discuss your project
          </h2>
        </div>
        <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-md">
          Tell us what your business needs — social media, ads, website, design or video. We reply with a clear scope and estimate.
        </p>
      </div>

      {/* Two-Column Glass Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (5 Cols): Location & Studio Details */}
        <div className="lg:col-span-5 flex flex-col justify-between glass-card p-5 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/10">
          <div className="absolute -top-12 -left-12 w-60 sm:w-64 h-60 sm:h-64 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6">
              <span className="glass-pill text-white border-white/20 text-[9px] sm:text-[10px] font-mono">
                Corporate HQ
              </span>
              <span className="font-mono text-[11px] sm:text-xs text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                Open For Inquiries
              </span>
            </div>

            <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5 sm:mb-2">
              ProDyum IT Private Limited
            </h3>
            <p className="font-jakarta text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-slate-400 font-mono mb-1.5 sm:mb-2">
              Founder & Director: {COMPANY_INFO.founder}
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] text-slate-500 mb-6 sm:mb-8">
              CIN: {COMPANY_INFO.cin}
            </p>

            {/* Quick contact actions — WhatsApp & Call */}
            <div className="grid grid-cols-2 gap-3 mb-6 sm:mb-8">
              <a
                href={`https://wa.me/${COMPANY_INFO.itWhatsapp}?text=${encodeURIComponent('Hi ProDyum, I would like to discuss a project.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 font-jakarta font-bold text-xs uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
              <a
                href={`tel:+${COMPANY_INFO.itWhatsapp}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-accent/15 hover:bg-cyan-accent/25 border border-cyan-accent/40 text-cyan-accent font-jakarta font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Location & Contact Meta Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="p-2.5 rounded-xl bg-cyan-accent/10 text-cyan-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                    Operating Office
                  </span>
                  <p className="font-jakarta text-sm text-white font-medium">
                    {COMPANY_INFO.addressLines.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                  <a
                    href={COMPANY_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-cyan-accent block mt-1.5 hover:underline"
                  >
                    Get Directions on Google Maps →
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="p-2.5 rounded-xl bg-amber-accent/10 text-amber-accent shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                    Emails
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.itEmail}`}
                    className="font-jakarta text-sm text-white hover:text-cyan-accent block transition-colors"
                  >
                    Business: {COMPANY_INFO.itEmail}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.careersEmail}`}
                    className="font-jakarta text-xs text-slate-400 hover:text-amber-accent block transition-colors mt-0.5"
                  >
                    Careers / HR: {COMPANY_INFO.careersEmail}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.entertainmentEmail}`}
                    className="font-jakarta text-xs text-slate-400 hover:text-amber-accent block transition-colors mt-0.5"
                  >
                    Entertainments: {COMPANY_INFO.entertainmentEmail}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.mediaEmail}`}
                    className="font-jakarta text-xs text-slate-400 hover:text-amber-accent block transition-colors mt-0.5"
                  >
                    Media: {COMPANY_INFO.mediaEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="p-2.5 rounded-xl bg-cyan-accent/10 text-cyan-accent shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                    Phone &amp; WhatsApp
                  </span>
                  <a
                    href="tel:+919949590033"
                    className="font-jakarta text-sm text-white hover:text-cyan-accent block transition-colors"
                  >
                    ProDyum IT: +91 99495 90033
                  </a>
                  <a
                    href="https://wa.me/919949590033?text=Hi%20ProDyum%20IT%2C%20I%27d%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 font-jakarta text-xs text-emerald-400 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp ProDyum IT
                  </a>
                  <a
                    href="tel:+919550989977"
                    className="font-jakarta text-xs text-slate-400 hover:text-amber-accent block transition-colors mt-1"
                  >
                    Entertainments &amp; Media: +91 95509 89977
                  </a>
                  <a
                    href="https://wa.me/919550989977?text=Hi%20ProDyum%20Entertainments%2C%20I%27d%20like%20to%20discuss%20a%20production%20enquiry."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-1 font-jakarta text-xs text-emerald-400 hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    WhatsApp Entertainments &amp; Media
                  </a>
                  <span className="font-jakarta text-[11px] text-slate-500 block mt-1.5">
                    Google Business listing: +91 91000 77001
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                    Operating Hours
                  </span>
                  <p className="font-jakarta text-sm text-white">
                    Monday – Saturday: 10:00 AM – 7:00 PM
                  </p>
                  <span className="font-mono text-xs text-slate-400">
                    Sunday: Closed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Handles */}
          <div className="pt-6 border-t border-white/[0.08]">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400 block mb-3">
              Official Media Channels
            </span>
<div className="space-y-4">
              {SOCIAL_DIRECTORY.map((group) => (
                <div key={group.brand}>
                  <span className={`font-jakarta text-xs font-semibold ${group.accent} block mb-1.5`}>
                    {group.brand}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 hover:border-cyan-accent/40 text-slate-300 hover:text-white font-jakarta text-[11px] transition-all"
                      >
                        {l.label}
                        <span className="sr-only"> — {group.brand}</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Functional Glass Contact & Booking Form */}
        <div className="lg:col-span-7 glass-card p-5 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/10">
          <div className="mb-5 sm:mb-6">
            <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5 sm:mb-2">
              Send Enquiry
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-400">
              Fill this short form and we will get back to you with scope, deliverables and a clear estimate.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Category Selector Pill */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                Select Engagement Domain *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setCategory('it')}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                    category === 'it'
                      ? 'bg-cyan-accent/15 border-cyan-accent text-white shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-syne font-bold text-sm text-white">
                      Hire for IT & Marketing
                    </span>
                    <span className={`w-2 h-2 rounded-full ${category === 'it' ? 'bg-cyan-accent' : 'bg-white/20'}`} />
                  </div>
                  <span className="font-jakarta text-[11px] sm:text-xs text-slate-400 block">
                    Web dev, Meta Ads, SEO, Brand UI/UX
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('film')}
                  className={`p-3 sm:p-3.5 rounded-2xl border text-left transition-all ${
                    category === 'film'
                      ? 'bg-amber-accent/15 border-amber-accent text-white shadow-[0_0_20px_rgba(255,184,0,0.25)]'
                      : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-syne font-bold text-sm text-white">
                      Discuss Film Production
                    </span>
                    <span className={`w-2 h-2 rounded-full ${category === 'film' ? 'bg-amber-accent' : 'bg-white/20'}`} />
                  </div>
                  <span className="font-jakarta text-[11px] sm:text-xs text-slate-400 block">
                    Feature films, OTT series, Line production
                  </span>
                </button>
              </div>
            </div>

            {/* Service + Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label htmlFor="enquiry-service" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Service Needed {category === 'it' ? '*' : '(optional)'}
                </label>
                <select
                  id="enquiry-service"
                  required={category === 'it'}
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                >
                  <option value="">Select a service…</option>
                  {ENQUIRY_SERVICES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                  {category === 'film' && <option value="Film / Media Production">Film / Media Production</option>}
                </select>
              </div>
              <div>
                <label htmlFor="enquiry-timeline" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Timeline
                </label>
                <select
                  id="enquiry-timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                >
                  {TIMELINE_OPTIONS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Budget (optional) */}
            <div>
              <label htmlFor="enquiry-budget" className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Budget — optional
              </label>
              <select
                id="enquiry-budget"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
              >
                <option value="">Select a range…</option>
                {activeBudgetTiers.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <p className="mt-1.5 font-jakarta text-[10px] sm:text-[11px] text-slate-500">
                Estimates are project-based unless agreed otherwise. Advertising spend is separate and billed by the platform.
              </p>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Reddy"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Nexus Ventures"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Phone or WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 00000"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Short Message *
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us briefly what you need — e.g. Instagram management for my boutique…"
                className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3.5 sm:py-4 rounded-2xl font-jakarta font-bold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50 ${
                category === 'it'
                  ? 'bg-cyan-accent hover:bg-cyan-400 text-black shadow-[0_0_30px_rgba(0,240,255,0.4)]'
                  : 'bg-amber-accent hover:bg-amber-400 text-black shadow-[0_0_30px_rgba(255,184,0,0.4)]'
              }`}
            >
              {isSubmitting ? (
                <span>Sending…</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry</span>
                </>
              )}
            </button>

            {/* Privacy notice (Meta lead-ads requirement) */}
            <p className="font-jakarta text-[11px] text-slate-500 leading-relaxed">
              ProDyum IT Private Limited will use the details you submit to respond to your
              enquiry and follow up about the requested services.{' '}
              <a href="/privacy-policy" className="text-cyan-accent hover:underline">Read our Privacy Policy</a>.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
