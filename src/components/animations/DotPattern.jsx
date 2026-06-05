import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * DotPattern - Animated dot pattern background from 21st.dev / Magic UI
 * Creates a subtle animated dot grid pattern
 */
const DotPattern = ({
  className,
  dotSize = 1,
  gap = 16,
  color = "rgba(255, 255, 255, 0.05)",
  animated = true,
}) => {
  const svgRef = useRef(null);

  const id = React.useId();

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <svg ref={svgRef} className="absolute inset-0 w-full h-full">
        <pattern
          id={`dot-pattern-${id}`}
          x="0"
          y="0"
          width={gap}
          height={gap}
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx={gap / 2}
            cy={gap / 2}
            r={dotSize}
            fill={color}
            style={
              animated
                ? {
                    animation: "pulse-glow 3s ease-in-out infinite",
                    transformOrigin: "center",
                  }
                : undefined
            }
          />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#dot-pattern-${id})`} />
      </svg>
    </div>
  );
};

export default DotPattern;
