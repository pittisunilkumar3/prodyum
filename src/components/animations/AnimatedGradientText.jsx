import React from "react";
import { cn } from "../../lib/utils";

/**
 * AnimatedGradientText - Gradient text with animated color shift from 21st.dev / Magic UI
 */
const AnimatedGradientText = ({
  children,
  className,
  gradientFrom = "#1E88E5",
  gradientVia = "#4CAF50",
  gradientTo = "#8BC34A",
  speed = 4,
}) => {
  return (
    <span
      className={cn("inline-block bg-clip-text text-transparent animate-gradient-shift", className)}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientFrom}, ${gradientVia}, ${gradientTo}, ${gradientFrom})`,
        backgroundSize: "300% 100%",
        animationDuration: `${speed}s`,
      }}
    >
      {children}
    </span>
  );
};

export default AnimatedGradientText;
