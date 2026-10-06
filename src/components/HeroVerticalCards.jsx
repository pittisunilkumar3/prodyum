import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft, ArrowRight, AudioLines, BadgeCheck, ChartNoAxesCombined,
  Clapperboard, CodeXml, Cpu, Film, Mic, Music2, Play, Users, Video, Youtube,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

const verticals = [
  {
    id: 'it', name: 'IT', subtitle: 'Digital Marketing & IT Solutions',
    tagline: 'Build Your Digital Presence', icon: Cpu,
    services: [
      { label: 'Digital Marketing', icon: ChartNoAxesCombined },
      { label: 'Branding', icon: BadgeCheck },
      { label: 'Web Development', icon: CodeXml },
      { label: 'IT Solutions', icon: Cpu },
    ],
  },
  {
    id: 'media', name: 'Media', subtitle: 'Media & Digital Content',
    tagline: 'Create. Publish. Reach.', icon: AudioLines,
    services: [
      { label: 'YouTube Content', icon: Youtube },
      { label: 'Podcasts', icon: Mic },
      { label: 'Interviews', icon: Users },
      { label: 'Digital Promotions', icon: ChartNoAxesCombined },
    ],
  },
  {
    id: 'entertainments', name: 'Entertainments', subtitle: 'Film & Entertainment Production',
    tagline: 'Stories Made for Audiences', icon: Clapperboard,
    services: [
      { label: 'Web Series', icon: Film },
      { label: 'Short Films', icon: Video },
      { label: 'Feature Films', icon: Clapperboard },
      { label: 'Music Videos', icon: Music2 },
    ],
  },
];

export default function HeroVerticalCards({ onExploreIT, onExploreFilms }) {
  const trackRef = useRef(null);
  const [scrollState, setScrollState] = useState({ previous: false, next: false });

  useEffect(() => {
    const track = trackRef.current;
    const updateScrollState = () => {
      setScrollState({
        previous: track.scrollLeft > 2,
        next: track.scrollWidth - track.clientWidth - track.scrollLeft > 2,
      });
    };
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    track.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => {
      observer.disconnect();
      track.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  const scrollCards = (direction) => {
    const track = trackRef.current;
    const card = track.querySelector('.hero-vertical-card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const handleKeyDown = (event) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      scrollCards(event.key === 'ArrowLeft' ? -1 : 1);
    }
  };

  return (
    <section id="hero-verticals" className="hero-verticals" aria-labelledby="hero-verticals-heading">
      <div className="hero-verticals-toolbar">
        <h2 id="hero-verticals-heading">Three verticals. <span>Limitless possibilities.</span></h2>
        <div className="hero-carousel-controls">
          <span id="hero-carousel-help">Scroll to explore</span>
          <button type="button" aria-label="Scroll to previous vertical" aria-controls="hero-card-track" disabled={!scrollState.previous} onClick={() => scrollCards(-1)}>
            <ArrowLeft aria-hidden="true" />
          </button>
          <button type="button" aria-label="Scroll to next vertical" aria-controls="hero-card-track" disabled={!scrollState.next} onClick={() => scrollCards(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </div>
      <div id="hero-card-track" ref={trackRef} className="hero-card-track" tabIndex={0} role="region" aria-label="ProDyum vertical cards" aria-describedby="hero-carousel-help" onKeyDown={handleKeyDown}>
        {verticals.map((vertical) => {
          const DecorativeIcon = vertical.icon;
          const Action = vertical.id === 'media' ? 'a' : 'button';
          const actionProps = vertical.id === 'media'
            ? { href: COMPANY_INFO.socials.youtube, target: '_blank', rel: 'noopener noreferrer' }
            : { type: 'button', onClick: vertical.id === 'it' ? onExploreIT : onExploreFilms };

          return (
            <article key={vertical.id} className={`hero-vertical-card hero-vertical-card-${vertical.id}`} aria-labelledby={`hero-card-${vertical.id}`}>
              <DecorativeIcon className="hero-card-watermark" aria-hidden="true" />
              <div className="hero-card-heading">
                <div className="hero-card-brand" aria-hidden="true">P<Play /></div>
                <div>
                  <h3 id={`hero-card-${vertical.id}`}>ProDyum <span>{vertical.name}</span></h3>
                  <p>{vertical.subtitle}</p>
                </div>
              </div>
              <ul className="hero-card-services">
                {vertical.services.map(({ label, icon: Icon }) => (
                  <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>
                ))}
              </ul>
              <Action className="hero-card-action" {...actionProps}>
                <span>{vertical.tagline}</span>
                <span className="hero-card-arrow"><ArrowRight aria-hidden="true" /></span>
                {vertical.id === 'media' && <span className="sr-only"> on YouTube (opens in a new tab)</span>}
              </Action>
            </article>
          );
        })}
      </div>
    </section>
  );
}
