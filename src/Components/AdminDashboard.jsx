import { useState, useEffect } from 'react';
import { Search, Eye, Check, X, Clock, Trophy, FileBadge, FolderGit2 } from 'lucide-react';
import ViewRequestModal from './ViewRequestModal';
import DeclineModal from './DeclineModal';
import { useToast } from './ToastProvider';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('achievements');
  const [searchTerm, setSearchTerm] = useState('');
  const [achievements, setAchievements] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [stats, setStats] = useState({
    totalPending: 0,
    achievementsPending: 0,
    certificatesPending: 0,
    projectsPending: 0
  });

  useEffect(() => {
    loadPendingRequests();
  }, []);

  const loadPendingRequests = () => {
    // Load all data from localStorage
    const allAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
    const allCertificates = JSON.parse(localStorage.getItem('certificates') || '[]');
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Filter only pending requests
    const pendingAchievements = allAchievements.filter(item => item.verificationStatus === 'pending');
    const pendingCertificates = allCertificates.filter(item => item.verificationStatus === 'pending');
    const pendingProjects = allProjects.filter(item => item.verificationStatus === 'pending');

    setAchievements(pendingAchievements);
    setCertificates(pendingCertificates);
    setProjects(pendingProjects);

    // Update stats
    setStats({
      totalPending: pendingAchievements.length + pendingCertificates.length + pendingProjects.length,
      achievementsPending: pendingAchievements.length,
      certificatesPending: pendingCertificates.length,
      projectsPending: pendingProjects.length
    });
  };

  const handleApprove = (item, type) => {
    // Get all items from localStorage
    const storageKey = type === 'achievement' ? 'achievements' : 
                       type === 'certificate' ? 'certificates' : 'projects';
    const allItems = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Update the verification status
    const updatedItems = allItems.map(i => 
      i.id === item.id ? { ...i, verificationStatus: 'verified' } : i
    );

    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));

    // Reload pending requests
    loadPendingRequests();

    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} approved successfully!`);
  };

  const handleDeclineClick = (item, type) => {
    setSelectedRequest({ ...item, type });
    setShowDeclineModal(true);
  };

  const handleDeclineConfirm = (remarks) => {
    const { type, ...item } = selectedRequest;
    const storageKey = type === 'achievement' ? 'achievements' : 
                       type === 'certificate' ? 'certificates' : 'projects';
    const allItems = JSON.parse(localStorage.getItem(storageKey) || '[]');

    // Update the verification status and add remarks
    const updatedItems = allItems.map(i => 
      i.id === item.id ? { ...i, verificationStatus: 'rejected', remarks } : i
    );

    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));

    // Reload pending requests
    loadPendingRequests();
    setShowDeclineModal(false);
    setSelectedRequest(null);

    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} declined`);
  };

  const handleViewDetails = (item, type) => {
    setSelectedRequest({ ...item, type });
    setShowViewModal(true);
  };

  const filterData = (data) => {
    if (!searchTerm) return data;

    const search = searchTerm.toLowerCase();
    return data.filter(item => {
      const name = item.studentName?.toLowerCase() || '';
      const rollNo = item.rollNo?.toLowerCase() || '';
      const title = (item.title || item.name)?.toLowerCase() || '';
      
      return name.includes(search) || rollNo.includes(search) || title.includes(search);
    });
  };

  const renderTable = (data, type) => {
    const filteredData = filterData(data);

    if (filteredData.length === 0) {
      return (
        <div className="no-data">
          <Clock size={48} />
          <p>No pending {type} requests</p>
        </div>
      );
    }

    return (
      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll No</th>
              <th>Title</th>
              <th>Submitted On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.studentName || 'Student'}</td>
                <td>{item.rollNo || 'N/A'}</td>
                <td>{item.title || item.name || 'N/A'}</td>
                <td>{formatDate(item.date || item.issueDate || item.startDate)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-view"
                      onClick={() => handleViewDetails(item, type)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="btn-approve"
                      onClick={() => handleApprove(item, type)}
                      title="Approve"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      className="btn-decline"
                      onClick={() => handleDeclineClick(item, type)}
                      title="Decline"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="admin-dashboard-container">
      {/* Header Section */}
      <div className="admin-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <p>Review and manage pending verification requests</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.totalPending}</h3>
              <p>Total Pending</p>
            </div>
          </div>

          <div className="stat-card achievements">
            <div className="stat-icon">
              <Trophy size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.achievementsPending}</h3>
              <p>Achievements</p>
            </div>
          </div>

          <div className="stat-card certificates">
            <div className="stat-icon">
              <FileBadge size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.certificatesPending}</h3>
              <p>Certificates</p>
            </div>
          </div>

          <div className="stat-card projects">
            <div className="stat-icon">
              <FolderGit2 size={24} />
            </div>
            <div className="stat-content">
              <h3>{stats.projectsPending}</h3>
              <p>Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, roll number, or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <Trophy size={18} />
            Achievements
            {stats.achievementsPending > 0 && (
              <span className="badge">{stats.achievementsPending}</span>
            )}
          </button>
          <button
            className={`tab ${activeTab === 'certificates' ? 'active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            <FileBadge size={18} />
            Certificates
            {stats.certificatesPending > 0 && (
              <span className="badge">{stats.certificatesPending}</span>
            )}
          </button>
          <button
            className={`tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <FolderGit2 size={18} />
            Projects
            {stats.projectsPending > 0 && (
              <span className="badge">{stats.projectsPending}</span>
            )}
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="content-section">
        {activeTab === 'achievements' && renderTable(achievements, 'achievement')}
        {activeTab === 'certificates' && renderTable(certificates, 'certificate')}
        {activeTab === 'projects' && renderTable(projects, 'project')}
      </div>

      {/* Modals */}
      {showViewModal && selectedRequest && (
        <ViewRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowViewModal(false);
            setSelectedRequest(null);
          }}
          onApprove={() => {
            handleApprove(selectedRequest, selectedRequest.type);
            setShowViewModal(false);
            setSelectedRequest(null);
          }}
          onDecline={() => {
            setShowViewModal(false);
            setShowDeclineModal(true);
          }}
        />
      )}

      {showDeclineModal && selectedRequest && (
        <DeclineModal
          onClose={() => {
            setShowDeclineModal(false);
            setSelectedRequest(null);
          }}
          onConfirm={handleDeclineConfirm}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
