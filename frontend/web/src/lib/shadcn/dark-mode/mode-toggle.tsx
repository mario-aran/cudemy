// docs: https://ui.shadcn.com/docs/dark-mode/vite

import { useTheme } from '@/lib/shadcn/dark-mode/theme-provider';
import { Button } from '@/lib/shadcn/ui/button';
import { Moon, Sun } from 'lucide-react';

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  // Utils
  const handleOnClick = () => {
    setTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleOnClick}>
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
