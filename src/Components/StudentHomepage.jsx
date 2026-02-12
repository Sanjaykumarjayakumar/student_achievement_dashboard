import { useState, useEffect } from 'react';
import { Trophy, FolderGit2, Briefcase, FileBadge, Clock } from 'lucide-react';
import './StudentHomepage.css';

const StudentHomepage = ({ user }) => {
  const [stats, setStats] = useState({
    achievements: 0,
    projects: 0,
    internships: 0,
    certificates: 0,
    pendingVerifications: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const internships = JSON.parse(localStorage.getItem('internships') || '[]');
    const certificates = JSON.parse(localStorage.getItem('certificates') || '[]');

    const pending = achievements.filter(a => a.verificationStatus === 'pending').length;

    setStats({
      achievements: achievements.length,
      projects: projects.length,
      internships: internships.length,
      certificates: certificates.length,
      pendingVerifications: pending
    });

    const allActivities = [
      ...achievements.map((item) => ({
        title: item.title,
        category: item.category || 'student achievement dashboard project',
        date: item.date
      })),
      ...projects.map((item) => ({
        title: item.title,
        category: 'Project',
        date: item.startDate
      })),
      ...certificates.map((item) => ({
        title: item.name,
        category: 'Certificate',
        date: item.issueDate
      })),
      ...internships.map((item) => ({
        title: item.title,
        category: 'Internship',
        date: item.startDate
      }))
    ];

    const recent = allActivities
      .filter((item) => item.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setRecentActivities(recent);
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Professional student achievement record portal</p>
      </div>

      <div className="dashboard-top">
        <div className="profile-card">
          <div className="profile-photo">
            {user?.name?.charAt(0)?.toUpperCase() || 'S'}
          </div>
          <div className="profile-info">
            <h2>{user?.name || 'Student Name'}</h2>
            <p><span>Department:</span> {user?.department || 'Computer Science'}</p>
            <p><span>Roll No:</span> 7376231CS296</p>
            <p><span>Year:</span> {user?.year || '3rd Year'}</p>
          </div>
        </div>

        <div className="recent-card">
          <h2>Reacent Activeites</h2>
          {recentActivities.length > 0 ? (
            <div className="recent-table-wrap">
              <table className="recent-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity, index) => (
                    <tr key={`${activity.title}-${index}`}>
                      <td>{activity.title}</td>
                      <td>{activity.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">No recent activities available</div>
          )}
        </div>
      </div>

      <div className="summary-section">
        <h2>Achievement Summary</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon achievements">
              <Trophy size={26} />
            </div>
            <div className="stat-content">
              <h3>{stats.achievements}</h3>
              <p>Achievements</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon projects">
              <FolderGit2 size={26} />
            </div>
            <div className="stat-content">
              <h3>{stats.projects}</h3>
              <p>Projects</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon internships">
              <Briefcase size={26} />
            </div>
            <div className="stat-content">
              <h3>{stats.internships}</h3>
              <p>Internship</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon certificates">
              <FileBadge size={26} />
            </div>
            <div className="stat-content">
              <h3>{stats.certificates}</h3>
              <p>Certificates</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon pending">
              <Clock size={26} />
            </div>
            <div className="stat-content">
              <h3>{stats.pendingVerifications}</h3>
              <p>Pending Verifications</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHomepage;
