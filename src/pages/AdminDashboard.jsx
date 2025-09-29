import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../services/api';
import { isAuthenticated, getUserRole } from '../services/auth';

// Simple Add User Form Component
const AddUserForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'NORMAL_USER'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Name (20-60 chars):</label>
          <input
            type="text"
            name="name"
            placeholder='Enter full name'
            value={formData.name}
            onChange={handleChange}
            required
            minLength="20"
            maxLength="60"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Password (8-16 chars):</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="16"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Address (max 400 chars):</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            maxLength="400"
            rows="3"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="NORMAL_USER">Normal User</option>
            <option value="STORE_OWNER">Store Owner</option>
            <option value="SYSTEM_ADMIN">System Admin</option>
          </select>
        </div>

        <button
          type="submit"
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
          Create User
        </button>

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
      </form>
    </div>
  );
};

// Simple Add Store Form Component
const AddStoreForm = ({ onSubmit, onCancel, users }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    ownerId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '4px',
      marginBottom: '20px'
    }}>
      <h3>Add New Store</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Store Name (20-60 chars):</label>
          <input
            type="text"
            name="name"
            placeholder='Enter store name'
            value={formData.name}
            onChange={handleChange}
            required
            minLength="20"
            maxLength="60"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Address (max 400 chars):</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            maxLength="400"
            rows="3"
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Assign Owner (optional):</label>
          <select
            name="ownerId"
            value={formData.ownerId}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          >
            <option value="">Select Owner</option>
            {users
              .filter(user => user.role === 'STORE_OWNER')
              .map(user => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Create Store
        </button>

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
      </form>
    </div>
  );
};

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showAddStoreForm, setShowAddStoreForm] = useState(false);
  const [userFilters, setUserFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [userSort, setUserSort] = useState({ sortBy: 'createdAt', order: 'DESC' });
  const [storeFilters, setStoreFilters] = useState({ name: '', email: '', address: '' });
  const [storeSort, setStoreSort] = useState({ sortBy: 'createdAt', order: 'DESC' });

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'users') {
      fetchAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFilters, userSort, activeTab]);

  useEffect(() => {
    if (activeTab === 'stores') {
      fetchAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeFilters, storeSort, activeTab]);

  useEffect(() => {
    if (!isAuthenticated() || getUserRole() !== 'SYSTEM_ADMIN') {
      navigate('/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      const statsData = await apiRequest('/admin/dashboard');
      // build query for users list
      const usersQuery = new URLSearchParams({
        name: userFilters.name || '',
        email: userFilters.email || '',
        address: userFilters.address || '',
        role: userFilters.role || '',
        sortBy: userSort.sortBy,
        order: userSort.order,
      }).toString();
      const usersData = await apiRequest(`/admin/users?${usersQuery}`);

      // build query for stores list
      const storesQuery = new URLSearchParams({
        name: storeFilters.name || '',
        email: storeFilters.email || '',
        address: storeFilters.address || '',
        sortBy: storeSort.sortBy,
        order: storeSort.order,
      }).toString();
      const storesData = await apiRequest(`/admin/stores?${storesQuery}`);

      setStats(statsData);
      setUsers(usersData);
      setStores(storesData);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch data');
      setLoading(false);
    }
  };

  // simple sort togglers
  const toggleUserSort = (column) => {
    setUserSort((prev) => {
      const nextOrder = prev.sortBy === column && prev.order === 'ASC' ? 'DESC' : 'ASC';
      return { sortBy: column, order: nextOrder };
    });
  };

  const toggleStoreSort = (column) => {
    setStoreSort((prev) => {
      const nextOrder = prev.sortBy === column && prev.order === 'ASC' ? 'DESC' : 'ASC';
      return { sortBy: column, order: nextOrder };
    });
  };

  const handleAddUser = async (userData) => {
    try {
      await apiRequest('/admin/users', 'POST', userData);
      fetchAllData(); // Refresh data
      setShowAddUserForm(false);
      alert('User created successfully!');
    } catch (err) {
      alert('Failed to create user: ' + (err.message || 'Unknown error'));
    }
  };

  const handleAddStore = async (storeData) => {
    try {
      const created = await apiRequest('/admin/stores', 'POST', {
        name: storeData.name,
        email: storeData.email,
        address: storeData.address
      });

      if (storeData.ownerId) {
        await apiRequest(`/admin/stores/${created.id}/owner`, 'PUT', { ownerId: Number(storeData.ownerId) });
      }

      fetchAllData(); // Refresh data
      setShowAddStoreForm(false);
      alert('Store created successfully!');
    } catch (err) {
      alert('Failed to create store: ' + (err.message || 'Unknown error'));
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>Admin Dashboard</h1>
        <div>
          {activeTab === 'users' && (
            <button
              onClick={() => setShowAddUserForm(!showAddUserForm)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Add User
            </button>
          )}
          {activeTab === 'stores' && (
            <button
              onClick={() => setShowAddStoreForm(!showAddStoreForm)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Store
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #ddd',
        marginBottom: '20px'
      }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'dashboard' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'dashboard' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRight: 'none',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'users' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'users' ? 'white' : '#333',
            border: '1px solid #ddd',
            borderRight: 'none',
            cursor: 'pointer'
          }}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'stores' ? '#007bff' : '#f8f9fa',
            color: activeTab === 'stores' ? 'white' : '#333',
            border: '1px solid #ddd',
            cursor: 'pointer'
          }}
        >
          Stores
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              <h3>Users</h3>
              <p style={{ fontSize: '2rem' }}>{stats.totalUsers}</p>
            </div>

            <div style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              <h3>Stores</h3>
              <p style={{ fontSize: '2rem' }}>{stats.totalStores}</p>
            </div>

            <div style={{
              backgroundColor: '#ffc107',
              color: 'black',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              <h3>Ratings</h3>
              <p style={{ fontSize: '2rem' }}>{stats.totalRatings}</p>
            </div>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          {showAddUserForm && (
            <AddUserForm
              onSubmit={handleAddUser}
              onCancel={() => setShowAddUserForm(false)}
            />
          )}

          <div style={{ marginBottom: '20px' }}>
            <h2>Users Management</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input
                type="text"
                placeholder="Filter by name"
                value={userFilters.name}
                onChange={(e) => setUserFilters({ ...userFilters, name: e.target.value })}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                placeholder="Filter by email"
                value={userFilters.email}
                onChange={(e) => setUserFilters({ ...userFilters, email: e.target.value })}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <input
                type="text"
                placeholder="Filter by address"
                value={userFilters.address}
                onChange={(e) => setUserFilters({ ...userFilters, address: e.target.value })}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <select
                value={userFilters.role}
                onChange={(e) => setUserFilters({ ...userFilters, role: e.target.value })}
                style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="">All Roles</option>
                <option value="NORMAL_USER">Normal User</option>
                <option value="STORE_OWNER">Store Owner</option>
                <option value="SYSTEM_ADMIN">System Admin</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <button
                onClick={() => toggleUserSort('name')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sort by Name
              </button>
              <button
                onClick={() => toggleUserSort('email')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sort by Email
              </button>
              <button
                onClick={() => toggleUserSort('role')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sort by Role
              </button>
              <button
                onClick={() => toggleUserSort('address')}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Sort by Address
              </button>
            </div>

          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleUserSort('name')}>Name</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleUserSort('email')}>Email</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleUserSort('role')}>Role</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleUserSort('address')}>Address</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.name}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: user.role === 'SYSTEM_ADMIN' ? '#007bff' :
                          user.role === 'STORE_OWNER' ? '#28a745' : '#6c757d',
                        color: 'white',
                        fontSize: '12px'
                      }}>
                        {user.role.replace('_', ' ')}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stores Tab */}
      {activeTab === 'stores' && (
        <div>
          {showAddStoreForm && (
            <AddStoreForm
              onSubmit={handleAddStore}
              onCancel={() => setShowAddStoreForm(false)}
              users={users}
            />
          )}

          <h2>Stores Management</h2>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Filter by name"
              value={storeFilters.name}
              onChange={(e) => setStoreFilters({ ...storeFilters, name: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Filter by email"
              value={storeFilters.email}
              onChange={(e) => setStoreFilters({ ...storeFilters, email: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
            <input
              type="text"
              placeholder="Filter by address"
              value={storeFilters.address}
              onChange={(e) => setStoreFilters({ ...storeFilters, address: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleStoreSort('name')}>Name</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleStoreSort('email')}>Email</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd', cursor: 'pointer' }} onClick={() => toggleStoreSort('address')}>Address</th>
                  <th style={{ padding: '12px', border: '1px solid #ddd' }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {stores.map((store) => (
                  <tr key={store.id}>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{store.name}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{store.email}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{store.address}</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                      {store.averageRating || 'No ratings'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;