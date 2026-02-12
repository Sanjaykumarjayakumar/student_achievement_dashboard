import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
import Navbar from './Components/Navbar';
import StudentHomepage from './Components/StudentHomepage';
import Achievements from './Components/Achievements';
import Certificates from './Components/Certificates';
import Projects from './Components/Projects';
import Internships from './Components/Internships';
import InternshipDetails from './Components/InternshipDetails';
import ToastProvider from './Components/ToastProvider';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return (
      <div className="app-layout">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="main-content">
          {children}
        </div>
      </div>
    );
  };

  return (
    <ToastProvider>
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/homepage" replace /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={user ? <Navigate to="/homepage" replace /> : <Registration onLogin={handleLogin} />} />
          
          <Route path="/homepage" element={
            <ProtectedRoute>
              <StudentHomepage user={user} />
            </ProtectedRoute>
          } />
          
          <Route path="/achievements" element={
            <ProtectedRoute>
              <Achievements />
            </ProtectedRoute>
          } />
          
          <Route path="/certificates" element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          } />
          
          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />

          <Route path="/internships" element={
            <ProtectedRoute>
              <Internships />
            </ProtectedRoute>
          } />

          <Route path="/internships/:id" element={
            <ProtectedRoute>
              <InternshipDetails />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to={user ? "/homepage" : "/login"} replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
