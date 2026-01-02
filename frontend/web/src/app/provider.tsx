import { ShadcnProvider } from '@/lib/shadcn/shadcn-provider';
import { TanstackQueryProvider } from '@/lib/tanstack/tanstack-query-provider';
import type { PropsWithChildren } from 'react';

export const AppProvider = ({ children }: PropsWithChildren) => (
  <TanstackQueryProvider>
    <ShadcnProvider>{children}</ShadcnProvider>
  </TanstackQueryProvider>
);
