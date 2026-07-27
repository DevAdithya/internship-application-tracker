import React, { useState, useRef, useEffect } from 'react';
import { User, LogIn, LogOut, ShieldCheck, UserCheck, Lock, Database, ChevronDown, Sparkles } from 'lucide-react';

export default function UserDropdown({
  currentUser,
  portalMode,
  setPortalMode,
  onOpenAuthModal,
  onOpenProfileModal,
  onOpenDataModal,
  onLogout,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAdmin = currentUser && currentUser.role === 'admin';

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentUser) {
    return (
      <button
        onClick={onOpenAuthModal}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md shadow-indigo-600/20 transition-all duration-200"
      >
        <LogIn size={15} />
        <span>Sign In</span>
      </button>
    );
  }

  const handleAdminToggleClick = () => {
    setIsOpen(false);
    if (!isAdmin) {
      alert('Access Restricted: Admin Console requires an Account with Admin privileges. Please sign in with an Admin account.');
    } else {
      setPortalMode(portalMode === 'admin' ? 'client' : 'admin');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Badge Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-[var(--border-color)] transition-all duration-200 focus:outline-none"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-7 h-7 rounded-lg object-cover bg-indigo-500/20 border border-indigo-500/30"
        />
        <div className="hidden sm:flex flex-col text-left leading-tight">
          <span className="text-xs font-semibold text-[var(--text-main)] truncate max-w-[110px]">
            {currentUser.name}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] capitalize">
            {currentUser.role === 'admin' ? 'Recruiter Admin' : 'Client Applicant'}
          </span>
        </div>
        <ChevronDown size={14} className={`text-[var(--text-subtle)] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info Header */}
          <div className="p-3.5 border-b border-[var(--border-color)] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-10 h-10 rounded-xl object-cover border border-indigo-500/30"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs text-[var(--text-main)] truncate">
                  {currentUser.name}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] truncate">
                  {currentUser.email}
                </div>
                <span className="inline-block mt-1 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 rounded">
                  {currentUser.role}
                </span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="p-1.5 space-y-0.5">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenProfileModal();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-main)] hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <User size={15} className="text-indigo-400" />
              <span>Edit Profile</span>
            </button>

            <button
              onClick={handleAdminToggleClick}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[var(--text-main)] hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2.5">
                {isAdmin ? (
                  <ShieldCheck size={15} className="text-emerald-400" />
                ) : (
                  <Lock size={15} className="text-amber-400" />
                )}
                <span>{portalMode === 'admin' ? 'Switch to Client Portal' : 'Switch to Admin Console'}</span>
              </div>
              {!isAdmin && (
                <span className="text-[10px] bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">
                  Locked
                </span>
              )}
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenDataModal();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--text-main)] hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <Database size={15} className="text-violet-400" />
              <span>Data Management</span>
            </button>
          </div>

          {/* Sign Out */}
          <div className="p-1.5 border-t border-[var(--border-color)]">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
