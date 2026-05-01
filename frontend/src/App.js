import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import ResultPage from './pages/ResultPage';
import LandingPage from './pages/LandingPage'; 
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const isAuthenticated = () => !!localStorage.getItem('token');
  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role || 'student';
  }

  const ProtectedRoute = ({ children, adminOnly = false }) => {  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const userRole = getUserRole();

  if (adminOnly && userRole !== 'admin') return <Navigate to="/dashboard" />;
  
  return children;
};

// Root redirect based on role
  const RootRedirect = () => {
    if (!isAuthenticated()) return <Navigate to="/" />;
    const role = getUserRole();
    return <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page - bisa diakses semua */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/*Student routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />

        {/*Fallback route */}
        <Route path="/app" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;