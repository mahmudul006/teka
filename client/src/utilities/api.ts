import axios from 'axios';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../interfaces/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
        try {
            const parsedToken = JSON.parse(token);
            if (parsedToken.state?.token) {
                config.headers.Authorization = `Bearer ${parsedToken.state.token}`;
            }
        } catch (error) {
            console.error('Error parsing auth token:', error);
        }
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Clear auth data on unauthorized
            localStorage.removeItem('auth-storage');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', credentials);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const response = await api.post('/auth/refresh');
        return response.data;
    },
};

export default api; 