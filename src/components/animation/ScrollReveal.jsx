import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Scroll-triggered reveal wrapper — BULLETPROOF edition.
 *
 * Animates opacity + translate when the element enters the viewport, but
 * GUARANTEES the content becomes visible even when the viewport jumps past it
 * (anchor links, Ctrl+End, fast trackpad scroll, programmatic scrollTo).
 *
 * Reliability strategy:
 *   1. useInView with a generous rootMargin so it triggers a bit early.
 *   2. amount threshold kept low so tall sections still trigger.
 *   3. Safety fallback: a timer forces `shown=true` after a short delay, so a
 *      content block can NEVER remain stuck at opacity 0.
 *
 * Props:
 *  - children
 *  - delay: stagger offset (seconds)
 *  - y: initial vertical offset in px (default 32)
 *  - as: element type (default 'div')
 *  - className
 */
const ScrollReveal = ({
  children,
  delay = 0,
  y = 32,
  as = 'div',
  className = '',
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);

  // Trigger as soon as any edge of the element peeks into the viewport, a
  // little early via rootMargin. once=true so it animates a single time.
  const inView = useInView(ref, {
    once: true,
    amount: 0.08,
    margin: '0px 0px -8% 0px',
  });

  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inView) {
      setShown(true);
      return undefined;
    }
    // Safety net: if the observer never reports intersection (e.g. the page was
    // jumped past this element before observers attached, or it sits inside a
    // container that prevented the event), force it visible shortly after mount
    // so content is never permanently hidden.
    const t = setTimeout(() => setShown(true), 1400 + delay * 1000);
    return () => clearTimeout(t);
  }, [inView, delay]);

  const MotionTag = motion[as] || motion.div;

  // Reduced-motion / safety-revealed: render plain, fully visible content.
  if (reduceMotion) {
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

export default ScrollReveal;
