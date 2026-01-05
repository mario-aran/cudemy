import { ModeToggle } from '@/lib/shadcn/dark-mode/mode-toggle';
import { Outlet } from 'react-router';

export const SiteLayout = () => (
  <div className="flex min-h-screen flex-col">
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex justify-between border-x px-4 py-2">
        <nav className="flex items-center gap-4 text-sm xl:gap-6"></nav>

        {/* Controls */}
        <div className="flex">
          <ModeToggle />
        </div>
      </div>
    </header>

    <main className="container mx-auto flex flex-1 flex-col border-x p-6">
      <Outlet />
    </main>

    <footer className="border-t">
      <div className="container mx-auto border-x p-6 text-sm">
        <p>Footer</p>
      </div>
    </footer>
  </div>
);
