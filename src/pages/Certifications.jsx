import React, { useState } from 'react';
import Reveal from '../components/Reveal';

const CERTS = [
  {
    id: 'google_soft_skills',
    title: 'Career & Soft Skills Program',
    issuer: 'Google / Pakistan Freelancers Assoc.',
    date: '2024',
    img: '/pfala.jpg',
    link: 'https://credentials.example.com',
    desc: 'Completed comprehensive training in professional communication, problem-solving, and career readiness.',
    badge: 'Soft Skills',
  },
  {
    id: 'mlsa_cui',
    title: 'Microsoft Learn Student Ambassador',
    issuer: 'MLSA — CUI Lahore',
    date: '2025',
    img: null,
    link: '/Mlsa Cui lahore.pdf',
    desc: 'Recognized as a Microsoft Learn Student Ambassador at COMSATS University Islamabad, Lahore. Active participant in community-building workshops and tech events.',
    badge: 'Microsoft',
  },
  {
    id: 'web_nexus',
    title: 'Frontend Web Development',
    issuer: 'MLSA FAST Peshawar',
    date: '2024',
    img: '/web_nuxes.jpg',
    link: '#',
    desc: 'Comprehensive training in modern frontend technologies including HTML, CSS, JavaScript, and React.',
    badge: 'Frontend',
  },
  {
    id: '404_squad',
    title: 'ACM Appreciation',
    issuer: 'ACM / COMSATS University',
    date: '2024',
    img: '/404_squad.jpg',
    link: '#',
    desc: 'Participated in a university hackathon, building a functional project under a 24-hour time constraint.',
    badge: 'Hackathon',
  },
  {
    id: 'event_emperors',
    title: 'Event Emperors — Event Management',
    issuer: 'COMSATS Extra-Curriculars',
    date: '2024',
    img: '/event_emperors.jpg',
    link: '#',
    desc: 'Coordinated logistics and technical infrastructure for large-scale campus events.',
    badge: 'Leadership',
  },
];

export default function Certifications() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section className="section-container" id="certifications">
      <div className="section-content">
        <div className="section-header-centered" style={{ marginBottom: '4rem' }}>
          <h2 className="heading-lg accent-underline" style={{ marginBottom: '1.5rem' }}>
            Certifications: <span style={{ color: 'var(--accent)' }}>Learning Milestones!</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px' }}>
            Courses, hackathons, and achievements that shaped my craft.
          </p>
        </div>

        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.1}>
              <div
                className={`cert-item ${hoveredId === cert.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredId(cert.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="cert-img-wrapper">
                  {cert.img ? (
                    <img
                      src={cert.img}
                      alt={cert.title}
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <div className="cert-img-placeholder">
                      <div className="cert-placeholder-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <span className="cert-placeholder-text">MLSA</span>
                      <span className="cert-placeholder-sub">CUI Lahore</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  {cert.link !== '#' && (
                    <div className="cert-overlay">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="cert-overlay-link"
                      >
                        <span>View Credential</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                        </svg>
                      </a>
                    </div>
                  )}
                  <span className="cert-badge">{cert.badge}</span>
                </div>

                <div className="cert-info">
                  <div className="cert-meta">
                    <span className="cert-issuer">{cert.issuer}</span>
                    <span className="cert-date">{cert.date}</span>
                  </div>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-desc">{cert.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
