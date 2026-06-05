import React from 'react';
import useTilt from '../hooks/useTilt';

const TiltCard = ({ children, className = '', tiltOptions = {}, glare = true }) => {
  const tiltRef = useTilt({ maxTilt: 10, scale: 1.02, ...tiltOptions });

  return (
    <div
      ref={tiltRef}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255,255,255,0.15) 0%, transparent 60%)`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
};

export default TiltCard;
