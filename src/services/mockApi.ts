
import { API_CONFIG, MOCK_USERS } from '@/constants/api';
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
      refreshToken
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
      refreshToken
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
      token: generateToken()
    };
  }
};
