import { useEffect, useState } from "react";
import { AnimatedHearts } from "@/components/ui/text-wave-animation";

/**
 * Loader
 * Full-screen loading screen shown on first app load.
 * Uses the AnimatedHearts (rainbow text-wave) effect.
 * Fades out after `duration` ms and unmounts itself.
 */
export default function Loader({ duration = 2600 }) {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), duration - 600);
    const removeTimer = setTimeout(() => setMounted(false), duration);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#000000",
        opacity: exiting ? 0 : 1,
        transition: "opacity 600ms ease-in-out",
      }}
    >
      <AnimatedHearts
        text="✦"
        count={5}
        backgroundColor="transparent"
        fontSize="14vw"
        animationDuration={2}
        staggerDelay={200}
        heightFactor={2}
      />
    </div>
  );
}
