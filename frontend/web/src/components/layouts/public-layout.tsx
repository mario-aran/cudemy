import { Footer } from '@/components/ui/footer';
import { Main } from '@/components/ui/main';
import { SettingsActions } from '@/components/ui/settings-actions';
import { Outlet } from 'react-router';

export const PublicLayout = () => (
  <div className="flex min-h-dvh flex-col">
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between border-x px-4 py-2">
        <nav className="flex items-center gap-4 text-sm xl:gap-6"></nav>

        <div className="flex-1" />
        <SettingsActions />
      </div>
    </header>

    <Main>
      <Outlet />
    </Main>

    <Footer />
  </div>
);
