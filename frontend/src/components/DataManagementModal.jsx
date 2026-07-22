import React, { useRef } from "react";
import { 
  X, 
  Download, 
  Upload, 
  Trash2, 
  Sparkles, 
  Database,
  FileSpreadsheet
} from "lucide-react";

export default function DataManagementModal({
  isOpen,
  onClose,
  applications,
  onImportCSV,
  onSeedData,
  onClearAll
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Export Applications to CSV
  const handleExportCSV = () => {
    if (applications.length === 0) {
      alert("No applications to export.");
      return;
    }

    const headers = ["Company", "Position", "Status", "Location", "WorkplaceType", "Salary", "AppliedDate", "Deadline", "JobLink", "Notes"];
    const rows = applications.map((a) => [
      `"${(a.company || "").replace(/"/g, '""')}"`,
      `"${(a.position || "").replace(/"/g, '""')}"`,
      `"${(a.status || "").replace(/"/g, '""')}"`,
      `"${(a.location || "").replace(/"/g, '""')}"`,
      `"${(a.workplaceType || "").replace(/"/g, '""')}"`,
      `"${(a.salary || "").replace(/"/g, '""')}"`,
      `"${a.appliedDate ? new Date(a.appliedDate).toISOString().split("T")[0] : ""}"`,
      `"${a.deadline ? new Date(a.deadline).toISOString().split("T")[0] : ""}"`,
      `"${(a.jobLink || "").replace(/"/g, '""')}"`,
      `"${(a.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `internship_applications_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV Handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.split("\n").filter((line) => line.trim() !== "");
      if (lines.length <= 1) {
        alert("CSV file appears to be empty.");
        return;
      }

      const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
      const parsedApps = [];

      for (let i = 1; i < lines.length; i++) {
        // Splitting respecting quoted strings
        const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || lines[i].split(",");
        const cleanValues = values.map((v) => v.trim().replace(/^"|"$/g, "").replace(/""/g, '"'));

        if (cleanValues.length > 0 && cleanValues[0]) {
          parsedApps.push({
            company: cleanValues[0] || "Unknown Company",
            position: cleanValues[1] || "Software Engineering Intern",
            status: cleanValues[2] || "Applied",
            location: cleanValues[3] || "",
            workplaceType: cleanValues[4] || "On-site",
            salary: cleanValues[5] || "",
            appliedDate: cleanValues[6] ? new Date(cleanValues[6]) : new Date(),
            deadline: cleanValues[7] ? new Date(cleanValues[7]) : null,
            jobLink: cleanValues[8] || "",
            notes: cleanValues[9] || ""
          });
        }
      }

      if (parsedApps.length > 0) {
        onImportCSV(parsedApps);
        onClose();
      } else {
        alert("Could not parse any valid rows from CSV.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-slide small-modal">
        <div className="modal-header">
          <div className="modal-title-group">
            <Database className="modal-icon" />
            <h2>Data Management & Backup</h2>
          </div>
          <button className="icon-action-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="data-management-body">
          {/* Export Section */}
          <div className="data-card glass-card">
            <div className="data-card-info">
              <FileSpreadsheet className="data-card-icon" />
              <div>
                <h4>Export Applications (CSV)</h4>
                <p>Download all {applications.length} applications in standard CSV format.</p>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleExportCSV}>
              <Download size={16} /> Export CSV
            </button>
          </div>

          {/* Import Section */}
          <div className="data-card glass-card">
            <div className="data-card-info">
              <Upload className="data-card-icon" />
              <div>
                <h4>Import Applications (CSV)</h4>
                <p>Upload a CSV file to bulk import internship applications.</p>
              </div>
            </div>
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <button
              className="btn btn-secondary"
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              <Upload size={16} /> Import CSV
            </button>
          </div>

          {/* Demo Data Seeding */}
          <div className="data-card glass-card">
            <div className="data-card-info">
              <Sparkles className="data-card-icon" />
              <div>
                <h4>Load Realistic Demo Data</h4>
                <p>Populate your tracker with sample tech applications (Google, Meta, Virtusa, etc.).</p>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                onSeedData();
                onClose();
              }}
            >
              <Sparkles size={16} /> Load Demo Data
            </button>
          </div>

          {/* Bulk Clear Section */}
          <div className="data-card glass-card danger-card">
            <div className="data-card-info">
              <Trash2 className="data-card-icon danger" />
              <div>
                <h4>Reset & Clear Database</h4>
                <p>Delete all applications permanently from MongoDB.</p>
              </div>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete ALL applications?")) {
                  onClearAll();
                  onClose();
                }
              }}
            >
              <Trash2 size={16} /> Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
