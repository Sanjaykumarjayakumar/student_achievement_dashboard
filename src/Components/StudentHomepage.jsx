import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, FolderGit2, FileBadge, Clock } from 'lucide-react';
import './StudentHomepage.css';

const StudentHomepage = ({ user }) => {
  const [stats, setStats] = useState({
    achievements: 0,
    projects: 0,
    certificates: 0,
    pendingVerifications: 0
  });
  const [recentAchievements, setRecentAchievements] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      const projects = JSON.parse(localStorage.getItem('projects') || '[]');
      const internships = JSON.parse(localStorage.getItem('internships') || '[]');
      const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');
      const pending = achievements.filter((a) => a.verificationStatus === 'pending').length;

      setStats({
        achievements: achievements.length,
        projects: projects.length,
        certificates: certificates.length,
        pendingVerifications: pending
      });

      const achievementsOnly = [...achievements]
        .map((item) => ({
          title: item.title,
          category: item.category || 'General',
          date: item.date,
          status: item.verificationStatus || 'pending'
        }))
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setRecentAchievements(achievementsOnly);

      const allActivities = [
        ...achievements.map((item) => ({ text: `Achievement added: ${item.title}`, date: item.date })),
        ...projects.map((item) => ({ text: `Project added: ${item.title}`, date: item.startDate })),
        ...certificates.map((item) => ({ text: `Certificate added: ${item.name}`, date: item.issueDate })),
        ...internships.map((item) => ({ text: `Internship added: ${item.title}`, date: item.startDate }))
      ]
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

      setRecentActivities(allActivities);
      setLoading(false);
    }, 300);
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { label: 'Verified', className: 'status-verified' },
      pending: { label: 'Pending', className: 'status-pending' },
      rejected: { label: 'Rejected', className: 'status-rejected' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.className}`}>{config.label}</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user?.name || 'Student'}!</h1>
          <p>Here&apos;s your achievement summary and recent activity</p>
        </div>
      </div>

      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card stat-achievements">
            <div className="stat-header">
              <div className="stat-icon">
                <Trophy size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>{loading ? '...' : stats.achievements}</h3>
              <p>Total Achievements</p>
            </div>
          </div>

          <div className="stat-card stat-projects">
            <div className="stat-header">
              <div className="stat-icon">
                <FolderGit2 size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>{loading ? '...' : stats.projects}</h3>
              <p>Projects Completed</p>
            </div>
          </div>

          <div className="stat-card stat-certificates">
            <div className="stat-header">
              <div className="stat-icon">
                <FileBadge size={24} />
              </div>
            </div>
            <div className="stat-content">
              <h3>{loading ? '...' : stats.certificates}</h3>
              <p>Certificates Earned</p>
            </div>
          </div>

          <div className="stat-card stat-pending">
            <div className="stat-header">
              <div className="stat-icon">
                <Clock size={24} />
              </div>
              {stats.pendingVerifications > 0 && (
                <span className="stat-badge-alert">{stats.pendingVerifications}</span>
              )}
            </div>
            <div className="stat-content">
              <h3>{loading ? '...' : stats.pendingVerifications}</h3>
              <p>Pending Reviews</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="profile-section">
          <div className="profile-card">
            <div className="profile-banner"></div>
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'S'}
              </div>
            </div>
            <div className="profile-details">
              <h2>{user?.name || 'Student Name'}</h2>
              <p className="profile-role">Student</p>
            </div>
            <div className="profile-info-grid">
              <div className="info-item">
                <span className="info-label">Roll No</span>
                <span className="info-value">7376231CS296</span>
              </div>
              <div className="info-item">
                <span className="info-label">Department</span>
                <span className="info-value">{user?.department || 'Computer Science'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Year</span>
                <span className="info-value">{user?.year || '3rd Year'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user?.email || 'student@college.edu'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="achievements-section">
          <div className="recent-card">
            <div className="card-header">
              <h2>Recent Achievements</h2>
              <button className="view-all-btn" onClick={() => navigate('/achievements')}>View All</button>
            </div>
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading achievements...</p>
              </div>
            ) : recentAchievements.length > 0 ? (
              <div className="achievements-list">
                {recentAchievements.map((achievement, index) => (
                  <div key={`${achievement.title}-${index}`} className="achievement-item">
                    <div className="achievement-icon">
                      <Trophy size={20} />
                    </div>
                    <div className="achievement-content">
                      <div className="achievement-header">
                        <h4>{achievement.title}</h4>
                        {getStatusBadge(achievement.status)}
                      </div>
                      <p className="achievement-category">{achievement.category}</p>
                      <p className="achievement-date">{formatDate(achievement.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No recent achivement</h3>
              </div>
            )}
          </div>

          <div className="activity-card">
            <h3>Recent Activity</h3>
            {recentActivities.length > 0 ? (
              <div className="activity-timeline">
                {recentActivities.map((activity, index) => (
                  <div key={`${activity.text}-${index}`} className="timeline-item">
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                      <p className="timeline-text">{activity.text}</p>
                      <p className="timeline-time">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No recent activity</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHomepage;
