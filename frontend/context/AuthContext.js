'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { login as loginService, logout as logoutService, getProfile } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setLoading(false);
      return;
    }
    try {
      const result = await getProfile();
      const userData = result?.data || result;
      setUser(userData);
      setToken(storedToken);
      setIsAuthenticated(true);
    } catch {
      localStorage.removeItem('token');
      setUser(null);
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    const result = await loginService(credentials);
    const { token: newToken, user: userData } = result?.data || result;
    if (newToken) {
      localStorage.setItem('token', newToken);
      if (typeof document !== 'undefined') {
        document.cookie = `token=${newToken}; path=/; max-age=86400`;
      }
      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
    }
    return result;
  };

  const logout = () => {
    logoutService();
    localStorage.removeItem('token');
    if (typeof document !== 'undefined') {
      document.cookie = 'token=; path=/; max-age=0';
    }
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
