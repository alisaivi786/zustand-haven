
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { API_CONFIG } from '@/constants/api';

const API_URL = API_CONFIG.BASE_URL;

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
  skipRefreshToken?: boolean;
}

/**
 * Utility function for making API requests
 */
export async function fetchApi<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requireAuth = true, skipRefreshToken = false, ...fetchOptions } = options;
  
  // Get auth state from Zustand store
  const { token, tokenExpiry, refreshAuth, isAuthenticated, logout } = useAuthStore.getState();
  
  // Check if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    const error = new Error('Authentication required');
    toast.error('Please log in to continue');
    throw error;
  }
  
  // Check if token has expired and needs refresh
  const isTokenExpired = tokenExpiry && Date.now() > tokenExpiry;
  
  if (requireAuth && isTokenExpired && !skipRefreshToken) {
    try {
      console.log('Token expired, refreshing...');
      await refreshAuth();
    } catch (error) {
      // If refresh fails, log out the user
      console.error('Failed to refresh token:', error);
      logout();
      toast.error('Your session has expired. Please log in again.');
      throw new Error('Session expired');
    }
  }
  
  // Set up request headers
  const headers = new Headers(fetchOptions.headers);
  headers.set('Content-Type', 'application/json');
  
  // Add auth token if available
  if (requireAuth && token) {
    headers.set(API_CONFIG.TOKEN_HEADER, `Bearer ${token}`);
  }
  
  // Make the request
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      headers
    });
    
    // If unauthorized and not already trying to refresh token
    if (response.status === 401 && !skipRefreshToken) {
      // Try to refresh the token
      await refreshAuth();
      
      // Retry the request with the new token (and skip refresh this time)
      return fetchApi<T>(endpoint, {
        ...options,
        skipRefreshToken: true
      });
    }
    
    // Handle non-successful responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Request failed with status ${response.status}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Parse and return the response
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
      if (!skipRefreshToken) {
        toast.error(error.message);
      }
    }
    throw error;
  }
}

// Auth API calls
export const authApi = {
  login: async (email: string, password: string) => {
    // In a real app, this would be a fetch call
    // For mocking purposes, let's import the mock API
    const { mockApi } = await import('@/services/mockApi');
    return mockApi.login(email, password);
  },
  
  signup: async (name: string, email: string, password: string) => {
    const { mockApi } = await import('@/services/mockApi');
    return mockApi.signup(name, email, password);
  },
  
  refreshToken: async (refreshToken: string) => {
    const { mockApi } = await import('@/services/mockApi');
    return mockApi.refreshToken(refreshToken);
  }
};

// Reports API calls
export const reportsApi = {
  getReports: async () => {
    const { token } = useAuthStore.getState();
    const { mockApi } = await import('@/services/mockApi');
    return mockApi.getReports(token || '');
  },
  
  getReportDetails: async (reportId: string) => {
    const { token } = useAuthStore.getState();
    const { mockApi } = await import('@/services/mockApi');
    return mockApi.getReportDetails(token || '', reportId);
  }
};
