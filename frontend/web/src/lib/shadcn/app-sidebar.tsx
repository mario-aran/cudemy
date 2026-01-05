// docs: https://ui.shadcn.com/docs/components/sidebar

import { PATHS } from '@/constants/paths';
import { Calendar, Home, Inbox, Search } from 'lucide-react';
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
    title: 'Course',
    url: PATHS.APP_COURSE_ID,
    Icon: Inbox,
  },
  {
    title: 'Course Player',
    url: PATHS.APP_COURSE_ID_PLAYER,
    Icon: Calendar,
  },
  {
    title: 'Instructor Upload',
    url: PATHS.APP_INSTRUCTOR_UPLOAD,
    Icon: Search,
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
                <SidebarMenuButton asChild>
                  <NavLink to={item.url}>
                    <item.Icon />
                    <span>{item.title}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);
