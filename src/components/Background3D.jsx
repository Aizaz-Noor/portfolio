import React, { Suspense, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ParticleTunnel from './ParticleTunnel';

function CameraRig() {
  const maxScroll = useRef(0);
  const frameCount = useRef(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      maxScroll.current = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    updateMaxScroll();

    const resizeObserver = new ResizeObserver(updateMaxScroll);
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  useFrame((state) => {
    // Skip frame if tab is hidden
    if (document.hidden) return;

    // Throttle to every 2nd frame on mobile to reduce GPU load
    frameCount.current++;
    const isMobile = window.innerWidth < 768;
    if (isMobile && frameCount.current % 2 !== 0) return;

    const scrollProgress = maxScroll.current > 0 ? window.scrollY / maxScroll.current : 0;
    const startZ = 150;
    const endZ = -100;
    const targetZ = startZ + scrollProgress * (endZ - startZ);
    // Smooth dampening
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
  });
  return null;
}

export default function Background3D() {
  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);

  // Pause the canvas loop when the page is not visible
  const canvasRef = useRef(null);
  useEffect(() => {
    const handleVisibility = () => {
      // R3F canvas frameloop is driven by requestAnimationFrame internally.
      // Setting style.visibility pauses paint but not RAF; the tab-hidden guard
      // inside useFrame is the real pause mechanism. This just saves compositing.
      if (canvasRef.current) {
        canvasRef.current.style.visibility = document.hidden ? 'hidden' : 'visible';
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}
    >
      <Canvas
        dpr={[1, isMobile ? 1 : 1.5]}
        camera={{ position: [0, 0, 150], fov: 70, near: 0.1, far: 1000 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        frameloop="always"
      >
        <color attach="background" args={['#050507']} />
        <ambientLight intensity={0.15} color="#ffffff" />
        <Suspense fallback={null}>
          <Stars radius={200} depth={60} count={isMobile ? 800 : 2500} factor={3} saturation={0} fade speed={0.3} />
          <ParticleTunnel count={isMobile ? 500 : 1500} />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
