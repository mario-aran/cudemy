import type { PropsWithChildren } from 'react';
import { Toaster } from './ui/sonner';

export const UIProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
