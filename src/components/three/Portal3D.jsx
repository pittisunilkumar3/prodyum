import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ProDyum 3D Portal — a true WebGL scene (React Three Fiber + drei).
 *
 * Strict brand palette only: Blue #1E88E5, Green #4CAF50, Lime #8BC34A.
 *
 * Scene contents:
 *   - Central distorted glass core (the "energy sphere")
 *   - Rotating torus ring around it
 *   - Floating holographic icosahedrons (service icons in 3D space)
 *   - Subtle particle starfield
 *   - Mouse-reactive parallax (group tilts toward cursor)
 *
 * Performance:
 *   - This component is LAZY-LOADED by the caller (Portal3DCanvas) so it never
 *     blocks first paint. The instant CSS splash handles the first impression.
 *   - Low-poly geometry, single Environment preset, dpr capped at 1.5.
 *   - `frameloop="always"` but transforms are cheap.
 */

const BRAND = {
  blue: new THREE.Color('#1E88E5'),
  green: new THREE.Color('#4CAF50'),
  lime: new THREE.Color('#8BC34A'),
};

/* Central distorted core */
function Core() {
  const mesh = useRef();
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    mesh.current.rotation.y = t * 0.25;
    mesh.current.rotation.x = Math.sin(t * 0.4) * 0.15;
  });
  return (
    <mesh ref={mesh} scale={1.35}>
      <icosahedronGeometry args={[1, 6]} />
      <MeshDistortMaterial
        color={BRAND.green}
        emissive={BRAND.blue}
        emissiveIntensity={0.35}
        roughness={0.08}
        metalness={0.9}
        distort={0.35}
        speed={1.6}
        clearcoat={1}
      />
    </mesh>
  );
}

/* Rotating wireframe ring */
function Ring({ radius = 2.4, tilt = 0, color, speed = 0.4 }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.012, 16, 140]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}

/* Floating holographic shards */
function Shard({ position, color, scale = 0.5, speed = 1 }) {
  return (
    <Float speed={speed * 2} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* Lightweight starfield using Points */
function Starfield({ count = 220 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // spread in a sphere shell
      const r = 6 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

/* Group that tilts toward the pointer for parallax depth */
function ParallaxRig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const { x, y } = state.pointer; // -1..1
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, x * 0.35, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -y * 0.25, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

const Scene = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 5, 5]} intensity={1.1} color={BRAND.lime} />
    <pointLight position={[-6, -2, -4]} intensity={40} color={BRAND.blue} />
    <pointLight position={[6, 3, 2]} intensity={35} color={BRAND.green} />

    <ParallaxRig>
      <Core />
      <Ring radius={2.0} color="#1E88E5" speed={0.5} />
      <Ring radius={2.6} tilt={0.5} color="#4CAF50" speed={-0.35} />
      <Ring radius={3.1} tilt={-0.4} color="#8BC34A" speed={0.25} />

      <Shard position={[3.2, 1.4, 0]} color="#1E88E5" scale={0.42} speed={1} />
      <Shard position={[-3.4, -1.1, 1]} color="#4CAF50" scale={0.5} speed={1.2} />
      <Shard position={[2.6, -2, -1]} color="#8BC34A" scale={0.36} speed={0.9} />
      <Shard position={[-2.8, 2, -0.5]} color="#1E88E5" scale={0.3} speed={1.4} />
      <Shard position={[0.5, 3, 1]} color="#4CAF50" scale={0.28} speed={1.1} />
    </ParallaxRig>

    <Starfield />
    {/* Environment removed: it fetched an external HDR (network dependency that
        could hang/error). The brand-colored lights above provide all the lighting. */}
  </>
);

const Portal3D = ({ className = '', onReady }) => (
  <div className={className} aria-hidden="true" style={{ width: '100vw', height: '100vh' }}>
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      onCreated={({ gl }) => {
        // R3F has created the WebGL renderer + sized the canvas. Notify parent
        // so it can safely unmount the 2D fallback canvas (no context collision).
        if (gl) onReady?.();
      }}
    >
      <Scene />
    </Canvas>
  </div>
);

export default Portal3D;
