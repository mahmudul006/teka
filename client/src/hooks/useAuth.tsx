import { useState, useEffect, useCallback } from 'react';

interface User {
  username: string;
  lastLogin?: string;
  // Add other user properties as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (e.g., check localStorage, cookie, or API)
    const checkAuthStatus = () => {
      try {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');

        if (token && userData) {
          setAuthState({
            isAuthenticated: true,
            user: JSON.parse(userData),
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        // Clear invalid data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<void> => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo authentication - replace with real API call
      if (
        credentials.username === 'admin' &&
        credentials.password === 'password'
      ) {
        const userData: User = {
          username: credentials.username,
          lastLogin: new Date().toISOString(),
        };

        // Store authentication data
        localStorage.setItem('authToken', 'demo-auth-token');
        localStorage.setItem('userData', JSON.stringify(userData));

        setAuthState({
          isAuthenticated: true,
          user: userData,
        });
      } else {
        throw new Error('Invalid credentials. Use admin/password for demo.');
      }
    },
    []
  );

  const logout = useCallback(() => {
    // Clear storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');

    // Reset state
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  }, []);

  return {
    ...authState,
    login,
    logout,
    isLoading,
  };
};
