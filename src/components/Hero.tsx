
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  const navigate = useNavigate();
  
  return (
    <section 
      className={cn(
        'min-h-[80vh] flex flex-col items-center justify-center py-20 px-6',
        'relative overflow-hidden',
        className
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-pulse-subtle" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl animate-pulse-subtle" 
          style={{ animationDelay: '1s' }}
        />
      </div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto animate-slide-up">
        <div className="mb-6 inline-block">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            Zustand Haven
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Beautifully Simple State Management
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Experience the elegance of modern web applications with our minimalist approach to design
          and state management.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate('/login')}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
            Learn More
          </Button>
        </div>
      </div>
      
      <div className="mt-20 relative w-full max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="relative mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 backdrop-blur-sm border border-white/10">
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Browser chrome UI */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gray-100 dark:bg-gray-800 rounded-t-lg flex items-center px-3 space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
