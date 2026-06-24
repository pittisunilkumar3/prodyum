import React, { Suspense, lazy, useEffect, useState } from 'react';
import PortalCanvas from './PortalCanvas';

// Lazy-load the heavy React Three Fiber scene so three.js never blocks first paint.
const Portal3D = lazy(() => import('./three/Portal3D'));

/**
 * Decides which portal backdrop to render:
 *   - WebGL-capable + wide screen (desktop): the R3F 3D scene (lazy)
 *   - Otherwise (mobile/tablet/no-WebGL): the lightweight 2D canvas constellation
 *
 * Reliability: the 2D canvas is shown ONLY while the 3D scene is still loading.
 * Once the 3D scene mounts, the 2D canvas is fully unmounted — so the two
 * canvases are never alive at the same time (avoids the "existing context of a
 * different type" WebGL collision and any size/flash issues).
 */
const supportsWebGL = () => {
  try {
    // Feature-detect WITHOUT instantiating a WebGL context (instantiating one
    // here can collide with R3F's later context creation on some drivers,
    // logging a harmless but noisy warning). Modern browsers expose
    // WebGLRenderingContext / WebGL2RenderingContext as a reliable signal.
    return typeof window !== 'undefined' &&
      (window.WebGLRenderingContext || window.WebGL2RenderingContext);
  } catch {
    return false;
  }
};

const Portal3DCanvas = ({ className = '' }) => {
  const [mode, setMode] = useState('checking'); // 'checking' | '2d' | '3d'
  const [threeReady, setThreeReady] = useState(false);

  useEffect(() => {
    const ok = supportsWebGL() && window.matchMedia('(min-width: 1024px)').matches;
    setMode(ok ? '3d' : '2d');
  }, []);

  // While deciding, or on small screens / no-WebGL: show the 2D canvas.
  if (mode !== '3d') {
    return <PortalCanvas className={className} />;
  }

  return (
    <>
      {/* 2D canvas stays ONLY until the 3D scene has finished mounting, then
          unmounts completely so both contexts never coexist. */}
      {!threeReady && <PortalCanvas className={className} />}

      <Suspense fallback={null}>
        <Portal3D
          className="pointer-events-none fixed inset-0"
          onReady={() => setThreeReady(true)}
        />
      </Suspense>
    </>
  );
};

export default Portal3DCanvas;
