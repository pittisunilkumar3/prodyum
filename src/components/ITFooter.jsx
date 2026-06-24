import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Twitter, Instagram, Facebook, ArrowRight, Monitor } from 'lucide-react';
import { Button } from './ui/button';
import MagneticButton from './animation/MagneticButton';
import ScrollReveal from './animation/ScrollReveal';

const ITFooter = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/it', label: 'Home' },
    { path: '/it/services', label: 'Services' },
    { path: '/it/portfolio', label: 'Portfolio' },
    { path: '/it/about', label: 'About Us' },
    { path: '/it/careers', label: 'Careers' },
    { path: '/it/contact', label: 'Contact' },
  ];

  const services = [
    'Digital Marketing',
    'Branding & Design',
    'Web Development',
    'Video & Multimedia',
    'SEO Services',
    'Social Media Management',
  ];

  const socials = [
    { icon: Linkedin, href: 'https://linkedin.com', hover: 'group-hover:bg-prodyum-blue-600', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', hover: 'group-hover:bg-prodyum-green-600', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', hover: 'group-hover:bg-prodyum-lime-600', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', hover: 'group-hover:bg-prodyum-blue-700', label: 'Facebook' },
  ];

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-gradient-to-b from-[#060b14] via-[#040810] to-ink">
      {/* glowing top brand line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-prodyum-green-500/60 to-transparent" />

      {/* vibrant animated glow backdrop — spread across the whole footer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[5%] top-[8%] h-80 w-80 rounded-full bg-prodyum-blue-500/25 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[8%] top-[20%] h-80 w-80 rounded-full bg-prodyum-green-500/25 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 40, 0], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[12%] left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-prodyum-lime-500/15 blur-3xl"
          animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* grid texture */}
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_75%)]" />
        {/* top radial wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,136,229,0.10),transparent_55%)]" />
      </div>

      {/* CTA band */}
      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="group relative my-10 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-prodyum-blue-600 to-prodyum-green-600 p-8 shadow-2xl shadow-prodyum-blue-500/30 md:p-12">
              <div className="absolute inset-0 bg-dots opacity-25" />
              {/* animated shimmer sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-[1200ms] group-hover:translate-x-full" />
              <div className="relative z-10 flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
                    Ready to Grow Your Business Online?
                  </h3>
                  <p className="mt-2 text-white/80">
                    Let&apos;s discuss how we can help you achieve your digital goals.
                  </p>
                </div>
                <MagneticButton strength={14}>
                  <Button
                    asChild
                    className="bg-white px-8 py-6 text-lg font-bold text-prodyum-blue-600 shadow-xl transition-transform hover:scale-105 hover:bg-gray-100"
                  >
                    <Link to="/it/contact" className="flex items-center gap-2">
                      Contact Us <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </MagneticButton>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Main footer — glass panel container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-3xl glass-panel gradient-border p-8 md:p-10">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
              {/* Company */}
              <div className="space-y-6">
                <Link to="/it" className="group flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 shadow-lg shadow-prodyum-blue-500/40 transition-transform group-hover:scale-110">
                      <Monitor className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-60" />
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-xl font-bold text-white">ProDyum IT</span>
                    <span className="mt-0.5 text-[10px] uppercase tracking-[0.25em] text-prodyum-green-400">Pvt Ltd</span>
                  </div>
                </Link>
                <p className="text-sm leading-relaxed text-gray-300">
                  ProDyum IT Pvt Ltd is a Hyderabad-based digital solutions company focused on helping businesses grow through technology, creativity, and strategic digital marketing.
                </p>
                <div className="flex items-center gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`group flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-prodyum-blue-500/10 to-prodyum-green-500/10 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:text-white hover:shadow-lg ${s.hover}`}
                    >
                      <s.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500" />
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-prodyum-green-400"
                      >
                        <ArrowRight className="h-3 w-3 -ml-5 text-prodyum-green-400 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500" />
                  Our Services
                </h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link
                        to="/it/services"
                        className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-prodyum-blue-400"
                      >
                        <ArrowRight className="h-3 w-3 -ml-5 text-prodyum-blue-400 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-prodyum-lime-500 to-prodyum-blue-500" />
                  Contact Us
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-prodyum-green-500/20 bg-prodyum-green-500/10">
                      <MapPin className="h-5 w-5 text-prodyum-green-400" />
                    </div>
                    <span className="pt-2 text-sm text-gray-200">Hyderabad, Telangana, India</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-prodyum-blue-500/20 bg-prodyum-blue-500/10">
                      <Mail className="h-5 w-5 text-prodyum-blue-400" />
                    </div>
                    <a href="mailto:hr@prodyum.in" className="text-sm text-gray-200 transition-colors hover:text-prodyum-green-400">
                      hr@prodyum.in
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-10 border-t border-white/10 pt-8">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-sm text-gray-400">
                  © {currentYear} ProDyum IT Pvt Ltd. All Rights Reserved.
                </p>
                <div className="flex items-center gap-6">
                  <Link to="/it" className="text-sm text-gray-400 transition-colors hover:text-prodyum-green-400">Privacy Policy</Link>
                  <Link to="/it" className="text-sm text-gray-400 transition-colors hover:text-prodyum-green-400">Terms of Service</Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};

export default ITFooter;
