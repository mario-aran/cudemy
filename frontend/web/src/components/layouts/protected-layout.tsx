import { Outlet } from 'react-router';

export const ProtectedLayout = () => (
  <main>
    <Outlet />
  </main>
);
