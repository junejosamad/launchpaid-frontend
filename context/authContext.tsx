// app/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  username: string;
  role: 'creator' | 'agency' | 'brand' | 'admin';
  display_name: string;
  profile_image_url?: string;
  email_verified: boolean;
  is_active: boolean;
  profile_completion_percentage: number;
}

interface TokenPayload {
  sub: string;
  role: string;
  exp: number;
  email_verified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Helper function for API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('access_token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Token refresh function
  const refreshToken = useCallback(async (): Promise<string> => {
    try {
      const refreshTokenValue = localStorage.getItem('refresh_token');
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const data = await apiCall('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refresh_token: refreshTokenValue }),
      });

      const { access_token, refresh_token: newRefreshToken } = data;
      
      // Store new tokens
      localStorage.setItem('access_token', access_token);
      if (newRefreshToken) {
        localStorage.setItem('refresh_token', newRefreshToken);
      }

      return access_token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }, []);

  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await apiCall('/auth/me');
      setUser(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch user profile:', err);
      setError('Failed to fetch user profile');
      throw err;
    }
  }, []);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        setUser(null);
        return;
      }

      // Validate token
      const decoded = jwtDecode<TokenPayload>(token);
      
      // Check if token is expired
      if (Date.now() >= decoded.exp * 1000) {
        // Try to refresh
        await refreshToken();
        await fetchUserProfile();
      } else {
        // Token is valid, fetch user profile
        await fetchUserProfile();
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    } finally {
      setLoading(false);
    }
  }, [refreshToken, fetchUserProfile]);

  // Initial auth check
  useEffect(() => {
    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string, remember: boolean = false) => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          remember_me: remember,
        }),
      });

      const { access_token, refresh_token } = data;
      
      // Store tokens
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Decode token to get user info
      const decoded = jwtDecode<TokenPayload>(access_token);
      
      // Fetch full user profile
      await fetchUserProfile();

      // Redirect based on role
      const redirectUrls = {
        creator: '/dashboard',
        agency: '/agency/dashboard',
        brand: '/brand/dashboard',
        admin: '/admin/dashboard',
      };

      const redirectUrl = redirectUrls[decoded.role as keyof typeof redirectUrls] || '/dashboard';
      router.push(redirectUrl);
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await apiCall('/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      router.push('/auth/login');
    }
  };

  // Setup axios-like interceptor for fetch
  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = async (...args) => {
      let [resource, config] = args;
      
      // Only intercept API calls
      if (typeof resource === 'string' && resource.startsWith(API_URL)) {
        const token = localStorage.getItem('access_token');
        
        if (token) {
          config = config || {};
          config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
          };
        }
        
        let response = await originalFetch(resource, config);
        
        // If 401, try to refresh token
        if (response.status === 401 && !resource.includes('/auth/')) {
          try {
            const newToken = await refreshToken();
            
            // Retry with new token
            config.headers = {
              ...config.headers,
              'Authorization': `Bearer ${newToken}`,
            };
            
            response = await originalFetch(resource, config);
          } catch (error) {
            // Refresh failed, redirect to login
            setUser(null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            router.push('/auth/login');
          }
        }
        
        return response;
      }
      
      return originalFetch(resource, config);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [refreshToken, router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        refreshToken,
        checkAuth,
        clearError,
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

// Higher-order component for protecting pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requiredRole?: string[];
    redirectTo?: string;
  }
) {
  return function ProtectedComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push(options?.redirectTo || '/auth/login');
        } else if (options?.requiredRole && !options.requiredRole.includes(user.role)) {
          router.push('/unauthorized');
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    if (options?.requiredRole && !options.requiredRole.includes(user.role)) {
      return null;
    }

    return <Component {...props} />;
  };
}