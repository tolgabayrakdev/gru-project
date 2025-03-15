'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Create the context with default values
const AuthContext = createContext({
  user: null,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: () => {},
  loading: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Get user data from token
          const userData = JSON.parse(atob(token.split('.')[1]));
          setUser(userData);
        } catch (error) {
          console.error('Error parsing token:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Giriş başarısız');
      }

      // Save token to localStorage
      localStorage.setItem('token', data.token);
      
      // Set user state
      setUser(data.user);
      
      // Redirect to dashboard
      router.push('/dashboard');
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Kayıt başarısız');
      }

      // Success message to display on login page
      const successMessage = 'Kayıt başarılı. Lütfen giriş yapın.';
      
      // Redirect to login page with success message
      router.push(`/login?success=${encodeURIComponent(successMessage)}`);
      
      return { success: true, message: successMessage };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 