import React from "react";
import { 
  TrendingUp, 
  Award, 
  MessageSquareCheck, 
  Briefcase, 
  BarChart, 
  PieChart, 
  Layers, 
  Calendar,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function AnalyticsDashboard({ applications }) {
  const totalApps = applications.length;

  const countByStatus = (status) =>
    applications.filter((a) => a.status === status).length;

  const wishlistCount = countByStatus("Wishlist");
  const appliedCount = countByStatus("Applied");
  const assessmentCount = countByStatus("Assessment");
  const interviewCount = countByStatus("Interview");
  const offeredCount = countByStatus("Offered");
  const rejectedCount = countByStatus("Rejected");

  // Conversion Metrics
  const activeResponses = assessmentCount + interviewCount + offeredCount;
  const nonWishlistApps = totalApps - wishlistCount;
  const responseRate = nonWishlistApps > 0 
    ? Math.round((activeResponses / nonWishlistApps) * 100) 
    : 0;

  const interviewRate = nonWishlistApps > 0
    ? Math.round((interviewCount / nonWishlistApps) * 100)
    : 0;

  const offerRate = nonWishlistApps > 0
    ? Math.round((offeredCount / nonWishlistApps) * 100)
    : 0;

  // Workplace breakdown
  const remoteCount = applications.filter((a) => a.workplaceType === "Remote").length;
  const hybridCount = applications.filter((a) => a.workplaceType === "Hybrid").length;
  const onsiteCount = applications.filter((a) => a.workplaceType === "On-site").length;

  // Total Checklist Progress
  let totalTasks = 0;
  let completedTasks = 0;
  applications.forEach((a) => {
    if (a.checklist) {
      totalTasks += a.checklist.length;
      completedTasks += a.checklist.filter((c) => c.completed).length;
    }
  });
  const checklistPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const statusBars = [
    { label: "Wishlist", count: wishlistCount, color: "var(--status-wishlist)" },
    { label: "Applied", count: appliedCount, color: "var(--status-applied)" },
    { label: "Assessment / OA", count: assessmentCount, color: "var(--status-assessment)" },
    { label: "Interviewing", count: interviewCount, color: "var(--status-interview)" },
    { label: "Offered 🎉", count: offeredCount, color: "var(--status-offered)" },
    { label: "Rejected", count: rejectedCount, color: "var(--status-rejected)" }
  ];

  return (
    <div className="analytics-container animate-fade">
      {/* Top Stat Cards Grid */}
      <div className="stats-cards-grid">
        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper primary">
            <Briefcase size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Applications</span>
            <h3 className="stat-value">{totalApps}</h3>
            <span className="stat-sub">{nonWishlistApps} active submitted</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper interview">
            <MessageSquareCheck size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Active Interviews</span>
            <h3 className="stat-value">{interviewCount}</h3>
            <span className="stat-sub">{interviewRate}% interview rate</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper offer">
            <Award size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Offers Received</span>
            <h3 className="stat-value">{offeredCount}</h3>
            <span className="stat-sub">{offerRate}% offer conversion</span>
          </div>
        </div>

        <div className="stat-card glass-panel">
          <div className="stat-icon-wrapper rate">
            <TrendingUp size={22} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Response Rate</span>
            <h3 className="stat-value">{responseRate}%</h3>
            <span className="stat-sub">moved to OA or Interview</span>
          </div>
        </div>
      </div>

      {/* Main Charts & Funnel Section */}
      <div className="analytics-main-grid">
        {/* Application Conversion Funnel */}
        <div className="analytics-section glass-panel">
          <div className="section-header">
            <Layers size={18} />
            <h3>Application Conversion Funnel</h3>
          </div>

          <div className="funnel-container">
            <div className="funnel-step">
              <div className="funnel-bar-wrapper">
                <div 
                  className="funnel-bar" 
                  style={{ width: `${totalApps ? (appliedCount / totalApps) * 100 : 0}%`, backgroundColor: "var(--status-applied)" }}
                />
              </div>
              <div className="funnel-label">
                <span>Applied ({appliedCount})</span>
                <span>100%</span>
              </div>
            </div>

            <div className="funnel-step">
              <div className="funnel-bar-wrapper">
                <div 
                  className="funnel-bar" 
                  style={{ width: `${totalApps ? (assessmentCount / totalApps) * 100 : 0}%`, backgroundColor: "var(--status-assessment)" }}
                />
              </div>
              <div className="funnel-label">
                <span>Assessment / OA ({assessmentCount})</span>
                <span>{totalApps ? Math.round((assessmentCount / totalApps) * 100) : 0}%</span>
              </div>
            </div>

            <div className="funnel-step">
              <div className="funnel-bar-wrapper">
                <div 
                  className="funnel-bar" 
                  style={{ width: `${totalApps ? (interviewCount / totalApps) * 100 : 0}%`, backgroundColor: "var(--status-interview)" }}
                />
              </div>
              <div className="funnel-label">
                <span>Interviewing ({interviewCount})</span>
                <span>{totalApps ? Math.round((interviewCount / totalApps) * 100) : 0}%</span>
              </div>
            </div>

            <div className="funnel-step">
              <div className="funnel-bar-wrapper">
                <div 
                  className="funnel-bar" 
                  style={{ width: `${totalApps ? (offeredCount / totalApps) * 100 : 0}%`, backgroundColor: "var(--status-offered)" }}
                />
              </div>
              <div className="funnel-label">
                <span>Offered ({offeredCount})</span>
                <span>{totalApps ? Math.round((offeredCount / totalApps) * 100) : 0}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Breakdown Bar List */}
        <div className="analytics-section glass-panel">
          <div className="section-header">
            <BarChart size={18} />
            <h3>Status Distribution</h3>
          </div>

          <div className="status-bars-list">
            {statusBars.map((item, i) => {
              const pct = totalApps ? Math.round((item.count / totalApps) * 100) : 0;
              return (
                <div key={i} className="status-bar-row">
                  <div className="status-label-group">
                    <span className="status-indicator-dot" style={{ backgroundColor: item.color }} />
                    <span className="status-name">{item.label}</span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${pct}%`, backgroundColor: item.color }} />
                  </div>
                  <span className="status-count-pct">
                    <strong>{item.count}</strong> ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Insights Grid */}
      <div className="insights-grid">
        {/* Workplace Distribution */}
        <div className="insight-card glass-panel">
          <div className="section-header">
            <PieChart size={18} />
            <h3>Workplace Preference</h3>
          </div>
          <div className="workplace-stats">
            <div className="workplace-item">
              <span className="wp-type">Remote</span>
              <strong className="wp-val">{remoteCount}</strong>
            </div>
            <div className="workplace-item">
              <span className="wp-type">Hybrid</span>
              <strong className="wp-val">{hybridCount}</strong>
            </div>
            <div className="workplace-item">
              <span className="wp-type">On-site</span>
              <strong className="wp-val">{onsiteCount}</strong>
            </div>
          </div>
        </div>

        {/* Action Checklist Completeness */}
        <div className="insight-card glass-panel">
          <div className="section-header">
            <CheckCircle2 size={18} />
            <h3>Checklist Completion Rate</h3>
          </div>
          <div className="checklist-metric-box">
            <div className="circle-progress">
              <span>{checklistPercentage}%</span>
            </div>
            <p className="checklist-sub">
              {completedTasks} of {totalTasks} preparation tasks completed across all applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
