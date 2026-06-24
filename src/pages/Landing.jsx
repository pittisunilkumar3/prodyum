import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Monitor, ArrowRight, Check, Clapperboard } from 'lucide-react';
import Portal3DCanvas from '../components/Portal3DCanvas';
import FilmGrain from '../components/entertainment/FilmGrain';

const Landing = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  // mouse parallax for the hero (subtle depth)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const heroX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const heroY = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const orbX = useTransform(sx, [-0.5, 0.5], [28, -28]);
  const orbY = useTransform(sy, [-0.5, 0.5], [22, -22]);

  useEffect(() => {
    const onMove = (e) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  const handleCardClick = (path) => {
    setSelectedCard(path);
    // Add a small delay for animation before navigation
    setTimeout(() => {
      navigate(path);
    }, 320);
  };

  const ease = [0.22, 1, 0.36, 1];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black"
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      {/* === cinematic backdrop (paints after text, instant) === */}
      <Portal3DCanvas />

      {/* ambient gradient orbs with parallax */}
      <motion.div
        aria-hidden="true"
        style={{ x: orbX, y: orbY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[18%] top-[22%] h-[26rem] w-[26rem] rounded-full bg-prodyum-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-[18%] right-[16%] h-[28rem] w-[28rem] rounded-full bg-prodyum-green-500/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-prodyum-lime-500/10 blur-[130px]" />
      </motion.div>

      {/* grid + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_5%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.85)_100%)]" />
      <FilmGrain opacity={0.04} />

      {/* === content (parallax layer) === */}
      <motion.div
        style={{ x: heroX, y: heroY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-4 py-16 text-center sm:px-6"
      >
        {/* badge */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-prodyum-green-500/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-prodyum-green-500" />
          </span>
          <span className="text-sm text-gray-200">Welcome to ProDyum</span>
        </motion.div>

        {/* headline */}
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: 0.38, duration: 0.9, ease }}
          className="font-display text-4xl font-bold leading-[1.05] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="block text-white">Choose Your</span>
          <span className="mt-1 block text-gradient-animated">Destination</span>
        </motion.h1>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.8, ease }}
          className="mx-auto mt-6 max-w-2xl text-base text-gray-300 sm:text-xl"
        >
          A multi-division brand bringing together technology, digital marketing, and entertainment under one ecosystem.
        </motion.p>

        {/* cards */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:mt-16">
          {/* ProDyum IT */}
          <motion.button
            type="button"
            data-cursor-label="Explore"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.82, duration: 0.8, ease }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick('/it')}
            className={`group relative block w-full text-left transition-transform duration-500 ${selectedCard === '/it' ? 'scale-[1.02]' : ''}`}
          >
            {/* rotating conic border */}
            <span className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:conic-gradient(from_var(--tw-angle,0deg),#1E88E5,#4CAF50,#8BC34A,#1E88E5)]" />
            <span className="pointer-events-none absolute -inset-px rounded-[2rem] [background:linear-gradient(135deg,rgba(30,136,229,0.6),rgba(76,175,80,0.5))] opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
            {/* outer glow */}
            <span className="pointer-events-none absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-prodyum-blue-500/30 to-prodyum-green-500/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <span
              className={`relative flex h-full flex-col items-center overflow-hidden rounded-[2rem] border bg-neutral-950/80 p-8 backdrop-blur-xl transition-all duration-500 md:p-10 ${
                selectedCard === '/it' ? 'border-prodyum-blue-500 shadow-2xl shadow-prodyum-blue-500/40' : 'border-white/10'
              }`}
            >
              {selectedCard === '/it' && (
                <span className="absolute -right-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 shadow-lg">
                  <Check className="h-4 w-4 text-white" />
                </span>
              )}

              {/* floating icon orb */}
              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 shadow-xl shadow-prodyum-blue-500/40 transition-transform duration-300 group-hover:scale-110"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-prodyum-blue-500 to-prodyum-green-500 opacity-50 blur-lg" />
                <Monitor className="relative h-10 w-10 text-white" />
              </motion.span>

              <span className="font-display text-2xl font-bold text-white md:text-3xl">ProDyum IT</span>
              <span className="mt-1 text-xs uppercase tracking-[0.25em] text-prodyum-blue-400">Pvt Ltd</span>
              <span className="mt-4 text-sm leading-relaxed text-gray-300">
                Digital Marketing, Branding &amp; Design, Web Development, and Multimedia Solutions.
              </span>

              <span className="group/exp relative mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 font-semibold text-white shadow-lg shadow-prodyum-blue-500/30 transition-all duration-300 group-hover:shadow-prodyum-blue-500/60">
                {/* animated gradient border */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-blue-500 via-prodyum-green-500 to-prodyum-lime-500 bg-[length:200%_auto] animate-shine" />
                {/* dark glass inner */}
                <span className="pointer-events-none absolute inset-[1.5px] rounded-full bg-neutral-950/85 backdrop-blur-sm transition-opacity duration-300 group-hover/exp:opacity-0" />
                {/* hover gradient fill */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-blue-500 to-prodyum-green-500 opacity-0 transition-opacity duration-300 group-hover/exp:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/exp:translate-x-1" />
                </span>
              </span>
            </span>
          </motion.button>

          {/* ProDyum Entertainments */}
          <motion.button
            type="button"
            data-cursor-label="Explore"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.96, duration: 0.8, ease }}
            whileHover={{ y: -8 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick('/entertainment')}
            className={`group relative block w-full text-left transition-transform duration-500 ${selectedCard === '/entertainment' ? 'scale-[1.02]' : ''}`}
          >
            <span className="pointer-events-none absolute -inset-px rounded-[2rem] [background:linear-gradient(135deg,rgba(76,175,80,0.6),rgba(139,195,74,0.6))] opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute -inset-3 rounded-[2.4rem] bg-gradient-to-br from-prodyum-green-500/30 to-prodyum-lime-500/30 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <span
              className={`relative flex h-full flex-col items-center overflow-hidden rounded-[2rem] border bg-neutral-950/80 p-8 backdrop-blur-xl transition-all duration-500 md:p-10 ${
                selectedCard === '/entertainment' ? 'border-prodyum-lime-500 shadow-2xl shadow-prodyum-lime-500/40' : 'border-white/10'
              }`}
            >
              {selectedCard === '/entertainment' && (
                <span className="absolute -right-2 -top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500 shadow-lg">
                  <Check className="h-4 w-4 text-white" />
                </span>
              )}

              <motion.span
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-prodyum-green-500 to-prodyum-lime-500 shadow-xl shadow-prodyum-green-500/40 transition-transform duration-300 group-hover:scale-110"
              >
                <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-prodyum-green-500 to-prodyum-lime-500 opacity-50 blur-lg" />
                {/* inner glass ring for a premium cinematic feel */}
                <span className="absolute inset-[3px] rounded-[0.85rem] border border-white/25 bg-black/10 backdrop-blur-sm" />
                <Clapperboard className="relative h-10 w-10 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]" />
              </motion.span>

              <span className="font-display text-2xl font-bold text-white md:text-3xl">ProDyum Entertainments</span>
              <span className="mt-1 min-h-[1rem] text-xs uppercase tracking-[0.25em] text-transparent">&nbsp;</span>
              <span className="mt-4 text-sm leading-relaxed text-gray-300">
                Movies, Web Series, Short Films, and Digital Media Production.
              </span>

              <span className="group/exp relative mt-7 inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3 font-semibold text-white shadow-lg shadow-prodyum-green-500/30 transition-all duration-300 group-hover:shadow-prodyum-green-500/60">
                {/* animated gradient border */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-green-500 via-prodyum-lime-500 to-prodyum-blue-500 bg-[length:200%_auto] animate-shine" />
                {/* dark glass inner */}
                <span className="pointer-events-none absolute inset-[1.5px] rounded-full bg-neutral-950/85 backdrop-blur-sm transition-opacity duration-300 group-hover/exp:opacity-0" />
                {/* hover gradient fill */}
                <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-prodyum-green-500 to-prodyum-lime-500 opacity-0 transition-opacity duration-300 group-hover/exp:opacity-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/exp:translate-x-1" />
                </span>
              </span>
            </span>
          </motion.button>
        </div>

        {/* footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-14 text-sm text-gray-500"
        >
          © {new Date().getFullYear()} ProDyum. All rights reserved.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Landing;
