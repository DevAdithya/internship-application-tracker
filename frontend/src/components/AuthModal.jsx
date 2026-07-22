import React, { useState } from "react";
import { X, Lock, Mail, User, Phone, LogIn, UserPlus, ShieldCheck, Sparkles } from "lucide-react";

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  onRegisterSuccess
}) {
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = authMode === "login" ? "/api/auth/login" : "/api/auth/register";
    const payload = authMode === "login" 
      ? { email, password } 
      : { name, email, password, phone, role };

    try {
      const res = await fetch(`http://localhost:5001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      if (authMode === "login") {
        onLoginSuccess(data);
      } else {
        onRegisterSuccess(data);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Demo Login Helper
  const handleDemoLogin = (demoRole) => {
    const demoUser = {
      _id: demoRole === "admin" ? "demo_admin_id" : "demo_client_id",
      name: demoRole === "admin" ? "Alex Rivera (Recruiter)" : "Devadithya (Applicant)",
      email: demoRole === "admin" ? "admin@interntrack.com" : "client@interntrack.com",
      role: demoRole,
      phone: "+94 77 123 4567",
      avatar: demoRole === "admin" 
        ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
        : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
      bio: demoRole === "admin" ? "Senior University Recruiter & Talent Lead" : "Computer Science Undergraduate | Full Stack Developer",
      resumeLink: "https://drive.google.com/sample-resume.pdf",
      preferredLocation: "Colombo / Remote",
      token: "demo_jwt_token_2026"
    };

    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-slide small-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            {authMode === "login" ? <LogIn className="modal-icon" /> : <UserPlus className="modal-icon" />}
            <h2>{authMode === "login" ? "Sign In to InternTrack" : "Create Client Account"}</h2>
          </div>
          <button className="icon-action-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${authMode === "login" ? "active" : ""}`}
            onClick={() => {
              setAuthMode("login");
              setError("");
            }}
          >
            Sign In
          </button>
          <button
            className={`tab-btn ${authMode === "register" ? "active" : ""}`}
            onClick={() => {
              setAuthMode("register");
              setError("");
            }}
          >
            Sign Up (Register)
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-tab-content">
            {authMode === "register" && (
              <label className="form-label">
                Full Name *
                <input
                  type="text"
                  required
                  placeholder="e.g. Devadithya Perera"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            )}

            <label className="form-label">
              Email Address *
              <input
                type="email"
                required
                placeholder="e.g. dev@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-label">
              Password *
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {authMode === "register" && (
              <>
                <label className="form-label">
                  Phone Number
                  <input
                    type="tel"
                    placeholder="+94 77 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  Account Purpose / Role
                  <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="client">Client / Job Seeker Account</option>
                    <option value="admin">Recruiter / Admin Account</option>
                  </select>
                </label>
              </>
            )}

            {/* Quick 1-Click Demo Buttons */}
            <div className="demo-accounts-box glass-card">
              <span className="demo-title">
                <Sparkles size={14} /> Quick Demo Logins:
              </span>
              <div className="demo-btn-row">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDemoLogin("client")}
                >
                  <User size={14} /> Demo Client
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleDemoLogin("admin")}
                >
                  <ShieldCheck size={14} /> Demo Admin
                </button>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Processing..." : authMode === "login" ? "Sign In" : "Register Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
