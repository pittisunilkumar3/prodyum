import React from 'react';
import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';
import HeroVerticalCards from './HeroVerticalCards';
import HeroCommunity from './HeroCommunity';
import './Hero.css';

const highlights = [
  { value: '3', label: 'Brand verticals' },
  { value: '8', label: 'Core services' },
  { value: '2024', label: 'Incorporated' },
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
          <div className="hero-wordmark" aria-hidden="true">
            <span>PR</span>
            <span className="hero-brand-o"><Play /></span>
            <span>DYUM</span>
          </div>
          <h1 id="hero-heading" className="sr-only">
            Digital Marketing and Creative Services for Growing Businesses
          </h1>
          <p className="hero-vertical-names">
            <span>IT</span><i aria-hidden="true">•</i>
            <span>Media</span><i aria-hidden="true">•</i>
            <span>Entertainments</span>
          </p>
          <h2 className="hero-tagline">Build. Promote. Grow. Entertain.</h2>
          <p className="hero-description">
            ProDyum helps businesses build their presence through social media,
            advertising, websites, branding and video content. Based in Hyderabad,
            we also create entertainment and media content through our dedicated brands.
          </p>
          <div className="hero-actions">
            <a className="hero-button hero-button-primary" href="#contact">
              Discuss Your Project <ArrowRight aria-hidden="true" />
            </a>
            <a className="hero-button hero-button-secondary" href="#services">
              <span className="hero-play-icon"><Play aria-hidden="true" /></span>
              View Our Work
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
