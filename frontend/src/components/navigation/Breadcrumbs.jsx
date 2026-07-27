import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ portalMode, adminViewMode }) {
  const segments = [];

  if (portalMode === 'client') {
    segments.push({ label: 'Client Portal', current: true });
  } else {
    segments.push({ label: 'Admin Console', current: adminViewMode === undefined });
    if (adminViewMode) {
      const labels = { kanban: 'Kanban Board', table: 'Data Table', analytics: 'Analytics' };
      segments[0].current = false;
      segments.push({ label: labels[adminViewMode] || adminViewMode, current: true });
    }
  }

  return (
    <nav className="nav-breadcrumbs" aria-label="Breadcrumb">
      <span className="breadcrumb-item">Dashboard</span>
      {segments.map((seg, i) => (
        <React.Fragment key={i}>
          <span className="breadcrumb-sep"><ChevronRight size={12} /></span>
          <span className={`breadcrumb-item ${seg.current ? 'current' : ''}`}>
            {seg.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}
