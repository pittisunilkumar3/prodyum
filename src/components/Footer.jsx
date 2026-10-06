import React, { useState, useEffect } from 'react';
import {
  ArrowUp,
  MapPin,
  Clock,
  Shield,
  Sparkles,
  Layers,
  Cpu,
  Film,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
} from 'lucide-react';
import { useBranding } from '../lib/branding';
import { COMPANY_INFO } from '../data/content';

const SOCIAL_ICONS = [
  { key: 'facebook_link', label: 'Facebook', icon: Facebook },
  { key: 'instagram_link', label: 'Instagram', icon: Instagram },
  { key: 'twitter_link', label: 'Twitter / X', icon: Twitter },
  { key: 'linkedin_link', label: 'LinkedIn', icon: Linkedin },
  { key: 'youtube_link', label: 'YouTube', icon: Youtube },
  { key: 'whatsapp_link', label: 'WhatsApp', icon: MessageCircle },
];

export default function Footer({ onOpenProjectModal }) {
  const [istTime, setIstTime] = useState('');
  const brand = useBranding();
  const siteName = brand.site_name || 'PRODYUM';
  const social = brand; // same API response carries the social links

  // Live Indian Standard Time (IST: UTC+5:30) Clock
  useEffect(() => {
    const updateIST = () => {
      const now = new Date();
      // Calculate IST time
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const istDate = new Date(utc + 3600000 * 5.5);

      const hours = istDate.getHours().toString().padStart(2, '0');
      const minutes = istDate.getMinutes().toString().padStart(2, '0');
      const seconds = istDate.getSeconds().toString().padStart(2, '0');

      setIstTime(`${hours}:${minutes}:${seconds} IST (UTC+05:30)`);
    };

    updateIST();
    const interval = setInterval(updateIST, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060A] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Background Ambient Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-t from-cyan-accent/5 via-amber-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Top Brutalist Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {brand.logo_url && (
                <img src={brand.logo_url} alt={`${siteName} logo`} className="h-10 w-auto" />
              )}
              <span className="font-syne font-extrabold text-3xl tracking-tight text-white">
                {siteName.toUpperCase()}
              </span>
              <span className="glass-pill text-[10px] font-mono text-cyan-accent border-cyan-accent/30">
                PVT. LTD.
              </span>
            </div>
            <p className="font-jakarta text-xs sm:text-sm text-slate-400 max-w-xl">
              A synergistic powerhouse uniting enterprise digital architecture, mathematical performance marketing, 
              and cinematic film production under the visionary direction of Srikanth Singam.
            </p>

            {/* Social icons — admin-managed (Settings → Social Media URLs) */}
            {social && (
              <div className="flex items-center gap-2.5 mt-5 flex-wrap">
                {SOCIAL_ICONS.map(({ key, label, icon: Icon }) =>
                  social[key] ? (
                    <a
                      key={key}
                      href={social[key]}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      title={label}
                      className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-slate-400 hover:text-cyan-accent hover:border-cyan-accent/40 hover:bg-cyan-accent/10 transition-all"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Live Indian Standard Time (IST) Clock & HQ Studio Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-cyan-accent/10 text-cyan-accent">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 block">
                  Hyderabad Local Time
                </span>
                <span className="font-mono text-xs sm:text-sm text-cyan-accent font-semibold tracking-wider font-timecode">
                  {istTime || '16:33:00 IST'}
                </span>
              </div>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="font-mono text-[10px] uppercase text-slate-500 block">
                  Studio Operations
                </span>
                <span className="font-jakarta text-xs sm:text-sm text-emerald-400 font-medium">
                  Kukatpally Node Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Column Sitemap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10 sm:py-12 border-b border-white/[0.08] text-xs font-jakarta">
          {/* Col 1: IT Services */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-accent flex items-center gap-1.5 mb-4 font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              Creative & IT
            </span>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">High-Performance Web Apps</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Meta & Google Performance Ads</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Strategic SEO & Authority</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Brand Identity & 3D Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Conversion Rate Optimization</a></li>
            </ul>
          </div>

          {/* Col 2: Entertainments */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-accent flex items-center gap-1.5 mb-4 font-semibold">
              <Film className="w-3.5 h-3.5" />
              Entertainments
            </span>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#film-slate" className="hover:text-white transition-colors">Chronicles of Deccan (Series)</a></li>
              <li><a href="#film-slate" className="hover:text-white transition-colors">Echoes of Silence (Short)</a></li>
              <li><a href="#film-slate" className="hover:text-white transition-colors">Project Kukatpally (Feature)</a></li>
              <li><a href="#film-slate" className="hover:text-white transition-colors">Rhythm of Telangana (Music)</a></li>
              <li><a href="#casting" className="hover:text-white transition-colors">Talent Casting & Auditions</a></li>
            </ul>
          </div>

          {/* Col 3: Enterprise & Careers */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 flex items-center gap-1.5 mb-4 font-semibold">
              <Layers className="w-3.5 h-3.5" />
              Enterprise
            </span>
            <ul className="space-y-2.5 text-slate-400">
              <li><a href="#careers" className="hover:text-white transition-colors">Open Positions (Hiring)</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition-colors">Synergistic Dual Model</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Kukatpally Studio Hub</a></li>
              <li><a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">Press & Media Inquiries</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Investor & Studio Relations</a></li>
            </ul>
          </div>

          {/* Col 4: Corporate Governance */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-slate-300 flex items-center gap-1.5 mb-4 font-semibold">
              <Shield className="w-3.5 h-3.5" />
              Governance & HQ
            </span>
            <div className="space-y-2 text-slate-400">
              <p className="text-white font-medium">Prodyum Private Limited</p>
              <p>CIN / Enterprise Reg: Hyderabad</p>
              <p>Kukatpally, Hyderabad - 500072</p>
              <p>Telangana, Republic of India</p>
              <div className="pt-2">
                <button
                  onClick={onOpenProjectModal}
                  className="px-3.5 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/15 text-white text-[11px] font-mono transition-colors"
                >
                  Initiate Booking
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Brutalist Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jakarta text-slate-500">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} Srikanth Singam & Prodyum Pvt. Ltd. All rights reserved.
            </span>
            <a href="/privacy-policy" className="hover:text-cyan-accent transition-colors">Privacy Policy</a>
            <a href="/terms-conditions" className="hover:text-cyan-accent transition-colors">Terms & Conditions</a>
            <a href="/refund-policy" className="hover:text-cyan-accent transition-colors">Refund Policy</a>
            <span className="hidden sm:inline">•</span>
            <span>prodyum.in</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-mono text-[11px]">Hyderabad • India</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/15 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center gap-1.5 font-mono text-xs"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
