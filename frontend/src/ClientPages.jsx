import React, { useState, useEffect } from 'react';

function usePageTop() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
}

function BackButton({ onBack }) {
  return (
    <button onClick={onBack} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 18px', borderRadius: 10,
      background: 'rgba(82,196,168,0.1)', border: '1px solid rgba(82,196,168,0.3)',
      color: '#52c4a8', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
      transition: 'all 0.2s',
    }}
    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(82,196,168,0.2)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(82,196,168,0.1)'; }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
      </svg>
      Back to Home
    </button>
  );
}

function PageHero({ label, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', padding: '80px 24px 48px', maxWidth: 700, margin: '0 auto' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'var(--c-teal-dim, rgba(82,196,168,0.1))', border: '1px solid var(--c-border-h, rgba(82,196,168,0.25))',
        color: 'var(--c-teal, #52c4a8)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', padding: '5px 14px', borderRadius: 999, marginBottom: 24,
      }}>{label}</div>
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900,
        letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20,
        color: 'var(--c-text, #e8f0ef)',
      }}>{title}</h1>
      {subtitle && (
        <p style={{ color: 'var(--c-muted, rgba(232,240,239,0.55))', fontSize: '1.05rem', lineHeight: 1.7 }}>{subtitle}</p>
      )}
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: 'var(--c-card-bg, rgba(255,255,255,0.04))', border: '1px solid var(--c-card-bdr, rgba(255,255,255,0.08))',
      borderRadius: 16, padding: '28px 32px', transition: 'border-color 0.2s', ...style,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--c-border-h, rgba(82,196,168,0.3))'; }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--c-card-bdr, rgba(255,255,255,0.08))'; }}
    >{children}</div>
  );
}

function PageWrapper({ children, onBack, theme, toggleTheme }) {
  usePageTop();
  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg, #080e0e)', fontFamily: "'Inter', -apple-system, sans-serif", color: 'var(--c-text, #e8f0ef)' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--c-surface, rgba(8,14,14,0.85))', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--c-border, rgba(255,255,255,0.06))',
        padding: '0 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 60,
      }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--c-text, #e8f0ef)', fontSize: '1rem', fontWeight: 800, letterSpacing: '-0.02em',
        }}>
          <span style={{
            width: 36, height: 36, borderRadius: 9,
            background: 'linear-gradient(135deg, #1a3a35 0%, #0f2420 100%)',
            border: '1px solid rgba(82, 196, 168, 0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#52c4a8',
            boxShadow: '0 0 16px rgba(82,196,168,0.3)',
            flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
            </svg>
          </span>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--c-text, #e8f0ef)' }}>
            Intern<span style={{ color: '#52c4a8' }}>Track</span>
          </span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 10,
                background: 'var(--c-teal-dim, rgba(82,196,168,0.1))',
                border: '1px solid var(--c-border, rgba(82,196,168,0.3))',
                color: 'var(--c-teal, #52c4a8)', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {theme === 'dark' ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          )}
          <BackButton onBack={onBack} />
        </div>
      </div>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>{children}</div>
      <div style={{ borderTop: '1px solid var(--c-border, rgba(255,255,255,0.06))', padding: '24px 32px', textAlign: 'center', color: 'var(--c-subtle, rgba(232,240,239,0.35))', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} InternTrack. All rights reserved.
      </div>
    </div>
  );
}

/* ---- Browse Internships ---- */
export function BrowseInternshipsPage({ onBack, theme, toggleTheme }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const domains = ['All', 'Engineering', 'Design', 'Marketing', 'Finance', 'Data Science'];
  const internships = [
    { company: 'Google', role: 'Software Engineering Intern', domain: 'Engineering', location: 'Mountain View, CA', type: 'Summer 2025', logo: '🔵' },
    { company: 'Meta', role: 'Product Design Intern', domain: 'Design', location: 'Menlo Park, CA', type: 'Summer 2025', logo: '🟣' },
    { company: 'Stripe', role: 'Data Science Intern', domain: 'Data Science', location: 'Remote', type: 'Fall 2025', logo: '🟤' },
    { company: 'Airbnb', role: 'Frontend Engineering Intern', domain: 'Engineering', location: 'San Francisco, CA', type: 'Summer 2025', logo: '🔴' },
    { company: 'McKinsey', role: 'Business Analyst Intern', domain: 'Finance', location: 'New York, NY', type: 'Summer 2025', logo: '🔷' },
    { company: 'Figma', role: 'UX Research Intern', domain: 'Design', location: 'Remote', type: 'Spring 2025', logo: '🟡' },
    { company: 'Palantir', role: 'ML Engineering Intern', domain: 'Data Science', location: 'Denver, CO', type: 'Summer 2025', logo: '⚫' },
    { company: 'HubSpot', role: 'Growth Marketing Intern', domain: 'Marketing', location: 'Boston, MA', type: 'Summer 2025', logo: '🟠' },
    { company: 'Notion', role: 'Backend Engineering Intern', domain: 'Engineering', location: 'Remote', type: 'Fall 2025', logo: '⬜' },
  ];
  const filtered = internships.filter(i =>
    (filter === 'All' || i.domain === filter) &&
    (i.company.toLowerCase().includes(search.toLowerCase()) || i.role.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Platform" title="Browse Internships" subtitle="Discover hundreds of curated internship opportunities tailored for students and early-career professionals." />
      <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search companies or roles..." style={{ width: '100%', padding: '12px 14px 12px 42px', borderRadius: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {domains.map(d => (
            <button key={d} onClick={() => setFilter(d)} style={{ padding: '10px 16px', borderRadius: 10, fontSize: '0.82rem', fontWeight: 600, border: '1px solid', borderColor: filter === d ? 'var(--c-teal)' : 'var(--c-border)', background: filter === d ? 'var(--c-teal-dim)' : 'var(--c-surface)', color: filter === d ? 'var(--c-teal)' : 'var(--c-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>{d}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.map((job, i) => (
          <Card key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>{job.logo}</div>
              <div><div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--c-text)' }}>{job.company}</div><div style={{ color: 'var(--c-muted)', fontSize: '0.78rem' }}>{job.location}</div></div>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--c-text)' }}>{job.role}</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 999, background: 'var(--c-teal-dim)', border: '1px solid rgba(82,196,168,0.25)', color: 'var(--c-teal)' }}>{job.domain}</span>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 999, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>{job.type}</span>
            </div>
            <button style={{ padding: '9px', borderRadius: 8, border: '1px solid rgba(82,196,168,0.3)', background: 'var(--c-teal-dim)', color: 'var(--c-teal)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>Apply Now →</button>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 60, color: 'var(--c-muted)' }}>No internships found.</div>}
    </PageWrapper>
  );
}

/* ---- Track Applications ---- */
export function TrackApplicationsPage({ onBack, theme, toggleTheme }) {
  const stages = [
    { label: 'Wishlist', color: '#64748b', count: 3, apps: ['Netflix', 'Spotify', 'Uber'] },
    { label: 'Applied', color: '#3b82f6', count: 5, apps: ['Google', 'Meta', 'Apple', 'Amazon', 'Microsoft'] },
    { label: 'Interview', color: '#f59e0b', count: 2, apps: ['Stripe', 'Figma'] },
    { label: 'Offer', color: '#10b981', count: 1, apps: ['Airbnb'] },
    { label: 'Rejected', color: '#ef4444', count: 1, apps: ['Twitter'] },
  ];
  const stats = [
    { label: 'Total Applied', value: '12', icon: '📋' },
    { label: 'Response Rate', value: '58%', icon: '📊' },
    { label: 'Interviews', value: '3', icon: '🎤' },
    { label: 'Offers', value: '1', icon: '🎉' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Platform" title="Track Applications" subtitle="Stay on top of every application with your personal internship pipeline." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        {stats.map((s, i) => (
          <Card key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--c-teal)' }}>{s.value}</div>
            <div style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginTop: 4 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20, color: 'var(--c-text)' }}>Your Application Pipeline</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', gap: 16 }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)', borderRadius: 14, padding: 20, borderTop: `3px solid ${stage.color}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--c-text)' }}>{stage.label}</span>
              <span style={{ background: `${stage.color}22`, border: `1px solid ${stage.color}55`, color: stage.color, borderRadius: 999, fontSize: '0.72rem', fontWeight: 700, padding: '2px 9px' }}>{stage.count}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {stage.apps.map((app, j) => (
                <div key={j} style={{ background: 'var(--c-surface)', border: '1px solid var(--c-card-bdr)', borderRadius: 8, padding: '8px 12px', fontSize: '0.82rem', fontWeight: 500, color: 'var(--c-text)' }}>{app}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 60 }}>
        <p style={{ color: 'var(--c-muted)', marginBottom: 20 }}>Create your free account to start tracking your own applications.</p>
        <button style={{ padding: '14px 32px', borderRadius: 12, background: 'var(--c-teal)', color: '#ffffff', fontSize: '0.95rem', fontWeight: 700, border: 'none', cursor: 'pointer' }} onClick={() => window.location.href = '/admin?auth=signup'}>Start Tracking Free →</button>
      </div>
    </PageWrapper>
  );
}

/* ---- Career Resources ---- */
export function CareerResourcesPage({ onBack, theme, toggleTheme }) {
  const [activeTag, setActiveTag] = useState('All');
  const resources = [
    { icon: '📄', title: 'Resume Writing Guide', desc: 'Craft an ATS-friendly resume that gets past automated filters and impresses recruiters.', tag: 'Resume', time: '8 min read' },
    { icon: '💼', title: 'LinkedIn Optimization', desc: 'Turn your LinkedIn profile into an internship magnet with proven strategies.', tag: 'Networking', time: '6 min read' },
    { icon: '🎯', title: 'Targeting the Right Roles', desc: 'Identify internships that align with your skills, interests, and career goals.', tag: 'Strategy', time: '5 min read' },
    { icon: '✉️', title: 'Cold Outreach Templates', desc: 'Email templates for reaching out to hiring managers at your target companies.', tag: 'Networking', time: '4 min read' },
    { icon: '📊', title: 'Salary & Compensation Guide', desc: 'Know your worth. Understand stipend ranges and how to negotiate your offer.', tag: 'Compensation', time: '7 min read' },
    { icon: '🗂️', title: 'Building a Portfolio', desc: 'Step-by-step guide to building a portfolio that showcases your projects.', tag: 'Portfolio', time: '10 min read' },
    { icon: '🤝', title: 'Networking at Career Fairs', desc: 'Scripts, follow-up strategies, and relationship-building tips for career fairs.', tag: 'Networking', time: '5 min read' },
    { icon: '🚀', title: 'Converting Intern to Full-Time', desc: 'Make such a great impression that a return offer is inevitable.', tag: 'Career Growth', time: '9 min read' },
  ];
  const tags = ['All', 'Resume', 'Networking', 'Strategy', 'Portfolio', 'Compensation', 'Career Growth'];
  const filtered = resources.filter(r => activeTag === 'All' || r.tag === activeTag);
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Platform" title="Career Resources" subtitle="Actionable guides, templates, and insights to help you land the internship." />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {tags.map(t => (
          <button key={t} onClick={() => setActiveTag(t)} style={{ padding: '8px 16px', borderRadius: 10, fontSize: '0.8rem', fontWeight: 600, border: '1px solid', borderColor: activeTag === t ? 'var(--c-teal)' : 'var(--c-border)', background: activeTag === t ? 'var(--c-teal-dim)' : 'var(--c-surface)', color: activeTag === t ? 'var(--c-teal)' : 'var(--c-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>{t}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {filtered.map((r, i) => (
          <Card key={i} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 28 }}>{r.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-text)' }}>{r.title}</div>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.87rem', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
              <span style={{ fontSize: '0.72rem', padding: '3px 10px', borderRadius: 999, background: 'var(--c-teal-dim)', border: '1px solid rgba(82,196,168,0.2)', color: 'var(--c-teal)' }}>{r.tag}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--c-subtle)' }}>{r.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ---- Interview Prep ---- */
export function InterviewPrepPage({ onBack, theme, toggleTheme }) {
  const [activeSection, setActiveSection] = useState('behavioral');
  const sections = {
    behavioral: { label: 'Behavioral', icon: '🗣️', questions: [
      { q: 'Tell me about yourself.', hint: 'Use the Present-Past-Future formula. Keep it under 2 minutes.' },
      { q: 'Why do you want to intern here?', hint: 'Research the company. Tie their mission to your goals.' },
      { q: 'Describe a challenge you overcame.', hint: 'Use STAR: Situation, Task, Action, Result.' },
      { q: 'Where do you see yourself in 5 years?', hint: 'Show ambition aligned with the role.' },
      { q: 'Tell me about a time you led a team.', hint: 'Emphasize collaboration, decision-making, outcomes.' },
    ]},
    technical: { label: 'Technical', icon: '💻', questions: [
      { q: 'Implement a binary search algorithm.', hint: 'Think aloud, handle edge cases, analyze time/space.' },
      { q: 'Reverse a linked list.', hint: 'Iterative vs recursive — know both approaches.' },
      { q: 'Design a URL shortener.', hint: 'Discuss scalability, hashing, DB choices.' },
      { q: 'Difference between REST and GraphQL?', hint: 'Focus on trade-offs, not just definitions.' },
      { q: 'Explain Big-O notation with examples.', hint: 'Use real code examples to illustrate concepts.' },
    ]},
    company: { label: 'Company-Specific', icon: '🏢', questions: [
      { q: 'Google: Design Google Maps.', hint: 'Start with use cases, scale to billions of users.' },
      { q: 'Meta: How would you measure feature success?', hint: 'Define metrics, success criteria, guardrail metrics.' },
      { q: 'Amazon: Tell me about a time you had limited data.', hint: "Relates to Leadership Principle: Bias for Action." },
      { q: 'Microsoft: What product would you improve?', hint: 'Show product thinking, prioritization framework.' },
      { q: 'Apple: How do you handle difficult feedback?', hint: 'Showcase growth mindset and communication skills.' },
    ]},
  };
  const tips = [
    { icon: '⏱️', title: 'Practice Out Loud', desc: 'Recording yourself or practicing with a friend dramatically improves confidence.' },
    { icon: '📓', title: 'Build an Answer Bank', desc: 'Prepare 10-15 STAR stories from your experience to adapt for any behavioral question.' },
    { icon: '🔍', title: 'Research the Company', desc: "Know the company's latest products, news, mission, and values before every interview." },
    { icon: '❓', title: 'Prepare Smart Questions', desc: 'Always ask 2-3 thoughtful questions. It signals curiosity and engagement.' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Platform" title="Interview Prep" subtitle="Master behavioral, technical, and company-specific interviews with curated question banks." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
        {tips.map((t, i) => (
          <Card key={i}><div style={{ fontSize: 24, marginBottom: 10 }}>{t.icon}</div><div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6, color: 'var(--c-text)' }}>{t.title}</div><p style={{ color: 'var(--c-muted)', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>{t.desc}</p></Card>
        ))}
      </div>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 20, color: 'var(--c-text)' }}>Question Bank</h2>
      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {Object.entries(sections).map(([key, val]) => (
          <button key={key} onClick={() => setActiveSection(key)} style={{ padding: '10px 20px', borderRadius: 10, fontWeight: 600, fontSize: '0.85rem', border: '1px solid', borderColor: activeSection === key ? 'var(--c-teal)' : 'var(--c-border)', background: activeSection === key ? 'var(--c-teal-dim)' : 'var(--c-surface)', color: activeSection === key ? 'var(--c-teal)' : 'var(--c-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>{val.icon} {val.label}</button>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {sections[activeSection].questions.map((item, i) => (
          <Card key={i}><div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 8, color: 'var(--c-text)' }}>Q{i + 1}. {item.q}</div><div style={{ display: 'flex', gap: 8 }}><span style={{ color: 'var(--c-teal)', fontSize: '0.75rem', flexShrink: 0 }}>💡 Hint:</span><span style={{ color: 'var(--c-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.hint}</span></div></Card>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ---- About Us ---- */
export function AboutUsPage({ onBack, theme, toggleTheme }) {
  const team = [
    { name: 'Dev Adithya', role: 'Founder & CEO', emoji: '👨‍💻', bio: 'Full-stack engineer passionate about helping students navigate the internship landscape.' },
    { name: 'Priya Nair', role: 'Head of Product', emoji: '👩‍🎨', bio: 'Former Google PM. Obsessed with building products that feel magical to use.' },
    { name: 'Rohan Malik', role: 'Lead Engineer', emoji: '⚡', bio: 'Systems architect with 8 years of experience scaling platforms to millions of users.' },
    { name: 'Ananya Kumar', role: 'Head of Growth', emoji: '🚀', bio: 'Growth hacker who helped scale two startups from 0 to 100K users.' },
  ];
  const milestones = [
    { year: '2022', title: 'The Idea', desc: 'Frustrated with scattered internship tracking, Dev built a simple spreadsheet tracker for friends.' },
    { year: '2023', title: 'First Version', desc: 'InternTrack v1 launched. 500 students signed up in the first week through word-of-mouth.' },
    { year: '2024', title: 'Rapid Growth', desc: 'Crossed 25,000 users across 140+ universities. Added AI-powered job matching.' },
    { year: '2025', title: 'Today', desc: 'Serving 100,000+ students globally. Trusted by top university career centers.' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Company" title="About InternTrack" subtitle="We started as students frustrated by the chaos of internship hunting. Now we're on a mission to make every student's job search smarter." />
      <Card style={{ textAlign: 'center', padding: '48px 40px', marginBottom: 60, background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: 16 }}>🌍</div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 16, color: 'var(--c-text)' }}>Our Mission</h2>
        <p style={{ color: 'var(--c-muted)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>To democratize career opportunities by giving every student the tools, insights, and community to land their dream internship.</p>
      </Card>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 32, textAlign: 'center', color: 'var(--c-text)' }}>Our Journey</h2>
      <div style={{ position: 'relative', marginBottom: 60 }}>
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'rgba(82,196,168,0.2)', transform: 'translateX(-50%)' }} />
        {milestones.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: 32, position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 20, width: 12, height: 12, borderRadius: '50%', background: 'var(--c-teal)', transform: 'translateX(-50%)' }} />
            <Card style={{ width: '44%', marginRight: i % 2 === 0 ? '6%' : 0, marginLeft: i % 2 === 1 ? '6%' : 0 }}>
              <div style={{ color: 'var(--c-teal)', fontWeight: 800, fontSize: '0.85rem', marginBottom: 6 }}>{m.year}</div>
              <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--c-text)' }}>{m.title}</div>
              <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
            </Card>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 32, textAlign: 'center', color: 'var(--c-text)' }}>Meet the Team</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
        {team.map((t, i) => (
          <Card key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{t.emoji}</div>
            <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: 4, color: 'var(--c-text)' }}>{t.name}</div>
            <div style={{ color: 'var(--c-teal)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 10 }}>{t.role}</div>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.83rem', lineHeight: 1.6, margin: 0 }}>{t.bio}</p>
          </Card>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginTop: 60 }}>
        {[{ value: '100K+', label: 'Students' }, { value: '140+', label: 'Universities' }, { value: '50K+', label: 'Apps Tracked' }, { value: '95%', label: 'Satisfaction' }].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)', borderRadius: 14 }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--c-teal)' }}>{s.value}</div>
            <div style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ---- Blog ---- */
export function BlogPage({ onBack, theme, toggleTheme }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const posts = [
    { category: 'Career', title: 'The 2025 Internship Season: What Changed', excerpt: 'A deep dive into application trends, hiring timelines, and the roles that saw the most competition.', author: 'Dev Adithya', date: 'Jul 28, 2025', readTime: '7 min', emoji: '📅' },
    { category: 'Tips', title: '10 Resume Mistakes Getting You Ghosted', excerpt: 'We analyzed 5,000 applications and found the most common mistakes costing candidates interviews.', author: 'Priya Nair', date: 'Jul 20, 2025', readTime: '6 min', emoji: '📋' },
    { category: 'Story', title: 'From Zero Experience to Google Intern', excerpt: 'How one CS sophomore landed a Google SWE internship with no prior work experience.', author: 'Ananya Kumar', date: 'Jul 14, 2025', readTime: '9 min', emoji: '🌟' },
    { category: 'Tips', title: 'Ace a Technical Interview in 30 Days', excerpt: 'A structured plan to go from "leetcode beginner" to confidently cracking coding interviews.', author: 'Rohan Malik', date: 'Jul 8, 2025', readTime: '8 min', emoji: '💻' },
    { category: 'Industry', title: 'AI, Climate Tech & Fintech: Top Sectors for 2025', excerpt: 'The hottest industries for internships this year and how to position yourself.', author: 'Dev Adithya', date: 'Jun 30, 2025', readTime: '5 min', emoji: '🏭' },
    { category: 'Career', title: 'Internship or Personal Project?', excerpt: 'Weighing internship experience vs self-driven projects for your career trajectory.', author: 'Priya Nair', date: 'Jun 22, 2025', readTime: '4 min', emoji: '🤔' },
  ];
  const categories = ['All', 'Career', 'Tips', 'Story', 'Industry'];
  const filtered = posts.filter(p => activeCategory === 'All' || p.category === activeCategory);
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Company" title="InternTrack Blog" subtitle="Insights, tips, and stories to help you navigate the internship journey." />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
        {categories.map(c => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: '8px 18px', borderRadius: 10, fontSize: '0.82rem', fontWeight: 600, border: '1px solid', borderColor: activeCategory === c ? 'var(--c-teal)' : 'var(--c-border)', background: activeCategory === c ? 'var(--c-teal-dim)' : 'var(--c-surface)', color: activeCategory === c ? 'var(--c-teal)' : 'var(--c-muted)', cursor: 'pointer', transition: 'all 0.2s' }}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {filtered.map((post, i) => (
          <Card key={i} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 32 }}>{post.emoji}</div>
            <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: 999, background: 'var(--c-teal-dim)', border: '1px solid rgba(82,196,168,0.2)', color: 'var(--c-teal)', alignSelf: 'flex-start' }}>{post.category}</span>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1.4, margin: 0, color: 'var(--c-text)' }}>{post.title}</h3>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{post.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--c-border)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--c-muted)' }}>{post.author} · {post.date}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--c-subtle)' }}>{post.readTime} read</span>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ---- Careers ---- */
export function CareersPage({ onBack, theme, toggleTheme }) {
  const jobs = [
    { title: 'Senior Full-Stack Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
    { title: 'Product Designer', dept: 'Design', location: 'San Francisco, CA', type: 'Full-time' },
    { title: 'Growth Marketing Manager', dept: 'Marketing', location: 'Remote', type: 'Full-time' },
    { title: 'Machine Learning Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
    { title: 'University Partnerships Manager', dept: 'Business Dev', location: 'New York, NY', type: 'Full-time' },
    { title: 'Customer Success Specialist', dept: 'Operations', location: 'Remote', type: 'Part-time' },
  ];
  const perks = [
    { icon: '🏠', title: 'Remote-First', desc: 'Work from anywhere in the world. 100% remote and always will be.' },
    { icon: '📚', title: 'Learning Budget', desc: '$2,000 annual budget for courses, books, and conferences.' },
    { icon: '🏥', title: 'Health Coverage', desc: 'Full medical, dental, and vision coverage for you and your family.' },
    { icon: '💸', title: 'Competitive Pay', desc: 'Top-of-market salaries with equity for all full-time roles.' },
    { icon: '🌴', title: 'Unlimited PTO', desc: 'Take the time you need to recharge and come back at your best.' },
    { icon: '🎉', title: 'Annual Retreat', desc: 'All-company retreats twice a year to connect with the full team.' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Company" title="Join Our Team" subtitle="Help us build the internship platform we wish existed when we were students." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16, marginBottom: 60 }}>
        {perks.map((p, i) => (
          <Card key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
            <div><div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 6, color: 'var(--c-text)' }}>{p.title}</div><p style={{ color: 'var(--c-muted)', fontSize: '0.84rem', lineHeight: 1.6, margin: 0 }}>{p.desc}</p></div>
          </Card>
        ))}
      </div>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 24, color: 'var(--c-text)' }}>Open Positions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {jobs.map((job, i) => (
          <Card key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, cursor: 'pointer' }}>
            <div><div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: 'var(--c-text)' }}>{job.title}</div><div style={{ color: 'var(--c-muted)', fontSize: '0.82rem' }}>{job.dept} · {job.location}</div></div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', padding: '4px 12px', borderRadius: 999, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>{job.type}</span>
              <button style={{ padding: '8px 18px', borderRadius: 8, background: 'var(--c-teal-dim)', border: '1px solid rgba(82,196,168,0.3)', color: 'var(--c-teal)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>Apply →</button>
            </div>
          </Card>
        ))}
      </div>
    </PageWrapper>
  );
}

/* ---- Press ---- */
export function PressPage({ onBack, theme, toggleTheme }) {
  const coverage = [
    { outlet: 'TechCrunch', title: 'InternTrack Is Making Internship Hunting Less Miserable', date: 'July 2025', logo: '📰' },
    { outlet: 'Forbes', title: '30 Under 30: The Startup Helping 100K Students Land Their First Job', date: 'June 2025', logo: '🏆' },
    { outlet: 'Product Hunt', title: '#1 Product of the Day — InternTrack', date: 'May 2025', logo: '🐱' },
    { outlet: 'The Verge', title: 'This Free Tool Is Replacing The Internship Spreadsheet', date: 'April 2025', logo: '🔷' },
    { outlet: 'Business Insider', title: 'How InternTrack Became The Go-To App for CS Students', date: 'March 2025', logo: '💼' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Company" title="Press & Media" subtitle="InternTrack in the news. For media inquiries, press kits, and interview requests." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 60 }}>
        {[{ value: '100K+', label: 'Active Users' }, { value: '50+', label: 'Press Features' }, { value: '$2M+', label: 'Raised' }, { value: 'Y Combinator', label: 'Backed By' }].map((s, i) => (
          <div key={i} style={{ textAlign: 'center', padding: '28px 20px', background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)', borderRadius: 14 }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--c-teal)' }}>{s.value}</div>
            <div style={{ color: 'var(--c-muted)', fontSize: '0.8rem', marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 24, color: 'var(--c-text)' }}>Recent Coverage</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 60 }}>
        {coverage.map((item, i) => (
          <Card key={i} style={{ display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>{item.logo}</div>
            <div style={{ flex: 1 }}><div style={{ color: 'var(--c-teal)', fontWeight: 700, fontSize: '0.8rem', marginBottom: 6 }}>{item.outlet}</div><div style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4, color: 'var(--c-text)' }}>{item.title}</div></div>
            <div style={{ color: 'var(--c-subtle)', fontSize: '0.8rem', flexShrink: 0 }}>{item.date}</div>
          </Card>
        ))}
      </div>
      <Card style={{ textAlign: 'center', padding: '48px 40px', background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)' }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>📦</div>
        <h2 style={{ fontWeight: 800, marginBottom: 12, color: 'var(--c-text)' }}>Download Press Kit</h2>
        <p style={{ color: 'var(--c-muted)', marginBottom: 24, fontSize: '0.9rem' }}>Logos, brand guidelines, product screenshots, and founder bios — everything you need.</p>
        <button style={{ padding: '12px 28px', borderRadius: 10, background: 'var(--c-teal)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Download Press Kit →</button>
      </Card>
    </PageWrapper>
  );
}

/* ---- Help Center ---- */
export function HelpCenterPage({ onBack, theme, toggleTheme }) {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: 'Is InternTrack free to use?', a: 'Yes! InternTrack is completely free for students. We offer a free tier with all core features including application tracking, internship browsing, and career resources.' },
    { q: 'How do I add an application?', a: 'Click the "+" button on your dashboard or use the "Add Application" button in the top navigation. Fill in the company name, role, deadline, and current status.' },
    { q: 'Can I import my existing applications from a spreadsheet?', a: 'Yes! Go to Settings → Import Data and upload a CSV file. We support Google Sheets and Excel exports.' },
    { q: 'How do I set reminders for deadlines?', a: 'Open any application, go to the "Details" tab, and enable deadline reminders. You can get email or push notifications.' },
    { q: 'Is my data private and secure?', a: 'Absolutely. Your data is encrypted end-to-end and never shared with third parties. You can export or delete your data at any time from Settings.' },
    { q: 'Can I share my profile with recruiters?', a: 'Yes! Enable your public profile in Settings → Privacy to get a shareable link. You control exactly what information is visible.' },
    { q: 'How does the AI job matching work?', a: 'Our AI analyzes your profile, skills, and application history to suggest internships that are the best fit. It learns from your preferences over time.' },
    { q: 'What browsers are supported?', a: 'InternTrack works on all modern browsers: Chrome, Firefox, Safari, and Edge. We recommend Chrome for the best experience.' },
  ];
  const filtered = faqs.filter(f => search === '' || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()));
  const categories = [
    { icon: '🚀', title: 'Getting Started', desc: 'Set up your account, add your first application, and explore features.' },
    { icon: '🔒', title: 'Account & Privacy', desc: 'Manage your profile, security settings, and data preferences.' },
    { icon: '📋', title: 'Applications', desc: 'Track, manage, and organize all your internship applications.' },
    { icon: '💳', title: 'Billing', desc: 'Free tier details, Pro plan features, and payment questions.' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Support" title="Help Center" subtitle="Find answers to common questions or get in touch with our support team." />
      <div style={{ maxWidth: 500, margin: '0 auto 48px', position: 'relative' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }}>
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search help articles..." style={{ width: '100%', padding: '14px 16px 14px 50px', borderRadius: 12, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
        {categories.map((c, i) => (
          <Card key={i} style={{ cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--c-text)' }}>{c.title}</div>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
          </Card>
        ))}
      </div>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 20, color: 'var(--c-text)' }}>{search ? `Results for "${search}"` : 'Frequently Asked Questions'}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.map((faq, i) => (
          <div key={i} style={{ background: 'var(--c-card-bg)', border: '1px solid', borderColor: openFaq === i ? 'var(--c-teal)' : 'var(--c-card-bdr)', borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
            <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--c-text)', textAlign: 'left', gap: 16 }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{faq.q}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-teal)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            {openFaq === i && <div style={{ padding: '0 24px 20px', color: 'var(--c-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>{faq.a}</div>}
          </div>
        ))}
        {filtered.length === 0 && <div style={{ textAlign: 'center', padding: 40, color: 'var(--c-muted)' }}>No results found for "{search}"</div>}
      </div>
    </PageWrapper>
  );
}

/* ---- Privacy Policy ---- */
export function PrivacyPolicyPage({ onBack, theme, toggleTheme }) {
  const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account (name, email address), add applications (company names, roles, statuses), or contact our support team. We also automatically collect certain usage data including log data, device information, and cookies to improve our service.' },
    { title: '2. How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services; process transactions; send transactional and promotional communications; respond to your questions; and monitor usage patterns to enhance user experience. You can opt out of promotional emails at any time.' },
    { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist in operating our website, subject to confidentiality agreements. We may also disclose information when required by law or to protect our rights.' },
    { title: '4. Data Security', content: 'We implement industry-standard security measures including SSL/TLS encryption for data in transit, AES-256 encryption for data at rest, regular security audits and penetration testing, and strict access controls. However, no method of transmission over the Internet is 100% secure.' },
    { title: '5. Cookies', content: 'We use cookies and similar tracking technologies to track activity on our service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you do not accept cookies, some portions of our service may not be available.' },
    { title: '6. Your Rights', content: 'You have the right to access, update, or delete your personal information at any time through your account settings. You may also request a complete export of your data in a portable format. Contact us at privacy@interntrack.io for any privacy-related questions.' },
    { title: '7. Changes to This Policy', content: 'We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Legal" title="Privacy Policy" subtitle="Last updated: August 1, 2025. We believe in radical transparency about how we handle your data." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map((s, i) => (
          <Card key={i}><h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12, color: 'var(--c-teal)' }}>{s.title}</h3><p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{s.content}</p></Card>
        ))}
      </div>
      <div style={{ marginTop: 40, padding: '24px 28px', background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)', borderRadius: 14 }}>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>Questions? Contact us at <a href="mailto:privacy@interntrack.io" style={{ color: 'var(--c-teal)' }}>privacy@interntrack.io</a></p>
      </div>
    </PageWrapper>
  );
}

/* ---- Terms of Service ---- */
export function TermsOfServicePage({ onBack, theme, toggleTheme }) {
  const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing and using InternTrack ("Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service. These Terms apply to all users, visitors, and others who access or use the Service.' },
    { title: '2. Use of Service', content: 'You must be at least 13 years of age to use this Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to use the Service only for lawful purposes and in accordance with these Terms.' },
    { title: '3. Prohibited Activities', content: 'You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to gain unauthorized access to any portion of the Service; (c) transmit any viruses or malicious code; (d) collect or harvest personally identifiable information; (e) use the Service to send unsolicited communications; or (f) impersonate any person or entity.' },
    { title: '4. Intellectual Property', content: 'The Service and its original content, features, and functionality are and will remain the exclusive property of InternTrack and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.' },
    { title: '5. User Content', content: 'You retain all rights to the content you submit, post, or display on or through the Service. By submitting content, you grant InternTrack a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content solely for the purpose of operating and improving the Service.' },
    { title: '6. Termination', content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach the Terms. Upon termination, your right to use the Service will immediately cease. You may also delete your account at any time through your account settings.' },
    { title: '7. Disclaimer of Warranties', content: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied. InternTrack does not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components.' },
    { title: '8. Limitation of Liability', content: 'In no event shall InternTrack, its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, use, goodwill, or other intangible losses.' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Legal" title="Terms of Service" subtitle="Last updated: August 1, 2025. Please read these terms carefully before using InternTrack." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {sections.map((s, i) => (
          <Card key={i}><h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 12, color: 'var(--c-teal)' }}>{s.title}</h3><p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', lineHeight: 1.8, margin: 0 }}>{s.content}</p></Card>
        ))}
      </div>
      <div style={{ marginTop: 40, padding: '24px 28px', background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)', borderRadius: 14 }}>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>Questions? Contact us at <a href="mailto:legal@interntrack.io" style={{ color: 'var(--c-teal)' }}>legal@interntrack.io</a></p>
      </div>
    </PageWrapper>
  );
}

/* ---- Contact Us ---- */
export function ContactUsPage({ onBack, theme, toggleTheme }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };
  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'hello@interntrack.io', link: 'mailto:hello@interntrack.io' },
    { icon: '💬', label: 'Live Chat', value: 'Mon–Fri, 9am–6pm PST', link: '#' },
    { icon: '🐦', label: 'Twitter / X', value: '@InternTrackApp', link: '#' },
    { icon: '💼', label: 'LinkedIn', value: 'InternTrack', link: '#' },
  ];
  return (
    <PageWrapper onBack={onBack} theme={theme} toggleTheme={toggleTheme}>
      <PageHero label="Support" title="Contact Us" subtitle="Have a question, idea, or issue? We typically respond within one business day." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40, alignItems: 'start' }}>
        <div>
          {submitted ? (
            <Card style={{ textAlign: 'center', padding: '48px 32px' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 12, color: 'var(--c-text)' }}>Message Sent!</h3>
              <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>We will get back to you within 1 business day.</p>
              <button onClick={() => setSubmitted(false)} style={{ marginTop: 20, padding: '10px 24px', borderRadius: 10, background: 'var(--c-teal-dim)', border: '1px solid rgba(82,196,168,0.3)', color: 'var(--c-teal)', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}>Send Another</button>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {[{ key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' }, { key: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' }, { key: 'subject', label: 'Subject', type: 'text', placeholder: 'How can we help?' }].map(field => (
                <div key={field.key}>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 8, color: 'var(--c-text)' }}>{field.label}</label>
                  <input required type={field.type} placeholder={field.placeholder} value={form[field.key]} onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, marginBottom: 8, color: 'var(--c-text)' }}>Message</label>
                <textarea required rows={5} placeholder="Tell us more..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} style={{ width: '100%', padding: '11px 14px', borderRadius: 10, background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical', minHeight: 120, boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ padding: '13px', borderRadius: 10, background: 'var(--c-teal)', color: '#ffffff', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>Send Message →</button>
            </form>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {contactInfo.map((info, i) => (
            <a key={i} href={info.link} style={{ textDecoration: 'none' }}>
              <Card style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer' }}>
                <div style={{ fontSize: 24 }}>{info.icon}</div>
                <div><div style={{ color: 'var(--c-teal)', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>{info.label}</div><div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--c-text)' }}>{info.value}</div></div>
              </Card>
            </a>
          ))}
          <Card style={{ marginTop: 8, background: 'var(--c-card-bg)', border: '1px solid var(--c-card-bdr)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8, color: 'var(--c-text)' }}>Response Time</div>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.84rem', lineHeight: 1.7, margin: 0 }}>We respond to all inquiries within <strong style={{ color: 'var(--c-teal)' }}>1 business day</strong>. For urgent issues, mark subject with <strong style={{ color: 'var(--c-teal)' }}>[URGENT]</strong>.</p>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}

/* ---- Router ---- */
export function ClientSubPage({ page, onBack, theme, toggleTheme }) {
  const map = {
    'browse-internships':  BrowseInternshipsPage,
    'track-applications':  TrackApplicationsPage,
    'career-resources':    CareerResourcesPage,
    'interview-prep':      InterviewPrepPage,
    'about-us':            AboutUsPage,
    'blog':                BlogPage,
    'careers':             CareersPage,
    'press':               PressPage,
    'help-center':         HelpCenterPage,
    'privacy-policy':      PrivacyPolicyPage,
    'terms-of-service':    TermsOfServicePage,
    'contact-us':          ContactUsPage,
  };
  const Component = map[page];
  if (!Component) return null;
  return <Component onBack={onBack} theme={theme} toggleTheme={toggleTheme} />;
}
