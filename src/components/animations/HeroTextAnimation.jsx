import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';
import TextScramble from './TextScramble';

/**
 * HeroTextAnimation
 * A premium hero heading with:
 *  1. Line 1 — "decode / scramble" reveal: characters shuffle through
 *     tech symbols left-to-right, glowing green, then resolve into white text.
 *  2. Line 2 — word-by-word cinematic reveal (blur + translate + fade).
 *  3. Line 2 — animated shifting gradient (blue → green → lime) with flowing background-position.
 *  4. Line 2 — a sweeping "shine" light pass over the gradient line.
 *  5. Line 2 — a soft pulsing text-shadow glow.
 *
 * Inspired by 21st.dev "Text Scramble", "Text Reveal", "Shining Text" and "Gradient Text".
 * Zero new dependencies (uses the already-installed framer-motion).
 *
 * Props:
 *  - line1: string        → top line, shown via decode/scramble effect ("Helping Businesses Grow Through")
 *  - line2: string        → animated gradient bottom line ("Digital Marketing & Technology")
 *  - className: string
 *  - delay: number        → seconds before the reveal sequence starts
 */
const HeroTextAnimation = ({
  line1 = '',
  line2 = '',
  className,
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();

  // Per-word cinematic reveal variants
  const wordContainer = {
    hidden: {},
    visible: (d = 0) => ({
      transition: {
        staggerChildren: 0.08,
        delayChildren: d,
      },
    }),
  };

  const word = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 24,
      filter: prefersReducedMotion ? 'blur(0px)' : 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // expo-out
      },
    },
  };

  // Split helper preserving spaces
  const splitWords = (text) => text.split(' ');

  const renderRevealLine = (text, startDelay, extraWordClass = '') =>
    splitWords(text).map((w, i) => (
      <motion.span
        key={`${text}-${i}`}
        variants={word}
        className={cn('inline-block', extraWordClass)}
      >
        {w}
        {i < splitWords(text).length - 1 ? '\u00A0' : ''}
      </motion.span>
    ));

  return (
    <h1
      className={cn(
        'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight',
        className
      )}
    >
      {/* Line 1 — decode / scramble reveal (unique hacker-terminal effect) */}
      <span className="block text-white">
        <TextScramble
          text={line1}
          as="span"
          speed={40}
          revealSpeed={0.07}
          startDelay={Math.round(delay * 1000)}
          scrambleClassName="text-prodyum-green-400 scale-110 drop-shadow-[0_0_8px_rgba(76,175,80,0.6)]"
        />
      </span>

      {/* Line 2 — animated gradient + shine + glow */}
      <motion.span
        className={cn(
          'relative block mt-2',
          // Animated flowing gradient (background-size 200% + shifting position)
          'bg-[linear-gradient(110deg,#42A5F5,#66BB6A,#9CCC65,#42A5F5)]',
          'bg-[length:200%_auto] bg-clip-text text-transparent',
          'animate-[hero-gradient-flow_6s_ease_infinite]',
          // Soft animated glow
          'drop-shadow-[0_0_25px_rgba(76,175,80,0.35)]'
        )}
        variants={wordContainer}
        initial="hidden"
        animate="visible"
        custom={delay + 1.3}
      >
        {renderRevealLine(line2, delay + 1.3)}

        {/* Sweeping shine overlay — a moving translucent light pass */}
        {!prefersReducedMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] animate-[hero-shine_4.5s_ease-in-out_infinite]" />
          </span>
        )}
      </motion.span>
    </h1>
  );
};

export default HeroTextAnimation;
