import { useState, useEffect, useRef } from 'react';
import MagneticButton from '../components/MagneticButton';
import ResumeModal from '../components/ResumeModal';

const ROLES = [
  'Aspiring AIOps Engineer',
  'MERN-Stack Developer',
  'SaaS Builder',
  'CLI Tool Creator',
];

export default function Hero() {
  const [visible, setVisible] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Typewriter: useRef + direct DOM write — zero React re-renders during typing
  const typeRef = useRef(null);
  const roleIndexRef = useRef(0);
  const isDeletingRef = useRef(false);
  const displayedRef = useRef('');
  const timeoutRef = useRef(null);

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter loop — writes directly to DOM, no state updates
  useEffect(() => {
    const tick = () => {
      const current = ROLES[roleIndexRef.current];
      const isDeleting = isDeletingRef.current;
      const displayed = displayedRef.current;

      if (!isDeleting && displayed.length < current.length) {
        displayedRef.current = current.slice(0, displayed.length + 1);
        timeoutRef.current = setTimeout(tick, 80);
      } else if (!isDeleting && displayed.length === current.length) {
        timeoutRef.current = setTimeout(() => {
          isDeletingRef.current = true;
          tick();
        }, 2000);
        return;
      } else if (isDeleting && displayed.length > 0) {
        displayedRef.current = current.slice(0, displayed.length - 1);
        timeoutRef.current = setTimeout(tick, 45);
      } else if (isDeleting && displayed.length === 0) {
        isDeletingRef.current = false;
        roleIndexRef.current = (roleIndexRef.current + 1) % ROLES.length;
        timeoutRef.current = setTimeout(tick, 100);
        return;
      }

      // Write directly to the DOM — no React re-render
      if (typeRef.current) {
        typeRef.current.textContent = displayedRef.current;
      }
    };

    timeoutRef.current = setTimeout(tick, 400);
    return () => clearTimeout(timeoutRef.current);
  }, []);


  return (
    <section className="section-container" id="home" style={{ position: 'relative' }}>
      {/* Floating decorative icons — DevHQ-inspired */}
      <div className="floating-icon icon-tl" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </div>
      <div className="floating-icon icon-tr" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 1 7 7c0 3.5-2.5 6-5 8l-2 2-2-2c-2.5-2-5-4.5-5-8a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2"/></svg>
      </div>
      <div className="floating-icon icon-bl" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
      </div>
      <div className="floating-icon icon-br" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      </div>

      <div className="section-content">
        <div className="section-header-centered">

          {/* Status badge */}
          <div
            className="status-badge"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s 0.05s ease, transform 0.7s 0.05s cubic-bezier(0.16,1,0.3,1)',
              marginTop: 'clamp(4rem, 10vw, 5.5rem)',
              marginBottom: '1.5rem',
            }}
          >
            <span className="status-dot" />
            Open to Internships: Summer 2026
          </div>

          {/* Name block */}
          <div
            style={{
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s 0.15s ease, transform 0.7s 0.15s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <h1 className="heading-xl">Aizaz Noor</h1>
            <span className="name-line" />
          </div>

          {/* Typed tagline */}
          <p
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              color: 'var(--accent)',
              fontWeight: 600,
              letterSpacing: '0.01em',
              marginBottom: '1.25rem',
              maxWidth: '700px',
              minHeight: '2rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s 0.3s ease, transform 0.7s 0.3s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <span ref={typeRef} />
            <span className="cursor" />
          </p>

          {/* Subtitle line */}
          <p
            className="text-body"
            style={{
              maxWidth: '540px',
              marginBottom: '2.5rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'opacity 0.7s 0.45s ease, transform 0.7s 0.45s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            Software Engineering undergraduate building Mern-stack web-applications while exploring DevOps, cloud technologies, and AI automation.
          </p>
        </div>

          {/* CTA row */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '4rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s 0.6s ease, transform 0.7s 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <MagneticButton 
            href="#work" 
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('work');
              if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }}
            className="btn btn-primary"
          >
            Work
          </MagneticButton>
          <MagneticButton
            href="#"
            onClick={(e) => { e.preventDefault(); setResumeOpen(true); }}
            className="btn btn-ghost"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
            </svg>
            View Resume
          </MagneticButton>
        </div>

        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />

        {/* Stats strip */}
        <div
          className="hero-stats-strip animated-border"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s 0.75s ease, transform 0.7s 0.75s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="hero-stat">
            <span className="hero-stat-num">15</span>
            <span className="hero-stat-label">Open Source Projects</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">5</span>
            <span className="hero-stat-label">Core Languages</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">SWE</span>
            <span className="hero-stat-label">Internship Target</span>
          </div>
        </div>
      </div>
    </section>
  );
}
