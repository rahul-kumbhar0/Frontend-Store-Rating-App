import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Loginpage.jsx';
import Register from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from './pages/NotFound.jsx';
import { isAuthenticated, getUserRole } from './services/auth';
import './App.css';

// Conditional Home Route Component
const HomeRoute = () => {
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  if (isLoggedIn) {
    // Redirect to appropriate dashboard
    switch (userRole) {
      case 'SYSTEM_ADMIN':
        return <Navigate to="/admin" replace />;
      case 'NORMAL_USER':
        return <Navigate to="/user" replace />;
      case 'STORE_OWNER':
        return <Navigate to="/store-owner" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <Home />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/store-owner"
            element={
              <ProtectedRoute>
                <StoreOwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;