
import { API_CONFIG, MOCK_USERS } from '@/constants/api';
import { MOCK_REPORTS } from '@/constants/reports';
import { toast } from 'sonner';

// Store registered users in localStorage
const initLocalUsers = () => {
  const storedUsers = localStorage.getItem('mock_users');
  if (!storedUsers) {
    localStorage.setItem('mock_users', JSON.stringify(MOCK_USERS));
  }
};

// Initialize mock users on module load
initLocalUsers();

// Helper to get users from localStorage
const getUsers = () => {
  const usersString = localStorage.getItem('mock_users');
  return usersString ? JSON.parse(usersString) : MOCK_USERS;
};

// Helper to save users to localStorage
const saveUsers = (users: any[]) => {
  localStorage.setItem('mock_users', JSON.stringify(users));
};

// Generate a random token
const generateToken = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Generate token expiry time
const generateTokenExpiry = () => {
  return Date.now() + API_CONFIG.TOKEN_EXPIRY;
};

// Generate refresh token expiry time
const generateRefreshTokenExpiry = () => {
  return Date.now() + API_CONFIG.REFRESH_TOKEN_EXPIRY;
};

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  login: async (email: string, password: string) => {
    await delay(800); // Simulate network delay
    
    const users = getUsers();
    const user = users.find((u: any) => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }
    
    // Generate tokens
    const token = generateToken();
    const refreshToken = generateToken();
    
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
      tokenExpiry: generateTokenExpiry(),
      refreshTokenExpiry: generateRefreshTokenExpiry()
    };
  },
  
  signup: async (name: string, email: string, password: string) => {
    await delay(1000); // Simulate network delay
    
    const users = getUsers();
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password
    };
    
    // Save to "database"
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    
    // Generate tokens
    const token = generateToken();
    const refreshToken = generateToken();
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    toast.success('Account created successfully');
    
    return {
      user: userWithoutPassword,
      token,
      refreshToken,
      tokenExpiry: generateTokenExpiry(),
      refreshTokenExpiry: generateRefreshTokenExpiry()
    };
  },
  
  refreshToken: async (refreshToken: string) => {
    await delay(500); // Simulate network delay
    
    // In a real app, we would validate the refresh token
    // For this mock, we'll just generate a new token
    if (!refreshToken) {
      throw new Error('Invalid refresh token');
    }
    
    return {
      token: generateToken(),
      tokenExpiry: generateTokenExpiry()
    };
  },
  
  getReports: async (token: string) => {
    await delay(800); // Simulate network delay
    
    // In a real app, we would validate the token on the server
    // For this mock, we'll just check if a token was provided
    if (!token) {
      throw new Error('Authentication required');
    }
    
    return {
      reports: MOCK_REPORTS
    };
  },
  
  getReportDetails: async (token: string, reportId: string) => {
    await delay(600); // Simulate network delay
    
    // Validate token
    if (!token) {
      throw new Error('Authentication required');
    }
    
    // Find report
    const report = MOCK_REPORTS.find(r => r.id === reportId);
    
    if (!report) {
      throw new Error('Report not found');
    }
    
    return { report };
  }
};
