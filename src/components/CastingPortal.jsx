import React, { useState } from 'react';
import {
  Users,
  Sparkles,
  Upload,
  X,
  CheckCircle2,
  Film,
  Camera,
  ArrowRight,
  ArrowLeft,
  FileCheck,
  AlertCircle,
} from 'lucide-react';
import { submitToApi } from '../lib/api';
import useLockBodyScroll from '../lib/useLockBodyScroll';

export default function CastingPortal({ isOpen, onOpen, onClose, onShowToast }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Hyderabad',
    roleCategory: 'Actor',
    portfolioUrl: '',
    experience: 'Intermediate (1-3 years)',
    headshotName: '',
    bio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [headshotPreview, setHeadshotPreview] = useState(null);

  // Freeze background scrolling while the audition wizard is open
  useLockBodyScroll(isOpen);

  const roleCategories = [
    'Lead / Supporting Actor',
    'Screenwriter / Dialogue Writer',
    'Assistant Director (AD)',
    'Cinematographer / Camera Operator',
    'Sound Designer / Foley Artist',
    '3D VFX / Post-Production Crew',
  ];

  const handleSimulatedFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, headshotName: file.name });
      const reader = new FileReader();
      reader.onload = () => {
        setHeadshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newAudition = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      roleCategory: formData.roleCategory,
      portfolioUrl: formData.portfolioUrl,
      experience: formData.experience,
      headshotName: formData.headshotName,
      headshotUploaded: !!headshotPreview,
      bio: formData.bio,
    };

    // Persist audition via API (falls back to localStorage if server unreachable).
    // The headshot image itself is not uploaded — only its filename + flag.
    const result = await submitToApi('casting', newAudition, 'prodyum_casting_applications');
    setIsSubmitting(false);

    onClose();
    onShowToast(
      result.persisted === 'server'
        ? `Audition portfolio submitted for ${formData.fullName || 'Talent'}! Prodyum Casting team in Kukatpally will review.`
        : `Server offline — your audition for ${formData.fullName || 'Talent'} was saved on this device instead.`,
      result.persisted === 'server' ? 'success' : 'info'
    );

    // Reset form
    setStep(1);
    setHeadshotPreview(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: 'Hyderabad',
      roleCategory: 'Lead / Supporting Actor',
      portfolioUrl: '',
      experience: 'Intermediate (1-3 years)',
      headshotName: '',
      bio: '',
    });
  };

  return (
    <>
      {/* Visual Callout Section on the Main Page */}
      <section id="casting" className="py-14 sm:py-20 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-3xl p-5 sm:p-8 md:p-12 glass-card border border-amber-accent/30 overflow-hidden shadow-[0_20px_60px_rgba(255,184,0,0.15)]">
          {/* Ambient Glow */}
          <div className="absolute -right-16 -top-16 w-60 sm:w-80 h-60 sm:h-80 bg-amber-accent/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 glass-pill text-amber-accent border-amber-accent/40 mb-3 sm:mb-4 text-[10px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Auditions & Talent Casting Open for 2026/2027</span>
              </div>

              <h2 className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3 sm:mb-4">
                Step into the Prodyum Cinematic Universe.
              </h2>

              <p className="font-jakarta text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                We are actively scouting visionary actors, cinematographers, screenwriters, and technical crew 
                for our upcoming magnum opus <span className="text-amber-accent font-semibold">Chronicles of Deccan</span> and 
                contemporary feature <span className="text-amber-accent font-semibold">Project Kukatpally</span>.
              </p>

              <div className="mt-4 sm:mt-6 flex flex-wrap gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span>Kukatpally Studio, Hyderabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span>Submissions Reviewed Weekly</span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <button
                onClick={() => {
                  // Open via state (App) so visibility, scroll lock and close stay in sync
                  if (onOpen) onOpen();
                }}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-amber-accent hover:bg-amber-400 text-black font-jakarta font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_0_35px_rgba(255,184,0,0.5)] transition-all duration-300 hover:scale-[1.02]"
              >
                <Users className="w-4 h-4 text-black" />
                <span>Submit Audition Tape</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Step Casting Submission Modal (Responsive Mobile Scroll) */}
      <div
        id="casting-modal"
        className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="relative w-full max-w-2xl my-auto max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl glass-modal p-5 sm:p-8 md:p-10 border border-amber-accent/30 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="mb-6 sm:mb-8 pr-8">
            <span className="glass-pill text-amber-accent border-amber-accent/30 text-[9px] sm:text-[10px] font-mono mb-2">
              ProDyum Entertainments • Talent Registry
            </span>
            <h3 className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-white">
              Casting & Crew Audition Portal
            </h3>
            <p className="font-jakarta text-xs sm:text-sm text-slate-400 mt-1">
              Step {step} of 3 • Direct review by Srikanth Singam & Direction Team
            </p>

            {/* Stepper Progress Bar */}
            <div className="flex gap-2 mt-4">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-amber-accent' : 'bg-white/10'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-amber-accent' : 'bg-white/10'}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-amber-accent' : 'bg-white/10'}`} />
            </div>
          </div>

          {/* Multi-Step Form */}
          <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); setStep(step + 1); }}>
            {/* STEP 1: Basic Identity & Role Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Varma"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Role Category *
                  </label>
                  <select
                    value={formData.roleCategory}
                    onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F19] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm"
                  >
                    {roleCategories.map((r) => (
                      <option key={r} value={r} className="bg-[#0B0F19] text-white">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Current Location / Base
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Hyderabad, Telangana"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Showreel & Portfolio Links */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Showreel / Demo Reel / YouTube / Vimeo Link *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.portfolioUrl}
                    onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=... or Google Drive link"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
                  />
                  <span className="block font-mono text-[10px] text-slate-400 mt-1">
                    Please ensure permissions are set to "Anyone with the link can view".
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Industry Experience Level
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F19] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm"
                  >
                    <option value="Fresher / Debut">Fresher / Debut (No prior film credits)</option>
                    <option value="Intermediate (1-3 years)">Intermediate (Short films, web series, indie)</option>
                    <option value="Professional (3-7 years)">Professional (Commercial releases)</option>
                    <option value="Veteran (7+ years)">Veteran (Extensive feature experience)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Past Works & Notable Credits (Summary)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Mention previous projects, theater training, workshops, or language proficiencies (Telugu, Hindi, Tamil, English)..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 focus:border-amber-accent focus:outline-none text-white text-sm placeholder:text-slate-600"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Headshot Upload Simulator & Review */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Headshot / Cast Photo Upload Simulator
                  </label>
                  <div className="border-2 border-dashed border-white/20 hover:border-amber-accent/60 rounded-2xl p-6 text-center transition-colors relative bg-white/[0.02]">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSimulatedFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    {headshotPreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={headshotPreview}
                          alt="Headshot Preview"
                          className="w-24 h-24 rounded-xl object-cover border border-amber-accent/50 shadow-md mb-2"
                        />
                        <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                          <FileCheck className="w-3.5 h-3.5" />
                          {formData.headshotName || 'headshot_selected.jpg'}
                        </span>
                        <span className="font-jakarta text-[11px] text-slate-400 mt-1">
                          Click to swap photo
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Camera className="w-8 h-8 text-amber-accent mb-2" />
                        <span className="font-jakarta text-sm text-slate-200 font-medium">
                          Drag & drop your primary headshot here
                        </span>
                        <span className="font-mono text-xs text-slate-400 mt-1">
                          JPG, PNG up to 15MB (High Resolution)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Review Card */}
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-jakarta space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Applicant:</span>
                    <span className="text-white font-semibold">{formData.fullName || 'Not provided'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Role:</span>
                    <span className="text-amber-accent font-semibold">{formData.roleCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contact:</span>
                    <span className="text-white">{formData.phone || formData.email || 'Not provided'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-accent/10 border border-amber-accent/20 text-xs font-jakarta text-amber-200">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-accent" />
                  <span>Selected applicants will receive a formal audition call slip for the Kukatpally studio screen test.</span>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/10 text-xs font-semibold text-slate-300 font-jakarta flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-accent hover:bg-amber-400 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(255,184,0,0.4)]"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-xl bg-amber-accent hover:bg-amber-400 disabled:opacity-50 text-black font-jakarta font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(255,184,0,0.5)] transition-all"
                >
                  {isSubmitting ? (
                    <span>Registering Application...</span>
                  ) : (
                    <>
                      <span>Transmit Audition Package</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
