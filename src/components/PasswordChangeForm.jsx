import React, { useState } from 'react';
import { apiRequest } from '../services/api';

const PasswordChangeForm = ({ onSuccess, onCancel, userType = 'user' }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { currentPassword, newPassword, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      setError('Password must be between 8 and 16 characters');
      setLoading(false);
      return;
    }

    try {
      // Determine the correct endpoint based on user type
      let endpoint = '/user/change-password';
      if (userType === 'store-owner') {
        endpoint = '/store-owner/change-password';
      }

      await apiRequest(endpoint, 'PUT', {
        currentPassword,
        newPassword
      });

      setSuccess(true);
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(onSuccess, 2000);
      }
    } catch (err) {
      setError(err.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '20px', 
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h3>Change Password</h3>
      
      {success && (
        <div style={{ color: 'green', marginBottom: '10px' }}>
          Password changed successfully!
        </div>
      )}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={onChange}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px'
            }}
          />
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>New Password:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={onChange}
            required
            minLength="8"
            maxLength="16"
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px'
            }}
          />
          <small>8-16 chars, 1 uppercase, 1 special char</small>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label>Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            required
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px'
            }}
          />
        </div>
        
        <div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
          >
            {loading ? 'Changing...' : 'Change Password'}
          </button>
          
          {onCancel && (
            <button 
              type="button"
              onClick={onCancel}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#6c757d', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PasswordChangeForm;