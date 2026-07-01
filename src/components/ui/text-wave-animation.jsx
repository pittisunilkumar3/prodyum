import { useEffect, useRef } from "react";

/**
 * AnimatedHearts (Text Wave Animation)
 * Renders a row of glyphs that pulse with a layered rainbow text-shadow.
 * Used here as the site's loading screen.
 *
 * Adapted from the shadcn-style TSX snippet to JSX for this CRA project.
 */
export function AnimatedHearts({
  text = "✦",
  count = 5,
  backgroundColor = "#57008a",
  colors = [
    "#7400b8",
    "#6930c3",
    "#5e60ce",
    "#5390d9",
    "#4ea8de",
    "#48bfe3",
    "#56cfe1",
    "#64dfdf",
    "#72efdd",
    "#80ffdb",
  ],
  animationDuration = 2,
  fontSize = "12vw",
  staggerDelay = 200,
  heightFactor = 2,
}) {
  const containerRef = useRef(null);
  const styleRef = useRef(null);

  useEffect(() => {
    // Create rainbow shadow strings
    let rainbowEnd = "";
    let rainbowEnd2 = "";

    colors.slice().reverse().forEach((c, i) => {
      rainbowEnd += `,0 ${(i - 5) * heightFactor}vh ${i * 2}px ${c}`;
    });

    colors.forEach((c, i) => {
      rainbowEnd2 += `,0 ${(i - 5) * -heightFactor}vh ${i * 2}px ${c}`;
    });

    rainbowEnd = rainbowEnd.substring(1);
    rainbowEnd2 = rainbowEnd2.substring(1);

    // Create CSS keyframes dynamically (scoped style tag)
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes rainbowShadow {
        0% { text-shadow: ${rainbowEnd}; }
        100% { text-shadow: ${rainbowEnd2}; }
      }
    `;
    document.head.appendChild(styleSheet);
    styleRef.current = styleSheet;

    // Apply animation to each heart with stagger (scoped to this instance)
    const hearts = containerRef.current
      ? containerRef.current.querySelectorAll(".heart-span")
      : [];
    hearts.forEach((heart, i) => {
      const element = heart;
      element.style.animation = `rainbowShadow ${animationDuration}s cubic-bezier(0.3, 0, 0.7, 1) infinite alternate both`;
      element.style.animationDelay = `${-1000 + i * staggerDelay}ms`;
    });

    return () => {
      if (styleRef.current && styleRef.current.parentNode) {
        styleRef.current.parentNode.removeChild(styleRef.current);
      }
      styleRef.current = null;
    };
  }, [colors, animationDuration, staggerDelay, heightFactor, count, text]);

  return (
    <div
      ref={containerRef}
      className="w-full flex gap-1 items-center justify-center"
      style={{
        height: "100vh",
        backgroundColor,
      }}
    >
      <h1
        className="font-black"
        style={{
          fontSize: fontSize,
          color: "transparent",
        }}
      >
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className="heart-span"
            style={{
              flexBasis: "100%",
              display: "inline-block",
            }}
          >
            {text}
          </span>
        ))}
      </h1>
    </div>
  );
}

export default AnimatedHearts;
