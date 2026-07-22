import React, { useState, useEffect } from "react";
import { X, User, Mail, Phone, FileText, MapPin, Camera, Save, ShieldCheck, Sparkles } from "lucide-react";

const PRESET_AVATARS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Zack",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Session",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha"
];

export default function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setPhone(currentUser.phone || "");
      setAvatar(currentUser.avatar || PRESET_AVATARS[0]);
      setBio(currentUser.bio || "");
      setResumeLink(currentUser.resumeLink || "");
      setPreferredLocation(currentUser.preferredLocation || "");
    }
  }, [currentUser, isOpen]);

  if (!isOpen || !currentUser) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFields = {
      name,
      email,
      phone,
      avatar,
      bio,
      resumeLink,
      preferredLocation
    };

    await onUpdateProfile(updatedFields);
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-slide small-modal">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <User className="modal-icon" />
            <h2>Edit Client Profile</h2>
          </div>
          <button className="icon-action-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-tab-content">
            {/* Avatar Selection & Preview Box */}
            <div className="profile-avatar-section glass-card">
              <div className="avatar-preview-box">
                <img src={avatar} alt="Profile Avatar" className="profile-avatar-img" />
                <span className="role-chip">
                  {currentUser.role === "admin" ? <ShieldCheck size={12} /> : <User size={12} />}
                  {currentUser.role === "admin" ? "Admin" : "Client"}
                </span>
              </div>

              <div className="avatar-picker-group">
                <span className="picker-label">Choose Avatar Preset:</span>
                <div className="presets-row">
                  {PRESET_AVATARS.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`preset-btn ${avatar === av ? "selected" : ""}`}
                      onClick={() => setAvatar(av)}
                    >
                      <img src={av} alt={`Preset ${idx}`} />
                    </button>
                  ))}
                </div>

                <label className="form-label mt-2">
                  Or Custom Photo URL:
                  <input
                    type="url"
                    placeholder="https://..."
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </label>
              </div>
            </div>

            {/* Editable Profile Fields */}
            <div className="grid-2-col">
              <label className="form-label">
                Full Name *
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="form-label">
                Email Address *
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

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
                Preferred Location
                <input
                  type="text"
                  placeholder="e.g. Colombo / Remote"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                />
              </label>
            </div>

            <label className="form-label">
              Resume / Portfolio Link
              <input
                type="url"
                placeholder="https://drive.google.com/my-resume.pdf"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
              />
            </label>

            <label className="form-label">
              Bio / Professional Headline
              <textarea
                rows={3}
                placeholder="Software Engineering student specializing in full-stack web applications..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="modal-textarea"
              />
            </label>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              <Save size={16} /> {loading ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
