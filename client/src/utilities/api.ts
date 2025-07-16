const API_BASE_URL = 'http://localhost:5001/api';

// Type definitions
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  password: string;
  // Remove email, firstName, lastName as server doesn't expect these
}

// Server response types (matching actual server responses)
export interface LoginResponse {
  token: string;
}

export interface SignupResponse {
  message: string;
  userId: string;
}

// Client-side auth response type
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    username: string;
  };
}

// API utility with JWT support
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      // Handle different error response formats
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.text();
        errorMessage = errorData || errorMessage;
      } catch {
        // Use default message if can't parse error
      }
      throw new Error(errorMessage);
    }

    return response.json();
  }

  // Auth endpoints that match the server
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      const response = await this.request<SignupResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Transform server response to client format
      return {
        success: true,
        message: response.message,
        user: {
          id: response.userId,
          username: credentials.username,
        }
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Signup failed');
    }
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      // Transform server response to client format
      return {
        success: true,
        message: 'Login successful',
        token: response.token,
        user: {
          id: 'unknown', // Server doesn't return user ID in login response
          username: credentials.username,
        }
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  // Remove profile and dashboard methods as they don't exist on server
}

export const apiClient = new ApiClient(API_BASE_URL); 