import React, { useState, useRef, useEffect } from 'react';
import {
  Search, X, Sun, Moon, Plus, Sparkles,
  Menu, PanelLeftClose, PanelLeftOpen,
} from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import NotificationDropdown from './NotificationDropdown';
import UserDropdown from './UserDropdown';

export default function Topbar({
  portalMode, setPortalMode, adminViewMode,
  searchQuery, setSearchQuery,
  theme, toggleTheme,
  currentUser,
  onOpenAuthModal, onOpenProfileModal, onLogout,
  onOpenCreateModal, onOpenDataModal, onSeedData,
  totalCount,
  isSidebarCollapsed, setIsSidebarCollapsed,
  onOpenMobileDrawer,
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="nav-topbar">
      {/* Left: mobile menu + collapse + breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {/* Mobile hamburger */}
        <button className="topbar-icon-btn" onClick={onOpenMobileDrawer}
          style={{ display: 'none' }} id="mobile-menu-btn" title="Open Menu">
          <Menu size={20} />
        </button>

        {/* Sidebar collapse toggle (desktop) */}
        <button
          className="topbar-icon-btn"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          style={{ display: 'none' }}
          id="sidebar-toggle-btn"
        >
          {isSidebarCollapsed
            ? <PanelLeftOpen size={18} />
            : <PanelLeftClose size={18} />
          }
        </button>

        <Breadcrumbs portalMode={portalMode} adminViewMode={adminViewMode} />
      </div>

      {/* Center: Search */}
      <div className="topbar-search">
        <span className={`topbar-search-icon ${isSearchFocused ? 'topbar-search-icon-focused' : ''}`}>
          <Search size={15} />
        </span>
        <input
          ref={searchRef}
          className="topbar-search-input"
          type="text"
          placeholder={portalMode === 'client' ? 'Search companies, roles…' : 'Search applicants, roles…'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
        />
        {searchQuery
          ? <button className="topbar-search-clear" onClick={() => setSearchQuery('')}><X size={13} /></button>
          : <span className="topbar-search-kbd">⌘K</span>
        }
      </div>

      {/* Right: actions */}
      <div className="topbar-right">
        <NotificationDropdown />

        {/* Theme toggle */}
        <button className="topbar-icon-btn" onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
          {theme === 'dark'
            ? <Sun size={18} className="icon-sun" style={{ color: '#fbbf24' }} />
            : <Moon size={18} className="icon-moon" style={{ color: '#818cf8' }} />
          }
        </button>

        {/* Demo seed */}
        {totalCount === 0 && (
          <button className="btn-seed" onClick={onSeedData} title="Load sample data">
            <Sparkles size={14} style={{ animation: 'pulse 2s infinite' }} />
            <span style={{ display: 'none' }} id="seed-label">Demo Data</span>
          </button>
        )}

        {/* CTA Button */}
        <button className="btn-cta" onClick={onOpenCreateModal}>
          <Plus size={16} />
          <span id="cta-label">
            {portalMode === 'client' ? 'Post Job' : 'New App'}
          </span>
        </button>

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

      {/* Responsive toggle: show mobile button & hide sidebar toggle on small screens */}
      <style>{`
        @media (max-width: 1023px) {
          #mobile-menu-btn { display: flex !important; }
          #sidebar-toggle-btn { display: none !important; }
        }
        @media (min-width: 1024px) {
          #mobile-menu-btn { display: none !important; }
          #sidebar-toggle-btn { display: flex !important; }
          #seed-label { display: inline !important; }
          #cta-label { display: inline !important; }
        }
      `}</style>
    </header>
  );
}
