import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

/**
 * MorphingBlob - Animated SVG morphing blob for background decoration
 * Continuously morphs between organic shapes using SVG path animation
 */
const MorphingBlob = ({
  className,
  color = 'rgba(30, 136, 229, 0.08)',
  size = 400,
  speed = 8,
  complexity = 6,
}) => {
  const pathRef = useRef(null);
  const animRef = useRef(null);

  // Generate random control points for organic shapes
  const generatePath = (time, seed) => {
    const points = [];
    const numPoints = complexity;

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const baseRadius = size * 0.35;
      const variation =
        Math.sin(time * 0.001 * speed + i * 1.3 + seed) * size * 0.08 +
        Math.cos(time * 0.001 * speed * 0.7 + i * 0.9 + seed * 2) * size * 0.06;
      const radius = baseRadius + variation;

      points.push({
        x: size / 2 + Math.cos(angle) * radius,
        y: size / 2 + Math.sin(angle) * radius,
      });
    }

    // Build smooth cubic bezier path through points
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const prev = points[(i - 1 + points.length) % points.length];
      const nextNext = points[(i + 2) % points.length];

      const cp1x = current.x + (next.x - prev.x) / 6;
      const cp1y = current.y + (next.y - prev.y) / 6;
      const cp2x = next.x - (nextNext.x - current.x) / 6;
      const cp2y = next.y - (nextNext.y - current.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
    }

    path += ' Z';
    return path;
  };

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const d = generatePath(elapsed, 0);
      path.setAttribute('d', d);

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [size, speed, complexity]);

  return (
    <svg
      className={cn('pointer-events-none', className)}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ filter: 'blur(40px)' }}
    >
      <path
        ref={pathRef}
        fill={color}
        style={{ transition: 'none' }}
      />
    </svg>
  );
};

export default MorphingBlob;
