import React, { useEffect, useRef } from 'react';

/**
 * SmokeCursor - Realistic smoke trail that follows the mouse cursor.
 *
 * Realism techniques used:
 *  - Trail accumulation: instead of clearing the canvas each frame we fade the
 *    existing pixels with `destination-out`. This makes particles linger, merge
 *    into soft puffs and dissipate gradually — exactly how real smoke behaves.
 *  - `mix-blend-mode: screen` on the canvas so the smoke reads as illuminated
 *    wisps over the dark IT background.
 *  - Buoyancy: smoke rises, accelerating as the "hot" particle ages.
 *  - Curl-like turbulence (multiple sine frequencies) for organic swirling eddies.
 *  - Expansion: puffs grow & thin out as they fade.
 *  - DPR-aware canvas for crisp, smooth edges.
 */
const SmokeCursor = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const prevMouseRef = useRef({ x: -100, y: -100 });
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const updateMouse = (clientX, clientY) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: clientX, y: clientY };
    };

    const onMouseMove = (e) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const t = e.touches[0];
      if (t) updateMouse(t.clientX, t.clientY);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const particles = particlesRef.current;

    // Cool, desaturated tints so it reads as SMOKE while keeping the IT
    // brand tone (blues / mint). Mostly white with a subtle hue.
    const tints = [
      [195, 215, 245], // pale blue-white
      [200, 230, 235], // mint-white
      [185, 205, 240], // cool steel-blue white
      [225, 235, 250], // near white
      [210, 225, 245],
      [205, 240, 225], // soft green-white
    ];

    const emit = (x, y, prevX, prevY) => {
      const dx = x - prevX;
      const dy = y - prevY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // interpolate between frames so fast moves still produce a continuous trail
      const steps = Math.max(1, Math.min(8, Math.floor(dist / 5)));
      // faster cursor => slightly denser, larger puffs
      const speedFactor = Math.min(1.5, 0.5 + dist * 0.035);

      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        const ix = prevX + dx * t;
        const iy = prevY + dy * t;

        const count = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < count; i++) {
          const ang = Math.random() * Math.PI * 2;
          const sp = Math.random() * 0.5 * speedFactor;
          const tint = tints[(Math.random() * tints.length) | 0];
          particles.push({
            x: ix + (Math.random() - 0.5) * 6,
            y: iy + (Math.random() - 0.5) * 6,
            // inherit a touch of cursor momentum + small random spread, biased up
            vx: Math.cos(ang) * sp + dx * 0.02,
            vy: Math.sin(ang) * sp + dy * 0.02 - Math.random() * 0.4,
            size: Math.random() * 6 + 4,
            maxSize: Math.random() * 45 + 35,
            grow: Math.random() * 0.35 + 0.2,
            life: 1,
            decay: Math.random() * 0.006 + 0.0035,
            tint,
            // curl-turbulence params
            f1: Math.random() * 0.03 + 0.01,
            f2: Math.random() * 0.02 + 0.006,
            a1: Math.random() * 0.9 + 0.4,
            a2: Math.random() * 0.7 + 0.3,
            ph: Math.random() * Math.PI * 2,
            t: 0,
          });
        }
      }
    };

    const animate = () => {
      // --- Fade existing pixels to create the lingering, dissipating trail ---
      // destination-out with low alpha erases a little each frame, so puffs
      // soften into each other and drift away instead of vanishing instantly.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'source-over';

      const { x: mx, y: my } = mouseRef.current;
      const { x: px, y: py } = prevMouseRef.current;
      const movedDist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2);

      if (movedDist > 0.5 && mx > 0 && my > 0) {
        emit(mx, my, px, py);
      }

      // safety cap
      if (particles.length > 700) {
        particles.splice(0, particles.length - 700);
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.t++;

        // --- organic swirl via overlapping sine fields (curl-noise-ish) ---
        const tx =
          Math.sin(p.t * p.f1 + p.ph) * p.a1 +
          Math.sin(p.t * p.f2 * 1.7) * p.a2 * 0.5;
        const ty =
          Math.cos(p.t * p.f1 * 0.8 + p.ph) * p.a1 * 0.6 +
          Math.cos(p.t * p.f2 * 2.3) * p.a2 * 0.4;

        // buoyancy: hot smoke rises faster as it ages, drags sideways velocity
        const age = 1 - p.life;
        const buoy = 0.25 + age * 0.7;
        p.vx = p.vx * 0.96 + tx * 0.05;
        p.vy = p.vy * 0.96 + ty * 0.05 - buoy * 0.02;

        p.x += p.vx + tx * 0.3;
        p.y += p.vy - buoy * 0.4; // strong, accelerating rise

        // expand (diffuse) faster late in life
        if (p.size < p.maxSize) p.size += p.grow * (1 + age * 1.5);

        // --- soft smoke puff ---
        const size = Math.max(0.5, p.size);
        const alpha = p.life * p.life; // ease-out fade
        const [r, g, b] = p.tint;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.34})`);
        grad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${alpha * 0.17})`);
        grad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${alpha * 0.06})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- a subtle glowing "ember" at the source (where the mouse is) ---
      if (mx > 0 && my > 0) {
        const eg = ctx.createRadialGradient(mx, my, 0, mx, my, 22);
        eg.addColorStop(0, 'rgba(180, 215, 255, 0.22)');
        eg.addColorStop(0.5, 'rgba(120, 180, 240, 0.07)');
        eg.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(mx, my, 22, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      // screen blend makes the smoke glow softly over the dark IT background
      style={{ zIndex: 9999, mixBlendMode: 'screen' }}
    />
  );
};

export default SmokeCursor;
