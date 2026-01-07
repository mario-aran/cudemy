import type { PropsWithChildren } from 'react';

export const Main = ({ children }: PropsWithChildren) => (
  <main className="flex flex-1">
    <div className="container mx-auto border-x px-4">{children}</div>
  </main>
);
