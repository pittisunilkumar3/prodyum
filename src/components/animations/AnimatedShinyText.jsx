import { cn } from "../../lib/utils";
import React from "react";

/**
 * AnimatedShinyText - Shimmering text from 21st.dev / Magic UI
 * A light glare pans across the text making it appear to shimmer
 */
const AnimatedShinyText = ({
  children,
  className,
  speed = 3,
}) => {
  return (
    <span className={cn("relative inline-flex items-center overflow-hidden", className)}>
      {/* Base text (always visible) */}
      <span className="relative z-0">{children}</span>
      {/* Shimmer overlay */}
      <span
        className="absolute inset-0 z-10 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shiny-text_3s_linear_infinite]"
        style={{
          backgroundImage: `linear-gradient(
            110deg,
            transparent 25%,
            rgba(255, 255, 255, 0.7) 45%,
            rgba(255, 255, 255, 0.9) 50%,
            rgba(255, 255, 255, 0.7) 55%,
            transparent 75%
          )`,
          animationDuration: `${speed}s`,
        }}
        aria-hidden="true"
      >
        {children}
      </span>
    </span>
  );
};

export default AnimatedShinyText;
