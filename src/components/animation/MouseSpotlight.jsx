import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Global cursor-following radial glow.
 * Renders a single fixed, pointer-events-none layer.
 * Uses motion values + spring so there are no React re-renders on mouse move.
 *
 * Props:
 *  - size: glow diameter in px (default 520)
 *  - color: rgba center color (default brand green)
 *  - strength: max opacity (default 0.18)
 */
const MouseSpotlight = ({
  size = 560,
  color = '76, 175, 80',
  strength = 0.16,
}) => {
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 120, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 120, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (reduceMotion) return undefined;
    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [x, y, reduceMotion]);

  if (reduceMotion) return null;

  const background = `radial-gradient(${size / 2}px circle at center, rgba(${color}, ${strength}) 0%, rgba(${color}, ${strength * 0.45}) 35%, transparent 70%)`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[2] hidden md:block"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        background,
        willChange: 'transform',
        top: 0,
        left: 0,
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default MouseSpotlight;
