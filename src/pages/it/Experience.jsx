import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowRight, ArrowUpRight, Boxes, Sparkles, Layers, Wand2, Mouse } from 'lucide-react';
import {
  Iridescence,
  Threads,
  Particles,
  TiltedCard,
  ChromaGrid,
  BlurText,
  GradientText,
  ShinyText,
  DecryptedText,
} from '../../components/reactbits';
import './Experience.css';

// ===== Section definitions for side-dot navigation =====
const SECTIONS = [
  { id: 'hero', label: 'Iridescence' },
  { id: 'threads', label: 'Threads' },
  { id: 'particles', label: 'Particles' },
  { id: 'cards', label: 'Tilt Cards' },
  { id: 'chroma', label: 'Chroma Grid' },
];

// ===== Tilt card data =====
const TILT_CARDS = [
  {
    img: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=600&q=80',
    title: 'Neon Genesis',
    caption: 'Real-time GLSL shaders',
    color: '#1E88E5',
  },
  {
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    title: 'Liquid Light',
    caption: 'GPU particle fields',
    color: '#4CAF50',
  },
  {
    img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80',
    title: 'Deep Space',
    caption: '3D perspective tilt',
    color: '#8BC34A',
  },
];

// ===== Chroma grid data =====
const CHROMA_ITEMS = [
  {
    image: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?auto=format&fit=crop&w=500&q=80',
    title: 'Aurora Engine',
    subtitle: 'WebGL Shader',
    handle: '@react-bits',
    borderColor: '#1E88E5',
    gradient: 'linear-gradient(145deg, #1E88E5, #000)',
  },
  {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80',
    title: 'Chroma Flow',
    subtitle: 'Interactive Reveal',
    handle: '@prodyum',
    borderColor: '#4CAF50',
    gradient: 'linear-gradient(210deg, #4CAF50, #000)',
  },
  {
    image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=500&q=80',
    title: 'Photon Field',
    subtitle: 'GPU Particles',
    handle: '@webgl',
    borderColor: '#8BC34A',
    gradient: 'linear-gradient(165deg, #8BC34A, #000)',
  },
  {
    image: 'https://images.unsplash.com/photo-1633354931133-927329bb495d?auto=format&fit=crop&w=500&q=80',
    title: 'Iridescent Core',
    subtitle: 'Mouse Reactive',
    handle: '@shader',
    borderColor: '#42A5F5',
    gradient: 'linear-gradient(195deg, #42A5F5, #000)',
  },
  {
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=500&q=80',
    title: 'Thread Weaver',
    subtitle: 'Perlin Noise',
    handle: '@motion',
    borderColor: '#66BB6A',
    gradient: 'linear-gradient(225deg, #66BB6A, #000)',
  },
  {
    image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=500&q=80',
    title: 'Pulse Grid',
    subtitle: 'Spotlight Mask',
    handle: '@react-bits',
    borderColor: '#9CCC65',
    gradient: 'linear-gradient(135deg, #9CCC65, #000)',
  },
];

// ===== Section wrapper with reveal-on-scroll =====
const Reveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`exp-reveal ${shown ? 'exp-reveal--shown' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Experience = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for the side-dot nav
  useEffect(() => {
    const observers = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.5 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="exp-root">
      {/* ===== Top bar ===== */}
      <header className="exp-topbar">
        <Link to="/it" className="exp-logo">
          <span className="exp-logo-mark">P</span>
          <span>
            ProDyum <span className="exp-logo-accent">3D Lab</span>
          </span>
        </Link>
        <div className="exp-topbar-links">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Home</a>
          <a href="#particles" onClick={(e) => { e.preventDefault(); scrollTo('particles'); }}>Showcase</a>
          <Link to="/it">Main Site</Link>
        </div>
      </header>

      {/* ===== Side dot navigation ===== */}
      <nav className="exp-dots" aria-label="Section navigation">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className={`exp-dot ${activeSection === id ? 'exp-dot--active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={label}
          >
            <span className="exp-dot-label">{label}</span>
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* SECTION 1 — IRIDESCENCE HERO (mouse-reactive WebGL shader)    */}
      {/* ============================================================ */}
      <section id="hero" className="exp-section exp-hero">
        <div className="exp-bg">
          <Iridescence
            color={[1, 1, 1]}
            speed={1.1}
            amplitude={0.12}
            mouseReact
          />
          <div className="exp-bg-vignette" />
        </div>

        <div className="exp-content exp-hero-content">
          <Reveal>
            <div className="exp-pill">
              <Sparkles className="exp-pill-icon" />
              <ShinyText text="Real-time GPU Rendering" speed={3} color="#cbd5e1" shineColor="#ffffff" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="exp-display">
              <DecryptedText
                text="Crafting"
                animateOn="view"
                speed={45}
                sequential
                className="exp-decrypt"
              />{' '}
              <GradientText
                colors={['#1E88E5', '#4CAF50', '#8BC34A', '#1E88E5']}
                animationSpeed={6}
                className="exp-gradient-word"
              >
                Immersive
              </GradientText>{' '}
              <DecryptedText
                text="3D Worlds"
                animateOn="view"
                speed={45}
                sequential
                className="exp-decrypt"
              />
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="exp-lede">
              A living showcase built on WebGL shaders, GPU particle fields and 3D perspective —
              every pixel reacts to your movement. Move your mouse and watch the light bend.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="exp-ctas">
              <Button
                className="exp-btn-primary"
                onClick={() => scrollTo('threads')}
              >
                <Wand2 className="h-4 w-4" />
                Explore the Effects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="outline" className="exp-btn-ghost">
                <Link to="/it">Back to ProDyum</Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={520}>
            <div className="exp-scroll-hint">
              <Mouse className="h-4 w-4" />
              <span>Scroll to dive deeper</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — THREADS (mouse-reactive flowing shader)           */}
      {/* ============================================================ */}
      <section id="threads" className="exp-section exp-threads">
        <div className="exp-bg">
          <Threads
            color={[0.117, 0.533, 0.9]}
            amplitude={1.1}
            distance={0.2}
            enableMouseInteraction
          />
          <div className="exp-bg-fade exp-bg-fade--bottom" />
        </div>

        <div className="exp-content exp-content--left">
          <Reveal>
            <div className="exp-kicker">
              <Layers className="h-4 w-4" /> Effect 01 — Threads
            </div>
          </Reveal>
          <Reveal delay={100}>
            <BlurText
              text="Light flows like silk."
              className="exp-display-sm"
              delay={90}
              animateBy="words"
            />
          </Reveal>
          <Reveal delay={220}>
            <p className="exp-body">
              Forty layers of Perlin-noise driven threads rendered in a single full-screen fragment
              shader. The field follows your cursor in real time — drag across the canvas and the
              silk bends toward you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — 3D PARTICLE FIELD (GPU depth + rotation)          */}
      {/* ============================================================ */}
      <section id="particles" className="exp-section exp-particles">
        <div className="exp-bg">
          <Particles
            particleCount={450}
            particleSpread={14}
            speed={0.18}
            particleColors={['#1E88E5', '#4CAF50', '#8BC34A', '#ffffff']}
            moveParticlesOnHover
            particleHoverFactor={2.2}
            alphaParticles
            particleBaseSize={90}
            sizeRandomness={1.4}
            cameraDistance={22}
            pixelRatio={1}
          />
          <div className="exp-bg-overlay" />
        </div>

        <div className="exp-content exp-content--center">
          <Reveal>
            <div className="exp-kicker exp-kicker--center">
              <Boxes className="h-4 w-4" /> Effect 02 — Particle Field
            </div>
          </Reveal>
          <Reveal delay={100}>
            <BlurText
              text="A galaxy you can touch."
              className="exp-display-md"
              delay={70}
              animateBy="words"
            />
          </Reveal>
          <Reveal delay={220}>
            <p className="exp-body exp-body--center">
              450 GPU-instanced points drifting through 3D space with real perspective depth.
              Hover to push the entire cloud — it tilts and parallax-shifts as if you're holding it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 4 — 3D TILT CARDS (perspective mouse tracking)        */}
      {/* ============================================================ */}
      <section id="cards" className="exp-section exp-cards">
        <div className="exp-cards-bg" />
        <div className="exp-content exp-cards-content">
          <Reveal>
            <div className="exp-kicker exp-kicker--center">
              <Layers className="h-4 w-4" /> Effect 03 — 3D Tilt Cards
            </div>
          </Reveal>
          <Reveal delay={100}>
            <BlurText
              text="Depth on demand."
              className="exp-display-md"
              delay={70}
              animateBy="words"
            />
          </Reveal>
          <Reveal delay={200}>
            <p className="exp-body exp-body--center">
              Each card tracks your cursor with spring-damped rotateX / rotateY. Hover to feel the
              physical, weighty tilt.
            </p>
          </Reveal>

          <div className="exp-tilt-row">
            {TILT_CARDS.map((c, i) => (
              <Reveal key={c.title} delay={i * 140}>
                <div className="exp-tilt-item">
                  <TiltedCard
                    imageSrc={c.img}
                    altText={c.title}
                    captionText={c.caption}
                    containerHeight="360px"
                    containerWidth="100%"
                    imageHeight="300px"
                    imageWidth="300px"
                    scaleOnHover={1.12}
                    rotateAmplitude={16}
                    showTooltip
                  />
                  <h3 className="exp-tilt-title" style={{ color: c.color }}>{c.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 5 — CHROMA GRID (interactive chromatic reveal)        */}
      {/* ============================================================ */}
      <section id="chroma" className="exp-section exp-chroma">
        <div className="exp-content exp-chroma-content">
          <Reveal>
            <div className="exp-kicker exp-kicker--center">
              <Sparkles className="h-4 w-4" /> Effect 04 — Chroma Grid
            </div>
          </Reveal>
          <Reveal delay={100}>
            <BlurText
              text="Color follows your eyes."
              className="exp-display-md"
              delay={70}
              animateBy="words"
            />
          </Reveal>
          <Reveal delay={200}>
            <p className="exp-body exp-body--center">
              A radial spotlight de-saturates the grid wherever your cursor moves, restoring full
              chroma inside the radius. Move slowly across the tiles.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="exp-chroma-wrap">
              <ChromaGrid items={CHROMA_ITEMS} radius={260} columns={3} />
            </div>
          </Reveal>

          <Reveal delay={360}>
            <div className="exp-outro">
              <h2 className="exp-outro-title">
                <GradientText colors={['#1E88E5', '#4CAF50', '#8BC34A']} animationSpeed={5}>
                  Want this for your brand?
                </GradientText>
              </h2>
              <p className="exp-body exp-body--center">
                ProDyum IT builds cinematic, interactive web experiences. Let's make your product
                unforgettable.
              </p>
              <div className="exp-ctas exp-ctas--center">
                <Button asChild className="exp-btn-primary">
                  <Link to="/it/contact">
                    Start a Project <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="exp-btn-ghost">
                  <Link to="/it">View Services</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Experience;
