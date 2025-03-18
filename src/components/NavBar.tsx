
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import AnimatedLogo from './AnimatedLogo';
import Button from './Button';
import { FileBarChart } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NavBar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  
  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
    navigate('/');
  };
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-3 bg-background/80 backdrop-blur-lg shadow-md' : 'py-5'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <AnimatedLogo />
          <span className="font-semibold text-xl">Zustand Haven</span>
        </Link>
        
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <NavLink to="/" current={location.pathname}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" current={location.pathname}>
                Dashboard
              </NavLink>
              <NavLink to="/reports" current={location.pathname}>
                <span className="flex items-center gap-1.5">
                  <FileBarChart className="h-4 w-4" />
                  Reports
                </span>
              </NavLink>
            </>
          ) : (
            <NavLink to="/login" current={location.pathname}>
              Login
            </NavLink>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="text-sm hidden md:block">
                <span className="text-muted-foreground">Welcome,</span>{' '}
                <span className="font-medium">{user?.name}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => navigate('/login')}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  current: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, current, children }) => {
  const isActive = current === to;
  
  return (
    <Link
      to={to}
      className={cn(
        'relative py-1 transition-colors',
        isActive ? 'text-primary' : 'text-foreground hover:text-primary'
      )}
    >
      {children}
      <span 
        className={cn(
          'absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-300 bg-primary scale-x-0',
          isActive && 'scale-x-100'
        )} 
      />
    </Link>
  );
};

export default NavBar;
