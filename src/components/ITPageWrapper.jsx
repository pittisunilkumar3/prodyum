import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ITHeader from './ITHeader';
import ITFooter from './ITFooter';
import ConcentricRingsLoader from './ConcentricRingsLoader';
import ITBackground3D from './ITBackground3D';
import SmokeCursor from './SmokeCursor';

const ITPageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setFadeIn(false);
    const timer = setTimeout(() => {
      setLoading(false);
      // Trigger fade-in after a frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setFadeIn(true);
        });
      });
    }, 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <ConcentricRingsLoader
          size={140}
          color="#4CAF50"
          text="ProDyum IT"
          showText={true}
          rings={5}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        opacity: fadeIn ? 1 : 0,
        transform: fadeIn ? 'translateY(0)' : 'translateY(8px)',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <SmokeCursor />
      <ITBackground3D />
      <div className="relative" style={{ zIndex: 2 }}>
        <ITHeader />
        {children}
        <ITFooter />
      </div>
    </div>
  );
};

export default ITPageWrapper;
