import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Store Rating System</h1>
      <p>Rate and discover stores in your area</p>
      
      <div style={{ margin: '30px 0' }}>
        <Link to="/register" style={{ 
          marginRight: '20px', 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}>
          Register
        </Link>
        <Link to="/login" style={{ 
          padding: '10px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}>
          Login
        </Link>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px', 
        marginTop: '30px' 
      }}>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px' }}>
          <h3>Rate Stores</h3>
          <p>Share your experience with 1-5 star ratings</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px' }}>
          <h3>Discover</h3>
          <p>Find popular stores based on community ratings</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '4px' }}>
          <h3>Analytics</h3>
          <p>Store owners get performance insights</p>
        </div>
      </div>
    </div>
  );
};

export default Home;