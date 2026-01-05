import { AppSidebar } from '@/lib/shadcn/app-sidebar';
import { ModeToggle } from '@/lib/shadcn/dark-mode/mode-toggle';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/lib/shadcn/installed/components/ui/sidebar';
import { Outlet } from 'react-router';

export const AuthenticatedLayout = () => (
  <SidebarProvider>
    <AppSidebar />

    <header className="bg-yellow-200">
      <div>
        <SidebarTrigger />
        <ModeToggle />
      </div>
    </header>

    <main className="bg-blue-200">
      <Outlet />
    </main>

    <footer className="bg-red-200">
      <div className="">
        <p>Footer</p>
      </div>
    </footer>
  </SidebarProvider>
);
