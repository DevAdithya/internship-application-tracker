import React, { useEffect, useRef, useState } from 'react';
import './ClientApp.css';

/* ------------------------------------------------------------------ */
/* SVG Icons (inline — no lucide dependency leak into client bundle)  */
/* ------------------------------------------------------------------ */
const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
  </svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconZap = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);
const IconTrendingUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconLayers = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
  </svg>
);
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconX = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconRefresh = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const IconSend = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconActivity = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);

// Telegram, X, Discord — social SVGs
const IconTelegram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);
const IconTwitterX = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconDiscord = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Particle Sphere Canvas                                              */
/* ------------------------------------------------------------------ */
function ParticleSphere() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const cx = W / 2, cy = H / 2;
    const R  = Math.min(W, H) * 0.34;

    // Mouse
    let mx = cx, my = cy;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const onResize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    // Build particles on sphere surface (Fibonacci spiral)
    const N = 1100;
    const particles = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y    = 1 - (i / (N - 1)) * 2;
      const r    = Math.sqrt(1 - y * y);
      const theta = golden * i;
      particles.push({
        ox: Math.cos(theta) * r,
        oy: y,
        oz: Math.sin(theta) * r,
        size: Math.random() * 1.4 + 0.3,
        speed: Math.random() * 0.3 + 0.15,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      // Subtle mouse tilt
      const tiltX = ((my - H / 2) / H) * 0.18;
      const tiltY = ((mx - W / 2) / W) * 0.18;

      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX);
      const cosY = Math.cos(t + tiltY), sinY = Math.sin(t + tiltY);

      // Draw outer glass shell
      const grad = ctx.createRadialGradient(cx - R * 0.18, cy - R * 0.1, R * 0.05, cx, cy, R * 1.25);
      grad.addColorStop(0, 'rgba(82,196,168,0.04)');
      grad.addColorStop(0.7, 'rgba(10,40,34,0.35)');
      grad.addColorStop(1, 'rgba(8,14,14,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Soft outer ring border
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(82,196,168,0.07)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Render particles
      const pts = [];
      for (const p of particles) {
        // Rotate around Y
        const x1 = p.ox * cosY - p.oz * sinY;
        const z1 = p.ox * sinY + p.oz * cosY;
        // Rotate around X
        const y1 = p.oy * cosX - z1 * sinX;
        const z2 = p.oy * sinX + z1 * cosX;

        const depth = (z2 + 1) / 2; // 0–1
        pts.push({
          sx: cx + x1 * R,
          sy: cy + y1 * R,
          depth,
          size: p.size,
          phase: p.phase,
          speed: p.speed,
        });
      }

      // Sort back-to-front
      pts.sort((a, b) => a.depth - b.depth);

      for (const pt of pts) {
        const flicker = 0.6 + 0.4 * Math.sin(t * pt.speed * 4 + pt.phase);
        const alpha   = pt.depth * 0.85 * flicker;
        const radius  = pt.size * (0.5 + pt.depth * 0.5);

        // Core dot
        ctx.beginPath();
        ctx.arc(pt.sx, pt.sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180,240,225,${alpha})`;
        ctx.fill();

        // Glow for front particles
        if (pt.depth > 0.65 && flicker > 0.75) {
          ctx.beginPath();
          ctx.arc(pt.sx, pt.sy, radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(82,196,168,${alpha * 0.18})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="cl-hero-canvas" />;
}

/* ------------------------------------------------------------------ */
/* Scroll Reveal Hook                                                  */
/* ------------------------------------------------------------------ */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.cl-reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
        else e.target.classList.remove('visible'); // re-animates on scroll up
      });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/* Client Header                                                        */
/* ------------------------------------------------------------------ */
function ClientHeader({ onSignIn, onSignUp }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ['Features', 'How It Works', 'Browse Jobs', 'Contact'];

  return (
    <>
      <header className="cl-header">
        <div className="cl-header-inner">
          {/* Logo */}
          <a href="/" className="cl-logo">
            <span className="cl-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52c4a8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </span>
            <span className="cl-logo-name">Intern<span>Track</span></span>
          </a>

          {/* Desktop Nav */}
          <nav className="cl-nav">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="cl-nav-link">{link}</a>
            ))}
          </nav>

          {/* Actions */}
          <div className="cl-header-actions">
            <button className="cl-btn-signin" onClick={onSignIn}>Sign In</button>
            <button className="cl-btn-signup" onClick={onSignUp}>Sign Up</button>
            <button className="cl-mobile-menu-btn" onClick={() => setMenuOpen(true)}>
              <IconMenu />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`cl-mobile-drawer ${menuOpen ? 'open' : ''}`}>
        <button className="cl-drawer-close" onClick={() => setMenuOpen(false)}><IconX /></button>
        {navLinks.map(link => (
          <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`} className="cl-mobile-nav-link" onClick={() => setMenuOpen(false)}>{link}</a>
        ))}
        <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
          <button className="cl-btn-secondary" style={{ flex: 1, padding: '12px', fontSize: '0.9rem', borderRadius: '10px' }} onClick={() => { setMenuOpen(false); onSignIn(); }}>Sign In</button>
          <button className="cl-btn-primary" style={{ flex: 1, padding: '12px', fontSize: '0.9rem', borderRadius: '10px' }} onClick={() => { setMenuOpen(false); onSignUp(); }}>Sign Up</button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Client Footer                                                        */
/* ------------------------------------------------------------------ */
function ClientFooter() {
  const cols = [
    {
      title: 'Platform',
      links: ['Browse Internships', 'Track Applications', 'Career Resources', 'Interview Prep'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Blog', 'Careers', 'Press'],
    },
    {
      title: 'Support',
      links: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact Us'],
    },
  ];

  return (
    <footer className="cl-footer">
      <div className="cl-footer-main">
        {/* Brand col */}
        <div>
          <a href="/" className="cl-logo">
            <span className="cl-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52c4a8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </span>
            <span className="cl-logo-name">Intern<span>Track</span></span>
          </a>
          <p className="cl-footer-brand-desc">
            The smartest platform for students and early-career professionals to discover, apply, and track internship opportunities — all in one place.
          </p>
          <div className="cl-footer-social">
            {[
              { Icon: IconTelegram, label: 'Telegram', href: '#telegram' },
              { Icon: IconTwitterX, label: 'X / Twitter', href: '#twitter' },
              { Icon: IconDiscord, label: 'Discord', href: '#discord' },
              { Icon: IconLinkedin, label: 'LinkedIn', href: '#linkedin' },
            ].map(({ Icon, label, href }) => (
              <a key={label} href={href} className="cl-footer-social-btn" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {cols.map(col => (
          <div key={col.title}>
            <div className="cl-footer-col-title">{col.title}</div>
            <div className="cl-footer-links">
              {col.links.map(link => (
                <a key={link} href="#" className="cl-footer-link">{link}</a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="cl-footer-bottom">
        <span>© {new Date().getFullYear()} InternTrack. All rights reserved.</span>
        <div className="cl-footer-bottom-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Main ClientApp                                                       */
/* ------------------------------------------------------------------ */
export default function ClientApp() {
  useScrollReveal();

  const features = [
    { Icon: IconTarget,     title: 'Smart Job Discovery',       desc: 'Browse hundreds of internship listings curated for students — filtered by domain, location, and tech stack.' },
    { Icon: IconLayers,     title: 'Track Every Application',   desc: 'Never lose track of where you applied. Follow each application through its full lifecycle in real-time.' },
    { Icon: IconTrendingUp, title: 'Career Growth Insights',    desc: 'Understand your application patterns, success rates, and areas to improve with visual analytics.' },
    { Icon: IconZap,        title: 'Instant One-Click Apply',   desc: 'Submit your profile and resume to open positions in seconds — no repetitive forms.' },
    { Icon: IconBriefcase,  title: 'Interview Preparation',     desc: 'Access role-specific tips, question banks, and resources tailored to the companies you are targeting.' },
    { Icon: IconShield,     title: 'Private & Secure',          desc: 'Your data is encrypted and never shared. You control what recruiters see and when.' },
  ];

  const steps = [
    { num: '01', title: 'Create Your Profile', desc: 'Upload your resume, skills, and portfolio once — use it across all your applications.' },
    { num: '02', title: 'Browse & Discover',    desc: 'Explore internship listings filtered to your domain, preferences, and location.' },
    { num: '03', title: 'Apply & Track',        desc: 'One-click apply and watch your application pipeline update in real-time.' },
    { num: '04', title: 'Land the Offer',       desc: 'Get notified at every milestone and arrive at interviews fully prepared.' },
  ];

  const stats = [
    { num: '12,000', suffix: '+', label: 'Active Listings' },
    { num: '8,400',  suffix: '+', label: 'Students Placed' },
    { num: '340',    suffix: '+', label: 'Partner Companies' },
    { num: '93',     suffix: '%', label: 'Satisfaction Rate' },
  ];

  return (
    <div>
      {/* HEADER */}
      <ClientHeader
        onSignIn={() => window.location.href = '/admin?auth=signin'}
        onSignUp={() => window.location.href = '/admin?auth=signup'}
      />

      {/* HERO */}
      <section id="home" className="cl-hero">
        <ParticleSphere />

        <div className="cl-hero-content">
          {/* Left */}
          <div className="cl-hero-left">
            <p className="cl-hero-eyebrow">Smart Internship Discovery Platform</p>
            <h1 className="cl-hero-title">
              Land Your<br />
              Dream <em>Internship</em>
            </h1>
            <p className="cl-hero-desc">
              Browse curated openings, submit applications in seconds, and track your entire pipeline — from first contact to offer letter.
            </p>

            <div className="cl-hero-social">
              {[
                { Icon: IconTelegram, label: 'Telegram' },
                { Icon: IconTwitterX, label: 'X' },
                { Icon: IconDiscord, label: 'Discord' },
              ].map(({ Icon, label }) => (
                <button key={label} className="cl-social-btn" aria-label={label}>
                  <Icon />
                </button>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="cl-hero-right">
            <div className="cl-hero-right-labels">
              <p className="cl-right-label">Discover thousands of tech internships updated daily</p>
              <p className="cl-right-label">Track every stage from Applied to Offered</p>
            </div>
            <div className="cl-hero-mini-cards">
              <div className="cl-mini-card">
                <span className="cl-mini-card-icon"><IconActivity /></span>
                <span className="cl-mini-card-label">Real-Time Tracking</span>
              </div>
              <div className="cl-mini-card">
                <span className="cl-mini-card-icon"><IconLayers /></span>
                <span className="cl-mini-card-label">Seamless Pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ padding: '0 40px', maxWidth: '1280px', margin: '0 auto -20px' }}>
        <div className="cl-stats-strip cl-reveal">
          {stats.map((s, i) => (
            <div key={s.label} className={`cl-stat cl-reveal cl-reveal-delay-${i + 1}`}>
              <div className="cl-stat-num">{s.num}<span>{s.suffix}</span></div>
              <div className="cl-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="cl-features">
        <div className="cl-reveal">
          <div className="cl-section-label">Why InternTrack</div>
          <h2 className="cl-section-title">Everything you need to run your job search</h2>
          <p className="cl-section-sub">Built specifically for students and early-career professionals who want to stay organized, move fast, and stand out.</p>
        </div>

        <div className="cl-features-grid">
          {features.map((f, i) => (
            <div key={f.title} className={`cl-feature-card cl-reveal cl-reveal-delay-${(i % 3) + 1}`}>
              <div className="cl-feature-icon"><f.Icon /></div>
              <h3 className="cl-feature-title">{f.title}</h3>
              <p className="cl-feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="cl-how">
        <div className="cl-reveal">
          <div className="cl-section-label">Process</div>
          <h2 className="cl-section-title">Go from browsing to offer in four steps</h2>
          <p className="cl-section-sub">InternTrack keeps you focused on what matters — not wrangling spreadsheets.</p>
        </div>
        <div className="cl-how-steps">
          {steps.map((s, i) => (
            <div key={s.num} className={`cl-step cl-reveal cl-reveal-delay-${i + 1}`}>
              <div className="cl-step-num">{s.num}</div>
              <div className="cl-step-title">{s.title}</div>
              <div className="cl-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="browse-jobs" className="cl-cta">
        <div className="cl-cta-card cl-reveal">
          <div className="cl-section-label" style={{ justifyContent: 'center', margin: '0 auto 20px' }}>Get Started</div>
          <h2 className="cl-cta-title">Start tracking smarter today</h2>
          <p className="cl-cta-sub">Join thousands of students who use InternTrack to stay ahead in their internship search.</p>
          <div className="cl-cta-buttons">
            <button className="cl-btn-primary" onClick={() => window.location.href = '/admin?auth=signup'}>Create Free Account</button>
            <button className="cl-btn-secondary" onClick={() => window.location.href = '/admin?auth=signin'}>Sign In</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <ClientFooter />

      {/* Floating corner icon (like Neurovia) */}
      <button className="cl-corner-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="Back to top">
        <IconRefresh />
      </button>
    </div>
  );
}
