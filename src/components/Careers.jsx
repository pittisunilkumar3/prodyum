import React, { useState } from 'react';
import {
  Briefcase,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
  Clock,
  IndianRupee,
  Send,
  CheckCircle2,
  X,
} from 'lucide-react';
import { CAREER_LISTINGS } from '../data/content';
import { submitToApi } from '../lib/api';
import useLockBodyScroll from '../lib/useLockBodyScroll';

export default function Careers({ onShowToast }) {
  const [expandedId, setExpandedId] = useState(CAREER_LISTINGS[0].id);
  const [applyModalJob, setApplyModalJob] = useState(null);
  const [applicantData, setApplicantData] = useState({
    name: '',
    email: '',
    phone: '',
    portfolio: '',
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Freeze background scrolling while the apply modal is open
  useLockBodyScroll(!!applyModalJob);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const appliedTitle = applyModalJob?.title;

    const newApplication = {
      jobId: applyModalJob?.id,
      jobTitle: appliedTitle,
      vertical: applyModalJob?.vertical,
      ...applicantData,
    };

    // Persist application via API (falls back to localStorage if server unreachable)
    const result = await submitToApi('applications', newApplication, 'prodyum_career_applications');
    setSubmitting(false);

    setApplyModalJob(null);
    setApplicantData({ name: '', email: '', phone: '', portfolio: '', note: '' });
    onShowToast(
      result.persisted === 'server'
        ? `Application received for "${appliedTitle}". Our HR team will reach out within 48 hours!`
        : `Server offline — your application for "${appliedTitle}" was saved on this device instead.`,
      result.persisted === 'server' ? 'success' : 'info'
    );
  };

  return (
    <section id="careers" className="py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6 border-b border-white/[0.08] pb-6 sm:pb-8">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.2em] text-cyan-accent mb-2 sm:mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            Human Capital & Recruitment
          </div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Careers at Prodyum
          </h2>
        </div>
        <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-md">
          Join the elite team shaping high-growth digital commerce and boundary-pushing cinema in Hyderabad. 
          You will work across ProDyum IT, Entertainments and Media on real client and production work, with clear briefs and room to grow.
        </p>
      </div>

      {/* Expandable Glass Accordions */}
      <div className="space-y-3.5 sm:space-y-4">
        {CAREER_LISTINGS.map((job) => {
          const isExpanded = expandedId === job.id;
          const isIT = job.vertical === 'Creative & IT';

          return (
            <div
              key={job.id}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                isExpanded
                  ? isIT
                    ? 'border-cyan-accent/50 bg-white/[0.06] shadow-[0_15px_40px_rgba(0,240,255,0.12)]'
                    : 'border-amber-accent/50 bg-white/[0.06] shadow-[0_15px_40px_rgba(255,184,0,0.12)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(job.id)}
                className="w-full p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-left focus:outline-none"
                aria-expanded={isExpanded}
              >
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`font-mono text-[9px] sm:text-[10px] uppercase px-2 sm:px-2.5 py-0.5 rounded-full border ${
                        isIT
                          ? 'text-cyan-accent bg-cyan-accent/10 border-cyan-accent/30'
                          : 'text-amber-accent bg-amber-accent/10 border-amber-accent/30'
                      }`}
                    >
                      {job.vertical}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] text-slate-400">
                      {job.department}
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-lg sm:text-xl md:text-2xl text-white">
                    {job.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 sm:gap-6 self-end sm:self-center">
                  <div className="text-right hidden md:block">
                    <span className="font-mono text-xs text-slate-300 block font-semibold">
                      {job.type}
                    </span>
                    <span className="font-jakarta text-[11px] text-slate-400 block">
                      {job.experience}
                    </span>
                  </div>

                  <div className="p-1.5 sm:p-2 rounded-full bg-white/[0.05] border border-white/10 text-slate-300">
                    {isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                  </div>
                </div>
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-6 pb-8 sm:px-8 pt-2 border-t border-white/[0.08] animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 mb-6">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h4 className="font-mono text-xs uppercase text-slate-400 mb-2">
                          Role Overview
                        </h4>
                        <p className="font-jakarta text-sm text-slate-300 leading-relaxed">
                          {job.overview}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs uppercase text-slate-400 mb-2">
                          Key Technical Requirements
                        </h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-jakarta text-slate-300">
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 mt-0.5 ${
                                  isIT ? 'text-cyan-accent' : 'text-amber-accent'
                                }`}
                              />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Meta Snapshot Card */}
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                      <div className="space-y-3 font-jakarta text-xs">
                        <div>
                          <span className="text-slate-400 block">Experience Range:</span>
                          <span className="text-white font-semibold">{job.experience}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">Location:</span>
                          <span className="text-white font-semibold">Kukatpally, Hyderabad (On-site)</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">How to Apply:</span>
                          <span className="text-white font-semibold">CV + portfolio to hr@prodyum.in or WhatsApp +91 9949590033</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setApplyModalJob(job)}
                        className={`mt-6 w-full py-3 rounded-xl font-jakarta font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                          isIT
                            ? 'bg-cyan-accent hover:bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                            : 'bg-amber-accent hover:bg-amber-400 text-black shadow-[0_0_20px_rgba(255,184,0,0.4)]'
                        }`}
                      >
                        <span>Apply for Position</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Job Application Modal */}
      {applyModalJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 rounded-3xl glass-modal p-6 sm:p-8 border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setApplyModalJob(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="font-mono text-[10px] uppercase text-cyan-accent tracking-widest block mb-1">
                Careers • Prodyum Hyderabad
              </span>
              <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
                Apply: {applyModalJob.title}
              </h3>
              <p className="font-jakarta text-xs text-slate-400 mt-1">
                Direct submission to the engineering & talent desk.
              </p>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={applicantData.name}
                  onChange={(e) => setApplicantData({ ...applicantData, name: e.target.value })}
                  placeholder="Srikanth Sharma"
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantData.email}
                    onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                    placeholder="srikanth@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={applicantData.phone}
                    onChange={(e) => setApplicantData({ ...applicantData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Portfolio / GitHub / LinkedIn / Behance URL *
                </label>
                <input
                  type="url"
                  required
                  value={applicantData.portfolio}
                  onChange={(e) => setApplicantData({ ...applicantData, portfolio: e.target.value })}
                  placeholder="https://github.com/... or https://behance.net/..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                  Brief Cover Note / Greatest Achievement
                </label>
                <textarea
                  rows={3}
                  value={applicantData.note}
                  onChange={(e) => setApplicantData({ ...applicantData, note: e.target.value })}
                  placeholder="Tell us what you built or scaled that you are most proud of..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-sm"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-accent to-amber-accent text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50"
                >
                  {submitting ? 'Transmitting Dossier...' : 'Submit Application Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
