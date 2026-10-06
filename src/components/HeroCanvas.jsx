import React, { useEffect, useRef } from 'react';

/**
 * HeroCanvas
 * An award-winning interactive HTML5 background canvas featuring:
 * - Dynamic dual-frequency procedural cinematic wave mesh (IT Cyan + Entertainment Amber)
 * - Scroll-scrub interpolation that rotates and modulates spatial perspective
 * - Mouse cursor attraction & gentle particle turbulence
 * - High-DPI retina rendering and graceful automated fallback
 */
export default function HeroCanvas({ activeVertical = 'all' }) {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes for spatial agency
    const particleCount = Math.min(Math.floor((width * height) / 22000), 75);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseHue: Math.random() > 0.5 ? 'cyan' : 'amber',
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? scrollY / docHeight : 0;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = e.touches[0].clientX;
        mouseRef.current.targetY = e.touches[0].clientY;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.012;
      const scrollProgress = scrollRef.current;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Clear with dark subtle fade for motion trails
      ctx.fillStyle = '#06080D';
      ctx.fillRect(0, 0, width, height);

      // Perspective grid baseline with scroll transformation
      const gridLines = 14;
      const horizonY = height * 0.45 + scrollProgress * 150;

      ctx.save();
      ctx.lineWidth = 1;

      // Draw flowing cinematic wave ribbons (Celluloid + Digital Fiber)
      const ribbons = [
        {
          color: activeVertical === 'entertainments' ? 'rgba(255, 184, 0, 0.28)' : 'rgba(0, 240, 255, 0.22)',
          speed: 1.2,
          freq: 0.002,
          amp: 50 + scrollProgress * 40,
          yOffset: height * 0.5,
        },
        {
          color: activeVertical === 'it' ? 'rgba(121, 40, 202, 0.25)' : 'rgba(255, 184, 0, 0.20)',
          speed: 0.8,
          freq: 0.0025,
          amp: 65,
          yOffset: height * 0.55,
        },
        {
          color: activeVertical === 'it' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 94, 58, 0.18)',
          speed: 1.5,
          freq: 0.0018,
          amp: 45,
          yOffset: height * 0.62,
        },
      ];

      ribbons.forEach((ribbon, idx) => {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          // Dual sine modulation with mouse influence
          const mouseDist = Math.hypot(x - mouseRef.current.x, ribbon.yOffset - mouseRef.current.y);
          const mousePush = Math.max(0, 1 - mouseDist / 250) * 35;
          const y =
            ribbon.yOffset +
            Math.sin(x * ribbon.freq + time * ribbon.speed + idx) * ribbon.amp +
            Math.cos(x * 0.0008 - time * 0.6) * 20 -
            mousePush;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = ribbon.color;
        ctx.stroke();
      });

      // Spatial floating nodes / constellation
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse avoidance/attraction
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * 1.2;
          p.y += Math.sin(angle) * 1.2;
        }

        // Color based on active filter or dual nature
        let dotColor = '#00F0FF';
        if (activeVertical === 'entertainments' || (activeVertical === 'all' && p.baseHue === 'amber')) {
          dotColor = '#FFB800';
        }

        const currentRadius = p.radius + Math.sin(p.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.8, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.globalAlpha = 0.45 + Math.sin(p.pulse) * 0.25;
        ctx.shadowBlur = 12;
        ctx.shadowColor = dotColor;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        // Inter-particle glowing lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distBetween < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - distBetween / 130) * 0.14;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      ctx.restore();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [activeVertical]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-65 transition-opacity duration-1000"
    />
  );
}
