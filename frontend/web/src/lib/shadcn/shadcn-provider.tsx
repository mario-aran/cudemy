/* docs:
- dark mode: https://ui.shadcn.com/docs/dark-mode/vite
- shadcn sonner: https://ui.shadcn.com/docs/components/sonner
- sonner api: https://sonner.emilkowal.ski/toaster#api-reference
*/

import type { PropsWithChildren } from 'react';
import { ThemeProvider, useTheme } from './components/dark-mode/theme-provider';
import { Toaster } from './components/ui/sonner';

export const ShadcnProvider = ({ children }: PropsWithChildren) => {
  const { theme } = useTheme();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}

      <Toaster theme={theme} richColors />
    </ThemeProvider>
  );
};
