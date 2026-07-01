import React, { useEffect, useRef } from 'react';

const ConcentricRingsLoader = ({
  size = 120,
  color = '#4CAF50',
  text = 'Loading...',
  showText = true,
  rings = 4,
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rings; i++) {
        const baseRadius = size * 0.1 + i * (size * 0.15);
        const pulse = Math.sin(time * 0.03 - i * 0.5) * (size * 0.05);
        // Clamp radius so it is always a safe positive value.
        const radius = Math.max(2, Math.min(baseRadius + pulse, size / 2 - 2));
        // Clamp opacity to [0.15, 0.85] so it is ALWAYS a valid alpha.
        // (Previously it could go negative → invalid hex like "#4CAF50-1a"
        // → browser dropped the stroke → rings were invisible.)
        const opacity = Math.max(0.15, Math.min(0.85,
          0.5 + Math.sin(time * 0.03 - i * 0.5) * 0.35));

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle =
          color + Math.floor(opacity * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dots on rings
        const numDots = 8;
        for (let j = 0; j < numDots; j++) {
          const angle =
            (j / numDots) * Math.PI * 2 +
            time * 0.02 * (i % 2 ? 1 : -1);
          const dotX = centerX + Math.cos(angle) * radius;
          const dotY = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.arc(dotX, dotY, 2, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();
        }
      }

      // Center pulse
      const centerPulse = Math.sin(time * 0.05) * 0.3 + 0.7;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 5 * centerPulse, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();

      time++;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [size, color, rings]);

  return (
    <div className="flex flex-col items-center justify-center">
      <canvas ref={canvasRef} />
      {showText && (
        <div
          className="mt-3 text-sm font-medium tracking-wider"
          style={{ color }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default ConcentricRingsLoader;
