import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path fill="currentColor" d="M21.8 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.5c-.2 1.3-.9 2.4-2 3.1v2.6h3.2c1.9-1.7 3.1-4.3 3.1-7.7Z" />
    <path fill="currentColor" d="M12 22c2.7 0 5-.9 6.7-2.5l-3.2-2.6c-.9.6-2 .9-3.5.9-2.7 0-4.9-1.8-5.7-4.2H3v2.7C4.7 19.6 8.1 22 12 22Z" />
    <path fill="currentColor" d="M6.3 13.6c-.2-.6-.3-1.1-.3-1.6s.1-1.1.3-1.6V7.7H3C2.4 9 2 10.5 2 12s.4 3 1 4.3l3.3-2.7Z" />
    <path fill="currentColor" d="M12 6.2c1.5 0 2.8.5 3.8 1.4l2.9-2.9C17 3.2 14.7 2 12 2 8.1 2 4.7 4.4 3 7.7l3.3 2.7c.8-2.4 3-4.2 5.7-4.2Z" />
  </svg>
);

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      username: formData.username,
      role: 'student',
      name: formData.username,
      email: `${formData.username}@college.edu`,
      department: 'Computer Science',
      year: '3rd Year',
      rollNo: '7376231CS296'
    };

    onLogin(userData);
    navigate('/homepage');
  };

  const handleGoogleLogin = () => {
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      username: 'google.student',
      role: 'student',
      name: 'Google Student',
      email: 'google.student@college.edu',
      department: 'Computer Science',
      year: '3rd Year',
      rollNo: '7376231CS296'
    };

    onLogin(userData);
    navigate('/homepage');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Student Achievement Dashboard</h1>
          <p>Please login to your account</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>

          <button type="button" className="btn-google" onClick={handleGoogleLogin}>
            <GoogleIcon />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
