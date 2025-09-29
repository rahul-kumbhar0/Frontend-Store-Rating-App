
const API_BASE_URL = process.env.REACT_APP_API_BASE;

export const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    }
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    console.log('API Request:', { url, method, data }); 

    const response = await fetch(url, config);
    const result = await response.json();

    console.log('API Response:', { status: response.status, data: result }); 

    if (!response.ok) {
      throw new Error(result.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return result;
  } catch (error) {
    console.error('API Request Error Details:', error);
    throw error;
  }
};