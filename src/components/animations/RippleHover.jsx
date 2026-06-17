import React, { useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * RippleHover - Ripple effect emanating from cursor position on hover
 * Creates a growing circle of light from where the cursor enters
 */
const RippleHover = ({
  children,
  className,
  rippleColor = 'rgba(76, 175, 80, 0.15)',
  duration = 600,
}) => {
  const [ripples, setRipples] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, duration + 100);
  };

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            background: `radial-gradient(circle, ${rippleColor} 0%, transparent 70%)`,
            animation: `ripple-expand ${duration}ms cubic-bezier(0, 0.5, 0.5, 1) forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default RippleHover;
