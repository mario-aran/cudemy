import { Outlet } from 'react-router';

export const BlankLayout = () => (
  <main className="flex min-h-dvh items-center justify-center">
    <Outlet />
  </main>
);
