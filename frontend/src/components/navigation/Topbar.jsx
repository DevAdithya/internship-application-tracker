import React, { useState, useEffect } from 'react';
import {
  Search,
  X,
  Sun,
  Moon,
  Plus,
  Sparkles,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

export default function Topbar({
  portalMode,
  setPortalMode,
  adminViewMode,
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onLogout,
  onOpenCreateModal,
  onOpenDataModal,
  onSeedData,
  totalCount,
  isSidebarCollapsed,
  setIsSidebarCollapsed,
  onOpenMobileDrawer,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K for search focus)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('topbar-search-input');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[var(--bg-surface)] backdrop-blur-xl border-b border-[var(--border-color)] px-4 sm:px-6 flex items-center justify-between gap-4 transition-all duration-300">
      {/* Left Section: Controls & Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        <button
          onClick={onOpenMobileDrawer}
          className="lg:hidden p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-colors focus:outline-none"
          title="Open Menu"
        >
          <Menu size={20} />
        </button>

        {/* Sidebar Collapse Toggle Button (Desktop) */}
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="hidden lg:flex p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-colors focus:outline-none"
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isSidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Breadcrumbs Navigation */}
        <Breadcrumbs portalMode={portalMode} adminViewMode={adminViewMode} />
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-1 max-w-md mx-2 sm:mx-4">
        <div
          className={`relative flex items-center w-full rounded-xl bg-white/[0.04] border transition-all duration-200 ${
            isSearchFocused
              ? 'border-indigo-500/60 ring-2 ring-indigo-500/20 bg-white/[0.07] shadow-lg shadow-indigo-500/5'
              : 'border-[var(--border-color)] hover:border-white/20'
          }`}
        >
          <Search size={16} className="absolute left-3 text-[var(--text-subtle)] pointer-events-none" />
          <input
            id="topbar-search-input"
            type="text"
            placeholder={portalMode === 'client' ? 'Search job openings, companies...' : 'Search applicants, roles...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full h-9 pl-9 pr-14 bg-transparent text-xs sm:text-sm text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none"
          />

          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-0.5 rounded-full text-[var(--text-subtle)] hover:text-[var(--text-main)] transition-colors"
            >
              <X size={14} />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex absolute right-2.5 items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-subtle)] bg-white/[0.06] border border-[var(--border-color)] rounded-md pointer-events-none">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Right Section: Actions & User Dropdown */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Notification Bell */}
        <NotificationDropdown />

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-all duration-200 focus:outline-none"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-amber-400 hover:rotate-45 transition-transform duration-300" />
          ) : (
            <Moon size={18} className="text-indigo-400 hover:-rotate-12 transition-transform duration-300" />
          )}
        </button>

        {/* Demo Data Seed (if 0 items) */}
        {totalCount === 0 && (
          <button
            onClick={onSeedData}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 text-xs font-semibold transition-all duration-200"
            title="Load realistic sample data"
          >
            <Sparkles size={14} />
            <span>Demo Data</span>
          </button>
        )}

        {/* Create Application / Custom Job Button */}
        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 active:scale-95"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">
            {portalMode === 'client' ? 'Post Custom Job' : 'New Application'}
          </span>
        </button>

        {/* User Profile Dropdown */}
        <UserDropdown
          currentUser={currentUser}
          portalMode={portalMode}
          setPortalMode={setPortalMode}
          onOpenAuthModal={onOpenAuthModal}
          onOpenProfileModal={onOpenProfileModal}
          onOpenDataModal={onOpenDataModal}
          onLogout={onLogout}
        />
      </div>
    </header>
  );
}
