import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  Cpu,
  Film,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { submitToApi } from '../lib/api';
import useLockBodyScroll from '../lib/useLockBodyScroll';

export default function ProjectModal({ isOpen, onClose, onShowToast }) {
  const [selectedVertical, setSelectedVertical] = useState('it');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'High-Performance Web App',
    timeline: 'Immediate (Next 14 Days)',
    details: '',
  });
  const [submitting, setSubmitting] = useState(false);

  // Freeze background scrolling while the modal is open (must stay above the early return)
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const newProject = {
      vertical: selectedVertical,
      verticalName: selectedVertical === 'it' ? 'IT & Creative' : 'Entertainments',
      ...formData,
    };

    // Persist project request via API (falls back to localStorage if server unreachable)
    const result = await submitToApi('projects', newProject, 'prodyum_project_requests');
    setSubmitting(false);

    onClose();
    onShowToast(
      result.persisted === 'server'
        ? `Project request received! Srikanth Singam & the executive desk will contact you within 24 hours.`
        : `Server offline — your project request was saved on this device instead.`,
      result.persisted === 'server' ? 'success' : 'info'
    );

    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'High-Performance Web App',
      timeline: 'Immediate (Next 14 Days)',
      details: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl my-auto sm:my-8 rounded-2xl sm:rounded-3xl glass-modal p-4 sm:p-8 border border-white/20 shadow-2xl max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 glass-pill text-cyan-accent border-cyan-accent/30 text-[10px] font-mono mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Fast-Track Executive Onboarding</span>
          </div>
          <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
            Initiate Project with Prodyum
          </h3>
          <p className="font-jakarta text-xs sm:text-sm text-slate-400 mt-1">
            Directly evaluated by Srikanth Singam & the Hyderabad Senior Engineering / Production Desk.
          </p>
        </div>

        {/* Vertical Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setSelectedVertical('it')}
            className={`p-3 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedVertical === 'it'
                ? 'bg-cyan-accent/20 border-cyan-accent text-white shadow-[0_0_20px_rgba(0,240,255,0.3)]'
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-accent" />
            <span>IT & Marketing</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedVertical('film')}
            className={`p-3 rounded-xl border text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
              selectedVertical === 'film'
                ? 'bg-amber-accent/20 border-amber-accent text-white shadow-[0_0_20px_rgba(255,184,0,0.3)]'
                : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4 text-amber-accent" />
            <span>Entertainments</span>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Anand V."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Official Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="anand@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                WhatsApp / Mobile *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 99999 88888"
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Service Domain *
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0C101A] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-xs"
              >
                {selectedVertical === 'it' ? (
                  <>
                    <option value="High-Performance Web App">High-Performance Web App (React/Node)</option>
                    <option value="Meta & Google Performance Ads">Meta & Google Performance Ads (+340% ROAS)</option>
                    <option value="Strategic SEO & Entity Domination">Strategic SEO & Entity Domination</option>
                    <option value="Brand Identity & 3D Spatial UI">Brand Identity & 3D Spatial UI</option>
                    <option value="Custom Enterprise Software">Custom Enterprise Architecture</option>
                  </>
                ) : (
                  <>
                    <option value="Feature Film Co-Production">Feature Film Co-Production</option>
                    <option value="OTT Web Series Pitch & Execution">OTT Web Series Pitch & Execution</option>
                    <option value="Commercial / Brand Film Production">Commercial / Brand Film Production</option>
                    <option value="Cinematic Music Video">Cinematic Music Video (4K 60FPS)</option>
                    <option value="Line Production Hyderabad">Line Production Services (Telangana/AP)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                Target Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#0C101A] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-xs"
              >
                <option value="Immediate (Next 14 Days)">Immediate (Next 14 Days)</option>
                <option value="1 - 3 Months">1 - 3 Months</option>
                <option value="Q3/Q4 2026 Strategy">Q3/Q4 2026 Strategy</option>
                <option value="Long-Term Institutional">Long-Term Institutional Partnership</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
              Brief Description of Scope
            </label>
            <textarea
              rows={3}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="Tell us what you want to achieve, existing metrics, or target deliverables..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 focus:border-cyan-accent focus:outline-none text-white text-base sm:text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-accent to-cyan-400 hover:from-cyan-300 hover:to-cyan-500 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] disabled:opacity-50 transition-all"
            >
              {submitting ? 'Connecting with Executive Desk...' : 'Dispatch Project Blueprint'}
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Strict NDA & Non-Disclosure Protection by Default</span>
          </div>
        </form>
      </div>
    </div>
  );
}
