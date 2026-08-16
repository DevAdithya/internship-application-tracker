import React, { useState } from 'react';
import '../nav.css';
import {
  ArrowLeft, User, Mail, Phone, MapPin, FileText,
  Lock, Save, CheckCircle2, Sparkles, ExternalLink, ShieldCheck, Upload
} from 'lucide-react';

const PRESETS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver',
];

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

export default function ProfileEditPage({ currentUser, onSaveProfile, onBackToApp, showToast }) {
  const [activeTab, setActiveTab] = useState('general');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || PRESETS[0]);
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [resume, setResume] = useState(currentUser?.resumeLink || '');
  const [location, setLocation] = useState(currentUser?.preferredLocation || 'Colombo / Remote');
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        if (showToast) showToast('File size must be under 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        if (showToast) showToast('Photo loaded from device!', 'info');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setErrors({});
    if (activeTab === 'security') {
      const errs = {};
      if (!curPass) errs.curPass = 'Current password is required';
      if (newPass !== confirmPass) errs.confirmPass = 'Passwords do not match';
      if (Object.keys(errs).length) { setErrors(errs); return; }
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      const updated = { name, email, phone, avatar, bio, resumeLink: resume, preferredLocation: location };
      if (onSaveProfile) onSaveProfile(updated);
      if (showToast) showToast('Profile updated successfully!', 'info');
      setTimeout(() => setSaved(false), 3000);
    }, 900);
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header-left">
          <button className="topbar-icon-btn" onClick={onBackToApp} title="Back to Dashboard">
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="profile-header-title">Edit {currentUser?.role === 'admin' ? 'Admin' : 'Client'} Profile</div>
            <div className="profile-header-sub">Manage your personal details, avatar photo, and security settings</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {saved && (
            <span className="profile-saved-badge">
              <CheckCircle2 size={14} /> Saved
            </span>
          )}
          <button className="profile-save-btn" onClick={handleSave} disabled={loading}>
            {loading
              ? <span className="spin" style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
              : <><Save size={14} /> Save Changes</>
            }
          </button>
        </div>
      </header>

      <main className="profile-main">
        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'general' ? 'active-tab-general' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General Profile
          </button>
          <button
            className={`profile-tab ${activeTab === 'security' ? 'active-tab-security' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            Security &amp; Password
          </button>
        </div>

        {/* General Tab */}
        {activeTab === 'general' && (
          <>
            {/* Avatar Card */}
            <div className="profile-card">
              <div className="profile-card-title">
                <Sparkles size={16} style={{ color: '#52c4a8' }} /> Profile Avatar
              </div>
              <div className="avatar-picker">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <img src={avatar} alt="Current avatar" className="avatar-preview" />
                  <label style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 14px', borderRadius: 'var(--radius-sm)',
                    background: 'rgba(82,196,168,0.15)', border: '1px solid rgba(82,196,168,0.35)',
                    color: '#52c4a8', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    <Upload size={14} /> Upload Photo from Device
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileUpload} />
                  </label>
                </div>

                <div className="avatar-grid-section">
                  <div className="avatar-grid-label">Choose a preset avatar:</div>
                  <div className="avatar-grid">
                    {PRESETS.map((url, i) => (
                      <button
                        key={i}
                        className={`avatar-option ${avatar === url ? 'selected' : ''}`}
                        onClick={() => setAvatar(url)}
                        type="button"
                      >
                        <img src={url} alt={`Preset ${i+1}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info Card */}
            <div className="profile-card">
              <div className="profile-card-title">
                <User size={16} style={{ color: '#818cf8' }} /> Personal Information
              </div>
              <div className="profile-form-grid">
                <div className="form-field">
                  <label className="form-label">Full Name</label>
                  <div className="form-input-wrap">
                    <span className="form-input-icon"><User size={15} /></span>
                    <input className="form-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Email Address</label>
                  <div className="form-input-wrap">
                    <span className="form-input-icon"><Mail size={15} /></span>
                    <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Phone Number</label>
                  <div className="form-input-wrap">
                    <span className="form-input-icon"><Phone size={15} /></span>
                    <input className="form-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+94 77 123 4567" />
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Preferred Job Location</label>
                  <div className="form-input-wrap">
                    <span className="form-input-icon"><MapPin size={15} /></span>
                    <input className="form-input" type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Colombo / Remote" />
                  </div>
                </div>

                <div className="form-field full-width">
                  <label className="form-label">Professional Bio / Summary</label>
                  <textarea className="form-textarea" value={bio} onChange={e => setBio(e.target.value)}
                    placeholder="Share your background, skills, or target roles..." rows={3} />
                </div>

                <div className="form-field full-width">
                  <label className="form-label">Resume / Portfolio Link</label>
                  <div className="form-input-with-action">
                    <div className="form-input-wrap">
                      <span className="form-input-icon"><FileText size={15} /></span>
                      <input className="form-input" type="url" value={resume} onChange={e => setResume(e.target.value)}
                        placeholder="https://drive.google.com/..." />
                    </div>
                    {resume && (
                      <a href={resume} target="_blank" rel="noreferrer" className="form-action-link" title="Open resume">
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="profile-card" style={{ maxWidth: 500 }}>
            <div className="profile-card-title">
              <Lock size={16} style={{ color: '#c4b5fd' }} /> Change Password
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-field">
                <label className="form-label">Current Password</label>
                <div className="form-input-wrap">
                  <span className="form-input-icon"><Lock size={15} /></span>
                  <input className={`form-input ${errors.curPass ? 'error' : ''}`}
                    type="password" placeholder="••••••••"
                    value={curPass} onChange={e => setCurPass(e.target.value)} />
                </div>
                {errors.curPass && <div className="form-error">{errors.curPass}</div>}
              </div>

              <div className="form-field">
                <label className="form-label">New Password</label>
                <div className="form-input-wrap">
                  <span className="form-input-icon"><Lock size={15} /></span>
                  <input className="form-input"
                    type="password" placeholder="••••••••"
                    value={newPass} onChange={e => setNewPass(e.target.value)} />
                </div>
                <PasswordStrength password={newPass} />
              </div>

              <div className="form-field">
                <label className="form-label">Confirm New Password</label>
                <div className="form-input-wrap">
                  <span className="form-input-icon"><Lock size={15} /></span>
                  <input className={`form-input ${errors.confirmPass ? 'error' : ''}`}
                    type="password" placeholder="••••••••"
                    value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
                </div>
                {errors.confirmPass && <div className="form-error">{errors.confirmPass}</div>}
              </div>

              <button type="submit" className="profile-save-btn" disabled={loading} style={{ width: 'auto', alignSelf: 'flex-start' }}>
                {loading
                  ? <span className="spin" style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block' }} />
                  : <><ShieldCheck size={14} /> Update Password</>
                }
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
