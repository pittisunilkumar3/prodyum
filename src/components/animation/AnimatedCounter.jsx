import React, { useEffect, useRef } from 'react';
import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  motion,
} from 'framer-motion';

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Detects numeric prefix/suffix (e.g. "100+", "24/7") and animates the digits.
 *
 * Props:
 *  - value: target string/number e.g. "100+" or "24/7"
 *  - duration (default 1.8s)
 *  - className
 */
const parseValue = (raw) => {
  const match = String(raw).match(/(\d+)/);
  if (!match) return { num: null, prefix: '', suffix: String(raw) };
  const num = parseInt(match[1], 10);
  const idx = String(raw).indexOf(match[1]);
  const prefix = String(raw).slice(0, idx);
  const suffix = String(raw).slice(idx + match[1].length);
  return { num, prefix, suffix };
};

const AnimatedCounter = ({ value, duration = 1.8, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const { num, prefix, suffix } = parseValue(value);

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!inView || num === null) return undefined;
    const controls = animate(count, num, { duration, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, num, duration, count]);

  if (num === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
