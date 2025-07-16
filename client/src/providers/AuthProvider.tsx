import React, { createContext, useCallback, useEffect, useState } from 'react';
import { apiClient, type LoginCredentials, type SignupCredentials } from '../utilities/api';

interface User {
  id: string;
  username: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const response = await apiClient.login(credentials);
    
    if (response.success && response.token && response.user) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(response.user));
      setIsAuthenticated(true);
      setUser(response.user);
    } else {
      throw new Error(response.message || 'Login failed');
    }
  }, []);

  const signup = useCallback(async (credentials: SignupCredentials) => {
    // This only performs registration. It does not log the user in.
    // The user will be redirected to the login page upon successful signup.
    const response = await apiClient.signup(credentials);
    if (!response.success) {
      throw new Error(response.message || 'Signup failed');
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const value = { isAuthenticated, user, isLoading, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 