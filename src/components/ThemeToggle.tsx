
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import { Toggle } from '@/components/ui/toggle';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle 
          variant="outline" 
          size="sm"
          pressed={isDarkMode}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 bg-background border-border"
        >
          {isDarkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Toggle>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
