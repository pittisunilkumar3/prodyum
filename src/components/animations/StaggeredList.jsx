import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

/**
 * StaggeredList - Staggered reveal animation for list/grid items
 * Each child element appears one after another with configurable delay
 * Starts when element scrolls into view
 */
const StaggeredList = ({
  children,
  className,
  staggerDelay = 80,
  duration = 500,
  animation = 'fadeUp', // 'fadeUp', 'fadeLeft', 'fadeRight', 'scaleIn', 'slideUp'
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const getHiddenStyle = () => {
    switch (animation) {
      case 'fadeUp':
        return { opacity: 0, transform: 'translateY(30px)' };
      case 'fadeLeft':
        return { opacity: 0, transform: 'translateX(-30px)' };
      case 'fadeRight':
        return { opacity: 0, transform: 'translateX(30px)' };
      case 'scaleIn':
        return { opacity: 0, transform: 'scale(0.8)' };
      case 'slideUp':
        return { opacity: 0, transform: 'translateY(50px) scale(0.95)' };
      default:
        return { opacity: 0, transform: 'translateY(30px)' };
    }
  };

  const getVisibleStyle = () => ({
    opacity: 1,
    transform: 'translate(0, 0) scale(1)',
  });

  return (
    <div ref={ref} className={cn(className)}>
      {React.Children.map(children, (child, index) => (
        <div
          style={{
            ...(isVisible ? getVisibleStyle() : getHiddenStyle()),
            transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default StaggeredList;
