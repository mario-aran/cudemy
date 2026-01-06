import { Footer } from '@/components/ui/footer';
import { ModeToggle } from '@/lib/shadcn/dark-mode/mode-toggle';
import { Outlet } from 'react-router';

export const SiteLayout = () => (
  <div className="flex min-h-dvh flex-col">
    <header className="sticky top-0 z-50 border-b backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between border-x px-4 py-2">
        <nav className="flex items-center gap-4 text-sm xl:gap-6"></nav>

        <div className="flex">
          <ModeToggle />
        </div>
      </div>
    </header>

    <main className="flex flex-1">
      <div className="container mx-auto flex-1 border-x px-4">
        <Outlet />
      </div>
    </main>

    <Footer />
  </div>
);
