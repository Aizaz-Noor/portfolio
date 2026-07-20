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
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const pauseRef = useRef(false);

  // Staggered entrance
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout;

    if (pauseRef.current) return;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);



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
            {displayed}
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
            Engineering intelligence into SaaS &amp; infrastructure. Building scalable
            applications and production-ready AI pipelines from Lahore, Pakistan.
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
            Work! smartly
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
          className="hero-stats-strip"
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
