import React from 'react';
import { ChevronRight, Home, Briefcase, ShieldCheck, LayoutGrid, Table, BarChart3 } from 'lucide-react';

export default function Breadcrumbs({ portalMode, adminViewMode }) {
  const getAdminViewName = () => {
    switch (adminViewMode) {
      case 'kanban':
        return { label: 'Kanban Board', icon: <LayoutGrid size={13} /> };
      case 'table':
        return { label: 'Data Table', icon: <Table size={13} /> };
      case 'analytics':
        return { label: 'Analytics', icon: <BarChart3 size={13} /> };
      default:
        return { label: 'Console', icon: <ShieldCheck size={13} /> };
    }
  };

  const adminSub = getAdminViewName();

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium">
      <span className="flex items-center gap-1 hover:text-[var(--text-main)] transition-colors cursor-pointer">
        <Home size={13} className="text-indigo-400" />
        <span className="hidden md:inline">InternTrack</span>
      </span>

      <ChevronRight size={12} className="text-[var(--text-subtle)]" />

      {portalMode === 'client' ? (
        <span className="flex items-center gap-1.5 text-[var(--text-main)] font-semibold bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-md border border-indigo-500/20">
          <Briefcase size={13} />
          <span>Client Portal</span>
        </span>
      ) : (
        <>
          <span className="flex items-center gap-1 hover:text-[var(--text-main)] transition-colors">
            <ShieldCheck size={13} className="text-violet-400" />
            <span>Admin Console</span>
          </span>
          <ChevronRight size={12} className="text-[var(--text-subtle)]" />
          <span className="flex items-center gap-1.5 text-[var(--text-main)] font-semibold bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded-md border border-violet-500/20">
            {adminSub.icon}
            <span>{adminSub.label}</span>
          </span>
        </>
      )}
    </nav>
  );
}
