import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Calendar, Award, Code, Clock, Sparkles } from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Interview Scheduled',
    desc: 'Google — Technical Round 2 with Senior SWE',
    time: '2h ago',
    read: false,
    iconColor: 'amber',
    icon: <Calendar size={15} style={{ color: '#f59e0b' }} />,
  },
  {
    id: 2,
    title: 'Offer Received 🎉',
    desc: 'Virtusa — Full Stack Developer Intern (LKR 120k/mo)',
    time: '1d ago',
    read: false,
    iconColor: 'emerald',
    icon: <Award size={15} style={{ color: '#10b981' }} />,
  },
  {
    id: 3,
    title: 'Assessment Invitation',
    desc: 'Meta — CodeSignal 70-min OA test due in 2 days',
    time: '2d ago',
    read: false,
    iconColor: 'violet',
    icon: <Code size={15} style={{ color: '#8b5cf6' }} />,
  },
];

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const ref = useRef(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="nav-dropdown-wrapper" ref={ref}>
      <button
        className="notification-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && <span className="notif-badge" />}
      </button>

      {isOpen && (
        <div className="nav-dropdown-panel" style={{ width: 320 }}>
          <div className="dropdown-header">
            <div className="dropdown-title">
              Notifications
              {unreadCount > 0 && (
                <span className="notif-count-badge">{unreadCount} new</span>
              )}
            </div>
            {unreadCount > 0 && (
              <button className="mark-read-btn" onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))}>
                <Check size={12} /> Mark all read
              </button>
            )}
          </div>

          <div className="notif-list">
            {notifs.map(item => (
              <div
                key={item.id}
                className={`notif-item ${!item.read ? 'unread' : ''}`}
                onClick={() => setNotifs(n => n.map(x => x.id === item.id ? { ...x, read: true } : x))}
              >
                <div className={`notif-icon ${item.iconColor}`}>{item.icon}</div>
                <div className="notif-body">
                  <div className="notif-title">{item.title}</div>
                  <div className="notif-desc">{item.desc}</div>
                  <div className="notif-time"><Clock size={10} />{item.time}</div>
                </div>
                {!item.read && <span className="notif-dot" />}
              </div>
            ))}
          </div>

          <div className="dropdown-footer">
            <Sparkles size={12} style={{ color: '#818cf8' }} />
            Real-time pipeline updates
          </div>
        </div>
      )}
    </div>
  );
}
