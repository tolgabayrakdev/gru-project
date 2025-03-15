'use client';

// Check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Check if token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    
    if (Date.now() >= expiry) {
      localStorage.removeItem('token');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    return false;
  }
};

// Get current user from token
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};

// Get auth token for API requests
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem('token');
  } catch (error) {
    console.error('Get token error:', error);
    return null;
  }
};

// Add auth header to fetch options
export const withAuth = (options = {}) => {
  const token = getAuthToken();
  
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
}; 