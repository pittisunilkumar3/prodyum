import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, Monitor, Check } from 'lucide-react';
import InteractiveBackground from '../components/InteractiveBackground';
import { AnimatedShinyText, SparklesCore } from '../components/animations';

// ============ CANVAS BURST - Draws particles on a canvas overlay ============
const CanvasBurst = ({ x, y, color, active }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isBlue = color === 'blue';
    const colors = isBlue
      ? [{ r: 30, g: 136, b: 229 }, { r: 76, g: 175, b: 80 }, { r: 255, g: 255, b: 255 }, { r: 100, g: 180, b: 255 }]
      : [{ r: 76, g: 175, b: 80 }, { r: 139, g: 195, b: 74 }, { r: 255, g: 255, b: 255 }, { r: 180, g: 255, b: 120 }];

    // Spawn 120 particles
    const particles = [];
    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 / 120) * i + (Math.random() - 0.5) * 0.6;
      const speed = Math.random() * 12 + 4;
      const c = colors[Math.floor(Math.random() * colors.length)];
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 4 + 1,
        color: c,
        life: 1,
        decay: Math.random() * 0.02 + 0.01,
        gravity: 0.04,
        trail: [],
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;

        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        p.vy += p.gravity;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) return;

        const r = Math.max(0.1, p.radius * p.life);

        // Draw trail
        if (p.trail.length > 1) {
          for (let t = 0; t < p.trail.length - 1; t++) {
            const alpha = (t / p.trail.length) * p.life * 0.3;
            ctx.strokeStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
            ctx.lineWidth = r * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.trail[t].x, p.trail[t].y);
            ctx.lineTo(p.trail[t + 1].x, p.trail[t + 1].y);
            ctx.stroke();
          }
        }

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, Math.max(0.1, r * 6));
        grad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life * 0.4})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, r * 6), 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // White center
        ctx.fillStyle = `rgba(255,255,255, ${p.life * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, r * 0.3), 0, Math.PI * 2);
        ctx.fill();
      });

      if (alive) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, x, y, color]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 60 }}
    />
  );
};

// ============ SHOCKWAVE RINGS - CSS expanding rings ============
const ShockwaveRings = ({ x, y, color, active }) => {
  if (!active) return null;
  const isBlue = color === 'blue';
  const rgb = isBlue ? '30,136,229' : '76,175,80';
  const rgb2 = isBlue ? '100,180,255' : '180,255,120';

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 55 }}>
      {[0, 0.08, 0.16, 0.24, 0.32, 0.4, 0.5, 0.6].map((delay, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: x,
            top: y,
            width: 20,
            height: 20,
            transform: 'translate(-50%, -50%)',
            border: `${3 - i * 0.3}px solid rgba(${i % 2 === 0 ? rgb : rgb2}, ${0.8 - i * 0.08})`,
            boxShadow: `0 0 ${30 - i * 3}px rgba(${rgb}, ${0.4 - i * 0.04}), inset 0 0 ${20 - i * 2}px rgba(${rgb}, ${0.2 - i * 0.02})`,
            animation: `shockwaveExpand 0.8s ease-out ${delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
};

// ============ LIGHT RAYS - Radial beams shooting outward ============
const LightRays = ({ x, y, color, active }) => {
  if (!active) return null;
  const isBlue = color === 'blue';
  const rgb = isBlue ? '30,136,229' : '76,175,80';

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 54 }}>
      {[...Array(16)].map((_, i) => {
        const angle = (360 / 16) * i;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: 2,
              height: 0,
              background: `linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(${rgb},0.6) 40%, transparent)`,
              transform: `translate(-50%, 0) rotate(${angle}deg)`,
              transformOrigin: 'top center',
              borderRadius: 4,
              animation: `rayShoot 0.6s ease-out ${i * 0.015}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
};

// ============ CIRCLE WIPE - JS animated circle expand ============
const CircleWipe = ({ x, y, color, active }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!active || !ref.current) return;
    const el = ref.current;
    const maxRadius = Math.sqrt(
      Math.pow(Math.max(x, window.innerWidth - x), 2) +
      Math.pow(Math.max(y, window.innerHeight - y), 2)
    );
    const duration = 600; // ms
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const radius = eased * maxRadius;
      el.style.clipPath = `circle(${radius}px at ${x}px ${y}px)`;
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [active, x, y]);

  if (!active) return null;
  const isBlue = color === 'blue';
  const bg = isBlue
    ? 'radial-gradient(circle at 50% 50%, #1E88E5 0%, #0D47A1 100%)'
    : 'radial-gradient(circle at 50% 50%, #4CAF50 0%, #1B5E20 100%)';

  return (
    <div
      ref={ref}
      className="fixed inset-0"
      style={{
        zIndex: 70,
        background: bg,
        clipPath: `circle(0px at ${x}px ${y}px)`,
      }}
    />
  );
};

// ============ WHITE FLASH - final whiteout ============
const WhiteFlash = ({ active }) => {
  if (!active) return null;
  return (
    <div
      className="fixed inset-0"
      style={{
        zIndex: 80,
        background: 'white',
        opacity: 0,
        animation: 'whiteFlash 0.5s ease-in-out 0.6s forwards',
      }}
    />
  );
};

// ============ LANDING PAGE ============
const Landing = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [flashColor, setFlashColor] = useState(null);
  const [blastOrigin, setBlastOrigin] = useState({ x: 0, y: 0 });
  const [phase, setPhase] = useState(0);
  const navigate = useNavigate();

  // Refs for the ball elements
  const leftBallRef = useRef(null);
  const rightBallRef = useRef(null);

  // Real physics bounce animation
  useEffect(() => {
    const animIds = [];
    const balls = [
      { el: leftBallRef.current, startX: -0.42 },
      { el: rightBallRef.current, startX: 0.42 },
    ];

    balls.forEach(({ el, startX }, ballIndex) => {
      if (!el) return;

      const bounciness = 0.50;
      const totalBounces = 12;

      // Pre-calculate bounce heights and durations
      const bounceHeights = [];
      const bounceDurations = [];
      let h = 0.35;
      let totalTime = 0;
      for (let i = 0; i < totalBounces; i++) {
        bounceHeights.push(h);
        // Duration scales with sqrt of height (real physics: T ∝ √h)
        const d = Math.sqrt(h) * 0.65; // slower, gentler bounces
        bounceDurations.push(d);
        totalTime += d;
        h *= bounciness;
      }
      // Add settling time after bounces
      const settleDuration = 0.5;
      totalTime += settleDuration;

      const delay = ballIndex * 200;
      const duration = totalTime * 1000; // convert to ms
      let startTime = null;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;

        if (elapsed < delay) {
          animIds[ballIndex] = requestAnimationFrame(animate);
          return;
        }

        const t = Math.min((elapsed - delay) / duration, 1); // 0 to 1

        if (t >= 1) {
          el.style.transform = 'translate(0, 0)';
          el.style.opacity = '1';
          return;
        }

        // Fade in
        el.style.opacity = t < 0.03 ? (t / 0.03).toString() : '1';

        // Horizontal: smooth ease-out drift - reaches 0 at the very end
        const hProgress = 1 - Math.pow(1 - t, 2.5);
        const x = startX * (1 - hProgress);

        // Find which bounce we're in
        let remainingT = t;
        let inBounce = -1;

        for (let i = 0; i < totalBounces; i++) {
          if (remainingT <= bounceDurations[i] / totalTime) {
            inBounce = i;
            break;
          }
          remainingT -= bounceDurations[i] / totalTime;
        }

        if (inBounce >= 0) {
          // Inside a bounce
          const normalizedDuration = bounceDurations[inBounce] / totalTime;
          const progress = remainingT / normalizedDuration; // 0 to 1
          const currentH = bounceHeights[inBounce];

          // Parabolic arc
          const arc = 4 * currentH * progress * (1 - progress);
          const y = -arc;

          // Squash & stretch
          const velNorm = Math.abs(0.5 - progress) * 2;
          const squashAmount = velNorm * Math.min(0.3, currentH * 0.4);

          let scaleX, scaleY;
          if (arc < currentH * 0.05) {
            // Impact squash
            scaleX = 1 + squashAmount * 3;
            scaleY = 1 / (1 + squashAmount * 3);
          } else {
            // Air stretch
            scaleX = 1 - squashAmount * 0.3;
            scaleY = 1 + squashAmount * 0.5;
          }

          el.style.transform = `translate(${x * 100}vw, ${y * 100}vh) scaleX(${scaleX}) scaleY(${scaleY})`;
        } else {
          // Settling phase - exponential decay vibration
          const settleProgress = remainingT / (settleDuration / totalTime);
          const decay = Math.exp(-settleProgress * 12);
          const vibFreq = settleProgress * Math.PI * 30;
          const microY = Math.sin(vibFreq) * decay * 0.015;
          const microSquash = 1 + Math.abs(Math.sin(vibFreq)) * decay * 0.08;
          el.style.transform = `translate(${x * 100}vw, ${microY * 100}vh) scaleX(${microSquash}) scaleY(${1 / microSquash})`;
        }

        animIds[ballIndex] = requestAnimationFrame(animate);
      };

      animIds[ballIndex] = requestAnimationFrame(animate);
    });

    return () => {
      animIds.forEach(id => { if (id) cancelAnimationFrame(id); });
    };
  }, []);

  const handleCardClick = useCallback((path, color, e) => {
    if (phase !== 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    setSelectedCard(path);
    setFlashColor(color);
    setBlastOrigin({ x: cx, y: cy });

    // Phase 1: immediate - shake + burst particles + shockwave + rays
    setPhase(1);

    // Phase 2: circle wipe (after small delay)
    setTimeout(() => setPhase(2), 200);

    // Phase 3: white flash
    setTimeout(() => setPhase(3), 600);

    // Navigate
    setTimeout(() => navigate(path), 1100);
  }, [phase, navigate]);

  return (
    <div className={`min-h-screen bg-black flex items-center justify-center relative overflow-hidden ${
      phase === 1 ? 'animate-[screenShake_0.4s_ease-in-out]' : ''
    }`}>
      {/* Interactive Particle Background */}
      <InteractiveBackground
        particleCount={250}
        orbCount={7}
        connectionDistance={120}
        mouseRadius={250}
        showGrid={true}
      />

      {/* ====== BLAST EFFECTS LAYERS ====== */}

      {/* Layer 1: Canvas particle burst (z:60) */}
      <CanvasBurst x={blastOrigin.x} y={blastOrigin.y} color={flashColor} active={phase >= 1} />

      {/* Layer 2: Shockwave rings (z:55) */}
      <ShockwaveRings x={blastOrigin.x} y={blastOrigin.y} color={flashColor} active={phase >= 1} />

      {/* Layer 3: Light rays (z:54) */}
      <LightRays x={blastOrigin.x} y={blastOrigin.y} color={flashColor} active={phase >= 1} />

      {/* Layer 4: Circle wipe color takeover (z:70) */}
      <CircleWipe x={blastOrigin.x} y={blastOrigin.y} color={flashColor} active={phase >= 2} />

      {/* Layer 5: Final white flash (z:80) */}
      <WhiteFlash active={phase >= 3} />

      {/* Content wrapper */}
      <div className={`relative z-10 flex items-center justify-center w-full min-h-screen transition-all duration-300 ${
        phase >= 1 ? 'opacity-0 scale-95' : ''
      }`}>
        {/* Badge - Fixed at top center */}
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 backdrop-blur-sm">
            <span className="text-gray-300 text-sm">
              <AnimatedShinyText className="text-gray-300" speed={3}>
                Welcome to ProDyum
              </AnimatedShinyText>
            </span>
          </div>
        </div>

        <div className="text-center px-4 max-w-6xl mx-auto">

          {/* Circular Cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-24 md:gap-56">

            {/* ============ ProDyum IT Card ============ */}
            <div
              onClick={(e) => handleCardClick('/it', 'blue', e)}
              className="group relative cursor-pointer"
              ref={leftBallRef}
            >
              {/* Vibration Waves */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-blue-400/50 animate-[ripple_3s_ease-out_infinite]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-blue-400/40 animate-[ripple_3s_ease-out_infinite_0.4s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-blue-500/35 animate-[ripple_3s_ease-out_infinite_0.8s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-blue-500/30 animate-[ripple_3s_ease-out_infinite_1.2s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-green-500/25 animate-[ripple_3s_ease-out_infinite_1.6s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-green-500/20 animate-[ripple_3s_ease-out_infinite_2.0s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-prodyum-green-400/15 animate-[ripple_3s_ease-out_infinite_2.4s]" />
                <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-prodyum-blue-500/15 blur-3xl animate-[glowPulse_2s_ease-in-out_infinite]" />
              </div>

              {/* Main Circle Card */}
              <div className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 ${
                selectedCard === '/it' ? 'scale-110' : ''
              }`}>
                {/* Hover glow background */}
                <div className="absolute -inset-2 rounded-full bg-prodyum-blue-500/0 group-hover:bg-prodyum-blue-500/20 blur-xl transition-all duration-700" />
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800/90 backdrop-blur-md border-2 transition-all duration-500 ${
                  selectedCard === '/it' 
                    ? 'border-prodyum-blue-500 shadow-2xl shadow-prodyum-blue-500/40' 
                    : 'border-prodyum-blue-500/20 group-hover:border-prodyum-blue-400/80 group-hover:shadow-[0_0_30px_rgba(30,136,229,0.4)]'
                }`} />
                {/* Inner glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-prodyum-blue-500/0 via-transparent to-prodyum-green-500/0 group-hover:from-prodyum-blue-500/15 group-hover:to-prodyum-green-500/15 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(30,136,229,0.6)] transition-all duration-300">
                    <Monitor className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white mb-0.5 transition-colors duration-300 group-hover:text-prodyum-blue-300">ProDyum IT</h2>
                  <p className="text-gray-500 text-[8px] mb-0.5 transition-colors duration-300 group-hover:text-gray-400">Pvt Ltd</p>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 rounded-full transition-all duration-300 group-hover:w-8" />
                </div>

                {selectedCard === '/it' && (
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 rounded-full flex items-center justify-center animate-in zoom-in z-20">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* ============ ProDyum Entertainments Card ============ */}
            <div
              onClick={(e) => handleCardClick('/entertainment', 'green', e)}
              className="group relative cursor-pointer"
              ref={rightBallRef}
            >
              {/* Vibration Waves */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-lime-400/50 animate-[ripple_3s_ease-out_infinite]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-green-400/40 animate-[ripple_3s_ease-out_infinite_0.4s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-green-500/35 animate-[ripple_3s_ease-out_infinite_0.8s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-lime-500/30 animate-[ripple_3s_ease-out_infinite_1.2s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-green-500/25 animate-[ripple_3s_ease-out_infinite_1.6s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-prodyum-lime-500/20 animate-[ripple_3s_ease-out_infinite_2.0s]" />
                <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-prodyum-green-400/15 animate-[ripple_3s_ease-out_infinite_2.4s]" />
                <div className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-prodyum-green-500/15 blur-3xl animate-[glowPulse_2s_ease-in-out_infinite_1s]" />
              </div>

              {/* Main Circle Card */}
              <div className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center text-center p-3 transition-all duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-2 ${
                selectedCard === '/entertainment' ? 'scale-110' : ''
              }`}>
                {/* Hover glow background */}
                <div className="absolute -inset-2 rounded-full bg-prodyum-green-500/0 group-hover:bg-prodyum-green-500/20 blur-xl transition-all duration-700" />
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-900/95 to-neutral-800/90 backdrop-blur-md border-2 transition-all duration-500 ${
                  selectedCard === '/entertainment' 
                    ? 'border-prodyum-lime-500 shadow-2xl shadow-prodyum-lime-500/40' 
                    : 'border-prodyum-lime-500/20 group-hover:border-prodyum-lime-400/80 group-hover:shadow-[0_0_30px_rgba(139,195,74,0.4)]'
                }`} />
                {/* Inner glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-prodyum-green-500/0 via-transparent to-prodyum-lime-500/0 group-hover:from-prodyum-green-500/15 group-hover:to-prodyum-lime-500/15 transition-all duration-500 pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-prodyum-green-500 to-prodyum-lime-500 flex items-center justify-center mb-1 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(139,195,74,0.6)] transition-all duration-300">
                    <Film className="h-4 w-4 text-black" />
                  </div>
                  <h2 className="text-sm sm:text-base font-bold text-white mb-0.5 transition-colors duration-300 group-hover:text-prodyum-lime-300">ProDyum</h2>
                  <p className="text-gray-500 text-[8px] mb-0.5 transition-colors duration-300 group-hover:text-gray-400">Entertainments</p>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500 rounded-full transition-all duration-300 group-hover:w-8" />
                </div>

                {selectedCard === '/entertainment' && (
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500 rounded-full flex items-center justify-center animate-in zoom-in z-20">
                    <Check className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Landing;
