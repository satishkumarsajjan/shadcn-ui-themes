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
import { Link } from 'next-view-transitions';
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
        {/* <Link href={'/'}>
          <div className='flex justify-between items-center gap-2'>
            <div className='flex aspect-square size-8 items-center justify-center rounded-lg'>
              <Logo />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>Themes</span>
              <span className='truncate text-xs'>For Shadcn UI</span>
            </div>
          </div>
        </Link> */}
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
