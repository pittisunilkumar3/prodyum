import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Youtube, Instagram, Facebook } from 'lucide-react';
import ScrollReveal from './animation/ScrollReveal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/5 bg-gradient-to-b from-transparent via-[#050505] to-black">
      {/* animated brand lighting */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-prodyum-blue-500/20 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -top-16 right-1/4 h-72 w-72 rounded-full bg-prodyum-green-500/20 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <ScrollReveal className="md:col-span-1">
            <Link to="/entertainment" className="group mb-4 flex items-center gap-3">
              <div className="relative">
                <img src="/logo.png" alt="ProDyum Logo" className="h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-full bg-prodyum-green-500/30 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <span className="font-display text-xl font-bold">
                <span className="text-white">Pro</span>
                <span className="text-gradient-animated">Dyum</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              A growing ecosystem of digital technology, marketing, and entertainment solutions.
            </p>
          </ScrollReveal>

          {/* Links */}
          <ScrollReveal delay={0.05}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/it" className="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-prodyum-blue-400">
                  ProDyum IT
                </Link>
              </li>
              <li>
                <Link to="/entertainment" className="text-sm text-gray-400 transition-colors hover:text-prodyum-lime-400">
                  ProDyum Entertainments
                </Link>
              </li>
              <li>
                <a href="#about" className="text-sm text-gray-400 transition-colors hover:text-white">About</a>
              </li>
              <li>
                <Link to="/entertainment/contact" className="text-sm text-gray-400 transition-colors hover:text-white">Contact</Link>
              </li>
            </ul>
          </ScrollReveal>

          {/* Services */}
          <ScrollReveal delay={0.1}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">Services</h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">Film Production</li>
              <li className="text-sm text-gray-400">Web Series</li>
              <li className="text-sm text-gray-400">Music Content</li>
              <li className="text-sm text-gray-400">Digital Media</li>
            </ul>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.15}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">Contact</h4>
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
              <Mail className="h-4 w-4 text-prodyum-green-400" />
              <a href="mailto:hr@prodyum.in" className="transition-colors hover:text-prodyum-lime-400">hr@prodyum.in</a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://youtube.com/@prodyumentertainments?si=KsDM4KsQnfHdTIFI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-prodyum-green-600 hover:text-white"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/prodyumentertainments?igsh=OTF2cjB6MmI5cDh6&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-prodyum-blue-600 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/share/1JkwxPbR4q/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:bg-prodyum-lime-600 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-gray-500">© {currentYear} ProDyum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
