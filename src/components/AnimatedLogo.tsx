
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className, 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  return (
    <div 
      className={cn(
        'relative flex items-center justify-center',
        sizeClasses[size],
        className
      )}
    >
      {/* Animated background shape */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 animate-logo-morph" 
      />
      
      {/* Inner circle */}
      <div 
        className="absolute inset-[3px] bg-white rounded-full dark:bg-black"
      />
      
      {/* Letter mark */}
      <span 
        className="relative text-primary font-bold text-lg"
      >
        Z
      </span>
    </div>
  );
};

export default AnimatedLogo;
