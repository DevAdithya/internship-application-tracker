import React, { useState } from "react";
import { 
  ArrowUpDown, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  MapPin, 
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock
} from "lucide-react";

const STATUSES = ["Wishlist", "Applied", "Assessment", "Interview", "Offered", "Rejected"];

export default function ApplicationTable({
  applications,
  onUpdateStatus,
  onEditApplication,
  onDeleteApplication
}) {
  const [sortField, setSortField] = useState("appliedDate");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedApps = [...applications].sort((a, b) => {
    let valA = a[sortField] || "";
    let valB = b[sortField] || "";

    if (sortField === "appliedDate") {
      valA = new Date(a.appliedDate || a.createdAt).getTime();
      valB = new Date(b.appliedDate || b.createdAt).getTime();
    } else if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="table-container glass-panel">
      {sortedApps.length === 0 ? (
        <div className="table-empty-state">
          <p>No applications match your query.</p>
        </div>
      ) : (
        <table className="app-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("company")}>
                <div className="th-content">
                  <span>Company & Role</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th onClick={() => handleSort("status")}>
                <div className="th-content">
                  <span>Status</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Workplace & Location</th>
              <th>Salary / Pay</th>
              <th onClick={() => handleSort("appliedDate")}>
                <div className="th-content">
                  <span>Applied Date</span>
                  <ArrowUpDown size={13} />
                </div>
              </th>
              <th>Checklist</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedApps.map((app) => {
              const statusClass = `badge-${app.status.toLowerCase().replace(/\s+/g, "")}`;
              const completedTasks = app.checklist ? app.checklist.filter((c) => c.completed).length : 0;
              const totalTasks = app.checklist ? app.checklist.length : 0;

              return (
                <tr key={app._id} className="table-row">
                  <td>
                    <div className="table-company-cell">
                      <strong className="company-title">{app.company}</strong>
                      <span className="role-sub">{app.position}</span>
                      {app.tags && app.tags.length > 0 && (
                        <div className="table-tags">
                          {app.tags.slice(0, 2).map((t, i) => (
                            <span key={i} className="mini-tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <select
                      className={`table-status-select badge ${statusClass}`}
                      value={app.status}
                      onChange={(e) => onUpdateStatus(app._id, e.target.value)}
                    >
                      {STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="table-meta-cell">
                      <span className="meta-text">{app.location || app.workplaceType || "Not specified"}</span>
                      {app.jobType && <span className="sub-chip">{app.jobType}</span>}
                    </div>
                  </td>
                  <td>
                    <span className="salary-text">{app.salary || "—"}</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <Calendar size={13} />
                      <span>{formatDate(app.appliedDate)}</span>
                    </div>
                  </td>
                  <td>
                    {totalTasks > 0 ? (
                      <span className="checklist-cell-badge">
                        <CheckCircle2 size={13} /> {completedTasks}/{totalTasks}
                      </span>
                    ) : (
                      <span className="text-muted">—</span>
                    )}
                  </td>
                  <td>
                    <div className="table-actions">
                      {app.jobLink && (
                        <a
                          href={app.jobLink}
                          target="_blank"
                          rel="noreferrer"
                          className="table-action-btn"
                          title="Open job link"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                      <button
                        className="table-action-btn"
                        onClick={() => onEditApplication(app)}
                        title="Edit details"
                      >
                        <Edit3 size={15} />
                      </button>
                      <button
                        className="table-action-btn danger"
                        onClick={() => onDeleteApplication(app._id)}
                        title="Delete application"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
