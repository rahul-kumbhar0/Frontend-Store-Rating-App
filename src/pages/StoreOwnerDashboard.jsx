import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordChangeForm from '../components/PasswordChangeForm';
import { apiRequest } from '../services/api';
import { isAuthenticated, getUserRole } from '../services/auth';

const StoreOwnerDashboard = () => {
  const [storeData, setStoreData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== 'STORE_OWNER') {
      navigate('/login');
      return;
    }
    fetchStoreData();
  }, [navigate]);

  const fetchStoreData = async () => {
    try {
      console.log('=== Fetching Store Data ===');
      const data = await apiRequest('/store-owner/dashboard');
      console.log('Store data received:', data);
      setStoreData(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch store data:', err);
      setError(err.message || 'Failed to fetch store data');
      // Show more detailed error
      if (err.message && err.message.includes('404')) {
        setError('No store assigned to you yet. Please contact admin.');
      }
      setLoading(false);
    }
  };

  const handlePasswordChangeSuccess = () => {
    setShowPasswordForm(false);
    alert('Password changed successfully!');
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  
  if (error) return (
    <div style={{ padding: '20px', color: 'red' }}>
      Error: {error}
      <button 
        onClick={() => navigate('/')}
        style={{
          marginLeft: '20px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Go Home
      </button>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Store Owner Dashboard</h1>
        <button 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {showPasswordForm ? 'Cancel Change Password' : 'Change Password'}
        </button>
      </div>
      
      {showPasswordForm && (
        <PasswordChangeForm 
          onSuccess={handlePasswordChangeSuccess}
          onCancel={() => setShowPasswordForm(false)}
          userType="store-owner"
        />
      )}
      
      {storeData?.store ? (
        <div>
          <div style={{ 
            border: '1px solid #ccc', 
            padding: '20px',
            marginBottom: '20px',
            borderRadius: '4px'
          }}>
            <h2>{storeData.store.name}</h2>
            <p><strong>Email:</strong> {storeData.store.email}</p>
            <p><strong>Address:</strong> {storeData.store.address}</p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '20px',
            marginBottom: '20px'
          }}>
            <div style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              <h3>Average Rating</h3>
              <p style={{ fontSize: '2rem' }}>{storeData.averageRating}</p>
            </div>
            
            <div style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              <h3>Total Ratings</h3>
              <p style={{ fontSize: '2rem' }}>{storeData.totalRatings}</p>
            </div>
          </div>
          
          <h3>Recent Ratings</h3>
          {storeData.recentRatings?.length > 0 ? (
            <div style={{ 
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}>
              {storeData.recentRatings.map((rating) => (
                <div 
                  key={rating.id} 
                  style={{ 
                    padding: '15px', 
                    borderBottom: '1px solid #eee' 
                  }}
                >
                  <p><strong>Rating:</strong> {rating.rating} stars</p>
                  <p><strong>User:</strong> {rating.User?.name || 'Anonymous'}</p>
                  <p><strong>Date:</strong> {new Date(rating.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No ratings yet.</p>
          )}
        </div>
      ) : (
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '20px',
          textAlign: 'center',
          borderRadius: '4px'
        }}>
          <h3>No Store Assigned</h3>
          <p>You don't have a store assigned to your account yet.</p>
          <p>Please contact the system administrator to assign you a store.</p>
        </div>
      )}
    </div>
  );
};

export default StoreOwnerDashboard;