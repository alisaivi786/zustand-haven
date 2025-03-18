
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    SIGNUP: '/auth/signup',
    USERS: '/users',
    REPORTS: '/reports'
  },
  TOKEN_HEADER: 'Authorization',
  REFRESH_TOKEN_KEY: 'refresh_token',
  REQUEST_TIMEOUT: 10000,
  TOKEN_EXPIRY: 5 * 60 * 1000, // 5 minutes in milliseconds
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
};

// Mock users database for local development
export const MOCK_USERS = [
  {
    id: '1',
    name: 'Demo User',
    email: 'user@example.com',
    password: 'password' // In a real app, this would be hashed
  }
];
