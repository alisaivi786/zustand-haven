
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import NavBar from '@/components/NavBar';
import LoginForm from '@/components/LoginForm';

const Login = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <>
      <NavBar />
      <main className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4 bg-gradient-to-b from-background to-secondary/20">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </>
  );
};

export default Login;
