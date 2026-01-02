import { Outlet } from 'react-router';

export const HeadlessLayout = () => (
  <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-6">
    <Outlet />
  </main>
);
