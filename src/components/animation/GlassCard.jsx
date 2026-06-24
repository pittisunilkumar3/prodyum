import React from 'react';
import ScrollReveal from './ScrollReveal';
import TiltCard from './TiltCard';

/**
 * Premium glass card with gradient border + moving reflection sweep.
 * Optional 3D tilt and scroll reveal.
 *
 * Props:
 *  - children
 *  - className (applied to inner surface)
 *  - tilt (bool, default true)
 *  - reveal (bool, default true)
 *  - delay (reveal delay)
 *  - glow: 'blue' | 'green' | 'lime' | null (hover glow)
 *  - as
 */
const GlassCard = ({
  children,
  className = '',
  tilt = false,
  reveal = true,
  delay = 0,
  glow = null,
  as = 'div',
}) => {
  const glowClass =
    glow === 'blue'
      ? 'hover:shadow-[0_30px_80px_-30px_rgba(30,136,229,0.55)]'
      : glow === 'green'
      ? 'hover:shadow-[0_30px_80px_-30px_rgba(76,175,80,0.55)]'
      : glow === 'lime'
      ? 'hover:shadow-[0_30px_80px_-30px_rgba(139,195,74,0.55)]'
      : '';

  const surface = (
    <div
      className={`group relative h-full rounded-3xl glass-panel card-reflection gradient-border overflow-hidden transition-all duration-500 ${glowClass} ${className}`}
    >
      {/* inner top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />
      {children}
    </div>
  );

  const content = tilt ? (
    <TiltCard as={as} className="h-full">
      {surface}
    </TiltCard>
  ) : (
    surface
  );

  if (reveal) {
    return (
      <ScrollReveal delay={delay} as={as} className="h-full">
        {content}
      </ScrollReveal>
    );
  }
  return content;
};

export default GlassCard;
