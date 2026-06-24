import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Large blurred gradient spheres drifting slowly in the background.
 * Purely decorative + GPU-accelerated (transform/opacity only).
 *
 * Props:
 *  - variant: 'default' | 'subtle'  (controls count/opacity)
 */
const ORBS = [
  {
    color: 'rgba(30,136,229,0.55)',
    size: 460,
    top: '-8%',
    left: '-6%',
    dur: 22,
    delay: 0,
    blur: 110,
  },
  {
    color: 'rgba(76,175,80,0.5)',
    size: 520,
    bottom: '-12%',
    right: '-8%',
    dur: 26,
    delay: 2,
    blur: 120,
  },
  {
    color: 'rgba(139,195,74,0.4)',
    size: 380,
    top: '40%',
    left: '55%',
    dur: 19,
    delay: 1,
    blur: 130,
  },
];

const FloatingOrbs = ({ variant = 'default' }) => {
  const reduceMotion = useReducedMotion();
  const orbs = useMemo(
    () => (variant === 'subtle' ? ORBS.slice(0, 2) : ORBS),
    [variant]
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            bottom: orb.bottom,
            left: orb.left,
            right: orb.right,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            opacity: 0.5,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{
            duration: orb.dur,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
