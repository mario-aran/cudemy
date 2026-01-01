import { DarkModeProvider } from '@/lib/shadcn/dark-mode/provider';
import { TanstackQueryProvider } from '@/lib/tanstack/tanstack-query-provider';
import type { PropsWithChildren } from 'react';

export const AppProvider = ({ children }: PropsWithChildren) => (
  <TanstackQueryProvider>
    <DarkModeProvider>
      {/* Rest of your app */}
      {children}
    </DarkModeProvider>
  </TanstackQueryProvider>
);
