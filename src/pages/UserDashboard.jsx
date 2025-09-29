import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordChangeForm from '../components/PasswordChangeForm';
import { apiRequest } from '../services/api';
import { isAuthenticated, getUserRole } from '../services/auth';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState(0);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== 'NORMAL_USER') {
      navigate('/login');
      return;
    }
    fetchStores();
  }, [navigate]);

  const fetchStores = async (name = '', address = '') => {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (name) queryParams.append('name', name);
      if (address) queryParams.append('address', address);
      
      const endpoint = `/user/stores${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const storesData = await apiRequest(endpoint);
      setStores(storesData);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to fetch stores');
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchStores(searchTerm, searchAddress);
  };

  const submitRating = async () => {
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    try {
      if (selectedStore.userRatingId) {
        // Update existing rating - FIXED: Include storeId in the request
        await apiRequest(`/user/ratings/${selectedStore.userRatingId}`, 'PUT', {
          rating: parseInt(rating),
          storeId: parseInt(selectedStore.id)  // ← THIS WAS MISSING!
        });
      } else {
        // Create new rating
        await apiRequest('/user/ratings', 'POST', {
          rating: parseInt(rating),
          storeId: parseInt(selectedStore.id)
        });
      }
      fetchStores(searchTerm, searchAddress); // Refresh stores with current search
      setSelectedStore(null);
      setRating(0);
      alert('Rating submitted successfully!');
    } catch (err) {
      alert('Failed to submit rating: ' + (err.message || 'Unknown error'));
    }
  };

  const handlePasswordChangeSuccess = () => {
    setShowPasswordForm(false);
    alert('Password changed successfully!');
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>User Dashboard</h1>
        <button 
          onClick={() => setShowPasswordForm(!showPasswordForm)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
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
          userType="user"
        />
      )}
      
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #dee2e6',
        marginBottom: '30px'
      }}>
        <h3>Search Stores</h3>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <input
            type="text"
            placeholder="Search by store name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <input
            type="text"
            placeholder="Search by address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button 
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSearchAddress('');
              fetchStores();
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      </div>
      
      {selectedStore ? (
        <div style={{ 
          border: '1px solid #ccc', 
          padding: '20px', 
          marginBottom: '20px',
          borderRadius: '4px'
        }}>
          <h2>Rate {selectedStore.name}</h2>
          <p>Select your rating (1-5 stars):</p>
          
          <div style={{ margin: '20px 0' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{
                  fontSize: '24px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: star <= rating ? '#ffc107' : '#ddd'
                }}
              >
                ★
              </button>
            ))}
            {rating > 0 && <span style={{ marginLeft: '10px' }}>({rating} stars)</span>}
          </div>
          
          <button 
            onClick={submitRating}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Submit Rating
          </button>
          
          <button 
            onClick={() => {
              setSelectedStore(null);
              setRating(0);
            }}
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
        </div>
      ) : null}
      
      <h2>Available Stores ({stores.length})</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px' 
      }}>
        {stores.map((store) => (
          <div 
            key={store.id} 
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              borderRadius: '4px'
            }}
          >
            <h3>{store.name}</h3>
            <p><strong>Address:</strong> {store.address}</p>
            <p><strong>Overall Rating:</strong> {store.overallRating || 'No ratings yet'}</p>
            {store.userRating && (
              <p><strong>Your Rating:</strong> {store.userRating} stars</p>
            )}
            <button 
              onClick={() => setSelectedStore(store)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {store.userRating ? 'Update Rating' : 'Rate Store'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;