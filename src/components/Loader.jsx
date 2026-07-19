import { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export default function Loader() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // ROOT CAUSE FIX 1:
    // This portfolio uses zero external assets (no textures, no GLTF models).
    // Drei's useProgress only fires on network-loaded assets, so progress
    // stays at 0 permanently and the loader NEVER dismisses.
    // Fix: when nothing is actively loading, animate a synthetic progress bar
    // over ~1.8 seconds, then dismiss cleanly.

    if (!active && progress === 0) {
      let p = 0;
      const interval = setInterval(() => {
        p += 4;
        setDisplayProgress(Math.min(p, 100));
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
        }
      }, 72); // 25 steps × 72ms ≈ 1.8s
      return () => clearInterval(interval);
    }

    // Future-proof: handle real asset loading
    if (progress >= 100) {
      setDisplayProgress(100);
      const t = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(t);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, active]);

  // ROOT CAUSE FIX 2:
  // Drei <Html> portals render into document.body via React portals,
  // completely bypassing normal z-index stacking — they bleed through the loader.
  // Fix: inject a CSS rule that hides all .drei-html elements while loader is up.
  useEffect(() => {
    const style = document.createElement('style');
    style.id = 'loader-suppress-portals';
    style.textContent = '.drei-html { opacity: 0 !important; pointer-events: none !important; transition: opacity 0.4s ease !important; }';
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  useEffect(() => {
    if (!visible) {
      const s = document.getElementById('loader-suppress-portals');
      if (s) {
        // Fade in portals instead of instant reveal
        s.textContent = '.drei-html { opacity: 1 !important; transition: opacity 0.6s ease !important; }';
        setTimeout(() => s.remove(), 700);
      }
    }
  }, [visible]);

  if (!visible) return null;

  const done = displayProgress >= 100;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#020205',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: done ? 0 : 1,
      transition: 'opacity 0.5s ease',
      pointerEvents: done ? 'none' : 'all',
    }}>
      <h1 style={{
        fontFamily: "'Outfit', sans-serif",
        fontSize: 'clamp(2rem, 8vw, 4rem)',
        fontWeight: 800,
        color: 'white',
        margin: 0,
        letterSpacing: '-0.02em',
        textShadow: '0 0 30px rgba(0, 240, 255, 0.5)',
      }}>
        AIZAZ NOOR
      </h1>

      <p style={{
        color: 'rgba(255,255,255,0.4)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.9rem',
        letterSpacing: '0.2em',
        marginTop: '0.5rem',
        marginBottom: '2.5rem',
      }}>
        INITIALIZING
      </p>

      <div style={{
        width: 'min(320px, 70vw)',
        height: '0px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '0px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${displayProgress}%`,
          background: 'linear-gradient(90deg, #7000ff, #00f0ff)',
          borderRadius: '0px',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 12px rgba(0, 240, 255, 0.8)',
        }} />
      </div>

      <p style={{
        color: 'rgba(0, 240, 255, 0.7)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        marginTop: '1rem',
        fontVariantNumeric: 'tabular-nums',
      }}>
        {Math.round(displayProgress)}%
      </p>
    </div>
  );
}
