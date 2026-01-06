import { Footer } from '@/components/ui/footer';
import { AppSidebar } from '@/lib/shadcn/app-sidebar';
import { ModeToggle } from '@/lib/shadcn/dark-mode/mode-toggle';
import { Button } from '@/lib/shadcn/installed/components/ui/button';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/lib/shadcn/installed/components/ui/sidebar';
import { Link, Outlet } from 'react-router';

export const AuthenticatedLayout = () => (
  <SidebarProvider defaultOpen={false}>
    <AppSidebar />

    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center justify-between border-x px-4 py-2">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
          </div>

          <div>
            <Button asChild>
              <Link to="/">My App</Link>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
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
  </SidebarProvider>
);
