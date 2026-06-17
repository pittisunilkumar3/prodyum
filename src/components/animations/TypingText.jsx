import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * TypingText - Typewriter effect for text
 * Types text character by character with a blinking cursor
 * Starts when element scrolls into view
 */
const TypingText = ({
  text,
  className,
  speed = 40,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  cursorColor = '#4CAF50',
  loop = false,
  pauseBeforeDelete = 2000,
  deleteSpeed = 20,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  // Observe visibility to start typing
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursorState((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing / deleting logic
  useEffect(() => {
    if (!hasStarted) return;

    const startTyping = () => {
      if (isDeleting) {
        // Deleting
        if (displayText.length === 0) {
          setIsDeleting(false);
          timeoutRef.current = setTimeout(() => {}, delay);
          return;
        }
        timeoutRef.current = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1));
        }, deleteSpeed);
      } else {
        // Typing
        if (displayText.length < text.length) {
          timeoutRef.current = setTimeout(() => {
            setDisplayText(text.substring(0, displayText.length + 1));
          }, speed);
        } else if (loop) {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseBeforeDelete);
        }
      }
    };

    if (delay > 0 && displayText.length === 0 && !isDeleting) {
      timeoutRef.current = setTimeout(startTyping, delay);
    } else {
      startTyping();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [hasStarted, displayText, text, speed, delay, isDeleting, deleteSpeed, loop, pauseBeforeDelete]);

  return (
    <span ref={ref} className={cn('inline', className)}>
      {displayText}
      {showCursor && (
        <span
          style={{
            color: cursorColor,
            opacity: showCursorState ? 1 : 0,
            transition: 'opacity 0.1s',
            fontWeight: 300,
          }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
};

export default TypingText;
