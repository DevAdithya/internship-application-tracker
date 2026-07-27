import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, LogOut, ShieldCheck, Lock, Database, ChevronDown } from 'lucide-react';

export default function UserDropdown({
  currentUser, portalMode, setPortalMode,
  onOpenAuthModal, onOpenProfileModal, onOpenDataModal, onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const close = () => setIsOpen(false);

  const handleAdminToggle = () => {
    close();
    if (!isAdmin) { alert('Access Restricted: Admin Console requires Admin privileges.'); return; }
    setPortalMode(portalMode === 'admin' ? 'client' : 'admin');
  };

  if (!currentUser) {
    return (
      <button className="btn-signin" onClick={onOpenAuthModal}>
        <LogIn size={15} /> Sign In
      </button>
    );
  }

  return (
    <div className="nav-dropdown-wrapper" ref={ref}>
      <button className="user-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src={currentUser.avatar} alt={currentUser.name} className="user-trigger-avatar" />
        <div className="user-trigger-info" style={{ display: 'none' }} id="user-info-desktop">
          <div className="user-trigger-name">{currentUser.name}</div>
          <div className="user-trigger-role">{currentUser.role === 'admin' ? 'Recruiter Admin' : 'Client'}</div>
        </div>
        <ChevronDown size={14} className={`user-trigger-chevron ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className="nav-dropdown-panel user-dropdown-panel">
          {/* User info header */}
          <div className="user-profile-header">
            <img src={currentUser.avatar} alt={currentUser.name} className="user-profile-avatar" />
            <div>
              <div className="user-profile-name">{currentUser.name}</div>
              <div className="user-profile-email">{currentUser.email}</div>
              <span className="user-role-badge">{currentUser.role}</span>
            </div>
          </div>

          {/* Menu items */}
          <div className="dropdown-menu-list">
            <button className="dropdown-menu-item" onClick={() => { close(); onOpenProfileModal(); }}>
              <span className="item-icon"><User size={15} style={{ color: '#818cf8' }} /></span>
              Edit Profile
            </button>

            <button className="dropdown-menu-item" onClick={handleAdminToggle}>
              <span className="item-icon">
                {isAdmin
                  ? <ShieldCheck size={15} style={{ color: '#34d399' }} />
                  : <Lock size={15} style={{ color: '#f59e0b' }} />
                }
              </span>
              {portalMode === 'admin' ? 'Switch to Client Portal' : 'Switch to Admin Console'}
              {!isAdmin && <span className="item-locked">Locked</span>}
            </button>

            <button className="dropdown-menu-item" onClick={() => { close(); onOpenDataModal(); }}>
              <span className="item-icon"><Database size={15} style={{ color: '#c4b5fd' }} /></span>
              Data Management
            </button>
          </div>

          <div className="dropdown-divider" />

          <div className="dropdown-menu-list" style={{ paddingTop: 0 }}>
            <button className="dropdown-menu-item danger" onClick={() => { close(); onLogout(); }}>
              <span className="item-icon"><LogOut size={15} /></span>
              Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Show user info on desktop */}
      <style>{`
        @media (min-width: 640px) {
          #user-info-desktop { display: block !important; }
        }
      `}</style>
    </div>
  );
}
