import { AppSidebar } from '@/lib/shadcn/app-sidebar';
import { ModeToggle } from '@/lib/shadcn/dark-mode/mode-toggle';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/lib/shadcn/installed/components/ui/sidebar';
import { Outlet } from 'react-router';

export const AuthenticatedLayout = () => (
  <SidebarProvider defaultOpen={false}>
    <AppSidebar />

    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4">
          <SidebarTrigger />
          <ModeToggle />
        </div>
      </header>

      <main className="flex flex-1">
        <div className="container mx-auto flex-1 border-x px-4">
          <Outlet />
        </div>
      </main>

      <footer className="border-t">
        <div className="container mx-auto border-x px-4 py-6 text-center text-sm">
          <p>
            © {new Date().getFullYear()} Mario Arancibia. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </SidebarProvider>
);
