import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Moving studio light rays in brand colors (blue → green → lime).
 * Diagonal soft beams that sweep slowly. Decorative + GPU-only.
 *
 * Props:
 *  - className, intensity (0..1)
 */
const RAYS = [
  { color: 'rgba(30,136,229,0.16)', top: '-20%', left: '5%', w: 240, dur: 14, delay: 0, skew: -12 },
  { color: 'rgba(76,175,80,0.14)', top: '-30%', left: '38%', w: 300, dur: 18, delay: 1.5, skew: -10 },
  { color: 'rgba(139,195,74,0.12)', top: '-25%', left: '70%', w: 260, dur: 16, delay: 3, skew: -14 },
];

const LightRays = ({ className = '', intensity = 1 }) => {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      {RAYS.map((r, i) => (
        <motion.div
          key={i}
          className="absolute origin-top"
          style={{
            top: r.top,
            left: r.left,
            width: r.w,
            height: '140%',
            background: `linear-gradient(to bottom, ${r.color}, transparent 70%)`,
            transform: `skewX(${r.skew}deg)`,
            filter: 'blur(40px)',
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.25, 0.7, 0.25], x: [0, 60, 0] }
          }
          transition={{ duration: r.dur, delay: r.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};

export default LightRays;
