import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * BackgroundBeams - Animated beam rays from 21st.dev / Aceternity UI
 * Creates beautiful animated light beams in the background
 */
const BackgroundBeams = ({
  className,
  beamColor = "rgba(30, 136, 229, 0.06)",
  beamCount = 8,
  speed = 15,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Parse beam color
    const hexMatch = beamColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    const r = hexMatch ? parseInt(hexMatch[1]) : 30;
    const g = hexMatch ? parseInt(hexMatch[2]) : 136;
    const b = hexMatch ? parseInt(hexMatch[3]) : 229;

    // Create beams
    const beams = [];
    for (let i = 0; i < beamCount; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        width: Math.random() * 60 + 20,
        angle: (Math.random() - 0.5) * 30,
        speed: (Math.random() * 0.5 + 0.5) * speed,
        opacity: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let frame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beams.forEach((beam) => {
        beam.phase += 0.005;
        const yOffset = Math.sin(beam.phase) * 50;
        const currentOpacity = beam.opacity * (0.5 + 0.5 * Math.sin(beam.phase * 0.5));

        ctx.save();
        ctx.translate(beam.x, 0);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const gradient = ctx.createLinearGradient(0, -canvas.height, 0, canvas.height);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(
          -beam.width / 2,
          -canvas.height + yOffset,
          beam.width,
          canvas.height * 2
        );

        ctx.restore();
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [beamColor, beamCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
    />
  );
};

export default BackgroundBeams;
