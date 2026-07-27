import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Sparkles, Calendar, Award, Code, Clock, CheckCircle2 } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Interview Scheduled',
    desc: 'Google — Technical Round 2 with Senior SWE',
    time: '2 hours ago',
    read: false,
    icon: <Calendar size={14} className="text-amber-400" />,
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    id: 2,
    title: 'Offer Received 🎉',
    desc: 'Virtusa — Full Stack Developer Intern (LKR 120k/mo)',
    time: '1 day ago',
    read: false,
    icon: <Award size={14} className="text-emerald-400" />,
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 3,
    title: 'Assessment Invitation',
    desc: 'Meta — CodeSignal 70-min OA test due in 2 days',
    time: '2 days ago',
    read: false,
    icon: <Code size={14} className="text-violet-400" />,
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-white/[0.06] transition-all duration-200 focus:outline-none"
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-[var(--bg-primary)] animate-pulse" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-2xl backdrop-blur-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-[var(--text-main)]">Notifications</span>
              {unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 transition-colors"
              >
                <Check size={12} />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-[var(--border-color)]">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-[var(--text-muted)]">
                No notifications right now.
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={`p-3.5 flex items-start gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer ${
                    !item.read ? 'bg-indigo-500/[0.03]' : ''
                  }`}
                  onClick={() => {
                    setNotifications((prev) =>
                      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
                    );
                  }}
                >
                  <div className={`p-2 rounded-lg border ${item.bg} shrink-0 mt-0.5`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-semibold text-[var(--text-main)] truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[var(--text-subtle)] shrink-0 flex items-center gap-0.5">
                        <Clock size={10} />
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-2.5 text-center border-t border-[var(--border-color)] bg-white/[0.01]">
            <span className="text-[11px] text-[var(--text-subtle)] font-medium flex items-center justify-center gap-1">
              <Sparkles size={11} className="text-indigo-400" />
              <span>Real-time application pipeline updates</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
