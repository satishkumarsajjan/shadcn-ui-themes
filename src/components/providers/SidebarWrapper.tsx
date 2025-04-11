import { AppSidebar } from '@/components/theme/app-sidebar';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import CreateNewTheme from '../theme/createNewTheme/create-new-theme';
import { ModeToggle } from '../theme/ModeToggle';
import { SearchBar } from '../Search/SearchBar';

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='sticky top-0 z-10 backdrop-blur-lg flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 shadow-md'>
          <div className='flex items-center justify-between px-4 w-full'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
            </div>
            <div className='flex justify-end items-center gap-2 '>
              <SearchBar />
              <CreateNewTheme />
              <ModeToggle />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
