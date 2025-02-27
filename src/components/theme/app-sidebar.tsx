'use client';

import {
  BookMarked,
  GraduationCap,
  Map,
  SwatchBook,
  Telescope,
} from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';
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
        name: 'BookMarks',
        url: '/themes/bookmarks',
        icon: BookMarked,
        enabled: !!session,
      },
      {
        name: 'My themes',
        url: '/themes/my-themes',
        icon: SwatchBook,
        enabled: !!session,
      },
    ],
  };
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <div className='flex justify-between items-center gap-2'>
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
            <GraduationCap className='size-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Themes</span>
            <span className='truncate text-xs'>For Shadcn UI</span>
          </div>
        </div>
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
