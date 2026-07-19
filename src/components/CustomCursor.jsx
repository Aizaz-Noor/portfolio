import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    // Only show on pointer-fine (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let raf;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot snaps instantly
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      outlineX = lerp(outlineX, mouseX, 0.12);
      outlineY = lerp(outlineY, mouseY, 0.12);
      outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      raf = requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      dot.classList.add('cursor-hover');
      outline.classList.add('cursor-hover');
    };
    const onMouseLeaveLink = () => {
      dot.classList.remove('cursor-hover');
      outline.classList.remove('cursor-hover');
    };

    const attachHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .tech-card-container, .cert-item, .project-card').forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    raf = requestAnimationFrame(animate);
    attachHoverListeners();

    // Re-attach after DOM mutations (lazy-loaded sections)
    const mutObs = new MutationObserver(attachHoverListeners);
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf);
      mutObs.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={outlineRef} className="cursor-outline" aria-hidden="true" />
    </>
  );
}
