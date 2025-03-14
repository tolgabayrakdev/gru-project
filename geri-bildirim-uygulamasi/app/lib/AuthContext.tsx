'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserData, LoginData, AuthResponse } from './auth';
import Cookies from 'js-cookie';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: UserData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Token doğrulanamadı');
          }
          return response.json();
        })
        .then((result) => {
          setUser(result);
          // Cookie'ye de token'ı kaydedelim
          Cookies.set('token', token, { expires: 7 });
        })
        .catch(() => {
          localStorage.removeItem('token');
          Cookies.remove('token');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [mounted]);

  const login = async (data: LoginData) => {
    try {
      setError(null);
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Giriş yapılırken bir hata oluştu');
      }

      setUser(result.user);
      // Token'ı hem localStorage hem de cookie'ye kaydedelim
      localStorage.setItem('token', result.token);
      Cookies.set('token', result.token, { expires: 7 });
      
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Giriş yapılırken bir hata oluştu');
    }
  };

  const register = async (data: UserData) => {
    try {
      setError(null);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Kayıt olurken bir hata oluştu');
      }

      setUser(result.user);
      // Token'ı hem localStorage hem de cookie'ye kaydedelim
      localStorage.setItem('token', result.token);
      Cookies.set('token', result.token, { expires: 7 });
      
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kayıt olurken bir hata oluştu');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    setUser(null);
    router.push('/sign-in');
  };

  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 