import React, { useRef, useEffect, useCallback } from 'react';

const InteractiveBackground = ({
  variant = 'default',
  particleCount = 80,
  orbCount = 5,
  connectionDistance = 150,
  mouseRadius = 200,
  showGrid = true,
  burstCount = 60,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);
  const orbsRef = useRef([]);
  const burstsRef = useRef([]);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);

  // Brand colors
  const colors = {
    blue: { r: 30, g: 136, b: 229 },
    green: { r: 76, g: 175, b: 80 },
    lime: { r: 139, g: 195, b: 74 },
    white: { r: 255, g: 255, b: 255 },
  };

  const colorArray = [colors.blue, colors.green, colors.lime];

  const initParticles = useCallback((width, height) => {
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const color = colorArray[Math.floor(Math.random() * colorArray.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2.5,
        vy: (Math.random() - 0.5) * 2.5,
        radius: Math.random() * 2 + 1,
        color,
        baseAlpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  const initOrbs = useCallback((width, height) => {
    const orbs = [];
    for (let i = 0; i < orbCount; i++) {
      const color = colorArray[i % colorArray.length];
      orbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 100 + 80,
        color,
        alpha: 0.04 + Math.random() * 0.04,
        pulseSpeed: Math.random() * 0.005 + 0.003,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }
    orbsRef.current = orbs;
  }, [orbCount]);

  // Spawn burst particles at click position
  const spawnBurst = useCallback((x, y) => {
    const newBursts = [];
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 / burstCount) * i + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 2;
      const allColors = [colors.blue, colors.green, colors.lime, colors.white];
      const color = allColors[Math.floor(Math.random() * allColors.length)];
      const type = Math.random();

      newBursts.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: type > 0.7 ? Math.random() * 4 + 2 : Math.random() * 2 + 0.5,
        color,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.008,
        gravity: 0.02 + Math.random() * 0.03,
        friction: 0.98,
        // Trail
        trail: type > 0.5,
        prevX: x,
        prevY: y,
        // Sparkle
        sparkle: type > 0.8,
        sparklePhase: Math.random() * Math.PI * 2,
      });
    }

    // Shockwave ring
    newBursts.push({
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 5,
      color: colors.lime,
      life: 1.0,
      decay: 0.025,
      gravity: 0,
      friction: 1,
      isRing: true,
      ringRadius: 5,
      ringMaxRadius: 200,
      ringSpeed: 8,
      trail: false,
      sparkle: false,
    });

    // Second ring (delayed feel)
    newBursts.push({
      x,
      y,
      vx: 0,
      vy: 0,
      radius: 5,
      color: colors.blue,
      life: 1.0,
      decay: 0.02,
      gravity: 0,
      friction: 1,
      isRing: true,
      ringRadius: 5,
      ringMaxRadius: 150,
      ringSpeed: 5,
      trail: false,
      sparkle: false,
    });

    burstsRef.current = [...burstsRef.current, ...newBursts];
  }, [burstCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    initParticles(width, height);
    initOrbs(width, height);

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Click / tap burst
    const handleClick = (e) => {
      spawnBurst(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        spawnBurst(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const animate = () => {
      timeRef.current += 1;
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      // Draw subtle grid
      if (showGrid) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 0.5;
        const gridSize = 60;
        const offsetX = (timeRef.current * 0.1) % gridSize;
        const offsetY = (timeRef.current * 0.05) % gridSize;
        for (let x = -gridSize + offsetX; x < width + gridSize; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = -gridSize + offsetY; y < height + gridSize; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Update and draw orbs
      orbsRef.current.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const dx = mouse.x - orb.x;
        const dy = mouse.y - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius * 2) {
          orb.vx += dx * 0.00002;
          orb.vy += dy * 0.00002;
        }

        const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
        if (speed > 0.5) {
          orb.vx *= 0.98;
          orb.vy *= 0.98;
        }

        const pulse = Math.sin(timeRef.current * orb.pulseSpeed + orb.pulseOffset) * 0.5 + 0.5;
        const currentAlpha = orb.alpha * (0.7 + pulse * 0.3);

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentAlpha})`);
        gradient.addColorStop(0.5, `rgba(${orb.color.r}, ${orb.color.g}, ${orb.color.b}, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update particles
      const particles = particlesRef.current;
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          if (dist < mouseRadius * 0.3) {
            p.vx -= dx * force * 0.008;
            p.vy -= dy * force * 0.008;
          } else {
            p.vx += dx * force * 0.002;
            p.vy += dy * force * 0.002;
          }
          p.vx += -dy * force * 0.001;
          p.vy += dx * force * 0.001;
        }

        p.x += p.vx;
        p.y += p.vy;

        p.vx *= 0.999;
        p.vy *= 0.999;

        // Keep minimum speed so dots never stop
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < 0.6) {
          const angle = Math.atan2(p.vy, p.vx);
          p.vx = Math.cos(angle) * 0.8;
          p.vy = Math.sin(angle) * 0.8;
          if (speed < 0.15) {
            p.vx = (Math.random() - 0.5) * 2.5;
            p.vy = (Math.random() - 0.5) * 2.5;
          }
        }

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pulse = Math.sin(timeRef.current * p.pulseSpeed + p.pulseOffset);
        p.currentAlpha = p.baseAlpha + pulse * 0.15;
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            const c1 = particles[i].color;
            const c2 = particles[j].color;
            const mr = Math.round((c1.r + c2.r) / 2);
            const mg = Math.round((c1.g + c2.g) / 2);
            const mb = Math.round((c1.b + c2.b) / 2);

            ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections
      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRadius) {
          const alpha = (1 - dist / mouseRadius) * 0.25;
          ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }
      });

      // Draw particles
      particles.forEach((p) => {
        const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        glowGradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.currentAlpha * 0.5})`);
        glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.currentAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${p.currentAlpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw mouse cursor glow
      if (mouse.x > 0 && mouse.y > 0) {
        const cursorGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, mouseRadius * 0.5);
        cursorGlow.addColorStop(0, 'rgba(139, 195, 74, 0.06)');
        cursorGlow.addColorStop(0.5, 'rgba(76, 175, 80, 0.03)');
        cursorGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouseRadius * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ==========================================
      // BURST PARTICLES — Click explosion effect
      // ==========================================
      const bursts = burstsRef.current;
      const aliveBursts = [];

      bursts.forEach((b) => {
        // Fade life
        b.life -= b.decay;
        if (b.life <= 0) return; // dead particle, don't keep

        if (b.isRing) {
          // Shockwave ring
          b.ringRadius += b.ringSpeed;
          const ringAlpha = b.life * 0.6;
          ctx.strokeStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${ringAlpha})`;
          ctx.lineWidth = 2 * b.life;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.ringRadius, 0, Math.PI * 2);
          ctx.stroke();

          // Inner glow of ring
          if (b.life > 0.3) {
            const ringGlow = ctx.createRadialGradient(b.x, b.y, b.ringRadius * 0.8, b.x, b.y, b.ringRadius);
            ringGlow.addColorStop(0, 'rgba(0, 0, 0, 0)');
            ringGlow.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${ringAlpha * 0.15})`);
            ctx.fillStyle = ringGlow;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.ringRadius, 0, Math.PI * 2);
            ctx.fill();
          }
        } else {
          // Store previous position for trail
          b.prevX = b.x;
          b.prevY = b.y;

          // Physics
          b.vy += b.gravity;
          b.vx *= b.friction;
          b.vy *= b.friction;
          b.x += b.vx;
          b.y += b.vy;

          const alpha = b.life;

          // Draw trail line
          if (b.trail) {
            const trailAlpha = alpha * 0.4;
            ctx.strokeStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${trailAlpha})`;
            ctx.lineWidth = b.radius * 0.8 * b.life;
            ctx.beginPath();
            ctx.moveTo(b.prevX, b.prevY);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }

          // Sparkle effect — pulsing brightness
          let displayAlpha = alpha;
          if (b.sparkle) {
            const sparkleVal = Math.sin(timeRef.current * 0.3 + b.sparklePhase);
            displayAlpha *= (0.5 + sparkleVal * 0.5);
          }

          // Glow
          const burstGlow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, Math.max(0.1, b.radius * 5 * b.life));
          burstGlow.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${displayAlpha * 0.4})`);
          burstGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = burstGlow;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 5 * b.life, 0, Math.PI * 2);
          ctx.fill();

          // Core dot
          ctx.fillStyle = `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${displayAlpha})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * b.life, 0, Math.PI * 2);
          ctx.fill();

          // White hot center
          ctx.fillStyle = `rgba(255, 255, 255, ${displayAlpha * 0.7})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius * 0.4 * b.life, 0, Math.PI * 2);
          ctx.fill();
        }

        aliveBursts.push(b);
      });

      burstsRef.current = aliveBursts;

      // Draw geometric shapes floating
      const shapes = 6;
      for (let i = 0; i < shapes; i++) {
        const t = timeRef.current * 0.001;
        const sx = (Math.sin(t * (i + 1) * 0.7 + i * 1.5) * 0.5 + 0.5) * width;
        const sy = (Math.cos(t * (i + 1) * 0.5 + i * 2.1) * 0.5 + 0.5) * height;
        const size = 20 + i * 8;
        const rotation = t * (i + 1) * 0.5;
        const shapeAlpha = 0.03 + Math.sin(t * 2 + i) * 0.01;
        const color = colorArray[i % colorArray.length];

        ctx.save();
        ctx.translate(sx, sy);
        ctx.rotate(rotation);
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${shapeAlpha})`;
        ctx.lineWidth = 1;

        if (i % 3 === 0) {
          ctx.beginPath();
          for (let s = 0; s < 6; s++) {
            const angle = (Math.PI / 3) * s;
            const hx = Math.cos(angle) * size;
            const hy = Math.sin(angle) * size;
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        } else if (i % 3 === 1) {
          ctx.beginPath();
          for (let s = 0; s < 3; s++) {
            const angle = (Math.PI * 2 / 3) * s - Math.PI / 2;
            const hx = Math.cos(angle) * size;
            const hy = Math.sin(angle) * size;
            if (s === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.6, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size * 0.6, 0);
          ctx.closePath();
          ctx.stroke();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouchStart);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [initParticles, initOrbs, spawnBurst, connectionDistance, mouseRadius, showGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0"
      style={{
        zIndex: 0,
        background: variant === 'dark'
          ? 'radial-gradient(ellipse at 50% 50%, #0a0a0a 0%, #000000 100%)'
          : 'radial-gradient(ellipse at 50% 50%, #0d0d0d 0%, #000000 100%)'
      }}
    />
  );
};

export default InteractiveBackground;
