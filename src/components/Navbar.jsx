import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, Search, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import { useBranding } from '../lib/branding';
import './Navbar.css';

const navLinks = [
  { id: 'home', label: 'Home', target: 'home', keywords: 'overview welcome' },
  { id: 'about', label: 'About', target: 'ecosystem', keywords: 'company ecosystem brands prodyum it entertainments media' },
  { id: 'services', label: 'Services', target: 'services', keywords: 'social media ads seo website design video marketing' },
  { id: 'work', label: 'Our Work', target: 'youtube-channels', keywords: 'portfolio work channels videos projects' },
  { id: 'careers', label: 'Careers', target: 'careers', keywords: 'jobs hiring work openings' },
  { id: 'contact', label: 'Contact', target: 'contact', keywords: 'email phone address office hyderabad enquiry' },
];
const additionalLinks = [];
const searchableLinks = [...navLinks, ...additionalLinks];

export default function Navbar({ activeVertical, setActiveVertical, onOpenProjectModal }) {
  const [scrolled, setScrolled] = useState(false);
  const brand = useBranding();
  const siteName = brand.site_name || 'ProDyum';
  const tagline = brand.site_tagline || 'IT · Media · Entertainments';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLink, setActiveLink] = useState('home');
  const [pendingLink, setPendingLink] = useState(null);
  const headerRef = useRef(null);
  const searchButtonRef = useRef(null);
  const searchInputRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = [
        ['hero-verticals', 'media'], ['ecosystem', 'about'],
        ['services', activeVertical === 'it' ? 'it' : 'services'],
        ['film-slate', activeVertical === 'entertainments' ? 'entertainments' : 'projects'],
        ['casting', 'casting'], ['careers', 'careers'], ['contact', 'contact'],
      ];
      let current = 'home';
      for (const [sectionId, linkId] of sections) {
        const section = document.getElementById(sectionId);
        if (section && section.getBoundingClientRect().top <= 130) current = linkId;
      }
      setActiveLink(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeVertical]);

  // Wait for the requested vertical to render before finding its destination.
  useEffect(() => {
    if (!pendingLink) return;
    const target = document.getElementById(pendingLink.target);
    if (target) {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
      if (pendingLink.id === 'media') {
        target.closest('article').scrollIntoView({ behavior, block: 'center', inline: 'center' });
      } else {
        const offset = headerRef.current?.getBoundingClientRect().height || 72;
        window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset - 20), behavior });
      }
      setActiveLink(pendingLink.id);
    }
    setPendingLink(null);
  }, [pendingLink, activeVertical]);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen && !mobileMenuOpen) return;
    const dismissOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setSearchOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const dismissOnEscape = (event) => {
      if (event.key !== 'Escape') return;
      if (searchOpen) searchButtonRef.current?.focus();
      else menuButtonRef.current?.focus();
      setSearchOpen(false);
      setMobileMenuOpen(false);
    };
    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, [searchOpen, mobileMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1200px)');
    const closeMobileMenu = () => { if (desktop.matches) setMobileMenuOpen(false); };
    desktop.addEventListener('change', closeMobileMenu);
    return () => desktop.removeEventListener('change', closeMobileMenu);
  }, []);

  const openProject = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onOpenProjectModal();
  };

  const navigate = (event, link) => {
    if (link.href || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      setMobileMenuOpen(false);
      setSearchOpen(false);
      return;
    }
    event.preventDefault();
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setActiveVertical(link.vertical || 'all');
    setPendingLink(link);
  };

  const renderLink = (link, searchResult = false) => {
    const className = searchResult ? 'site-search-result' : 'site-nav-link';
    if (link.action) {
      return <button key={link.id} type="button" className={className} onClick={openProject}>{link.label}{searchResult && <ArrowRight aria-hidden="true" />}</button>;
    }
    return (
      <a
        key={link.id}
        className={className}
        href={link.href || `#${link.target}`}
        target={link.href ? '_blank' : undefined}
        rel={link.href ? 'noopener noreferrer' : undefined}
        aria-current={!searchResult && activeLink === link.id ? 'location' : undefined}
        onClick={(event) => navigate(event, link)}
      >
        {link.label}
        {link.href && <span className="sr-only"> (opens in a new tab)</span>}
        {searchResult && (link.href ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />)}
      </a>
    );
  };

  const queryWords = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = queryWords.length
    ? searchableLinks.filter(link => queryWords.every(word => `${link.label} ${link.keywords}`.toLowerCase().includes(word)))
    : navLinks.filter(link => ['about', 'services', 'work', 'careers', 'contact'].includes(link.id));

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' site-header-scrolled' : ''}`}>
      <div className="site-header-inner">
        <a className="site-brand" href="#home" aria-label={`${siteName} home`} onClick={event => navigate(event, navLinks[0])}>
          {brand.logo_url ? (
            <img className="site-brand-mark site-brand-logo" src={brand.logo_url} alt={`${siteName} logo`} />
          ) : (
          <svg className="site-brand-mark" viewBox="0 0 48 58" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="header-brand-gradient" x1="3" y1="50" x2="43" y2="8" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0087FF" /><stop offset=".48" stopColor="#04B9D7" /><stop offset="1" stopColor="#00DA7E" />
              </linearGradient>
              <linearGradient id="header-brand-fold" x1="4" y1="7" x2="22" y2="53" gradientUnits="userSpaceOnUse">
                <stop stopColor="#69EDFF" /><stop offset=".45" stopColor="#0571FF" /><stop offset="1" stopColor="#0054BA" />
              </linearGradient>
            </defs>
            <path d="M9 3H24C38 3 46 12 46 26C46 40 36 48 22 48H16L7 56V12Z" fill="url(#header-brand-gradient)" />
            <path d="M9 3L22 10L16 48L7 56L3 51V15C3 9 5 5 9 3Z" fill="url(#header-brand-fold)" />
            <path d="M16 44V15H24C31 15 35 19 35 25C35 32 30 36 23 36H21" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 3H24" stroke="#92FFE7" strokeOpacity=".6" strokeLinecap="round" />
          </svg>
          )}
          <span className="site-brand-copy"><strong>{siteName}</strong><span>{tagline}</span></span>
        </a>

        <nav id="primary-navigation" aria-label="Main navigation" className={`site-primary-nav${mobileMenuOpen ? ' is-open' : ''}`}>
          {navLinks.map(link => renderLink(link))}
          <div className="site-mobile-extra-links">{additionalLinks.map(link => renderLink(link))}</div>
          <button type="button" className="site-promote-button site-mobile-promote" onClick={openProject}>Promote With ProDyum <ArrowRight aria-hidden="true" /></button>
        </nav>

        <div className="site-header-actions">
          <button ref={searchButtonRef} className="site-icon-button" type="button" aria-label={searchOpen ? 'Close site search' : 'Search site'} aria-expanded={searchOpen} aria-controls="site-search-panel" onClick={() => { setSearchOpen(!searchOpen); setMobileMenuOpen(false); }}>
            {searchOpen ? <X aria-hidden="true" /> : <Search aria-hidden="true" />}
          </button>
          <button type="button" className="site-promote-button site-desktop-promote" onClick={openProject}>Promote With ProDyum <ArrowRight aria-hidden="true" /></button>
          <button ref={menuButtonRef} type="button" className="site-icon-button site-menu-button" aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileMenuOpen} aria-controls="primary-navigation" onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setSearchOpen(false); }}>
            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <section id="site-search-panel" className="site-search-panel" aria-label="Site search">
          <label htmlFor="site-search-input">Find your next possibility</label>
          <div className="site-search-field"><Search aria-hidden="true" /><input ref={searchInputRef} id="site-search-input" type="search" placeholder="Search services, films, careers…" value={searchQuery} onChange={event => setSearchQuery(event.target.value)} autoComplete="off" /></div>
          <p className="site-search-caption" role="status">{queryWords.length ? `${results.length} matching ${results.length === 1 ? 'page' : 'pages'}` : 'Explore ProDyum'}</p>
          <div className="site-search-results">{results.map(link => renderLink(link, true))}</div>
          {!results.length && <p className="site-search-empty">No matches. Try “marketing”, “films”, or “careers”.</p>}
        </section>
      )}
    </header>
  );
}
