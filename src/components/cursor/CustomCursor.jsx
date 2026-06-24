import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';

/**
 * Premium custom cursor system (desktop / fine-pointer only).
 *
 * Layers:
 *   - Exact dot (follows pointer 1:1)
 *   - Spring-eased glowing ring (Blue → Green → Lime conic gradient)
 *   - Glowing particle trail ("follow the leader" chain, rAF + direct DOM writes)
 *   - Context-aware label (e.g. "View Project") from [data-cursor-label]
 *
 * Performance:
 *   - Single requestAnimationFrame loop
 *   - Direct style.transform writes (no React re-renders per frame)
 *   - Auto-enlarges on a/button/[role=button]/input/etc.
 *   - Pauses when tab hidden, disables on touch/coarse pointers
 *   - Respects prefers-reduced-motion (keeps ring, drops trail)
 *
 * Usage on elements:
 *   <button data-cursor-label="Explore">…</button>
 */

const TRAIL_COUNT = 16;
const EASE_RING = 0.18;
const EASE_TRAIL = 0.32;

const isDesktop = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
};

const CustomCursor = () => {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState('default'); // default | hover | text
  const [label, setLabel] = useState('');
  const hoveredElRef = useRef(null); // tracks the currently-hovered interactive element

  // Reset the cursor's hover label/variant whenever the route changes. Without
  // this, clicking a link (e.g. "Explore" on the Landing page) that triggers
  // navigation leaves the label stuck, because the hovered element is removed
  // from the DOM before a reliable pointerout can fire.
  const location = useLocation();
  useEffect(() => {
    hoveredElRef.current = null;
    setVariant('default');
    setLabel('');
  }, [location.pathname]);

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailRefs = useRef([]);

  const target = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const visible = useRef(false);
  const raf = useRef(0);

  useEffect(() => {
    setMounted(true);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const check = () => {
      const ok = isDesktop() && !reduceMotion;
      setEnabled(ok);
      if (ok) document.body.classList.add('cursor-custom-active');
      else document.body.classList.remove('cursor-custom-active');
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);

    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
      document.body.classList.remove('cursor-custom-active');
      cancelAnimationFrame(raf.current);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;

    const onMove = (e) => {
      // Safety net: if the previously-hovered element was removed from the DOM
      // (e.g. after navigation without a pointerout), drop the stuck label.
      if (hoveredElRef.current && !document.contains(hoveredElRef.current)) {
        hoveredElRef.current = null;
        setVariant('default');
        setLabel('');
      }
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current) {
        visible.current = true;
        // snap on first appearance to avoid flying in from corner
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        trail.current.forEach((t) => {
          t.x = e.clientX;
          t.y = e.clientY;
        });
      }
    };

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor]';
    const onOver = (e) => {
      const el = e.target.closest ? e.target.closest(INTERACTIVE) : null;
      if (!el) return;
      hoveredElRef.current = el;
      const customLabel = el.getAttribute && el.getAttribute('data-cursor-label');
      const isText = ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
      setVariant(isText ? 'text' : 'hover');
      setLabel(customLabel || '');
    };
    const onOut = (e) => {
      const el = e.target.closest ? e.target.closest(INTERACTIVE) : null;
      if (!el) return;
      // only reset if actually leaving this element (not moving to a child)
      if (hoveredElRef.current === el) hoveredElRef.current = null;
      setVariant('default');
      setLabel('');
    };
    const onDown = () => setVariant((v) => (v === 'text' ? 'text' : 'hover'));
    const onEnterDoc = () => { visible.current = false; };
    const onLeaveDoc = () => { visible.current = false; };

    const loop = () => {
      // ring eases toward target
      ring.current.x += (target.current.x - ring.current.x) * EASE_RING;
      ring.current.y += (target.current.y - ring.current.y) * EASE_RING;

      // dot is exact
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
        ringRef.current.style.opacity = visible.current ? '1' : '0';
      }

      // trail chain
      let px = target.current.x;
      let py = target.current.y;
      for (let i = 0; i < trail.current.length; i++) {
        const t = trail.current[i];
        t.x += (px - t.x) * EASE_TRAIL;
        t.y += (py - t.y) * EASE_TRAIL;
        px = t.x;
        py = t.y;
        const node = trailRefs.current[i];
        if (node) {
          node.style.transform = `translate3d(${t.x}px, ${t.y}px, 0) translate(-50%, -50%)`;
          node.style.opacity = visible.current ? `${(1 - i / trail.current.length) * 0.5}` : '0';
        }
      }

      raf.current = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf.current);
      } else {
        raf.current = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerout', onOut, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.addEventListener('mouseenter', onEnterDoc);
    document.addEventListener('mouseleave', onLeaveDoc);
    document.addEventListener('visibilitychange', onVisibility);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerout', onOut);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('mouseenter', onEnterDoc);
      document.removeEventListener('mouseleave', onLeaveDoc);
      document.removeEventListener('visibilitychange', onVisibility);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!mounted || !enabled) return null;

  // Sizing per variant
  const ringSize = variant === 'hover' ? 72 : variant === 'text' ? 40 : 34;

  return createPortal(
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* particle trail */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => {
        const size = 18 - i * 0.95;
        const color =
          i % 3 === 0 ? '30,136,229' : i % 3 === 1 ? '76,175,80' : '139,195,74';
        return (
          <span
            key={i}
            ref={(el) => (trailRefs.current[i] = el)}
            className="absolute left-0 top-0 rounded-full"
            style={{
              width: Math.max(size, 2),
              height: Math.max(size, 2),
              background: `rgba(${color}, 0.9)`,
              filter: 'blur(3px)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          />
        );
      })}

      {/* exact dot */}
      <span
        ref={dotRef}
        className="absolute left-0 top-0 rounded-full bg-white"
        style={{
          width: variant === 'hover' ? 0 : 6,
          height: variant === 'hover' ? 0 : 6,
          opacity: variant === 'hover' ? 0 : 0.9,
          willChange: 'transform',
          transition: 'width .2s ease, height .2s ease, opacity .2s ease',
        }}
      />

      {/* glowing gradient ring */}
      <span
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: 0,
          willChange: 'transform, opacity',
          transition: 'width .25s cubic-bezier(.22,1,.36,1), height .25s cubic-bezier(.22,1,.36,1)',
        }}
      >
        <span
          className="absolute inset-0 rounded-full p-[1.5px]"
          style={{
            background:
              'conic-gradient(from 0deg, #1E88E5, #4CAF50, #8BC34A, #1E88E5)',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: 'spin-slow 4s linear infinite',
          }}
        />
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(76,175,80,0.18) 0%, rgba(30,136,229,0.10) 50%, transparent 70%)',
            filter: 'blur(2px)',
          }}
        />
        {variant === 'hover' && (
          <span
            className="absolute rounded-full"
            style={{
              inset: 0,
              boxShadow: '0 0 36px 6px rgba(76,175,80,0.35)',
            }}
          />
        )}
        {/* context-aware label */}
        {variant === 'hover' && label && (
          <span className="relative z-10 px-2 text-center text-[10px] font-semibold uppercase tracking-wider text-white">
            {label}
          </span>
        )}
      </span>
    </div>,
    document.body
  );
};

export default CustomCursor;
