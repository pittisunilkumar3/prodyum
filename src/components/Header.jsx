import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import MagneticButton from './animation/MagneticButton';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: '/entertainment', label: 'Home' },
    { path: '/entertainment/projects', label: 'Projects' },
    { path: '/entertainment/services', label: 'Services' },
    { path: '/entertainment/investors', label: 'Investors' },
    { path: '/entertainment/casting', label: 'Casting & Crew' },
    { path: '/entertainment/contact', label: 'Contact' },
  ];

  const isEntertainmentPage = location.pathname.startsWith('/entertainment');

  return (
    <motion.header
      initial={false}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <div className="mx-auto max-w-7xl">
        <motion.nav
          animate={{
            backgroundColor: isScrolled ? 'rgba(5,5,5,0.72)' : 'rgba(5,5,5,0)',
            boxShadow: isScrolled ? '0 20px 60px -25px rgba(0,0,0,0.7)' : '0 0 0 0 rgba(0,0,0,0)',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`relative flex items-center justify-between rounded-2xl px-4 py-3 backdrop-blur-xl ${
            isScrolled ? 'border border-white/10' : 'border border-transparent'
          }`}
        >
          {isScrolled && (
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          )}

          {/* Logo */}
          <Link
            to={isEntertainmentPage ? '/entertainment' : '/'}
            className="group relative z-10 flex items-center gap-3"
            data-cursor-label="Home"
          >
            <div className="relative">
              <img
                src="/logo.png"
                alt="ProDyum Logo"
                className={`h-11 w-11 object-contain transition-all duration-300 group-hover:scale-110 ${
                  isScrolled ? 'opacity-70' : 'opacity-100'
                }`}
              />
              <div className="absolute inset-0 rounded-full bg-prodyum-green-500/30 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">
              <span className="text-white">ProDyum</span>
              <span className="ml-1 text-gradient-animated">
                {isEntertainmentPage ? 'Entertainments' : 'IT'}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`}
                  data-cursor-label={link.label}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="ent-nav-active"
                      className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <MagneticButton strength={12}>
                <Button
                  asChild
                  className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-prodyum-green-500/25 transition-all duration-300 hover:shadow-prodyum-green-500/50"
                >
                  <Link to="/entertainment/contact" className="flex items-center gap-1.5" data-cursor-label="Get Started">
                    Get Started
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </MagneticButton>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl text-gray-200 transition-colors hover:bg-white/5 lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-3 mt-24 rounded-3xl glass-panel-strong p-5"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const active = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          active ? 'bg-white/5 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        {link.label}
                        <ArrowRight className={`h-4 w-4 transition-opacity ${active ? 'opacity-100 text-prodyum-green-400' : 'opacity-30'}`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <Button
                asChild
                className="mt-4 w-full rounded-xl bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 py-6 font-semibold text-white"
              >
                <Link to="/entertainment/contact">Get Started</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
