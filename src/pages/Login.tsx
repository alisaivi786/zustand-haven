
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import NavBar from '@/components/NavBar';
import LoginForm from '@/components/LoginForm';
import SignupForm from '@/components/SignupForm';

const Login = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const toggleForm = () => {
    setShowSignup(!showSignup);
  };
  
  return (
    <>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="w-full max-w-md">
          {showSignup ? (
            <SignupForm onToggleForm={toggleForm} />
          ) : (
            <LoginForm className="animate-fade-in" />
          )}
          
          {!showSignup && (
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button 
                  onClick={toggleForm}
                  className="text-primary hover:underline font-medium"
                >
                  Create one
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Login;
