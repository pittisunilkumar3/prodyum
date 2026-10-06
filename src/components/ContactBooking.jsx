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
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { submitToApi } from '../lib/api';

export default function ContactBooking({ onShowToast }) {
  const [category, setCategory] = useState('it');
  const [budgetIndex, setBudgetIndex] = useState(2);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    timeline: 'Within 30 Days',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const budgetTiersIT = [
    '₹2,50,000 - ₹5,00,000 ($3k - $6k)',
    '₹5,00,000 - ₹12,00,000 ($6k - $15k)',
    '₹12,00,000 - ₹25,00,000 ($15k - $30k)',
    '₹25,00,000 - ₹50,00,000+ ($30k - $65k+)',
    'Enterprise Custom Retainer',
  ];

  const budgetTiersFilm = [
    '₹5,00,000 - ₹15,00,000 (Shorts & Indie)',
    '₹15,00,000 - ₹35,00,000 (Music Video & Commercial)',
    '₹35,00,000 - ₹1,00,00,000 (Web Series Slate)',
    '₹1,00,00,000 - ₹5,00,00,000+ (Feature Co-Production)',
    'Institutional / Studio Slate Investment',
  ];

  const activeBudgetTiers = category === 'it' ? budgetTiersIT : budgetTiersFilm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const verticalName = category === 'it' ? 'IT & Growth Strategy' : 'Entertainments & Film Production';

    const newInquiry = {
      category,
      categoryName: verticalName,
      budgetTier: activeBudgetTiers[budgetIndex],
      ...formData,
    };

    // Persist inquiry via API (falls back to localStorage if server unreachable)
    const result = await submitToApi('inquiries', newInquiry, 'prodyum_inquiries');
    setIsSubmitting(false);

    onShowToast(
      result.persisted === 'server'
        ? `Thank you ${formData.name || 'Partner'}! Your ${verticalName} proposal was dispatched to Srikanth Singam & Leadership.`
        : `Server offline — your ${verticalName} inquiry was saved on this device instead.`,
      result.persisted === 'server' ? 'success' : 'info'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      timeline: 'Within 30 Days',
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
            Initiate Collaboration
          </h2>
        </div>
        <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-md">
          Ready to scale market share or produce high-impact cinema? Reach out directly to our Hyderabad headquarters.
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
              Prodyum Pvt. Ltd.
            </h3>
            <p className="font-jakarta text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-slate-400 font-mono mb-6 sm:mb-8">
              Founder & Director: {COMPANY_INFO.founder}
            </p>

            {/* Location & Contact Meta Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="p-2.5 rounded-xl bg-cyan-accent/10 text-cyan-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                    Studio & Office Address
                  </span>
                  <p className="font-jakarta text-sm text-white font-medium">
                    {COMPANY_INFO.headquarters}
                  </p>
                  <span className="font-mono text-xs text-cyan-accent block mt-1">
                    PIN: {COMPANY_INFO.pincode} • Telangana, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <div className="p-2.5 rounded-xl bg-amber-accent/10 text-amber-accent shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-slate-400 block mb-0.5">
                    Direct Executive Emails
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="font-jakarta text-sm text-white hover:text-cyan-accent block transition-colors"
                  >
                    {COMPANY_INFO.email}
                  </a>
                  <a
                    href={`mailto:${COMPANY_INFO.castingEmail}`}
                    className="font-jakarta text-xs text-slate-400 hover:text-amber-accent block transition-colors mt-0.5"
                  >
                    Casting: {COMPANY_INFO.castingEmail}
                  </a>
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
                    Monday - Saturday: 09:30 - 19:00 IST
                  </p>
                  <span className="font-mono text-xs text-slate-400">
                    Emergency SLA: 24/7 Priority Support
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
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.05] hover:bg-cyan-accent/20 border border-white/10 hover:border-cyan-accent/40 text-slate-300 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.05] hover:bg-amber-accent/20 border border-white/10 hover:border-amber-accent/40 text-slate-300 hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.05] hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-slate-300 hover:text-white transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socials.x}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.05] hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all font-mono text-xs px-3.5"
                aria-label="X / Twitter"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Functional Glass Contact & Booking Form */}
        <div className="lg:col-span-7 glass-card p-5 sm:p-8 md:p-10 rounded-3xl relative overflow-hidden border border-white/10">
          <div className="mb-5 sm:mb-6">
            <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-white mb-1.5 sm:mb-2">
              Dispatch Project Brief
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-400">
              Select your inquiry domain to calibrate appropriate engineering and creative leadership.
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

            {/* Budget Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[11px] sm:text-xs font-mono uppercase text-slate-300">
                  Estimated Capital Allocation
                </label>
                <span
                  className={`font-mono text-[11px] sm:text-xs font-bold truncate max-w-[50%] text-right ${
                    category === 'it' ? 'text-cyan-accent' : 'text-amber-accent'
                  }`}
                >
                  {activeBudgetTiers[budgetIndex]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={activeBudgetTiers.length - 1}
                step="1"
                value={budgetIndex}
                onChange={(e) => setBudgetIndex(parseInt(e.target.value))}
                className="w-full accent-cyan-accent cursor-pointer h-2 bg-white/10 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[9px] sm:text-[10px] font-mono text-slate-500 mt-1.5">
                <span>Essential Scope</span>
                <span>Mid-Tier</span>
                <span>Flagship Enterprise</span>
              </div>
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
                  Corporate / Entity Name
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
                  Business Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="vikram@nexus.com"
                  className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Direct Phone / WhatsApp *
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
                Project Scope & Deliverable Objectives *
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Outline your target KPIs, technical prerequisites, script premise, or marketing objectives..."
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
                <span>Routing to Hyderabad Desk...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Transmit Official Proposal</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
