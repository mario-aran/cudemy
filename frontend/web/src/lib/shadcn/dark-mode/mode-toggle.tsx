// note: Based on https://ui.shadcn.com/docs/dark-mode/vite

import { Button } from '@/lib/shadcn/installed/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const handleOnClick = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleOnClick}>
      <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
