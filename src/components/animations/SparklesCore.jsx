import React, { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

/**
 * SparklesCore - Sparkle particles from 21st.dev / Aceternity UI
 * Canvas-based floating sparkles with twinkle and glow
 */
const SparklesCore = ({
  background = "transparent",
  minSize = 0.4,
  maxSize = 1.4,
  particleCount = 50,
  particleColor = "#FFF",
  className,
  speed = 1,
}) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Parse color once
    const hex = particleColor.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    let w, h;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.offsetWidth || window.innerWidth;
      h = parent.offsetHeight || window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles with positions relative to canvas size
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (w || 800),
        y: Math.random() * (h || 600),
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.5 * speed,
        speedY: (Math.random() - 0.5) * 0.5 * speed,
        opacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      if (!w || !h) {
        resize();
      }
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.twinklePhase += p.twinkleSpeed;

        // Wrap
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const opacity = p.opacity * (0.5 + 0.5 * Math.sin(p.twinklePhase));

        // Glow
        ctx.globalAlpha = opacity * 0.25;
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size * 4), 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size), 0, Math.PI * 2);
        ctx.fill();

        // White hot center
        ctx.globalAlpha = opacity * 0.7;
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.size * 0.35), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [particleCount, particleColor, minSize, maxSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("w-full h-full", className)}
      style={{ background }}
    />
  );
};

export default SparklesCore;
