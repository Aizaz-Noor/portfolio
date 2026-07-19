import { Suspense, useEffect, lazy, useState } from 'react';
import Navbar          from './components/Navbar';
import Preloader       from './components/Preloader';
import ScrollProgress  from './components/ScrollProgress';
import ErrorBoundary   from './components/ErrorBoundary';
import CustomCursor    from './components/CustomCursor';
import Footer          from './components/Footer';
import { useMousePosition } from './hooks/useMousePosition';

import Hero from './pages/Hero';
const About          = lazy(() => import('./pages/About'));
const Experience     = lazy(() => import('./pages/Experience'));
const TechStack      = lazy(() => import('./pages/TechStack'));
const Projects       = lazy(() => import('./pages/Projects'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Profiles       = lazy(() => import('./pages/Profiles'));
const Contact        = lazy(() => import('./pages/Contact'));
const Background3D   = lazy(() => import('./components/Background3D'));

export default function App() {
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.overflowX = 'hidden';
  }, []);

  useMousePosition();

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Preloader />
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>

      {/* LAYER 1: The 3D WebGL Background */}
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      {/* LAYER 1.5: Global Scrim */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          backgroundColor: 'rgba(5, 7, 12, 0.4)',
          pointerEvents: 'none',
        }}
      />

      {/* LAYER 2: 2D HTML/CSS Foreground */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Hero />
        <ErrorBoundary>
          <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div className="loading-spinner" /></div>}>
            <About />
            <Experience />
            <TechStack />
            <Projects />
            <Certifications />
            <Profiles />
            <Contact />
          </Suspense>
        </ErrorBoundary>
        <Footer />
      </div>
    </>
  );
}
