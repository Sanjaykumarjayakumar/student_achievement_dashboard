import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Trophy, FileBadge, FolderGit2, Briefcase, LogOut } from 'lucide-react';
import { FaGraduationCap } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const studentLinks = [
    { path: '/homepage', label: 'Achievement Portal Dashboard', icon: LayoutDashboard },
    { path: '/achievements', label: 'Achievements', icon: Trophy },
    { path: '/certificates', label: 'Certificates', icon: FileBadge },
    { path: '/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/internships', label: 'Internships', icon: Briefcase },
  ];

  const teacherLinks = [
    { path: '/admindashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/manage-students', label: 'Manage Students', icon: Trophy },
    { path: '/verify-achievements', label: 'Verify Achievements', icon: FileBadge },
  ];

  const links = user?.role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <div className="navbar-logo">
          <FaGraduationCap size={24} color="#FFFFFF" className="logo-icon" />
          <span className="logo-text">Achievement Portal</span>
        </div>
      </div>

      <div className="navbar-menu">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar-item ${isActive(link.path)}`}
            >
              <Icon className="navbar-icon" size={20} />
              <span className="navbar-label">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="navbar-footer">
        <div className="navbar-user">
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-role">{user?.rollNo || '7376231CS296'}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
