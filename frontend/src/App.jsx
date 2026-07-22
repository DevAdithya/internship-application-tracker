import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";

import Navbar from "./components/Navbar";
import ClientPortal from "./components/ClientPortal";
import AdminConsole from "./components/AdminConsole";
import ApplicationModal from "./components/ApplicationModal";
import DataManagementModal from "./components/DataManagementModal";
import AuthModal from "./components/AuthModal";
import UserProfileModal from "./components/UserProfileModal";

const API_BASE = "http://localhost:5001/api";

function App() {
  const [portalMode, setPortalMode] = useState("client"); // "client" | "admin"
  const [adminViewMode, setAdminViewMode] = useState("kanban"); // "kanban" | "table" | "analytics"
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  const [toast, setToast] = useState({ message: "", type: "info" });

  // Auth & Profile State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modal States
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Sync Theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const showToast = (message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "info" }), 3500);
  };

  // Auth Header Helper
  const getAuthHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (currentUser && currentUser.token) {
      headers["Authorization"] = `Bearer ${currentUser.token}`;
    }
    return headers;
  };

  // Fetch Applications
  const loadApplications = async () => {
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      showToast("Could not connect to backend server on port 5001.", "error");
    }
  };

  useEffect(() => {
    loadApplications();
  }, [currentUser]);

  // Auth Login / Register Handlers
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    showToast(`Welcome back, ${userData.name}!`, "info");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
    setPortalMode("client");
    showToast("Signed out successfully.", "info");
  };

  // Update Client Profile (Photo, Email, Phone, Bio, Resume)
  const handleUpdateProfile = async (updatedFields) => {
    try {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedFields)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedUser = await res.json();
      setCurrentUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showToast("Profile details updated successfully!", "info");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Filtered Applications for Search
  const filteredApplications = applications.filter((app) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const companyMatch = app.company?.toLowerCase().includes(query);
    const positionMatch = app.position?.toLowerCase().includes(query);
    const locationMatch = app.location?.toLowerCase().includes(query);
    const notesMatch = app.notes?.toLowerCase().includes(query);
    const tagsMatch = app.tags?.some((t) => t.toLowerCase().includes(query));
    return companyMatch || positionMatch || locationMatch || notesMatch || tagsMatch;
  });

  // Instant Status Update (Drag & Drop or Inline Dropdown)
  const handleUpdateStatus = async (id, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
    );

    try {
      const res = await fetch(`${API_BASE}/applications/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) throw new Error("Status update failed");
      const updated = await res.json();
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? updated : app))
      );
      showToast(`Application status updated to "${newStatus}"`, "info");
    } catch (err) {
      showToast("Could not update status on server.", "error");
      loadApplications();
    }
  };

  // Save Application (Create or Edit)
  const handleSaveApplication = async (formData) => {
    try {
      const isEdit = !!editingApp;
      const url = isEdit ? `${API_BASE}/applications/${editingApp._id}` : `${API_BASE}/applications`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save application");
      }

      const saved = await res.json();

      if (isEdit) {
        setApplications((prev) => prev.map((app) => (app._id === saved._id ? saved : app)));
        showToast(`Updated ${saved.company} application!`, "info");
      } else {
        setApplications((prev) => [saved, ...prev]);
        showToast(`Added ${saved.company} application!`, "info");
      }

      setIsAppModalOpen(false);
      setEditingApp(null);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // Quick Apply from Client Portal
  const handleQuickApply = async (newAppData) => {
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newAppData)
      });
      if (!res.ok) throw new Error("Failed to submit application");
      const saved = await res.json();
      setApplications((prev) => [saved, ...prev]);
      showToast(`Application submitted to ${saved.company}!`, "info");
    } catch (err) {
      showToast("Could not submit application.", "error");
    }
  };

  // Delete Single Application
  const handleDeleteApplication = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`${API_BASE}/applications/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Delete failed");

      setApplications((prev) => prev.filter((app) => app._id !== id));
      showToast("Application deleted.", "info");
    } catch (err) {
      showToast("Failed to delete application.", "error");
    }
  };

  // Seed Sample Demo Data
  const handleSeedData = async () => {
    try {
      const res = await fetch(`${API_BASE}/sample/seed`, {
        method: "POST",
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Seeding failed");
      const data = await res.json();
      setApplications(data.data);
      showToast("Database seeded with sample applications!", "info");
    } catch (err) {
      showToast("Could not seed demo data.", "error");
    }
  };

  // Import CSV Batch
  const handleImportCSV = async (importedApps) => {
    try {
      const res = await fetch(`${API_BASE}/applications/batch`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(importedApps)
      });
      if (!res.ok) throw new Error("CSV import failed");
      const data = await res.json();
      setApplications((prev) => [...data, ...prev]);
      showToast(`Successfully imported ${data.length} applications from CSV!`, "info");
    } catch (err) {
      showToast("Failed to import CSV applications.", "error");
    }
  };

  // Clear All Applications
  const handleClearAll = async () => {
    try {
      const res = await fetch(`${API_BASE}/applications`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      if (!res.ok) throw new Error("Bulk delete failed");
      setApplications([]);
      showToast("All applications cleared.", "info");
    } catch (err) {
      showToast("Failed to clear applications.", "error");
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toast.message && (
        <div className={`toast-banner ${toast.type}`}>
          <span>{toast.message}</span>
          <button className="icon-action-btn" onClick={() => setToast({ message: "", type: "info" })}>
            ×
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        portalMode={portalMode}
        setPortalMode={setPortalMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        toggleTheme={toggleTheme}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onLogout={handleLogout}
        onOpenCreateModal={() => {
          setEditingApp(null);
          setIsAppModalOpen(true);
        }}
        onOpenDataModal={() => setIsDataModalOpen(true)}
        onSeedData={handleSeedData}
        totalCount={applications.length}
      />

      {/* Main Content: Client Portal OR Admin Console */}
      <main className="main-content">
        {portalMode === "client" ? (
          <ClientPortal
            applications={filteredApplications}
            onQuickApply={handleQuickApply}
            onOpenCreateModal={() => {
              setEditingApp(null);
              setIsAppModalOpen(true);
            }}
          />
        ) : (
          <AdminConsole
            viewMode={adminViewMode}
            setViewMode={setAdminViewMode}
            filteredApplications={filteredApplications}
            allApplications={applications}
            onUpdateStatus={handleUpdateStatus}
            onEditApplication={(app) => {
              setEditingApp(app);
              setIsAppModalOpen(true);
            }}
            onDeleteApplication={handleDeleteApplication}
            onOpenDataModal={() => setIsDataModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onRegisterSuccess={handleLoginSuccess}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateProfile={handleUpdateProfile}
      />

      <ApplicationModal
        isOpen={isAppModalOpen}
        onClose={() => {
          setIsAppModalOpen(false);
          setEditingApp(null);
        }}
        onSave={handleSaveApplication}
        initialData={editingApp}
      />

      <DataManagementModal
        isOpen={isDataModalOpen}
        onClose={() => setIsDataModalOpen(false)}
        applications={applications}
        onImportCSV={handleImportCSV}
        onSeedData={handleSeedData}
        onClearAll={handleClearAll}
      />
    </div>
  );
}

export default App;