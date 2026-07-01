import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * TextScramble
 * A "decode" / hacker-terminal animation: every character rapidly shuffles
 * through random symbols/letters and resolves left-to-right into the final text.
 * Scrambling (un-resolved) characters glow green and pop slightly; resolved
 * characters render in the inherited text color.
 *
 * Inspired by 21st.dev "Text Scramble". Zero new dependencies.
 *
 * Props:
 *  - text: string            → final text to decode into
 *  - className: string       → applied to the wrapper
 *  - speed: number           → ms per scramble frame (lower = faster)
 *  - revealSpeed: number     → fraction of text revealed per frame (higher = faster resolve)
 *  - scrambleChars: string   → pool of characters to shuffle through
 *  - scrambleClassName: string → class applied to each scrambling char
 *  - startDelay: number      → ms to wait before starting
 *  - as: React.ElementType   → wrapper element (default span)
 */
const DEFAULT_SCRAMBLE_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>=/\\|+';

const TextScramble = ({
  text,
  className,
  speed = 45,
  revealSpeed = 0.06,
  scrambleChars = DEFAULT_SCRAMBLE_CHARS,
  scrambleClassName = 'text-prodyum-green-400 scale-110',
  startDelay = 0,
  as: Component = 'span',
}) => {
  const [display, setDisplay] = useState(text);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Detect prefers-reduced-motion once
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Reduced motion: just show final text immediately
    if (prefersReducedMotion) {
      setDisplay(text);
      setResolvedCount(text.length);
      setIsDone(true);
      return undefined;
    }

    // Start with everything scrambled
    setResolvedCount(0);
    setIsDone(false);

    const run = () => {
      let revealed = 0;
      const totalFrames = Math.ceil(1 / revealSpeed) + text.length;

      let frame = 0;
      intervalRef.current = setInterval(() => {
        frame += 1;
        // Progressively reveal more characters
        revealed = Math.floor((frame / totalFrames) * text.length);

        let out = '';
        for (let i = 0; i < text.length; i += 1) {
          const ch = text[i];
          if (ch === ' ') {
            out += ' ';
          } else if (i < revealed) {
            out += ch;
          } else {
            out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          }
        }
        setDisplay(out);
        setResolvedCount(revealed);

        if (frame >= totalFrames) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setDisplay(text);
          setResolvedCount(text.length);
          setIsDone(true);
        }
      }, speed);
    };

    if (startDelay > 0) {
      timeoutRef.current = setTimeout(run, startDelay);
    } else {
      run();
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [text, speed, revealSpeed, startDelay]);

  return (
    <Component className={cn('inline-block', className)} aria-label={text}>
      {display.split('').map((char, i) => {
        const isSpace = char === ' ';
        const isResolved = i < resolvedCount || isDone;
        return (
          <span
            key={i}
            className={cn(
              'inline-block transition-colors duration-100',
              !isSpace && !isResolved && scrambleClassName
            )}
          >
            {isSpace ? '\u00A0' : char}
          </span>
        );
      })}
    </Component>
  );
};

export default TextScramble;
