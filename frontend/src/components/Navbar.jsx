import React from "react";
import { 
  Briefcase, 
  ShieldCheck, 
  UserCheck, 
  Search, 
  Sun, 
  Moon, 
  Plus, 
  Sparkles, 
  Database,
  LogIn,
  LogOut,
  User,
  Lock
} from "lucide-react";

export default function Navbar({
  portalMode,
  setPortalMode,
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
  totalCount
}) {
  const isAdmin = currentUser && currentUser.role === "admin";

  const handleAdminToggleClick = () => {
    if (!currentUser) {
      onOpenAuthModal();
    } else if (!isAdmin) {
      alert("Access Restricted: Admin Console requires an Account with Admin privileges. Please sign in with an Admin account.");
    } else {
      setPortalMode("admin");
    }
  };

  return (
    <header className="navbar-container glass-panel">
      <div className="navbar-left">
        <div className="logo-group">
          <div className="logo-icon-wrapper">
            <Briefcase className="logo-icon" />
          </div>
          <div>
            <div className="logo-title-row">
              <span className="logo-title">Intern<span style={{ color: '#52c4a8' }}>Track</span></span>
            </div>
            <span className="logo-sub">Full-Stack Application Platform</span>
          </div>
        </div>

        {/* Portal Switcher Pill */}
        <div className="portal-switcher-pill glass-card">
          <button
            className={`portal-btn ${portalMode === "client" ? "active client-mode" : ""}`}
            onClick={() => setPortalMode("client")}
          >
            <UserCheck size={16} />
            <span>Client Portal</span>
          </button>

          <button
            className={`portal-btn ${portalMode === "admin" ? "active admin-mode" : ""}`}
            onClick={handleAdminToggleClick}
            title={!isAdmin ? "Restricted to Admin accounts" : "Admin Console"}
          >
            {isAdmin ? <ShieldCheck size={16} /> : <Lock size={14} />}
            <span>Admin Console</span>
          </button>
        </div>
      </div>

      <div className="navbar-right">
        {/* Search Bar */}
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder={portalMode === "client" ? "Search job openings..." : "Search applicants, companies..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
              ×
            </button>
          )}
        </div>

        {/* User Auth / Profile Badge */}
        {currentUser ? (
          <div className="user-profile-badge glass-card" onClick={onOpenProfileModal}>
            <img src={currentUser.avatar} alt="User Avatar" className="user-nav-avatar" />
            <div className="user-nav-text">
              <span className="user-nav-name">{currentUser.name}</span>
              <span className="user-nav-role">{currentUser.role === "admin" ? "Admin" : "Client"}</span>
            </div>
          </div>
        ) : (
          <button className="btn btn-secondary nav-login-btn" onClick={onOpenAuthModal}>
            <LogIn size={16} />
            <span>Sign In</span>
          </button>
        )}

        {currentUser && (
          <button className="action-btn icon-only-btn danger-hover" onClick={onLogout} title="Sign Out">
            <LogOut size={18} />
          </button>
        )}

        <button className="action-btn icon-only-btn" onClick={onOpenDataModal} title="Data Management">
          <Database size={18} />
        </button>

        <button
          className="action-btn theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {totalCount === 0 && (
          <button className="btn btn-secondary seed-btn" onClick={onSeedData} title="Load realistic sample data">
            <Sparkles size={16} />
            <span>Demo Data</span>
          </button>
        )}

        <button className="btn btn-primary add-app-btn" onClick={onOpenCreateModal}>
          <Plus size={18} />
          <span>{portalMode === "client" ? "Post Custom Job" : "New Application"}</span>
        </button>
      </div>
    </header>
  );
}
