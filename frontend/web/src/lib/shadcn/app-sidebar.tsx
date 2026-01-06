// docs: https://ui.shadcn.com/docs/components/sidebar

import { PATHS } from '@/constants/paths';
import { Home, Inbox } from 'lucide-react';
import { NavLink } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './installed/components/ui/sidebar';

const navItems = [
  {
    title: 'Home',
    url: PATHS.APP,
    Icon: Home,
  },
  {
    title: 'Courses',
    url: PATHS.APP_COURSES,
    Icon: Inbox,
  },
];

export const AppSidebar = () => (
  <Sidebar collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <NavLink to={item.url} end>
                  {({ isActive }) => (
                    <SidebarMenuButton isActive={isActive}>
                      <item.Icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);
