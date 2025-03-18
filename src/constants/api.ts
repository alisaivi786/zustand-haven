
export const API_CONFIG = {
  BASE_URL: 'https://api.example.com',
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    SIGNUP: '/auth/signup',
    USERS: '/users'
  },
  TOKEN_HEADER: 'Authorization',
  REFRESH_TOKEN_KEY: 'refresh_token',
  REQUEST_TIMEOUT: 10000
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
