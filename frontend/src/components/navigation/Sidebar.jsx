import React from 'react';
import {
  Briefcase,
  ShieldCheck,
  UserCheck,
  Lock,
  LayoutGrid,
  Table,
  BarChart3,
  Database,
  Sparkles,
  Plus,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
} from 'lucide-react';

export default function Sidebar({
  portalMode,
  setPortalMode,
  adminViewMode,
  setAdminViewMode,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenDataModal,
  onOpenCreateModal,
  onSeedData,
  onLogout,
  totalCount,
  isCollapsed,
  setIsCollapsed,
}) {
  const isAdmin = currentUser && currentUser.role === 'admin';

  const handleAdminToggleClick = () => {
    if (!currentUser) {
      onOpenAuthModal();
    } else if (!isAdmin) {
      alert('Access Restricted: Admin Console requires an Account with Admin privileges. Please sign in with an Admin account.');
    } else {
      setPortalMode('admin');
    }
  };

  return (
    <aside
      className={`hidden lg:flex flex-col fixed top-0 left-0 bottom-0 z-40 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)] shrink-0">
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0">
            <Briefcase size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-[var(--text-main)] tracking-tight truncate">
                  InternTrack
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded-md tracking-wider">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)] truncate">Application Platform</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Body */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {/* Section 1: Portal Mode Switcher */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              Select Workspace
            </div>
          )}
          <div className={`space-y-1.5 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            {/* Client Portal Button */}
            <button
              onClick={() => setPortalMode('client')}
              title={isCollapsed ? 'Client Portal' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                portalMode === 'client'
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 shadow-sm shadow-indigo-500/10'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]'
              } ${isCollapsed ? 'justify-center w-10 h-10 p-0' : ''}`}
            >
              <UserCheck size={18} className={portalMode === 'client' ? 'text-indigo-400' : ''} />
              {!isCollapsed && <span className="truncate">Client Portal</span>}
            </button>

            {/* Admin Console Button */}
            <button
              onClick={handleAdminToggleClick}
              title={isCollapsed ? (!isAdmin ? 'Admin Console (Restricted)' : 'Admin Console') : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-200 ${
                portalMode === 'admin'
                  ? 'bg-violet-600/15 text-violet-400 border border-violet-500/30 shadow-sm shadow-violet-500/10'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]'
              } ${isCollapsed ? 'justify-center w-10 h-10 p-0' : ''}`}
            >
              {isAdmin ? (
                <ShieldCheck size={18} className={portalMode === 'admin' ? 'text-violet-400' : ''} />
              ) : (
                <Lock size={16} className="text-amber-400" />
              )}
              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between min-w-0">
                  <span className="truncate">Admin Console</span>
                  {!isAdmin && (
                    <span className="text-[9px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                      Lock
                    </span>
                  )}
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Section 2: Admin Views (if admin active) */}
        {portalMode === 'admin' && (
          <div>
            {!isCollapsed && (
              <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                Admin Views
              </div>
            )}
            <div className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
              <button
                onClick={() => setAdminViewMode('kanban')}
                title={isCollapsed ? 'Kanban Board' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  adminViewMode === 'kanban'
                    ? 'bg-white/[0.08] text-[var(--text-main)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]'
                } ${isCollapsed ? 'justify-center w-10 h-10 p-0' : ''}`}
              >
                <LayoutGrid size={16} className="text-indigo-400" />
                {!isCollapsed && <span>Kanban Board</span>}
              </button>

              <button
                onClick={() => setAdminViewMode('table')}
                title={isCollapsed ? 'Data Table' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  adminViewMode === 'table'
                    ? 'bg-white/[0.08] text-[var(--text-main)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]'
                } ${isCollapsed ? 'justify-center w-10 h-10 p-0' : ''}`}
              >
                <Table size={16} className="text-emerald-400" />
                {!isCollapsed && <span>Data Table</span>}
              </button>

              <button
                onClick={() => setAdminViewMode('analytics')}
                title={isCollapsed ? 'Analytics' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  adminViewMode === 'analytics'
                    ? 'bg-white/[0.08] text-[var(--text-main)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]'
                } ${isCollapsed ? 'justify-center w-10 h-10 p-0' : ''}`}
              >
                <BarChart3 size={16} className="text-amber-400" />
                {!isCollapsed && <span>Analytics</span>}
              </button>
            </div>
          </div>
        )}

        {/* Section 3: Tools & Data Management */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              Tools & Storage
            </div>
          )}
          <div className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
            <button
              onClick={onOpenCreateModal}
              title={isCollapsed ? 'New Application' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04] transition-all ${
                isCollapsed ? 'justify-center w-10 h-10 p-0' : ''
              }`}
            >
              <Plus size={16} className="text-indigo-400" />
              {!isCollapsed && <span>{portalMode === 'client' ? 'Post Custom Job' : 'New Application'}</span>}
            </button>

            <button
              onClick={onOpenDataModal}
              title={isCollapsed ? 'Data Management' : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04] transition-all ${
                isCollapsed ? 'justify-center w-10 h-10 p-0' : ''
              }`}
            >
              <Database size={16} className="text-violet-400" />
              {!isCollapsed && <span>Data Backup & Import</span>}
            </button>

            {totalCount === 0 && (
              <button
                onClick={onSeedData}
                title={isCollapsed ? 'Load Demo Data' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 transition-all ${
                  isCollapsed ? 'justify-center w-10 h-10 p-0' : ''
                }`}
              >
                <Sparkles size={16} />
                {!isCollapsed && <span>Seed Sample Data</span>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* User Footer Snippet */}
      {currentUser && (
        <div className="p-3 border-t border-[var(--border-color)] bg-white/[0.01]">
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/[0.03] border border-[var(--border-color)]">
              <div
                onClick={onOpenProfileModal}
                className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover border border-indigo-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[var(--text-main)] truncate">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] truncate">
                    {currentUser.role === 'admin' ? 'Recruiter' : 'Client'}
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-[var(--text-subtle)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                onClick={onOpenProfileModal}
                className="w-8 h-8 rounded-lg object-cover border border-indigo-500/30 cursor-pointer"
                title={currentUser.name}
              />
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
