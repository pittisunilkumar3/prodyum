import React from 'react';
import {
  ArrowUpRight, Building2, Clapperboard, Music2, Palette, Play,
  Rocket, Sparkles, Users, Youtube,
} from 'lucide-react';
import { COMPANY_INFO, YOUTUBE_CHANNELS } from '../data/content';
import './HeroCommunity.css';

const audiences = [
  { label: 'Brands', icon: Sparkles },
  { label: 'Creators', icon: Users },
  { label: 'Businesses', icon: Building2 },
  { label: 'Production Houses', icon: Clapperboard },
  { label: 'Artists', icon: Palette },
  { label: 'Startups', icon: Rocket },
];

export default function HeroCommunity() {
  return (
    <div className="hero-community">
      <section id="youtube-channels" className="hero-channel-strip" aria-labelledby="hero-channels-heading">
        <div className="hero-channel-label">
          <Youtube aria-hidden="true" />
          <h2 id="hero-channels-heading">Our YouTube<br />channels</h2>
        </div>

        <ul className="hero-channel-list">
          {YOUTUBE_CHANNELS.map(channel => (
            <li key={channel.id} className={`hero-channel hero-channel-${channel.id}`}>
              <div className="hero-channel-avatar" aria-hidden="true">
                {channel.id === 'kavya' ? <Music2 /> : <><span>P</span><Play /></>}
              </div>
              <div className="hero-channel-copy">
                <h3><Youtube aria-hidden="true" />{channel.name}</h3>
                <p>{channel.description}</p>
              </div>
              <a
                className="hero-channel-link"
                href={channel.url || `https://www.youtube.com/results?search_query=${encodeURIComponent(channel.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {channel.url ? 'Subscribe' : 'Find channel'}
                <span className="sr-only">{channel.url ? ` to ${channel.name}` : `: ${channel.name}`} on YouTube (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>

        <a className="hero-channel-watch" href={COMPANY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer">
          <span>Watch on YouTube</span><ArrowUpRight aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </section>

      <section className="hero-trust" aria-labelledby="hero-trust-heading">
        <h2 id="hero-trust-heading">Trusted by brands, creators and businesses</h2>
        <div className="hero-trust-content">
          <p className="hero-trust-note" aria-hidden="true">Think<br /><span>Bigger</span></p>
          <ul className="hero-trust-audiences">
            {audiences.map(({ label, icon: Icon }) => (
              <li key={label}><Icon aria-hidden="true" /><span>{label}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
