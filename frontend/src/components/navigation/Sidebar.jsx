import React from 'react';
import {
  Briefcase, UserCheck, ShieldCheck, Lock,
  LayoutGrid, Table, BarChart3, Database,
  Sparkles, Plus, LogOut,
} from 'lucide-react';

export default function Sidebar({
  portalMode, setPortalMode,
  adminViewMode, setAdminViewMode,
  currentUser,
  onOpenAuthModal, onOpenProfileModal,
  onOpenDataModal, onOpenCreateModal,
  onSeedData, onLogout,
  totalCount, isCollapsed, setIsCollapsed,
}) {
  const isAdmin = currentUser?.role === 'admin';

  const handleAdminClick = () => {
    if (!currentUser) { onOpenAuthModal(); return; }
    if (!isAdmin) { alert('Access Restricted: Admin Console requires Admin privileges.'); return; }
    setPortalMode('admin');
  };

  return (
    <aside className={`nav-sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-icon">
          <Briefcase size={20} />
        </div>
        {!isCollapsed && (
          <div className="sidebar-brand-text">
            <div className="sidebar-brand-name">
              InternTrack
              <span className="sidebar-brand-tag">PRO</span>
            </div>
            <div className="sidebar-brand-sub">Enterprise Pipeline</div>
          </div>
        )}
      </div>

      {/* Navigation Body */}
      <div className="sidebar-body">

        {/* Workspace Section */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Workspace Mode</div>

          {/* Client Portal */}
          <button
            className={`sidebar-nav-btn ${portalMode === 'client' ? 'active-client' : ''}`}
            onClick={() => setPortalMode('client')}
          >
            <span className="btn-icon"><UserCheck size={18} style={{ color: portalMode === 'client' ? '#818cf8' : undefined }} /></span>
            <span className="btn-label">Client Portal</span>
            <span className="sidebar-tooltip">Client Portal</span>
          </button>

          {/* Admin Console */}
          <button
            className={`sidebar-nav-btn ${portalMode === 'admin' ? 'active-admin' : ''}`}
            onClick={handleAdminClick}
          >
            <span className="btn-icon">
              {isAdmin
                ? <ShieldCheck size={18} style={{ color: portalMode === 'admin' ? '#c4b5fd' : undefined }} />
                : <Lock size={16} style={{ color: '#f59e0b' }} />
              }
            </span>
            <span className="btn-label">Admin Console</span>
            {!isAdmin && <span className="btn-badge">Lock</span>}
            <span className="sidebar-tooltip">{isAdmin ? 'Admin Console' : 'Admin (Restricted)'}</span>
          </button>
        </div>

        {/* Admin Views */}
        {portalMode === 'admin' && (
          <div className="sidebar-section">
            <div className="sidebar-section-label">Admin Views</div>

            <button
              className={`sidebar-nav-btn ${adminViewMode === 'kanban' ? 'active-view' : ''}`}
              onClick={() => setAdminViewMode('kanban')}
            >
              <span className="btn-icon"><LayoutGrid size={16} style={{ color: '#818cf8' }} /></span>
              <span className="btn-label">Kanban Board</span>
              <span className="sidebar-tooltip">Kanban Board</span>
            </button>

            <button
              className={`sidebar-nav-btn ${adminViewMode === 'table' ? 'active-view' : ''}`}
              onClick={() => setAdminViewMode('table')}
            >
              <span className="btn-icon"><Table size={16} style={{ color: '#34d399' }} /></span>
              <span className="btn-label">Data Table</span>
              <span className="sidebar-tooltip">Data Table</span>
            </button>

            <button
              className={`sidebar-nav-btn ${adminViewMode === 'analytics' ? 'active-view' : ''}`}
              onClick={() => setAdminViewMode('analytics')}
            >
              <span className="btn-icon"><BarChart3 size={16} style={{ color: '#fbbf24' }} /></span>
              <span className="btn-label">Analytics</span>
              <span className="sidebar-tooltip">Analytics</span>
            </button>
          </div>
        )}

        {/* Tools & Storage */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Tools & Storage</div>

          <button className="sidebar-nav-btn" onClick={onOpenCreateModal}>
            <span className="btn-icon"><Plus size={16} style={{ color: '#818cf8' }} /></span>
            <span className="btn-label">{portalMode === 'client' ? 'Post Custom Job' : 'New Application'}</span>
            <span className="sidebar-tooltip">New Application</span>
          </button>

          <button className="sidebar-nav-btn" onClick={onOpenDataModal}>
            <span className="btn-icon"><Database size={16} style={{ color: '#c4b5fd' }} /></span>
            <span className="btn-label">Data Backup & Import</span>
            <span className="sidebar-tooltip">Data Management</span>
          </button>

          {totalCount === 0 && (
            <button className="sidebar-nav-btn" onClick={onSeedData}
              style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
              <span className="btn-icon"><Sparkles size={15} className="pulse" /></span>
              <span className="btn-label">Seed Sample Data</span>
              <span className="sidebar-tooltip">Seed Demo Data</span>
            </button>
          )}
        </div>
      </div>

      {/* User Footer */}
      {currentUser && (
        <div className="sidebar-footer">
          <div className="sidebar-user-card" onClick={onOpenProfileModal}>
            <img src={currentUser.avatar} alt={currentUser.name} className="sidebar-user-avatar" />
            {!isCollapsed && (
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{currentUser.name}</div>
                <div className="sidebar-user-role">{currentUser.role === 'admin' ? 'Recruiter' : 'Applicant'}</div>
              </div>
            )}
            {!isCollapsed && (
              <button
                className="sidebar-logout-btn"
                onClick={(e) => { e.stopPropagation(); onLogout(); }}
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
