
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';
import Button from './Button';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  className?: string;
  onToggleForm?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      toast.success('Successfully logged in');
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
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Welcome back</h2>
        <p className="text-muted-foreground">Enter your credentials to continue</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label 
            htmlFor="email"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <input
            id="email"
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
          <div className="flex items-center justify-between">
            <label 
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
            <a 
              href="#" 
              className="text-xs text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                toast.info('Password reset functionality would go here');
              }}
            >
              Forgot password?
            </a>
          </div>
          <input
            id="password"
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
          Sign in
        </Button>
        
        {onToggleForm && (
          <div className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={onToggleForm}
              className="text-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        )}
      </form>
      
      <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
        <p>For demo purposes: user@example.com / password</p>
      </div>
    </div>
  );
};

export default LoginForm;
