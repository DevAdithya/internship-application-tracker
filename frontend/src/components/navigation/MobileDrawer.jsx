import React from 'react';
import {
  X,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Lock,
  LayoutGrid,
  Table,
  BarChart3,
  Database,
  Plus,
  Sparkles,
  Sun,
  Moon,
  LogOut,
  User,
  LogIn,
} from 'lucide-react';

export default function MobileDrawer({
  isOpen,
  onClose,
  portalMode,
  setPortalMode,
  adminViewMode,
  setAdminViewMode,
  currentUser,
  theme,
  toggleTheme,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenDataModal,
  onOpenCreateModal,
  onSeedData,
  onLogout,
  totalCount,
}) {
  if (!isOpen) return null;

  const isAdmin = currentUser && currentUser.role === 'admin';

  const handleAdminToggleClick = () => {
    if (!currentUser) {
      onClose();
      onOpenAuthModal();
    } else if (!isAdmin) {
      alert('Access Restricted: Admin Console requires an Account with Admin privileges.');
    } else {
      setPortalMode('admin');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-[var(--bg-secondary)] border-r border-[var(--border-color)] shadow-2xl flex flex-col z-50 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[var(--border-color)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <Briefcase size={20} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base text-[var(--text-main)]">InternTrack</span>
                <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase bg-gradient-to-r from-indigo-500 to-violet-500 text-white rounded">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">Application Platform</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06]"
          >
            <X size={20} />
          </button>
        </div>

        {/* User Card Header */}
        <div className="p-4 border-b border-[var(--border-color)] bg-white/[0.02]">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover border border-indigo-500/30 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs text-[var(--text-main)] truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] truncate">
                  {currentUser.email}
                </div>
                <span className="inline-block mt-1 px-1.5 py-0.2 text-[9px] font-bold uppercase bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded">
                  {currentUser.role}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
            >
              <LogIn size={16} />
              <span>Sign In to Account</span>
            </button>
          )}
        </div>

        {/* Nav Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Workspace Switcher */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              Workspace Mode
            </div>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setPortalMode('client');
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  portalMode === 'client'
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                    : 'text-[var(--text-muted)] hover:bg-white/[0.04]'
                }`}
              >
                <UserCheck size={18} />
                <span>Client Portal</span>
              </button>

              <button
                onClick={handleAdminToggleClick}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  portalMode === 'admin'
                    ? 'bg-violet-600/15 text-violet-400 border border-violet-500/30'
                    : 'text-[var(--text-muted)] hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isAdmin ? <ShieldCheck size={18} /> : <Lock size={16} className="text-amber-400" />}
                  <span>Admin Console</span>
                </div>
                {!isAdmin && (
                  <span className="text-[9px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                    Lock
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Admin Subviews */}
          {portalMode === 'admin' && (
            <div>
              <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                Admin Views
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setAdminViewMode('kanban');
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium ${
                    adminViewMode === 'kanban' ? 'bg-white/[0.08] text-[var(--text-main)] font-semibold' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <LayoutGrid size={16} className="text-indigo-400" />
                  <span>Kanban Board</span>
                </button>

                <button
                  onClick={() => {
                    setAdminViewMode('table');
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium ${
                    adminViewMode === 'table' ? 'bg-white/[0.08] text-[var(--text-main)] font-semibold' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <Table size={16} className="text-emerald-400" />
                  <span>Data Table</span>
                </button>

                <button
                  onClick={() => {
                    setAdminViewMode('analytics');
                    onClose();
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium ${
                    adminViewMode === 'analytics' ? 'bg-white/[0.08] text-[var(--text-main)] font-semibold' : 'text-[var(--text-muted)]'
                  }`}
                >
                  <BarChart3 size={16} className="text-amber-400" />
                  <span>Analytics</span>
                </button>
              </div>
            </div>
          )}

          {/* Tools & Actions */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">
              Actions & Settings
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  onClose();
                  onOpenCreateModal();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]"
              >
                <Plus size={16} className="text-indigo-400" />
                <span>{portalMode === 'client' ? 'Post Custom Job' : 'New Application'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onOpenDataModal();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]"
              >
                <Database size={16} className="text-violet-400" />
                <span>Data Management</span>
              </button>

              {currentUser && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenProfileModal();
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]"
                >
                  <User size={16} className="text-emerald-400" />
                  <span>Edit Profile</span>
                </button>
              )}

              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-indigo-400" />}
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        {currentUser && (
          <div className="p-4 border-t border-[var(--border-color)] bg-white/[0.01]">
            <button
              onClick={() => {
                onClose();
                onLogout();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
            >
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
