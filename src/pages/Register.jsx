import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiRequest } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { name, email, password, address } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await apiRequest('/auth/register', 'POST', {
        name,
        email,
        password,
        address
      });

      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ color: '#333', marginBottom: '0.5rem' }}>
            Create an Account
          </h2>
          <p style={{ color: '#666' }}>Fill in your details to register</p>
        </div>

        {error && (
          <div
            style={{
              color: '#721c24',
              backgroundColor: '#f8d7da',
              border: '1px solid #f5c6cb',
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
            }}
            aria-live="polite"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#333',
                fontWeight: '500',
              }}
              htmlFor="nameInput"
            >
              Full Name (20–60 characters)
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              minLength="20"
              maxLength="60"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
              id="nameInput"
              autoComplete="name"
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#333',
                fontWeight: '500',
              }}
              htmlFor="emailInput"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
              id="emailInput"
              autoComplete="email"
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#333',
                fontWeight: '500',
              }}
              htmlFor="passwordInput"
            >
              Password (8–16 chars, 1 uppercase, 1 special)
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="8"
              maxLength="16"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
              id="passwordInput"
              autoComplete="new-password"
              placeholder="Enter your password"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#333',
                fontWeight: '500',
              }}
              htmlFor="addressInput"
            >
              Address (max 400 characters)
            </label>
            <textarea
              name="address"
              value={address}
              onChange={onChange}
              required
              maxLength="400"
              rows="3"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem',
                boxSizing: 'border-box',
              }}
              id="addressInput"
              autoComplete="street-address"
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
            }}
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid #eee',
          }}
        >
          <p style={{ color: '#666', marginBottom: '0.5rem' }}>
            Already have an account?{' '}
            <Link
              to="/login"
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontWeight: '500',
              }}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
