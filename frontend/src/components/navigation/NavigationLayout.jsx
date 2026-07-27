import React, { useState } from 'react';
import '../../nav.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileDrawer from './MobileDrawer';

export default function NavigationLayout({
  portalMode, setPortalMode,
  adminViewMode, setAdminViewMode,
  searchQuery, setSearchQuery,
  theme, toggleTheme,
  currentUser,
  onOpenAuthModal, onOpenProfileModal, onLogout,
  onOpenCreateModal, onOpenDataModal, onSeedData,
  totalCount, children,
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="nav-shell">
      {/* Desktop Sidebar */}
      <Sidebar
        portalMode={portalMode} setPortalMode={setPortalMode}
        adminViewMode={adminViewMode} setAdminViewMode={setAdminViewMode}
        currentUser={currentUser}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenDataModal={onOpenDataModal}
        onOpenCreateModal={onOpenCreateModal}
        onSeedData={onSeedData}
        onLogout={onLogout}
        totalCount={totalCount}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        portalMode={portalMode} setPortalMode={setPortalMode}
        adminViewMode={adminViewMode} setAdminViewMode={setAdminViewMode}
        currentUser={currentUser}
        theme={theme} toggleTheme={toggleTheme}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenDataModal={onOpenDataModal}
        onOpenCreateModal={onOpenCreateModal}
        onSeedData={onSeedData}
        onLogout={onLogout}
        totalCount={totalCount}
      />

      {/* Main area shifts right based on sidebar width */}
      <div className={`nav-main-area ${isSidebarCollapsed ? 'sidebar-closed' : 'sidebar-open'}`}>
        <Topbar
          portalMode={portalMode} setPortalMode={setPortalMode}
          adminViewMode={adminViewMode}
          searchQuery={searchQuery} setSearchQuery={setSearchQuery}
          theme={theme} toggleTheme={toggleTheme}
          currentUser={currentUser}
          onOpenAuthModal={onOpenAuthModal}
          onOpenProfileModal={onOpenProfileModal}
          onLogout={onLogout}
          onOpenCreateModal={onOpenCreateModal}
          onOpenDataModal={onOpenDataModal}
          onSeedData={onSeedData}
          totalCount={totalCount}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
          onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)}
        />

        <div className="nav-page-content">
          {children}
        </div>
      </div>
    </div>
  );
}
