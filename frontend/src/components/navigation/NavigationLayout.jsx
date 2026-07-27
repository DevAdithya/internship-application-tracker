import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import MobileDrawer from './MobileDrawer';

export default function NavigationLayout({
  portalMode,
  setPortalMode,
  adminViewMode,
  setAdminViewMode,
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
  children,
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-main)] flex flex-col font-sans transition-colors duration-200">
      {/* Desktop & Tablet Sidebar */}
      <Sidebar
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        adminViewMode={adminViewMode}
        setAdminViewMode={setAdminViewMode}
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

      {/* Mobile Drawer Navigation */}
      <MobileDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        adminViewMode={adminViewMode}
        setAdminViewMode={setAdminViewMode}
        currentUser={currentUser}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenAuthModal={onOpenAuthModal}
        onOpenProfileModal={onOpenProfileModal}
        onOpenDataModal={onOpenDataModal}
        onOpenCreateModal={onOpenCreateModal}
        onSeedData={onSeedData}
        onLogout={onLogout}
        totalCount={totalCount}
      />

      {/* Main Wrapper with Sidebar Offset */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Topbar Header */}
        <Topbar
          portalMode={portalMode}
          setPortalMode={setPortalMode}
          adminViewMode={adminViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
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

        {/* Dashboard Main Content Area (Untouched!) */}
        <div className="flex-1 w-full max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
