import React, { useEffect, useRef } from 'react';

/**
 * SmokeCursor - Premium smoke trail effect that follows the mouse cursor
 * Creates realistic smoke particles with turbulence, fade-out, and expansion
 * Designed for the ProDyum IT website
 */
const SmokeCursor = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const isTouchRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w, h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking (global — works across the whole page)
    const onMouseMove = (e) => {
      if (isTouchRef.current) return;
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Touch support
    const onTouchMove = (e) => {
      isTouchRef.current = true;
      const touch = e.touches[0];
      if (touch) {
        prevMouseRef.current = { ...mouseRef.current };
        mouseRef.current = { x: touch.clientX, y: touch.clientY };
      }
    };

    const onTouchEnd = () => {
      isTouchRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const particles = particlesRef.current;

    // Smoke color palette — blue/green IT brand colors
    const smokeColors = [
      { r: 30, g: 136, b: 229 },   // prodyum-blue
      { r: 76, g: 175, b: 80 },    // prodyum-green
      { r: 139, g: 195, b: 74 },   // prodyum-lime
      { r: 100, g: 180, b: 255 },  // light blue
      { r: 150, g: 220, b: 130 },  // light green
      { r: 200, g: 220, b: 255 },  // white-blue
    ];

    const emitParticles = (x, y, prevX, prevY) => {
      // Interpolate between previous and current position for smooth trails
      const dx = x - prevX;
      const dy = y - prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(dist / 4));

      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        const ix = prevX + dx * t;
        const iy = prevY + dy * t;

        // Main smoke particles
        const count = 2 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.8 + 0.2;
          const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];

          particles.push({
            x: ix + (Math.random() - 0.5) * 4,
            y: iy + (Math.random() - 0.5) * 4,
            vx: Math.cos(angle) * speed * 0.6,
            vy: Math.sin(angle) * speed * 0.4 - Math.random() * 0.5, // slight upward drift
            size: Math.random() * 8 + 3,
            maxSize: Math.random() * 35 + 20,
            growSpeed: Math.random() * 0.4 + 0.15,
            life: 1.0,
            decay: Math.random() * 0.008 + 0.004,
            color,
            turbulenceFreq: Math.random() * 0.02 + 0.008,
            turbulenceAmp: Math.random() * 0.8 + 0.3,
            phase: Math.random() * Math.PI * 2,
            time: 0,
          });
        }

        // Occasional bright spark
        if (Math.random() < 0.15) {
          const color = smokeColors[Math.floor(Math.random() * smokeColors.length)];
          particles.push({
            x: ix,
            y: iy,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: Math.random() * 2 + 1,
            maxSize: Math.random() * 3 + 2,
            growSpeed: 0,
            life: 1.0,
            decay: Math.random() * 0.03 + 0.02,
            color: { r: 255, g: 255, b: 255 },
            sparkColor: color,
            turbulenceFreq: 0,
            turbulenceAmp: 0,
            phase: 0,
            time: 0,
            isSpark: true,
          });
        }
      }
    };

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      const { x: mx, y: my } = mouseRef.current;
      const { x: px, y: py } = prevMouseRef.current;

      // Only emit if mouse has actually moved
      const mouseDist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);
      if (mouseDist > 1 && mx > 0 && my > 0) {
        emitParticles(mx, my, px, py);
      }

      // Cap particles to prevent memory issues
      if (particles.length > 600) {
        particles.splice(0, particles.length - 600);
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update life
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.time++;

        // Turbulence — organic smoke movement
        const turbulenceX = Math.sin(p.time * p.turbulenceFreq + p.phase) * p.turbulenceAmp;
        const turbulenceY = Math.cos(p.time * p.turbulenceFreq * 0.7 + p.phase) * p.turbulenceAmp * 0.6;

        // Apply velocity + turbulence + slight upward drift
        p.x += p.vx + turbulenceX;
        p.y += p.vy + turbulenceY - 0.15;

        // Slow down velocity over time
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Grow smoke (expand as it fades)
        if (p.size < p.maxSize) {
          p.size += p.growSpeed;
        }

        const alpha = p.life;
        const size = Math.max(0.1, p.size);

        if (p.isSpark) {
          // Bright spark particle
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = `rgb(${p.sparkColor.r}, ${p.sparkColor.g}, ${p.sparkColor.b})`;
          ctx.shadowColor = `rgba(${p.sparkColor.r}, ${p.sparkColor.g}, ${p.sparkColor.b}, 0.8)`;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.1, size * 0.5), 0, Math.PI * 2);
          ctx.fill();
          // White hot center
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.1, size * 0.2), 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Smoke particle — soft radial gradient
          ctx.save();

          // Outer glow (larger, very soft)
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(0.1, size));
          grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.3})`);
          grad.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.15})`);
          grad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

          ctx.globalAlpha = 1;
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.1, size), 0, Math.PI * 2);
          ctx.fill();

          // Inner bright core (smaller, more vivid)
          const coreGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(0.1, size * 0.3));
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`);
          coreGrad.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.1, size * 0.3), 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
      }

      // Draw a subtle cursor glow at current mouse position
      if (mx > 0 && my > 0) {
        const glowGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
        glowGrad.addColorStop(0, 'rgba(76, 175, 80, 0.15)');
        glowGrad.addColorStop(0.5, 'rgba(30, 136, 229, 0.05)');
        glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    />
  );
};

export default SmokeCursor;
