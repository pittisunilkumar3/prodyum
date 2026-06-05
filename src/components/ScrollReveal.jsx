import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

const ScrollReveal = ({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 700,
}) => {
  const [ref, isVisible] = useScrollReveal();

  const animations = {
    fadeUp: {
      hidden: { opacity: 0, transform: 'translateY(60px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeDown: {
      hidden: { opacity: 0, transform: 'translateY(-60px)' },
      visible: { opacity: 1, transform: 'translateY(0)' },
    },
    fadeLeft: {
      hidden: { opacity: 0, transform: 'translateX(-60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    fadeRight: {
      hidden: { opacity: 0, transform: 'translateX(60px)' },
      visible: { opacity: 1, transform: 'translateX(0)' },
    },
    zoomIn: {
      hidden: { opacity: 0, transform: 'scale(0.7)' },
      visible: { opacity: 1, transform: 'scale(1)' },
    },
    flipUp: {
      hidden: { opacity: 0, transform: 'perspective(600px) rotateX(30deg) translateY(40px)' },
      visible: { opacity: 1, transform: 'perspective(600px) rotateX(0deg) translateY(0)' },
    },
    flipLeft: {
      hidden: { opacity: 0, transform: 'perspective(600px) rotateY(-30deg) translateX(40px)' },
      visible: { opacity: 1, transform: 'perspective(600px) rotateY(0deg) translateX(0)' },
    },
    rotateIn: {
      hidden: { opacity: 0, transform: 'rotate(-10deg) scale(0.8)' },
      visible: { opacity: 1, transform: 'rotate(0deg) scale(1)' },
    },
  };

  const anim = animations[animation] || animations.fadeUp;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? anim.visible.opacity : anim.hidden.opacity,
        transform: isVisible ? anim.visible.transform : anim.hidden.transform,
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
