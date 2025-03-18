
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import Button from './Button';
import { cn } from '@/lib/utils';

interface SignupFormProps {
  className?: string;
  onToggleForm?: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ className, onToggleForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    try {
      await signup(name, email, password);
      toast.success('Account created successfully');
      navigate('/dashboard');
    } catch (err) {
      // Error is handled in the store
    }
  };
  
  return (
    <div 
      className={cn(
        'w-full max-w-md mx-auto p-8 backdrop-blur-xl rounded-2xl',
        'bg-white/50 dark:bg-black/20 border border-white/20 dark:border-white/10',
        'shadow-lg shadow-black/5 animate-fade-in',
        className
      )}
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Create an account</h2>
        <p className="text-muted-foreground">Sign up to get started</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label 
            htmlFor="name"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            required
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
              'text-sm ring-offset-background file:border-0 file:bg-transparent',
              'file:text-sm file:font-medium placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200'
            )}
          />
        </div>
        
        <div className="space-y-2">
          <label 
            htmlFor="signup-email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
              'text-sm ring-offset-background file:border-0 file:bg-transparent',
              'file:text-sm file:font-medium placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200'
            )}
          />
        </div>
        
        <div className="space-y-2">
          <label 
            htmlFor="signup-password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
              'text-sm ring-offset-background file:border-0 file:bg-transparent',
              'file:text-sm file:font-medium placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200'
            )}
          />
        </div>
        
        <div className="space-y-2">
          <label 
            htmlFor="confirm-password"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2',
              'text-sm ring-offset-background file:border-0 file:bg-transparent',
              'file:text-sm file:font-medium placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'transition-colors duration-200'
            )}
          />
        </div>
        
        {error && (
          <div className="text-destructive text-sm font-medium p-2 bg-destructive/10 rounded-md">
            {error}
          </div>
        )}
        
        <Button 
          type="submit" 
          className="w-full" 
          isLoading={isLoading}
        >
          Create account
        </Button>
        
        <div className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{' '}
          <button 
            type="button"
            onClick={onToggleForm}
            className="text-primary hover:underline"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
