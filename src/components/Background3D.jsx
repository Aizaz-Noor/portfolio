import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import ParticleTunnel from './ParticleTunnel';

function CameraRig() {
  useFrame((state) => {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const scrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    const startZ = 150;
    const endZ = -100;
    const targetZ = startZ + scrollProgress * (endZ - startZ);
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
  });
  return null;
}

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 150], fov: 70, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050507']} />
        <ambientLight intensity={0.15} color="#ffffff" />
        <Suspense fallback={null}>
          <Stars radius={200} depth={60} count={4000} factor={3} saturation={0} fade speed={0.3} />
          <ParticleTunnel />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
