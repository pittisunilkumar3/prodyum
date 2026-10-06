import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCanvas from './components/HeroCanvas';
import Hero from './components/Hero';
import EcosystemSplitter from './components/EcosystemSplitter';
import ITBentoGrid from './components/ITBentoGrid';
import FilmSlate from './components/FilmSlate';
import CastingPortal from './components/CastingPortal';
import Careers from './components/Careers';
import ContactBooking from './components/ContactBooking';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import TrailerModal from './components/TrailerModal';
import Toast from './components/Toast';
import { initSiteSeo, applySectionSeo, restoreSiteSeo } from './lib/seo';

export default function App() {
  const [activeVertical, setActiveVertical] = useState('all'); // 'all' | 'it' | 'entertainments'
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isCastingModalOpen, setIsCastingModalOpen] = useState(false);
  const [activeTrailerId, setActiveTrailerId] = useState(null);
  const [toast, setToast] = useState(null);

  // ---- SEO & Meta (admin-managed) ----
  useEffect(() => {
    initSiteSeo();
    // Per-page meta: apply when a section scrolls into view (StackFood-style page SEO).
    // 'ecosystem' (top of page) restores the site default meta.
    const sectionIds = ['ecosystem', 'services', 'film-slate', 'casting', 'careers', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the MOST visible intersecting section (entries arrive in arbitrary order)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        if (visible.target.id === 'ecosystem') {
          restoreSiteSeo();
        } else {
          applySectionSeo(visible.target.id);
        }
      },
      { threshold: [0.15, 0.3] }
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // When the trailer modal closes, restore the site default meta
  useEffect(() => {
    if (!activeTrailerId) restoreSiteSeo();
  }, [activeTrailerId]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleVerticalChange = (vertical) => {
    setActiveVertical(vertical);
    if (vertical === 'it') {
      showToast('Ecosystem focused: ProDyum IT & Creative Services (Web Dev, SEO & Ads)', 'info');
      setTimeout(() => {
        const el = document.getElementById('services') || document.getElementById('ecosystem');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    } else if (vertical === 'entertainments') {
      showToast('Ecosystem focused: ProDyum Entertainments (Cinema, Web Series & Casting)', 'info');
      setTimeout(() => {
        const el = document.getElementById('film-slate') || document.getElementById('ecosystem');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    } else {
      showToast('Viewing All Ecosystem: ProDyum IT Services & Cinema Slate', 'info');
      setTimeout(() => {
        const el = document.getElementById('ecosystem');
        if (el) {
          const yOffset = -90;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleExploreIT = () => {
    handleVerticalChange('it');
  };

  const handleExploreFilms = () => {
    handleVerticalChange('entertainments');
  };

  return (
    <div className="relative min-h-screen bg-[#06080D] text-white selection:bg-cyan-accent/30 selection:text-white overflow-x-hidden font-inter">
      {/* Background Interactive Kinetic Canvas with Scroll Interpolation */}
      <HeroCanvas activeVertical={activeVertical} />

      {/* Global Ultra-Thin Glass Navigation */}
      <Navbar
        activeVertical={activeVertical}
        setActiveVertical={setActiveVertical}
        onVerticalChange={handleVerticalChange}
        onOpenProjectModal={() => setIsProjectModalOpen(true)}
      />

      {/* Floating Active Filter Status Banner */}
      {activeVertical !== 'all' && (
        <aside aria-label="Ecosystem Filter Status" className="fixed top-[78px] sm:top-20 left-1/2 -translate-x-1/2 z-40 animate-in fade-in slide-in-from-top-2 duration-300 pointer-events-auto max-w-[94vw]">
          <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full glass-modal border border-white/20 shadow-2xl backdrop-blur-xl">
            <span className={`w-2 h-2 rounded-full ${activeVertical === 'it' ? 'bg-cyan-accent animate-ping' : 'bg-amber-accent animate-ping'}`} />
            <span className="font-mono text-[10px] sm:text-xs text-slate-200 truncate">
              Filtered: <span className={activeVertical === 'it' ? 'text-cyan-accent font-semibold' : 'text-amber-accent font-semibold'}>
                {activeVertical === 'it' ? 'Creative & IT' : 'Entertainments'}
              </span>
            </span>
            <button
              type="button"
              onClick={() => handleVerticalChange('all')}
              className="text-[9px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer shrink-0"
            >
              Show All
            </button>
          </div>
        </aside>
      )}

      {/* Main Experience Flow */}
      <main className="relative z-10">
        {/* Kinetic Hero */}
        <Hero
          activeVertical={activeVertical}
          onResetVertical={() => handleVerticalChange('all')}
          onExploreIT={handleExploreIT}
          onExploreFilms={handleExploreFilms}
        />

        {/* Monumental Ecosystem Division Splitter */}
        <EcosystemSplitter
          activeVertical={activeVertical}
          onSelectIT={handleExploreIT}
          onSelectFilms={handleExploreFilms}
          onOpenTrailer={(id) => setActiveTrailerId(id)}
        />

        {/* IT & Creative Services Bento Grid (Visible in 'all' and 'it' views) */}
        {(activeVertical === 'all' || activeVertical === 'it') && (
          <div className="transition-all duration-500 animate-in fade-in">
            <ITBentoGrid onOpenProjectModal={() => setIsProjectModalOpen(true)} />
          </div>
        )}

        {/* Entertainments Showcase / Production Slate (Visible in 'all' and 'entertainments' views) */}
        {(activeVertical === 'all' || activeVertical === 'entertainments') && (
          <div className="transition-all duration-500 animate-in fade-in">
            <FilmSlate
              onOpenTrailer={(id) => setActiveTrailerId(id)}
              onOpenCasting={() => setIsCastingModalOpen(true)}
            />
          </div>
        )}

        {/* Talent & Casting Portal */}
        {(activeVertical === 'all' || activeVertical === 'entertainments') && (
          <CastingPortal
            isOpen={isCastingModalOpen}
            onOpen={() => setIsCastingModalOpen(true)}
            onClose={() => setIsCastingModalOpen(false)}
            onShowToast={showToast}
          />
        )}

        {/* Careers & Recruiting */}
        <Careers onShowToast={showToast} />

        {/* Two-Column Contact & Client Booking */}
        <ContactBooking onShowToast={showToast} />
      </main>

      {/* Brutalist Glass Footer with Live IST Clock */}
      <Footer onOpenProjectModal={() => setIsProjectModalOpen(true)} />

      {/* Global Modals */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onShowToast={showToast}
      />

      <TrailerModal
        projectId={activeTrailerId}
        onClose={() => setActiveTrailerId(null)}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
