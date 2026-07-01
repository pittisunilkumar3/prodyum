import React from 'react';

/**
 * FlyingText — bulletproof, ALWAYS-visible hero heading.
 *
 * Each word flies in from a different off-screen direction (like a flock
 * of birds assembling a line), then gently hovers in place forever.
 *
 * ── WHY INLINE-STYLE GRADIENT (not Tailwind classes) ───────────────────
 * The previous version used Tailwind classes
 *   `bg-gradient-to-r ... bg-clip-text text-transparent`
 * to colour the text. Those classes were present in the CSS but the
 * gradient was NOT painting onto the text at runtime (a known Tailwind
 * gradient-clip edge case), leaving the text fully TRANSPARENT/INVISIBLE.
 *
 * To guarantee visibility we now colour the text with INLINE STYLES:
 *   • Inline styles cannot be purged by Tailwind.
 *   • Inline styles have the highest CSS specificity (beat any class).
 *   • `color` is set to a SOLID green — so even in a browser where the
 *     gradient clipping somehow fails, the text is STILL clearly visible.
 *   • `WebkitBackgroundClip:text` + transparent fill paints the gradient
 *     over the text in every modern browser.
 *
 * The fly-in motion is pure CSS @keyframes (see App.css:
 * `flyingTextFlyIn` / `flyingTextFloat`) — no JS animation library, so the
 * text shows even if a JS dependency hiccups.
 *
 * Props:
 *  - text: string        → line to render (split by spaces)
 *  - className: string   → optional extra classes (ignored for colour)
 *  - duration: number    → fly-in duration in seconds (default 1.1)
 *  - stagger: number     → delay between words in seconds (default 0.16)
 *  - startDelay: number  → delay before first word flies in (default 0.25)
 */

// Off-screen "take-off" positions — each word approaches from a different angle.
const OFFSCREEN_ORIGINS = [
  { x: -420, y: -300, rotate: -30 }, // top-left
  { x: 420, y: -320, rotate: 28 }, // top-right
  { x: -460, y: 260, rotate: 20 }, // bottom-left
  { x: 440, y: 300, rotate: -24 }, // bottom-right
  { x: -540, y: -40, rotate: -14 }, // far-left
  { x: 540, y: 40, rotate: 16 }, // far-right
];

// The exact same brand colours as before (blue → green → lime),
// now applied as an inline gradient that CANNOT be purged or mis-ordered.
const GRADIENT_TEXT_STYLE = {
  backgroundImage: 'linear-gradient(90deg, #42A5F5 0%, #66BB6A 50%, #9CCC65 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  // Transparent text fill → the gradient background shows through the letters.
  WebkitTextFillColor: 'transparent',
  // SOLID COLOUR FALLBACK: any browser that ignores WebkitTextFillColor
  // (or where the clip fails) will still render clearly visible GREEN text.
  color: '#66BB6A',
};

const FlyingText = ({
  text = '',
  className,
  duration = 1.1,
  stagger = 0.16,
  startDelay = 0.25,
}) => {
  const words = text.split(' ').filter(Boolean);

  return (
    <span className="relative inline-block">
      {words.map((word, i) => {
        const origin = OFFSCREEN_ORIGINS[i % OFFSCREEN_ORIGINS.length];
        const flyInDelay = startDelay + i * stagger;
        const floatPhase = (i % 3) * 0.7;

        return (
          <React.Fragment key={`${word}-${i}`}>
            {/* Layer 1 — one-time fly-in from a unique off-screen direction */}
            <span
              className="flying-text-word"
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${flyInDelay}s`,
                '--fx': `${origin.x}px`,
                '--fy': `${origin.y}px`,
                '--fr': `${origin.rotate}deg`,
              }}
            >
              {/* Layer 2 — gentle infinite hover, starts after fly-in finishes */}
              <span
                className="flying-text-float"
                style={{
                  animationDuration: `${4 + floatPhase}s`,
                  animationDelay: `${flyInDelay + duration}s`,
                  '--ftr': `${i % 2 === 0 ? 0.8 : -0.8}deg`,
                }}
              >
                {/* Layer 3 — STATIC gradient text via INLINE STYLE.
                    Never transformed → background-clip:text renders reliably.
                    Plus a solid green colour fallback → ALWAYS visible. */}
                <span className="inline-block" style={GRADIENT_TEXT_STYLE}>
                  {word}
                </span>
              </span>
            </span>
            {/* Spacing between words */}
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default FlyingText;
