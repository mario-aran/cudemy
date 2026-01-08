import { AuthActions } from '@/components/ui/auth-actions';
import { Footer } from '@/components/ui/footer';
import { Main } from '@/components/ui/main';
import { SettingsActions } from '@/components/ui/settings-actions';
import { AppSidebar } from '@/lib/shadcn/app-sidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/lib/shadcn/installed/components/ui/sidebar';
import { Outlet } from 'react-router';

export const AppLayout = () => (
  <SidebarProvider defaultOpen={false}>
    <AppSidebar />

    <div className="flex flex-1 flex-col">
      <header className="border-b">
        <div className="container mx-auto flex items-center border-x p-2">
          {/* Triggers and Logos */}
          <div className="flex items-center gap-2">
            <SidebarTrigger />
          </div>

          <div className="flex-1" />
          <AuthActions />
          <SettingsActions />
        </div>
      </header>

      <Main>
        <Outlet />
      </Main>

      <Footer />
    </div>
  </SidebarProvider>
);
