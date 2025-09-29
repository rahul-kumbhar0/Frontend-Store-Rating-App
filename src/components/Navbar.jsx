import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUserRole, logout } from '../services/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#2d7aff',
      padding: '1rem',
      marginBottom: '2rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          fontSize: '1.5rem',
          fontWeight: 'bold'
        }}>
          Rating System
        </Link>
        
        <div>
          {!isLoggedIn ? (
            <>
              <Link to="/login" style={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '1rem'
              }}>
                Login
              </Link>
              <Link to="/register" style={{
                color: 'white',
                textDecoration: 'none'
              }}>
                Register
              </Link>
            </>
          ) : (
            <div>
              {userRole === 'SYSTEM_ADMIN' && (
                <Link to="/admin" style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '1rem'
                }}>
                  Admin
                </Link>
              )}
              {userRole === 'NORMAL_USER' && (
                <Link to="/user" style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '1rem'
                }}>
                  Dashboard
                </Link>
              )}
              {userRole === 'STORE_OWNER' && (
                <Link to="/store-owner" style={{
                  color: 'white',
                  textDecoration: 'none',
                  marginRight: '1rem'
                }}>
                  Store
                </Link>
              )}
              <button 
                onClick={handleLogout}
                style={{
                  color: 'white',
                  background: 'none',
                  border: '1px solid white',
                  padding: '5px 10px',
                  cursor: 'pointer'
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;