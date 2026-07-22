import React, { useState, useEffect } from "react";
import { 
  X, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Link, 
  UserCheck, 
  CheckSquare, 
  Plus, 
  Trash2,
  Tag,
  FileText
} from "lucide-react";

export default function ApplicationModal({
  isOpen,
  onClose,
  onSave,
  initialData
}) {
  const [activeTab, setActiveTab] = useState("overview");

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    location: "",
    jobLink: "",
    appliedDate: new Date().toISOString().split("T")[0],
    deadline: "",
    jobType: "Internship",
    workplaceType: "On-site",
    salary: "",
    contactName: "",
    contactEmail: "",
    resumeLink: "",
    notes: "",
    tagsInput: "",
    interviewRounds: [],
    checklist: []
  });

  const [newInterviewTitle, setNewInterviewTitle] = useState("");
  const [newInterviewDate, setNewInterviewDate] = useState("");
  const [newCheckitemTask, setNewCheckitemTask] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        appliedDate: initialData.appliedDate 
          ? new Date(initialData.appliedDate).toISOString().split("T")[0] 
          : new Date().toISOString().split("T")[0],
        deadline: initialData.deadline 
          ? new Date(initialData.deadline).toISOString().split("T")[0] 
          : "",
        tagsInput: initialData.tags ? initialData.tags.join(", ") : "",
        interviewRounds: initialData.interviewRounds || [],
        checklist: initialData.checklist || []
      });
    } else {
      setFormData({
        company: "",
        position: "",
        status: "Applied",
        location: "",
        jobLink: "",
        appliedDate: new Date().toISOString().split("T")[0],
        deadline: "",
        jobType: "Internship",
        workplaceType: "On-site",
        salary: "",
        contactName: "",
        contactEmail: "",
        resumeLink: "",
        notes: "",
        tagsInput: "",
        interviewRounds: [],
        checklist: []
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInterview = () => {
    if (!newInterviewTitle.trim()) return;
    setFormData((prev) => ({
      ...prev,
      interviewRounds: [
        ...prev.interviewRounds,
        {
          title: newInterviewTitle.trim(),
          date: newInterviewDate ? new Date(newInterviewDate) : null,
          completed: false,
          notes: ""
        }
      ]
    }));
    setNewInterviewTitle("");
    setNewInterviewDate("");
  };

  const handleRemoveInterview = (index) => {
    setFormData((prev) => ({
      ...prev,
      interviewRounds: prev.interviewRounds.filter((_, i) => i !== index)
    }));
  };

  const handleToggleInterview = (index) => {
    setFormData((prev) => {
      const updated = [...prev.interviewRounds];
      updated[index].completed = !updated[index].completed;
      return { ...prev, interviewRounds: updated };
    });
  };

  const handleAddChecklist = () => {
    if (!newCheckitemTask.trim()) return;
    setFormData((prev) => ({
      ...prev,
      checklist: [
        ...prev.checklist,
        { task: newCheckitemTask.trim(), completed: false }
      ]
    }));
    setNewCheckitemTask("");
  };

  const handleRemoveChecklist = (index) => {
    setFormData((prev) => ({
      ...prev,
      checklist: prev.checklist.filter((_, i) => i !== index)
    }));
  };

  const handleToggleChecklist = (index) => {
    setFormData((prev) => {
      const updated = [...prev.checklist];
      updated[index].completed = !updated[index].completed;
      return { ...prev, checklist: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedTags = formData.tagsInput
      ? formData.tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      ...formData,
      tags: parsedTags
    };

    onSave(payload);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content glass-panel animate-slide">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <Briefcase className="modal-icon" />
            <h2>{initialData ? `Edit Application — ${formData.company}` : "New Application"}</h2>
          </div>
          <button className="icon-action-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview & Role
          </button>
          <button
            className={`tab-btn ${activeTab === "interviews" ? "active" : ""}`}
            onClick={() => setActiveTab("interviews")}
          >
            Interviews ({formData.interviewRounds.length})
          </button>
          <button
            className={`tab-btn ${activeTab === "contact" ? "active" : ""}`}
            onClick={() => setActiveTab("contact")}
          >
            Recruiter & Tags
          </button>
          <button
            className={`tab-btn ${activeTab === "checklist" ? "active" : ""}`}
            onClick={() => setActiveTab("checklist")}
          >
            Checklist & Notes ({formData.checklist.length})
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="form-tab-content grid-2-col">
              <label className="form-label">
                Company Name *
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google, Stripe"
                  required
                />
              </label>

              <label className="form-label">
                Position Title *
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineering Intern"
                  required
                />
              </label>

              <label className="form-label">
                Application Status
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Wishlist">Wishlist</option>
                  <option value="Applied">Applied</option>
                  <option value="Assessment">Assessment / OA</option>
                  <option value="Interview">Interviewing</option>
                  <option value="Offered">Offered 🎉</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label className="form-label">
                Location
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Mountain View, CA / Remote"
                />
              </label>

              <label className="form-label">
                Workplace Type
                <select name="workplaceType" value={formData.workplaceType} onChange={handleChange}>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Remote">Remote</option>
                </select>
              </label>

              <label className="form-label">
                Job Type
                <select name="jobType" value={formData.jobType} onChange={handleChange}>
                  <option value="Internship">Internship</option>
                  <option value="Co-op">Co-op</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                </select>
              </label>

              <label className="form-label">
                Salary / Pay Rate
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g. $55 / hr or LKR 120,000/mo"
                />
              </label>

              <label className="form-label">
                Applied Date
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                />
              </label>

              <label className="form-label full-width">
                Job Posting Link
                <input
                  type="url"
                  name="jobLink"
                  value={formData.jobLink}
                  onChange={handleChange}
                  placeholder="https://company.com/careers/job-123"
                />
              </label>

              <label className="form-label">
                Deadline / OA Due Date
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </label>
            </div>
          )}

          {/* Tab 2: Interview Stages */}
          {activeTab === "interviews" && (
            <div className="form-tab-content">
              <div className="sub-section-title">
                <h4>Track Interview Rounds</h4>
                <p>Add technical screens, online assessments, and onsite stages.</p>
              </div>

              <div className="add-item-row">
                <input
                  type="text"
                  placeholder="Round Title (e.g. Recruiter Screen, Technical Round 1)"
                  value={newInterviewTitle}
                  onChange={(e) => setNewInterviewTitle(e.target.value)}
                />
                <input
                  type="date"
                  value={newInterviewDate}
                  onChange={(e) => setNewInterviewDate(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddInterview}>
                  <Plus size={16} /> Add Round
                </button>
              </div>

              <div className="items-list">
                {formData.interviewRounds.length === 0 ? (
                  <p className="empty-sub-text">No interview rounds added yet.</p>
                ) : (
                  formData.interviewRounds.map((round, idx) => (
                    <div key={idx} className="item-row">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={round.completed}
                          onChange={() => handleToggleInterview(idx)}
                        />
                        <span className={round.completed ? "completed-text" : ""}>
                          {round.title}
                        </span>
                      </label>
                      {round.date && (
                        <span className="item-date">
                          {new Date(round.date).toLocaleDateString()}
                        </span>
                      )}
                      <button
                        type="button"
                        className="icon-action-btn danger"
                        onClick={() => handleRemoveInterview(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Recruiter & Tags */}
          {activeTab === "contact" && (
            <div className="form-tab-content grid-2-col">
              <label className="form-label">
                Recruiter / Contact Name
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                />
              </label>

              <label className="form-label">
                Contact Email
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  placeholder="e.g. sjenkins@company.com"
                />
              </label>

              <label className="form-label full-width">
                Resume Variant Link
                <input
                  type="url"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  placeholder="Link to tailored resume (Google Drive, Notion, PDF)"
                />
              </label>

              <label className="form-label full-width">
                Custom Tags (comma separated)
                <input
                  type="text"
                  name="tagsInput"
                  value={formData.tagsInput}
                  onChange={handleChange}
                  placeholder="e.g. Dream Company, Referral, Tier 1, React"
                />
              </label>
            </div>
          )}

          {/* Tab 4: Checklist & Notes */}
          {activeTab === "checklist" && (
            <div className="form-tab-content">
              <div className="sub-section-title">
                <h4>Application Action Checklist</h4>
                <p>Tasks to complete for this application (e.g. submit referral, practice system design).</p>
              </div>

              <div className="add-item-row">
                <input
                  type="text"
                  placeholder="New task item..."
                  value={newCheckitemTask}
                  onChange={(e) => setNewCheckitemTask(e.target.value)}
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddChecklist}>
                  <Plus size={16} /> Add Task
                </button>
              </div>

              <div className="items-list">
                {formData.checklist.length === 0 ? (
                  <p className="empty-sub-text">No checklist items added.</p>
                ) : (
                  formData.checklist.map((item, idx) => (
                    <div key={idx} className="item-row">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => handleToggleChecklist(idx)}
                        />
                        <span className={item.completed ? "completed-text" : ""}>
                          {item.task}
                        </span>
                      </label>
                      <button
                        type="button"
                        className="icon-action-btn danger"
                        onClick={() => handleRemoveChecklist(idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="sub-section-title mt-4">
                <h4>Notes & Preparation Details</h4>
              </div>
              <textarea
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Add interview feedback, referral notes, question topics..."
                className="modal-textarea"
              />
            </div>
          )}

          {/* Footer Actions */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? "Save Changes" : "Create Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
