import React, { useState } from "react";
import {
  Briefcase,
  Search,
  MapPin,
  DollarSign,
  ExternalLink,
  CheckCircle2,
  Clock,
  Bookmark,
  Send,
  Sparkles,
  Calendar,
  Building,
  UserCheck,
  Tag,
  ChevronRight
} from "lucide-react";

export default function ClientPortal({
  applications,
  onQuickApply,
  onOpenCreateModal
}) {
  const [clientTab, setClientTab] = useState("browse"); // "browse" | "my-applications"
  const [searchQuery, setSearchQuery] = useState("");
  const [filterWorkplace, setFilterWorkplace] = useState("All");
  const [applyingJob, setApplyingJob] = useState(null);

  // Quick Apply Modal Form state
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantResume, setApplicantResume] = useState("");
  const [applicantNotes, setApplicantNotes] = useState("");

  const myApplications = applications;
  const activeInterviews = applications.filter((a) => a.status === "Interview").length;
  const offersCount = applications.filter((a) => a.status === "Offered").length;

  const filteredJobs = myApplications.filter((app) => {
    const matchesSearch =
      !searchQuery ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesWorkplace =
      filterWorkplace === "All" || app.workplaceType === filterWorkplace;

    return matchesSearch && matchesWorkplace;
  });

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyingJob) return;

    onQuickApply({
      ...applyingJob,
      _id: undefined, // New copy for applicant
      status: "Applied",
      appliedDate: new Date(),
      contactName: applicantName,
      contactEmail: applicantEmail,
      resumeLink: applicantResume,
      notes: applicantNotes ? `${applyingJob.notes}\n[Applicant Note]: ${applicantNotes}` : applyingJob.notes
    });

    setApplyingJob(null);
    setApplicantName("");
    setApplicantEmail("");
    setApplicantResume("");
    setApplicantNotes("");
    setClientTab("my-applications");
  };

  return (
    <div className="client-portal-container animate-fade">
      {/* Client Hero Header */}
      <div className="client-hero glass-panel">
        <div className="client-hero-text">
          <span className="client-badge">
            <UserCheck size={14} /> Student / Job Seeker Portal
          </span>
          <h1>Find & Track Your Next Internship</h1>
          <p>Discover top tech openings, track your application pipeline, and prepare for interviews.</p>
        </div>

        {/* Hero Quick Stats */}
        <div className="client-hero-stats">
          <div className="client-stat-card">
            <span>Total Applied</span>
            <strong>{myApplications.length}</strong>
          </div>
          <div className="client-stat-card highlight-interview">
            <span>Interviews</span>
            <strong>{activeInterviews}</strong>
          </div>
          <div className="client-stat-card highlight-offer">
            <span>Offers</span>
            <strong>{offersCount}</strong>
          </div>
        </div>
      </div>

      {/* Client Navigation Tabs */}
      <div className="client-nav-bar glass-panel">
        <div className="client-tabs">
          <button
            className={`client-tab-btn ${clientTab === "browse" ? "active" : ""}`}
            onClick={() => setClientTab("browse")}
          >
            <Briefcase size={16} />
            <span>Browse Job Directory ({filteredJobs.length})</span>
          </button>
          <button
            className={`client-tab-btn ${clientTab === "my-applications" ? "active" : ""}`}
            onClick={() => setClientTab("my-applications")}
          >
            <CheckCircle2 size={16} />
            <span>My Submitted Applications ({myApplications.length})</span>
          </button>
        </div>

        {clientTab === "browse" && (
          <button className="btn btn-primary" onClick={onOpenCreateModal}>
            <Sparkles size={16} /> Post Custom Job
          </button>
        )}
      </div>

      {/* Tab Content: Browse Jobs */}
      {clientTab === "browse" && (
        <div className="client-browse-section">
          {/* Search & Filter Bar */}
          <div className="client-filter-bar glass-panel">
            <div className="search-wrapper flex-1">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search company name, role title, location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input w-full"
              />
            </div>

            <div className="filter-group">
              <span className="filter-label">Workplace:</span>
              {["All", "Remote", "Hybrid", "On-site"].map((wp) => (
                <button
                  key={wp}
                  className={`filter-chip ${filterWorkplace === wp ? "active" : ""}`}
                  onClick={() => setFilterWorkplace(wp)}
                >
                  {wp}
                </button>
              ))}
            </div>
          </div>

          {/* Job Openings Grid */}
          <div className="jobs-grid">
            {filteredJobs.length === 0 ? (
              <div className="glass-panel empty-jobs-card">
                <p>No job postings match your criteria.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div key={job._id} className="job-card glass-card">
                  <div className="job-card-header">
                    <div className="job-company-icon">
                      <Building size={20} />
                    </div>
                    <div>
                      <h3 className="job-company">{job.company}</h3>
                      <h4 className="job-title">{job.position}</h4>
                    </div>
                    <span className={`badge badge-${job.status.toLowerCase().replace(/\s+/g, "")}`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="job-card-meta">
                    {job.location && (
                      <span className="meta-chip">
                        <MapPin size={12} /> {job.location}
                      </span>
                    )}
                    {job.salary && (
                      <span className="meta-chip highlight">
                        <DollarSign size={12} /> {job.salary}
                      </span>
                    )}
                    {job.workplaceType && (
                      <span className="meta-chip">{job.workplaceType}</span>
                    )}
                    {job.jobType && (
                      <span className="meta-chip">{job.jobType}</span>
                    )}
                  </div>

                  {job.notes && (
                    <p className="job-description">
                      {job.notes.length > 120 ? `${job.notes.substring(0, 120)}...` : job.notes}
                    </p>
                  )}

                  {job.tags && job.tags.length > 0 && (
                    <div className="card-tags">
                      {job.tags.map((t, idx) => (
                        <span key={idx} className="tag-pill">
                          <Tag size={10} /> {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="job-card-footer">
                    {job.jobLink ? (
                      <a
                        href={job.jobLink}
                        target="_blank"
                        rel="noreferrer"
                        className="link-btn"
                      >
                        <ExternalLink size={13} /> View Listing
                      </a>
                    ) : (
                      <span />
                    )}

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => setApplyingJob(job)}
                    >
                      <Send size={14} /> Quick Apply
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab Content: My Applications Timeline */}
      {clientTab === "my-applications" && (
        <div className="my-apps-section glass-panel">
          <div className="section-header">
            <CheckCircle2 size={20} />
            <h3>Your Application Progress & Timeline</h3>
          </div>

          <div className="my-apps-list">
            {myApplications.length === 0 ? (
              <p className="empty-sub-text">You haven't submitted any applications yet.</p>
            ) : (
              myApplications.map((app) => (
                <div key={app._id} className="app-timeline-card glass-card">
                  <div className="timeline-left">
                    <div className="timeline-dot" />
                    <div>
                      <h4 className="app-company-name">{app.company}</h4>
                      <p className="app-position-name">{app.position}</p>
                      <span className="app-date">
                        Applied on {new Date(app.appliedDate || app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="timeline-center">
                    <span className={`badge badge-${app.status.toLowerCase().replace(/\s+/g, "")}`}>
                      <span className="badge-dot" />
                      {app.status}
                    </span>
                    {app.salary && <span className="salary-pill">{app.salary}</span>}
                  </div>

                  <div className="timeline-right">
                    {app.interviewRounds && app.interviewRounds.length > 0 ? (
                      <div className="interview-badge-box">
                        <Calendar size={13} />
                        <span>{app.interviewRounds.length} Interview Rounds</span>
                      </div>
                    ) : (
                      <span className="text-muted text-sm">Under Review</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Quick Apply Modal for Applicant */}
      {applyingJob && (
        <div className="modal-backdrop">
          <div className="modal-content glass-panel animate-slide small-modal">
            <div className="modal-header">
              <div className="modal-title-group">
                <Send className="modal-icon" />
                <h2>Quick Apply — {applyingJob.company}</h2>
              </div>
              <button className="icon-action-btn" onClick={() => setApplyingJob(null)}>
                ×
              </button>
            </div>

            <form onSubmit={handleApplySubmit} className="modal-form">
              <div className="form-tab-content">
                <div className="job-summary-box glass-card">
                  <strong>{applyingJob.position}</strong>
                  <p>{applyingJob.company} • {applyingJob.location || "Remote"}</p>
                </div>

                <label className="form-label">
                  Your Full Name *
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  Your Email *
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@university.edu"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  Resume / Portfolio Link
                  <input
                    type="url"
                    placeholder="https://drive.google.com/your-resume.pdf"
                    value={applicantResume}
                    onChange={(e) => setApplicantResume(e.target.value)}
                  />
                </label>

                <label className="form-label">
                  Cover Note / Message to Recruiter
                  <textarea
                    rows={3}
                    placeholder="Briefly state why you're interested in this role..."
                    value={applicantNotes}
                    onChange={(e) => setApplicantNotes(e.target.value)}
                    className="modal-textarea"
                  />
                </label>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setApplyingJob(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={16} /> Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
