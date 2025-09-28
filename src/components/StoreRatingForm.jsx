import React, { useState } from 'react';
import Rating from './Rating';
import { apiRequest } from '../services/api';

const StoreRatingForm = ({ storeId, onRatingSubmit, existingRating = null }) => {
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (rating === 0) {
      setError('Please select a rating');
      setLoading(false);
      return;
    }

    try {
      let result;
      if (existingRating) {
        // Update existing rating
        result = await apiRequest(`/user/ratings/${existingRating.id}`, 'PUT', {
          rating
        });
      } else {
        // Create new rating
        result = await apiRequest('/user/ratings', 'POST', {
          rating,
          storeId
        });
      }
      
      onRatingSubmit(result);
    } catch (err) {
      setError(err.message || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      backgroundColor: '#f8f9fa', 
      padding: '20px', 
      borderRadius: '8px', 
      border: '1px solid #dee2e6' 
    }}>
      <h3>{existingRating ? 'Update Your Rating' : 'Rate This Store'}</h3>
      
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '10px', 
          padding: '10px', 
          backgroundColor: '#ffe6e6', 
          border: '1px solid red' 
        }}>
          {error}
        </div>
      )}
      
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>
          Your Rating:
        </label>
        <Rating 
          rating={rating} 
          onRatingChange={setRating} 
        />
      </div>
      
      <button 
        type="submit" 
        disabled={loading}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Submitting...' : (existingRating ? 'Update Rating' : 'Submit Rating')}
      </button>
    </form>
  );
};

export default StoreRatingForm;