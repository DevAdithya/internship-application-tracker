import React, { useState } from "react";
import { 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Calendar, 
  CheckSquare, 
  ChevronRight, 
  ChevronLeft,
  Tag,
  Clock
} from "lucide-react";

const COLUMNS = [
  { id: "Wishlist", title: "Wishlist", color: "--status-wishlist" },
  { id: "Applied", title: "Applied", color: "--status-applied" },
  { id: "Assessment", title: "Assessment / OA", color: "--status-assessment" },
  { id: "Interview", title: "Interviewing", color: "--status-interview" },
  { id: "Offered", title: "Offered 🎉", color: "--status-offered" },
  { id: "Rejected", title: "Rejected", color: "--status-rejected" }
];

export default function KanbanBoard({ 
  applications, 
  onUpdateStatus, 
  onEditApplication, 
  onDeleteApplication 
}) {
  const [draggedAppId, setDraggedAppId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const handleDragStart = (e, appId) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData("text/plain", appId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumn !== colId) {
      setDragOverColumn(colId);
    }
  };

  const handleDragLeave = (e, colId) => {
    if (dragOverColumn === colId) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, colId) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData("text/plain") || draggedAppId;
    if (appId) {
      onUpdateStatus(appId, colId);
    }
    setDraggedAppId(null);
    setDragOverColumn(null);
  };

  // Move helper for quick button navigation
  const getNextStatus = (currentStatus) => {
    const idx = COLUMNS.findIndex((c) => c.id === currentStatus);
    if (idx < COLUMNS.length - 1) return COLUMNS[idx + 1].id;
    return null;
  };

  const getPrevStatus = (currentStatus) => {
    const idx = COLUMNS.findIndex((c) => c.id === currentStatus);
    if (idx > 0) return COLUMNS[idx - 1].id;
    return null;
  };

  return (
    <div className="kanban-container">
      {COLUMNS.map((col) => {
        const columnApps = applications.filter((app) => app.status === col.id);

        return (
          <div
            key={col.id}
            className={`kanban-column ${dragOverColumn === col.id ? "drag-over" : ""}`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={(e) => handleDragLeave(e, col.id)}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            {/* Column Header */}
            <div className="column-header">
              <div className="column-title-group">
                <span
                  className="column-indicator"
                  style={{ backgroundColor: `var(${col.color})` }}
                />
                <h3>{col.title}</h3>
              </div>
              <span className="column-count">{columnApps.length}</span>
            </div>

            {/* Column Body / Cards */}
            <div className="column-body">
              {columnApps.length === 0 ? (
                <div className="empty-column-placeholder">
                  <span>Drop application here</span>
                </div>
              ) : (
                columnApps.map((app) => {
                  const completedChecklist = app.checklist ? app.checklist.filter((c) => c.completed).length : 0;
                  const totalChecklist = app.checklist ? app.checklist.length : 0;
                  const prevStatus = getPrevStatus(app.status);
                  const nextStatus = getNextStatus(app.status);

                  return (
                    <article
                      key={app._id}
                      className="kanban-card glass-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, app._id)}
                    >
                      <div className="card-top">
                        <div className="company-info">
                          <h4 className="company-name">{app.company}</h4>
                          <p className="position-title">{app.position}</p>
                        </div>
                        <div className="card-actions">
                          <button
                            className="icon-action-btn"
                            onClick={() => onEditApplication(app)}
                            title="Edit details"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            className="icon-action-btn danger"
                            onClick={() => onDeleteApplication(app._id)}
                            title="Delete application"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>

                      {/* Meta Tags / Badges */}
                      <div className="card-meta">
                        {app.location && (
                          <span className="meta-chip">
                            <MapPin size={12} />
                            {app.location}
                          </span>
                        )}
                        {app.salary && (
                          <span className="meta-chip highlight">
                            <DollarSign size={12} />
                            {app.salary}
                          </span>
                        )}
                        {app.workplaceType && (
                          <span className="meta-chip">
                            {app.workplaceType}
                          </span>
                        )}
                      </div>

                      {/* Tags */}
                      {app.tags && app.tags.length > 0 && (
                        <div className="card-tags">
                          {app.tags.map((tag, i) => (
                            <span key={i} className="tag-pill">
                              <Tag size={10} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Checklist Progress */}
                      {totalChecklist > 0 && (
                        <div className="checklist-progress">
                          <CheckSquare size={13} />
                          <span>
                            {completedChecklist}/{totalChecklist} tasks
                          </span>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${(completedChecklist / totalChecklist) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Footer Actions & Links */}
                      <div className="card-footer">
                        <div className="card-footer-left">
                          {app.jobLink && (
                            <a
                              href={app.jobLink}
                              target="_blank"
                              rel="noreferrer"
                              className="link-btn"
                              title="Open original job posting"
                            >
                              <ExternalLink size={13} />
                              <span>Job Posting</span>
                            </a>
                          )}
                        </div>

                        {/* Quick Move Buttons */}
                        <div className="quick-move-group">
                          {prevStatus && (
                            <button
                              className="quick-move-btn"
                              onClick={() => onUpdateStatus(app._id, prevStatus)}
                              title={`Move to ${prevStatus}`}
                            >
                              <ChevronLeft size={14} />
                            </button>
                          )}
                          {nextStatus && (
                            <button
                              className="quick-move-btn primary"
                              onClick={() => onUpdateStatus(app._id, nextStatus)}
                              title={`Move to ${nextStatus}`}
                            >
                              <ChevronRight size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
