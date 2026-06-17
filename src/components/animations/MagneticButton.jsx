import React, { useRef, useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * MagneticButton - Button that magnetically follows cursor within bounds
 * Creates a subtle pull-toward-cursor effect for premium feel
 */
const MagneticButton = ({
  children,
  className,
  strength = 0.3,
  radius = 150,
  as: Tag = 'div',
}) => {
  const ref = useRef(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance < radius) {
      const pull = (1 - distance / radius) * strength;
      setTransform({
        x: deltaX * pull,
        y: deltaY * pull,
      });
    }
  };

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <Tag
      ref={ref}
      className={cn('inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isHovered
          ? 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;
