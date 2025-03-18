
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        
        try {
          // This is a mock implementation - in a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock successful login
          if (email === 'user@example.com' && password === 'password') {
            set({
              user: {
                id: '1',
                name: 'Demo User',
                email: 'user@example.com'
              },
              token: 'mock-jwt-token',
              refreshToken: 'mock-refresh-token',
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
        }
      },
      
      logout: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          error: null
        });
      },
      
      refreshAuth: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          set({ error: 'No refresh token available' });
          return;
        }
        
        set({ isLoading: true });
        
        try {
          // Mock token refresh - in a real app, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({
            token: 'new-mock-jwt-token',
            isLoading: false
          });
        } catch (error) {
          set({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please login again.'
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);

// Add Zustand dependency
<lov-add-dependency>zustand@4.4.7</lov-add-dependency>
