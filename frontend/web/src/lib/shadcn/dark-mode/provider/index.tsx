// notes: Based on https://ui.shadcn.com/docs/dark-mode/vite

import type { PropsWithChildren } from 'react';
import { ThemeProvider } from './theme-provider';

export const DarkModeProvider = ({ children }: PropsWithChildren) => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    {children}
  </ThemeProvider>
);
