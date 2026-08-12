import React from 'react';
import {
  X, Briefcase, UserCheck, ShieldCheck, Lock,
  LayoutGrid, Table, BarChart3, Database,
  Plus, Sparkles, Sun, Moon, LogOut, User, LogIn,
} from 'lucide-react';

export default function MobileDrawer({
  isOpen, onClose,
  portalMode, setPortalMode,
  adminViewMode, setAdminViewMode,
  currentUser, theme, toggleTheme,
  onOpenAuthModal, onOpenProfileModal,
  onOpenDataModal, onOpenCreateModal,
  onSeedData, onLogout, totalCount,
}) {
  if (!isOpen) return null;

  const isAdmin = currentUser?.role === 'admin';

  const handleAdminClick = () => {
    if (!currentUser) { onClose(); onOpenAuthModal(); return; }
    if (!isAdmin) { alert('Access Restricted: Admin Console requires Admin privileges.'); return; }
    setPortalMode('admin');
    onClose();
  };

  return (
    <div className="mobile-drawer-overlay">
      <div className="mobile-drawer-backdrop" onClick={onClose} />
      <div className="mobile-drawer-panel">

        {/* Header */}
        <div className="mobile-drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #1a3a35 0%, #0f2420 100%)',
              border: '1px solid rgba(82,196,168,0.45)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              boxShadow: '0 0 16px rgba(82,196,168,0.3)',
            }}>
              <Briefcase size={18} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 15, letterSpacing: '-0.02em' }}>
                InternTrack
                <span style={{
                  fontSize: 8, fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase',
                  background: 'linear-gradient(90deg, #52c4a8, #3a9e88)', color: '#0a1212', padding: '2px 5px', borderRadius: 4,
                }}>PRO</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Application Platform</div>
            </div>
          </div>
          <button className="icon-close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Body */}
        <div className="mobile-drawer-body">

          {/* User card / signin */}
          {currentUser ? (
            <div className="mobile-user-card">
              <img src={currentUser.avatar} alt={currentUser.name} className="mobile-user-avatar" />
              <div>
                <div className="mobile-user-name">{currentUser.name}</div>
                <div className="mobile-user-email">{currentUser.email}</div>
              </div>
            </div>
          ) : (
            <button className="btn-drawer-signin" onClick={() => { onClose(); onOpenAuthModal(); }}>
              <LogIn size={16} /> Sign In to Account
            </button>
          )}

          {/* Workspace */}
          <div>
            <div className="mobile-section-label">Workspace Mode</div>
            <button
              className={`mobile-nav-btn ${portalMode === 'client' ? 'active-client' : ''}`}
              onClick={() => { setPortalMode('client'); onClose(); }}
            >
              <UserCheck size={18} /> Client Portal
            </button>
            <button
              className={`mobile-nav-btn ${portalMode === 'admin' ? 'active-admin' : ''}`}
              onClick={handleAdminClick}
              style={{ justifyContent: 'space-between' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {isAdmin ? <ShieldCheck size={18} /> : <Lock size={16} style={{ color: '#f59e0b' }} />}
                Admin Console
              </span>
              {!isAdmin && (
                <span style={{ fontSize: 10, color: '#f59e0b', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '2px 6px', borderRadius: 4, fontWeight: 700 }}>
                  Lock
                </span>
              )}
            </button>
          </div>

          {/* Admin Subviews */}
          {portalMode === 'admin' && (
            <div>
              <div className="mobile-section-label">Admin Views</div>
              {[
                { key: 'kanban', label: 'Kanban Board', icon: <LayoutGrid size={16} style={{ color: '#818cf8' }} /> },
                { key: 'table',  label: 'Data Table',   icon: <Table size={16} style={{ color: '#34d399' }} /> },
                { key: 'analytics', label: 'Analytics', icon: <BarChart3 size={16} style={{ color: '#fbbf24' }} /> },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  className={`mobile-nav-btn ${adminViewMode === key ? 'active-view' : ''}`}
                  onClick={() => { setAdminViewMode(key); onClose(); }}
                >
                  {icon} {label}
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div>
            <div className="mobile-section-label">Actions & Settings</div>
            <button className="mobile-nav-btn" onClick={() => { onClose(); onOpenCreateModal(); }}>
              <Plus size={16} style={{ color: '#818cf8' }} />
              {portalMode === 'client' ? 'Post Custom Job' : 'New Application'}
            </button>
            <button className="mobile-nav-btn" onClick={() => { onClose(); onOpenDataModal(); }}>
              <Database size={16} style={{ color: '#c4b5fd' }} /> Data Management
            </button>
            {currentUser && (
              <button className="mobile-nav-btn" onClick={() => { onClose(); onOpenProfileModal(); }}>
                <User size={16} style={{ color: '#34d399' }} /> Edit Profile
              </button>
            )}
            <button className="mobile-nav-btn" onClick={toggleTheme}
              style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {theme === 'dark'
                  ? <Sun size={16} style={{ color: '#fbbf24' }} />
                  : <Moon size={16} style={{ color: '#818cf8' }} />
                }
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        {currentUser && (
          <div className="mobile-drawer-footer">
            <button className="btn-drawer-logout" onClick={() => { onClose(); onLogout(); }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
