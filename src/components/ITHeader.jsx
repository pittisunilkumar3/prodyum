import React, { useState, useEffect } from 'react';
import { Menu, X, Monitor } from 'lucide-react';
import { Button } from './ui/button';

const ITHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Each nav item maps to a section id on the single /it page.
  const navLinks = [
    { section: 'home', label: 'Home' },
    { section: 'services', label: 'Services' },
    { section: 'portfolio', label: 'Portfolio' },
    { section: 'about', label: 'About' },
    { section: 'careers', label: 'Careers' },
    { section: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-spy: highlight the nav item for whichever section is in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    navLinks.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/it" className="flex items-center space-x-3 group relative z-10">
            <div className="relative">
              <div className={`h-12 w-12 bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                isScrolled ? 'opacity-80' : 'opacity-100'
              }`}>
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div className="absolute inset-0 bg-prodyum-blue-500/20 blur-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-white">ProDyum</span>
                <span className="bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 bg-clip-text text-transparent ml-1">IT</span>
              </span>
              <span className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-gray-400'}`}>Pvt Ltd</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={`/it#${link.section}`}
                onClick={handleNavClick}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                  activeSection === link.section
                    ? 'text-prodyum-blue-500'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 transition-all duration-300 ${
                  activeSection === link.section ? 'w-3/4' : 'w-0 group-hover:w-3/4'
                }`} />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              asChild
              className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold px-6 transition-all duration-300 hover:shadow-lg hover:shadow-prodyum-blue-500/50 hover:scale-105"
            >
              <a href="/it#contact">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 relative z-10"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/5 animate-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.section}
                  href={`/it#${link.section}`}
                  onClick={handleNavClick}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.section
                      ? 'text-prodyum-blue-500 bg-prodyum-blue-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                className="bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 text-white hover:from-prodyum-blue-600 hover:to-prodyum-green-600 font-bold mt-4"
              >
                <a href="/it#contact" onClick={handleNavClick}>
                  Get Started
                </a>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default ITHeader;
