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
        <div className="auth-brand">
          <div className="auth-brand-icon"><Briefcase size={20} /></div>
          <div className="auth-brand-name">InternTrack</div>
          <span className="auth-brand-badge">PRO</span>
        </div>
        <div className="auth-header-actions">
          <button className="topbar-icon-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark'
              ? <Sun size={18} style={{ color: '#fbbf24' }} />
              : <Moon size={18} style={{ color: '#818cf8' }} />
            }
          </button>
          {onBackToApp && (
            <button className="auth-back-btn" onClick={onBackToApp}>
              <ArrowLeft size={14} /> Back to App
            </button>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="auth-main">
        <div className="auth-card">

          {/* Sign In Form */}
          <div className={`auth-form-panel ${isSignUp ? 'panel-slide-left' : 'panel-visible'}`}
            style={{ display: isSignUp ? 'none' : 'flex' }}>
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
                  <User size={14} style={{ color: '#818cf8' }} /> Demo Client
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
          <div className={`auth-form-panel ${isSignUp ? 'panel-visible' : 'panel-hidden'}`}
            style={{ display: isSignUp ? 'flex' : 'none' }}>
            <h2 className="auth-form-title">Create Account</h2>
            <p className="auth-form-subtitle">Join InternTrack to track and automate your applications.</p>

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

      <footer className="auth-footer">© 2026 InternTrack PRO • Enterprise Application Tracking Platform</footer>
    </div>
  );
}
