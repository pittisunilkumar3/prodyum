import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Subtle lens flare — used sparingly for premium scenes.
 * Brand-colored radial star + rings. Position via props.
 *
 * Props:
 *  - x, y: % position (default top-right)
 *  - size: px (default 320)
 *  - className
 */
const LensFlare = ({ x = '82%', y = '18%', size = 320, className = '' }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ left: x, top: y, width: size, height: size, transform: 'translate(-50%,-50%)' }}
      animate={reduce ? undefined : { opacity: [0.4, 0.75, 0.4], scale: [0.95, 1.05, 0.95] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* core glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139,195,74,0.35) 0%, rgba(76,175,80,0.18) 35%, transparent 65%)',
          filter: 'blur(8px)',
        }}
      />
      {/* rings */}
      <div
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: 'rgba(30,136,229,0.18)' }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: 'rgba(76,175,80,0.22)' }}
      />
      {/* star streak */}
      <div
        className="absolute left-1/2 top-1/2 h-px w-[180%] -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(139,195,74,0.5), transparent)' }}
      />
    </motion.div>
  );
};

export default LensFlare;
