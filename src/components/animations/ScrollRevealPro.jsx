import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

/**
 * ScrollRevealPro - Advanced scroll reveal from 21st.dev style
 * Elements animate in when they enter the viewport with configurable effects
 */
const ScrollRevealPro = ({
  children,
  className,
  effect = "fade-up", // "fade-up", "fade-down", "fade-left", "fade-right", "zoom-in", "flip-up"
  duration = 0.6,
  delay = 0,
  distance = 40,
  once = true,
  threshold = 0.15,
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, threshold]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1) rotate(0deg)";
    switch (effect) {
      case "fade-up":
        return `translateY(${distance}px)`;
      case "fade-down":
        return `translateY(-${distance}px)`;
      case "fade-left":
        return `translateX(-${distance}px)`;
      case "fade-right":
        return `translateX(${distance}px)`;
      case "zoom-in":
        return `scale(0.85)`;
      case "flip-up":
        return `perspective(600px) rotateX(15deg) translateY(${distance}px)`;
      default:
        return `translateY(${distance}px)`;
    }
  };

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        filter: isVisible ? "blur(0px)" : "blur(4px)",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollRevealPro;
