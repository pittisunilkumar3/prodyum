import React from 'react';

/**
 * Subtle cinematic film-grain overlay.
 * Pure CSS noise texture, very low opacity, fixed full-screen, pointer-events none.
 * Lives above content but below the cursor.
 */
const FilmGrain = ({ opacity = 0.05, zIndex = 60 }) => (
  <div
    aria-hidden="true"
    className="film-grain-overlay pointer-events-none fixed inset-0 mix-blend-overlay"
    style={{
      opacity,
      zIndex,
      animation: 'film-grain-shift 1s steps(5) infinite',
    }}
  />
);

export default FilmGrain;
