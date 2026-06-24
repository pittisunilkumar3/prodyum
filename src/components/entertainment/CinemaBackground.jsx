import React, { lazy, Suspense } from 'react';
import FloatingOrbs from '../animation/FloatingOrbs';
import MouseSpotlight from '../animation/MouseSpotlight';
import LightRays from './LightRays';

// Heavy canvas particles lazy-loaded after first paint
const ParticleField = lazy(() => import('../animation/ParticleField'));

/**
 * Global cinematic backdrop for the Entertainments section.
 * Strict brand palette: pure black base + Blue/Green/Lime effects only.
 *
 * Layers (back -> front):
 *   1. Pure black base (#000 -> #050505 -> #0A0A0A)
 *   2. Moving brand-colored light rays
 *   3. Floating gradient orbs (blue/green/lime)
 *   4. Floating "dust" particle field (lazy)
 *   5. Cursor-following spotlight (desktop)
 * Fixed so it persists across scroll; page content renders above.
 */
const CinemaBackground = () => (
  <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-black">
    {/* base gradient (black palette only) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-[#0A0A0A]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,136,229,0.10),transparent_55%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(76,175,80,0.08),transparent_55%)]" />

    {/* moving studio light rays */}
    <LightRays />

    {/* ambient orbs */}
    <FloatingOrbs />

    {/* cinematic dust */}
    <Suspense fallback={null}>
      <ParticleField density={1} />
    </Suspense>

    {/* cursor spotlight */}
    <MouseSpotlight color="139, 195, 74" strength={0.14} />

    {/* vignette for depth */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.7)_100%)]" />
  </div>
);

export default CinemaBackground;
