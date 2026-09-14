import React, { useState, useRef } from 'react';
import '../nav.css';
import { Briefcase, Sun, Moon, ArrowLeft, Mail, Lock, User, Phone, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

function PasswordStrength({ password }) {
  const getScore = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };
  const score = getScore(password);
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'filled-red', 'filled-orange', 'filled-amber', 'filled-emerald'];
  if (!password) return null;
  return (
    <div className="pw-strength">
      <div className="pw-strength-bars">
        {[1,2,3,4].map(i => (
          <div key={i} className={`pw-strength-bar ${i <= score ? colors[score] : ''}`} />
        ))}
      </div>
      <div className="pw-strength-label">{labels[score]}</div>
    </div>
  );
}

export default function AuthPage({ initialMode = 'signin', onLoginSuccess, onBackToApp, theme, toggleTheme }) {
  const [isSignUp, setIsSignUp] = useState(initialMode === 'signup');

  // Sign in state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});

  // Sign up state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('client');
  const [agreed, setAgreed] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regErrors, setRegErrors] = useState({});

  const demoLogin = (role = 'client') => {
    const user = {
      _id: role === 'admin' ? 'demo_admin' : 'demo_client',
      name: role === 'admin' ? 'Alex Rivera (Recruiter)' : 'Devadithya (Applicant)',
      email: role === 'admin' ? 'admin@interntrack.com' : 'client@interntrack.com',
      role,
      phone: '+94 77 123 4567',
      avatar: role === 'admin'
        ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
        : 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      bio: role === 'admin' ? 'Senior Recruiter' : 'Full Stack Developer',
      resumeLink: 'https://drive.google.com/sample',
      preferredLocation: 'Colombo / Remote',
      token: 'demo_token',
    };
    if (onLoginSuccess) onLoginSuccess(user);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const errs = {};
    if (!loginEmail) errs.email = 'Email is required';
    if (!loginPass) errs.password = 'Password is required';
    if (Object.keys(errs).length) { setLoginErrors(errs); return; }
    setLoginLoading(true);
    setTimeout(() => { setLoginLoading(false); demoLogin('client'); }, 800);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const errs = {};
    if (!regName) errs.name = 'Full name is required';
    if (!regEmail) errs.email = 'Email is required';
    if (!regPass) errs.password = 'Password is required';
    if (regPass !== regConfirm) errs.confirm = 'Passwords do not match';
    if (!agreed) errs.agreed = 'You must agree to Terms';
    if (Object.keys(errs).length) { setRegErrors(errs); return; }
    setRegLoading(true);
    setTimeout(() => { setRegLoading(false); demoLogin(regRole); }, 800);
  };

  return (
    <div className="auth-page">
      {/* Dynamic backgrounds */}
      <div className={`auth-bg-signin ${isSignUp ? 'auth-bg-hidden' : 'auth-bg-visible'}`} />
      <div className={`auth-bg-signup ${isSignUp ? 'auth-bg-visible' : 'auth-bg-hidden'}`} />

      {/* Header */}
      <header className="auth-header">
        <div className="auth-brand" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
          <div className="auth-brand-icon"><Briefcase size={20} /></div>
          <div className="auth-brand-name">Intern<span>Track</span></div>
        </div>
        <div className="auth-header-actions">
          <button className="topbar-icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark'
              ? <Sun size={18} style={{ color: '#fbbf24' }} />
              : <Moon size={18} style={{ color: '#52c4a8' }} />
            }
          </button>
          {onBackToApp && (
            <button className="auth-back-btn" onClick={onBackToApp}>
              <ArrowLeft size={14} /> Back to Website
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="auth-main">
        <div className="auth-card">

          {/* Sign In Form */}
          <div className={`auth-form-panel ${isSignUp ? 'panel-slide-left' : 'panel-visible'}`}
            style={{ visibility: isSignUp ? 'hidden' : 'visible' }}>
            <h2 className="auth-form-title">Sign In</h2>
            <p className="auth-form-subtitle">Welcome back — enter your credentials to continue.</p>

            <form className="auth-form" onSubmit={handleSignIn}>
              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Mail size={15} /></span>
                  <input className={`auth-input ${loginErrors.email ? 'error' : ''}`}
                    type="email" placeholder="dev@example.com"
                    value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                </div>
                {loginErrors.email && <div className="auth-error">{loginErrors.email}</div>}
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={15} /></span>
                  <input className={`auth-input ${loginErrors.password ? 'error' : ''}`}
                    type="password" placeholder="••••••••"
                    value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                </div>
                {loginErrors.password && <div className="auth-error">{loginErrors.password}</div>}
              </div>

              <div className="auth-row-space">
                <label className="auth-checkbox-wrap">
                  <input type="checkbox" className="auth-checkbox" defaultChecked />
                  <span className="auth-checkbox-label">Remember me</span>
                </label>
                <span className="auth-forgot">Forgot password?</span>
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loginLoading}>
                {loginLoading
                  ? <span className="spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
                  : <><span>Sign In to Dashboard</span> <ArrowRight size={16} /></>
                }
              </button>
            </form>

            {/* Demo shortcuts */}
            <div className="auth-demo-box" style={{ marginTop: 14 }}>
              <div className="auth-demo-title">
                <Sparkles size={14} className="sparkle" /> 1-Click Demo:
              </div>
              <div className="auth-demo-grid">
                <button className="auth-demo-btn" onClick={() => demoLogin('client')}>
                  <User size={14} style={{ color: '#52c4a8' }} /> Demo Client
                </button>
                <button className="auth-demo-btn" onClick={() => demoLogin('admin')}>
                  <ShieldCheck size={14} style={{ color: '#34d399' }} /> Demo Admin
                </button>
              </div>
            </div>

            <div className="auth-toggle-text" style={{ marginTop: 14 }}>
              Don't have an account?{' '}
              <button className="auth-toggle-btn" onClick={() => setIsSignUp(true)}>Create Account →</button>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className={`auth-form-panel auth-signup-panel ${isSignUp ? 'panel-visible' : 'panel-hidden'}`}
            style={{ visibility: isSignUp ? 'visible' : 'hidden' }}>
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Join InternTrack to track and automate your applications.</p>

            {/* Google & Social Sign Up Options */}
            <div className="auth-social-grid">
              <button type="button" className="auth-social-btn" onClick={() => demoLogin('client')}>
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"/>
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"/>
                </svg>
                Google
              </button>
              <button type="button" className="auth-social-btn" onClick={() => demoLogin('client')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>

            <div className="auth-divider">
              <span>or sign up with details</span>
            </div>

            <form className="auth-form" onSubmit={handleSignUp}>
              <div className="auth-field">
                <label className="auth-label">Full Name</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><User size={15} /></span>
                  <input className={`auth-input ${regErrors.name ? 'error' : ''}`}
                    type="text" placeholder="Devadithya Perera"
                    value={regName} onChange={e => setRegName(e.target.value)} />
                </div>
                {regErrors.name && <div className="auth-error">{regErrors.name}</div>}
              </div>

              <div className="auth-field">
                <label className="auth-label">Email Address</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Mail size={15} /></span>
                  <input className={`auth-input ${regErrors.email ? 'error' : ''}`}
                    type="email" placeholder="dev@example.com"
                    value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                </div>
                {regErrors.email && <div className="auth-error">{regErrors.email}</div>}
              </div>

              <div className="auth-field">
                <label className="auth-label">Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={15} /></span>
                  <input className={`auth-input ${regErrors.password ? 'error' : ''}`}
                    type="password" placeholder="••••••••"
                    value={regPass} onChange={e => setRegPass(e.target.value)} />
                </div>
                <PasswordStrength password={regPass} />
                {regErrors.password && <div className="auth-error">{regErrors.password}</div>}
              </div>

              <div className="auth-field">
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-wrap">
                  <span className="auth-input-icon"><Lock size={15} /></span>
                  <input className={`auth-input ${regErrors.confirm ? 'error' : ''}`}
                    type="password" placeholder="••••••••"
                    value={regConfirm} onChange={e => setRegConfirm(e.target.value)} />
                </div>
                {regErrors.confirm && <div className="auth-error">{regErrors.confirm}</div>}
              </div>

              <div className="auth-field-row">
                <div className="auth-field">
                  <label className="auth-label">Role</label>
                  <select className="auth-select" value={regRole} onChange={e => setRegRole(e.target.value)}>
                    <option value="client">Client / Job Seeker</option>
                    <option value="admin">Recruiter / Admin</option>
                  </select>
                </div>
                <div className="auth-field">
                  <label className="auth-label">Phone (optional)</label>
                  <div className="auth-input-wrap">
                    <span className="auth-input-icon"><Phone size={14} /></span>
                    <input className="auth-input" type="tel" placeholder="+94 77 123 4567"
                      value={regPhone} onChange={e => setRegPhone(e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <label className="auth-checkbox-wrap">
                  <input type="checkbox" className="auth-checkbox"
                    checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                  <span className="auth-checkbox-label">I agree to Terms &amp; Conditions</span>
                </label>
                {regErrors.agreed && <div className="auth-error">{regErrors.agreed}</div>}
              </div>

              <button type="submit" className="auth-submit-btn" disabled={regLoading}>
                {regLoading
                  ? <span className="spin" style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
                  : <><span>Create Account</span> <ArrowRight size={16} /></>
                }
              </button>
            </form>

            {/* 1-Click Demo Sign Up Options Box */}
            <div className="auth-demo-box" style={{ marginTop: 14 }}>
              <div className="auth-demo-title">
                <Sparkles size={14} className="sparkle" /> 1-Click Quick Sign Up:
              </div>
              <div className="auth-demo-grid">
                <button type="button" className="auth-demo-btn" onClick={() => demoLogin('client')}>
                  <User size={14} style={{ color: '#52c4a8' }} /> Demo Client
                </button>
                <button type="button" className="auth-demo-btn" onClick={() => demoLogin('admin')}>
                  <ShieldCheck size={14} style={{ color: '#34d399' }} /> Demo Admin
                </button>
              </div>
            </div>

            <div className="auth-toggle-text" style={{ marginTop: 12 }}>
              Already have an account?{' '}
              <button className="auth-toggle-btn" onClick={() => setIsSignUp(false)}>Sign In instead →</button>
            </div>
          </div>

          {/* Hero Panel (slides left/right) */}
          <div className={`auth-hero-panel ${isSignUp ? 'hero-left' : 'hero-right'}`}>
            <div>
              <span className="auth-hero-badge">
                {isSignUp ? '✨ Join 10,000+ Candidates' : '🔒 Enterprise Encrypted'}
              </span>
            </div>

            <div>
              <h3 className="auth-hero-title">
                {isSignUp
                  ? 'Start Tracking Your Internship Applications Today.'
                  : 'Automate & Organize Your Tech Career.'}
              </h3>
              <p className="auth-hero-subtitle">
                {isSignUp
                  ? 'Real-time tracking, CSV bulk upload, recruitment analytics, and instant status updates — all in one dashboard.'
                  : 'Stay ahead with customized application pipelines, interview logs, and automated status reminders.'}
              </p>

              <div className="auth-hero-mockup" style={{ marginTop: 20 }}>
                <div className="auth-hero-mockup-header">
                  <span>Live Application Tracker</span>
                  <span className="chip-green">Active</span>
                </div>
                <div className="auth-hero-mockup-row" style={{ marginTop: 8 }}>
                  <span>Google — SWE Intern</span>
                  <span className="chip-amber">Interviewing</span>
                </div>
                <div className="auth-hero-mockup-row" style={{ marginTop: 6 }}>
                  <span>Virtusa — Full Stack</span>
                  <span className="chip-green">Offered</span>
                </div>
              </div>
            </div>

            <div className="auth-hero-switch">
              <span>{isSignUp ? 'Already have an account?' : 'Need an account?'}</span>
              <button className="auth-hero-switch-btn" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>

        </div>
      </main>

      <footer className="auth-footer">© 2026 InternTrack • Enterprise Application Tracking Platform</footer>
    </div>
  );
}
