
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  tokenExpiry: number | null;
  refreshToken: string | null;
  refreshTokenExpiry: number | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      tokenExpiry: null,
      refreshToken: null,
      refreshTokenExpiry: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.login(email, password);
          
          set({
            user: response.user,
            token: response.token,
            tokenExpiry: response.tokenExpiry,
            refreshToken: response.refreshToken,
            refreshTokenExpiry: response.refreshTokenExpiry,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
        }
      },
      
      signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          const response = await authApi.signup(name, email, password);
          
          set({
            user: response.user,
            token: response.token,
            tokenExpiry: response.tokenExpiry,
            refreshToken: response.refreshToken,
            refreshTokenExpiry: response.refreshTokenExpiry,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Signup failed'
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          tokenExpiry: null,
          refreshToken: null,
          refreshTokenExpiry: null,
          isAuthenticated: false,
          error: null
        });
      },
      
      refreshAuth: async () => {
        const { refreshToken, refreshTokenExpiry } = get();
        
        if (!refreshToken) {
          set({ error: 'No refresh token available' });
          throw new Error('No refresh token available');
        }
        
        // Check if refresh token has expired
        if (refreshTokenExpiry && Date.now() > refreshTokenExpiry) {
          set({
            user: null,
            token: null,
            tokenExpiry: null,
            refreshToken: null,
            refreshTokenExpiry: null,
            isAuthenticated: false,
            error: 'Session expired. Please login again.'
          });
          throw new Error('Refresh token expired');
        }
        
        set({ isLoading: true });
        
        try {
          const response = await authApi.refreshToken(refreshToken);
          
          set({
            token: response.token,
            tokenExpiry: response.tokenExpiry,
            isLoading: false
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            tokenExpiry: null,
            refreshToken: null,
            refreshTokenExpiry: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please login again.'
          });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
