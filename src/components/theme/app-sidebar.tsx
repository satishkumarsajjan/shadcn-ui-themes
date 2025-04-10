'use client';

import { BookMarked, SwatchBook, Telescope, ThumbsUp } from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
import Logo from '../Logo';
import { NavProjects } from './nav-projects';
import { NavUser } from './nav-user';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const data = {
    pages: [
      {
        name: 'Explore Themes',
        url: '/themes',
        icon: Telescope,
        enabled: true,
      },
      {
        name: 'Liked themes',
        url: '/themes/liked',
        icon: ThumbsUp,
        enabled: !!session,
      },
      {
        name: 'BookMarks',
        url: '/themes/bookmarks',
        icon: BookMarked,
        enabled: !!session,
      },
      {
        name: 'My themes',
        url: '/themes/user',
        icon: SwatchBook,
        enabled: !!session,
      },
    ],
  };
  return (
    <Sidebar collapsible='offcanvas' variant='floating' {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects pages={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
