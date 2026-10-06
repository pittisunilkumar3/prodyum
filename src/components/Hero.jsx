import React from 'react';
import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import HeroVerticalCards from './HeroVerticalCards';
import HeroCommunity from './HeroCommunity';
import './Hero.css';

const highlights = [
  { value: '150+', label: 'Enterprise projects' },
  { value: '3', label: 'Creative verticals' },
  { value: 'End-to-End', label: 'Solutions' },
  { value: 'Hyderabad', label: 'Our home. Your launchpad.' },
];

export default function Hero({ activeVertical = 'all', onResetVertical, onExploreIT, onExploreFilms }) {
  const exploreVerticals = () => {
    document.getElementById('hero-verticals')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <section id="home" className="prodyum-hero" aria-labelledby="hero-heading">
      <div className="hero-intro">
        <div className="hero-copy">
          {activeVertical !== 'all' && (
            <div className="hero-active-filter">
              <span>{activeVertical === 'it' ? 'ProDyum IT & Creative Services' : 'ProDyum Entertainments'}</span>
              <button type="button" onClick={onResetVertical}>Show all</button>
            </div>
          )}
          <p className="hero-eyebrow">One brand. <span>Three verticals.</span> One ecosystem.</p>
          <h1 id="hero-heading" className="hero-wordmark" aria-label="ProDyum">
            <span aria-hidden="true">PR</span>
            <span className="hero-brand-o" aria-hidden="true"><Play /></span>
            <span aria-hidden="true">DYUM</span>
          </h1>
          <p className="hero-vertical-names">
            <span>IT</span><i aria-hidden="true">•</i>
            <span>Media</span><i aria-hidden="true">•</i>
            <span>Entertainments</span>
          </p>
          <h2 className="hero-tagline">Build. Promote. Grow. Entertain.</h2>
          <p className="hero-description">
            ProDyum brings together technology, digital marketing, creative services,
            media, content creation and entertainment production under one ecosystem.
            We help businesses grow, creators reach wider audiences, and stories find
            their place in the world.
          </p>
          <div className="hero-actions">
            <button type="button" className="hero-button hero-button-primary" onClick={exploreVerticals}>
              Explore ProDyum <ArrowRight aria-hidden="true" />
            </button>
            <a className="hero-button hero-button-secondary" href={COMPANY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer">
              <span className="hero-play-icon"><Play aria-hidden="true" /></span>
              Watch Our Videos<span className="sr-only"> on YouTube (opens in a new tab)</span>
            </a>
          </div>
          <dl className="hero-highlights">
            {highlights.map(({ value, label }) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </div>
      </div>
      <HeroVerticalCards onExploreIT={onExploreIT} onExploreFilms={onExploreFilms} />
      <HeroCommunity />
      <a className="hero-scroll-cue" href="#ecosystem">
        Discover the ProDyum ecosystem <ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}
