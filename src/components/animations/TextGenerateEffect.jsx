import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

/**
 * TextGenerateEffect - Text reveals letter by letter from 21st.dev / Aceternity UI
 * Resets and replays when `words` prop changes
 */
const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
  type = "word", // "word" or "character"
}) => {
  const [rendered, setRendered] = useState([]);
  const wordsArray = type === "word" ? words.split(" ") : words.split("");

  // Reset and replay whenever `words` changes
  useEffect(() => {
    setRendered([]); // <-- KEY FIX: reset so animation replays

    const timeouts = [];
    wordsArray.forEach((_, index) => {
      const t = setTimeout(() => {
        setRendered((prev) => [...prev, index]);
      }, delay * 1000 + index * (duration * 1000 / wordsArray.length));
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
    // Reset and replay whenever `words` changes
    // eslint-disable-next-line
  }, [words, duration, delay, type]);

  return (
    <span className={cn("inline", className)}>
      {wordsArray.map((word, idx) => {
        const isVisible = rendered.includes(idx);
        return (
          <span
            key={`w-${idx}-${word}`}
            className={cn(
              "inline-block transition-all duration-300",
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-3"
            )}
            style={{
              filter: isVisible ? "blur(0px)" : filter ? "blur(4px)" : "none",
            }}
          >
            {type === "word" ? (idx > 0 ? " " : "") + word : word}
          </span>
        );
      })}
    </span>
  );
};

export default TextGenerateEffect;
