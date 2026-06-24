import React, { lazy, Suspense } from 'react';
import FloatingOrbs from '../animation/FloatingOrbs';
import MouseSpotlight from '../animation/MouseSpotlight';

// Heavy canvas animation loaded only after first paint
const ParticleField = lazy(() => import('../animation/ParticleField'));

/**
 * Global animated backdrop shared by every IT page.
 * Layers (back -> front):
 *   1. Deep gradient base (ink -> navy)
 *   2. Subtle grid + radial vignette
 *   3. Floating gradient orbs
 *   4. Canvas particle field (lazy)
 *   5. Cursor spotlight (desktop)
 * Fixed so it persists during scroll; content renders above it.
 */
const ITBackground = () => (
  <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-ink">
    {/* gradient base */}
    <div className="absolute inset-0 bg-gradient-to-b from-ink via-[#060b14] to-navy" />
    <div className="absolute inset-0 bg-gradient-to-tr from-navy/60 via-transparent to-transparent" />

    {/* grid + vignette */}
    <div className="absolute inset-0 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_75%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(30,136,229,0.10),transparent_55%)]" />

    {/* ambient orbs */}
    <FloatingOrbs />

    {/* particles */}
    <Suspense fallback={null}>
      <ParticleField density={1} />
    </Suspense>

    {/* cursor glow */}
    <MouseSpotlight />

    {/* bottom fade for footer blend */}
    <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
  </div>
);

export default ITBackground;
