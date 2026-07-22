import React from "react";
import { ShieldCheck, LayoutGrid, Table as TableIcon, BarChart3, Database } from "lucide-react";
import KanbanBoard from "./KanbanBoard";
import ApplicationTable from "./ApplicationTable";
import AnalyticsDashboard from "./AnalyticsDashboard";

export default function AdminConsole({
  viewMode,
  setViewMode,
  filteredApplications,
  allApplications,
  onUpdateStatus,
  onEditApplication,
  onDeleteApplication,
  onOpenDataModal
}) {
  return (
    <div className="admin-console-container animate-fade">
      {/* Admin Sub-header */}
      <div className="admin-console-header glass-panel">
        <div className="admin-title-group">
          <ShieldCheck className="admin-badge-icon" />
          <div>
            <h2>Recruiter & Admin Control Center</h2>
            <p>Candidate pipeline management, interview scheduling & recruitment analytics.</p>
          </div>
        </div>

        <div className="admin-header-actions">
          {/* Sub View Switcher */}
          <nav className="view-switcher">
            <button
              className={`view-btn ${viewMode === "kanban" ? "active" : ""}`}
              onClick={() => setViewMode("kanban")}
            >
              <LayoutGrid size={16} />
              <span>Kanban</span>
            </button>
            <button
              className={`view-btn ${viewMode === "table" ? "active" : ""}`}
              onClick={() => setViewMode("table")}
            >
              <TableIcon size={16} />
              <span>Table</span>
            </button>
            <button
              className={`view-btn ${viewMode === "analytics" ? "active" : ""}`}
              onClick={() => setViewMode("analytics")}
            >
              <BarChart3 size={16} />
              <span>Analytics</span>
            </button>
          </nav>

          <button className="action-btn icon-only-btn" onClick={onOpenDataModal} title="Data Management">
            <Database size={18} />
          </button>
        </div>
      </div>

      {/* Main Admin View Content */}
      <div className="admin-main-view">
        {viewMode === "kanban" && (
          <KanbanBoard
            applications={filteredApplications}
            onUpdateStatus={onUpdateStatus}
            onEditApplication={onEditApplication}
            onDeleteApplication={onDeleteApplication}
          />
        )}

        {viewMode === "table" && (
          <ApplicationTable
            applications={filteredApplications}
            onUpdateStatus={onUpdateStatus}
            onEditApplication={onEditApplication}
            onDeleteApplication={onDeleteApplication}
          />
        )}

        {viewMode === "analytics" && (
          <AnalyticsDashboard applications={allApplications} />
        )}
      </div>
    </div>
  );
}
