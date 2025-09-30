import { useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContext } from './context';
import { authService } from '@/domain/auth/services/authService';
import { api } from '@/core/lib/api';
import type { User, AuthContextValue, LoginCredentials } from './types';

const TOKEN_KEY = 'authToken';

/**
 * @component AuthProvider
 * @summary Provides authentication context to the application.
 * @domain core
 * @type context-provider
 * @category authentication
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthData = (userData: User | null, token: string | null) => {
    setUser(userData);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem(TOKEN_KEY);
      delete api.defaults.headers.common['Authorization'];
    }
  };

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials);
    setAuthData(user, token);
    return user;
  }, []);

  const logout = useCallback(() => {
    setAuthData(null, null);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        try {
          // In a real app, you'd validate the token with the backend\n          // For this example, we'll decode it (unsafe) or assume it's valid\n          // and fetch user data if needed.\n          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;\n          // const userData = await authService.getProfile();\n          // For now, we'll just set a placeholder user if token exists
          setUser({ id: 1, name: 'Demo User', email: 'demo@example.com' });
        } catch (error) {
          console.error('Token validation failed', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [logout]);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
