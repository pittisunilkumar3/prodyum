import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

/**
 * NumberTicker - Animated number counter from 21st.dev / Magic UI
 * Only starts counting when the element scrolls into view
 */
const NumberTicker = ({
  value = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  duration = 2,
  prefix = "",
  suffix = "",
}) => {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);
  const [hasStarted, setHasStarted] = useState(false);

  // Observe visibility before starting animation
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

  // Run the counting animation once visible
  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    let animationId;
    const startValue = direction === "down" ? value : 0;
    const endValue = direction === "down" ? 0 : value;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000 - delay;

      if (elapsed < 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (endValue - startValue) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [hasStarted, value, direction, delay, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums tracking-tight", className)}>
      {prefix}
      {displayValue.toFixed(decimalPlaces)}
      {suffix}
    </span>
  );
};

export default NumberTicker;
