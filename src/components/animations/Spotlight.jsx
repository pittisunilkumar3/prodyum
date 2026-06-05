import React, { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

/**
 * Spotlight - Animated spotlight effect from 21st.dev / Aceternity UI
 * A mouse-following spotlight that illuminates content
 */
const Spotlight = ({
  className,
  fill = "rgba(30, 136, 229, 0.15)",
  gradientSize = 300,
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  useEffect(() => {
    setOpacity(1);
  }, []);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ opacity, transition: "opacity 0.5s" }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(${gradientSize}px circle at ${position.x}px ${position.y}px, ${fill}, transparent 65%)`,
        }}
      />
    </div>
  );
};

export default Spotlight;
