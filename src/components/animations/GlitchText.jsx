import React, { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * GlitchText - Cyberpunk-style glitch effect for headings
 * Creates a flickering, scan-line text with RGB split on hover/active
 */
const GlitchText = ({
  children,
  className,
  as: Tag = 'span',
  glitchOnHover = true,
  intensity = 'medium', // 'subtle', 'medium', 'intense'
  color1 = 'rgba(30, 136, 229, 0.8)', // blue
  color2 = 'rgba(76, 175, 80, 0.8)',  // green
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const intensityConfig = {
    subtle: { clipCount: 3, maxOffset: 3, duration: 200 },
    medium: { clipCount: 5, maxOffset: 6, duration: 150 },
    intense: { clipCount: 8, maxOffset: 10, duration: 100 },
  };

  const config = intensityConfig[intensity] || intensityConfig.medium;

  useEffect(() => {
    if (glitchOnHover) return; // Only auto-glitch when not hover-only

    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), config.duration);
    }, 3000 + Math.random() * 4000);

    return () => clearInterval(interval);
  }, [glitchOnHover, config.duration]);

  const handleMouseEnter = () => {
    if (glitchOnHover) setIsGlitching(true);
  };

  const handleMouseLeave = () => {
    if (glitchOnHover) setIsGlitching(false);
  };

  // Generate random clip-path segments for glitch slices
  const generateClipPath = (index, total) => {
    const segmentHeight = 100 / total;
    const top = segmentHeight * index;
    const bottom = segmentHeight * (index + 1);
    return `inset(${top}% 0 ${100 - bottom}% 0)`;
  };

  return (
    <Tag
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      {/* Main text */}
      <span className={cn('relative z-10', className)} style={{ position: 'relative' }}>
        {children}
      </span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          {/* Before layer - shifted left with color1 */}
          <span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: generateClipPath(0, config.clipCount),
              color: color1,
              transform: `translateX(${-config.maxOffset}px)`,
              animation: `glitch-shift-${intensity} 0.3s steps(2) infinite`,
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: generateClipPath(1, config.clipCount),
              color: color1,
              transform: `translateX(${config.maxOffset}px)`,
            }}
            aria-hidden="true"
          >
            {children}
          </span>

          {/* After layer - shifted right with color2 */}
          <span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: generateClipPath(2, config.clipCount),
              color: color2,
              transform: `translateX(${config.maxOffset}px)`,
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: generateClipPath(3, config.clipCount),
              color: color2,
              transform: `translateX(${-config.maxOffset}px)`,
            }}
            aria-hidden="true"
          >
            {children}
          </span>

          {/* Scan line overlay */}
          <span
            className="absolute inset-0 z-30 pointer-events-none"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 0, 0, 0.1) 2px,
                rgba(0, 0, 0, 0.1) 4px
              )`,
              mixBlendMode: 'overlay',
            }}
            aria-hidden="true"
          />
        </>
      )}
    </Tag>
  );
};

export default GlitchText;
