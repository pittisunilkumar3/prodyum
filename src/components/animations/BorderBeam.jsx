import React from "react";
import { cn } from "../../lib/utils";

/**
 * BorderBeam - Animated border beam from 21st.dev / Magic UI
 * A glowing dot that orbits along the card's border edge
 */
const BorderBeam = ({
  size = 150,
  duration = 15,
  colorFrom = "#1E88E5",
  colorTo = "#4CAF50",
  delay = 0,
  className,
}) => {
  return (
    <div
      className={cn("absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden", className)}
      style={{ zIndex: 2 }}
    >
      <div
        style={{
          position: "absolute",
          width: size,
          height: size,
          background: `radial-gradient(circle, ${colorFrom} 0%, ${colorTo} 50%, transparent 70%)`,
          borderRadius: "50%",
          filter: "blur(8px)",
          opacity: 0.5,
          top: "50%",
          left: "50%",
          marginTop: -size / 2,
          marginLeft: -size / 2,
          transformOrigin: "center center",
          animation: `border-beam-spin ${duration}s linear ${delay}s infinite`,
        }}
      />
    </div>
  );
};

export default BorderBeam;
