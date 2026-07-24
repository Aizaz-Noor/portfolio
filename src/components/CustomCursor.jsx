import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef     = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    // Only show on pointer-fine (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot     = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // Current mouse position
    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;

    // Ring position + velocity for spring physics
    let ringX  = mouseX, ringY  = mouseY;
    let velX   = 0,      velY   = 0;

    // Spring constants — tweak these to taste:
    //   STIFFNESS: how strongly ring is pulled toward cursor (higher = faster follow)
    //   DAMPING:   how quickly oscillation settles (higher = less overshooot)
    const STIFFNESS = 0.22;   // was effectively 0.12 lerp — now 0.22 with physics
    const DAMPING   = 0.78;   // 0–1, lower = more springy bounce, higher = snappier

    let raf;

    // Dot tracks cursor perfectly — no lag ever
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
    };

    // Spring physics loop for the ring
    const animate = () => {
      // Calculate spring force toward mouse
      const forceX = (mouseX - ringX) * STIFFNESS;
      const forceY = (mouseY - ringY) * STIFFNESS;

      // Apply velocity with damping (simulates natural inertia + overshoot)
      velX = (velX + forceX) * DAMPING;
      velY = (velY + forceY) * DAMPING;

      ringX += velX;
      ringY += velY;

      outline.style.transform = `translate3d(calc(${ringX}px - 50%), calc(${ringY}px - 50%), 0)`;
      raf = requestAnimationFrame(animate);
    };

    // Event delegation — one listener on document for all interactive elements
    const interactiveSelector =
      'a, button, [role="button"], .tech-card-container, .cert-item, .project-card, input, textarea, select, label';

    const onMouseOver = (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.add('cursor-hover');
        outline.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (e) => {
      if (e.target.closest(interactiveSelector)) {
        dot.classList.remove('cursor-hover');
        outline.classList.remove('cursor-hover');
      }
    };

    // Hide cursor when it leaves the window
    const onMouseLeave = () => {
      dot.style.opacity    = '0';
      outline.style.opacity = '0';
    };
    const onMouseEnter = () => {
      dot.style.opacity    = '1';
      outline.style.opacity = '1';
    };

    document.addEventListener('mousemove',  onMouseMove, { passive: true });
    document.addEventListener('mouseover',  onMouseOver);
    document.addEventListener('mouseout',   onMouseOut);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseover',  onMouseOver);
      document.removeEventListener('mouseout',   onMouseOut);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}     className="cursor-dot"     aria-hidden="true" />
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
    </>
  );
}
