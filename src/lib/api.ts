
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

const API_URL = 'https://api.example.com'; // Replace with your actual API URL

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
  const { token, refreshAuth, isAuthenticated } = useAuthStore.getState();
  
  // Check if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    const error = new Error('Authentication required');
    toast.error('Please log in to continue');
    throw error;
  }
  
  // Set up request headers
  const headers = new Headers(fetchOptions.headers);
  headers.set('Content-Type', 'application/json');
  
  // Add auth token if available
  if (requireAuth && token) {
    headers.set('Authorization', `Bearer ${token}`);
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
