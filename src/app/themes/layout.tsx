import SidebarWrapper from '@/components/providers/SidebarWrapper';

interface layoutProps {
  children: React.ReactNode;
}

const ThemeLayout = ({ children }: layoutProps) => {
  return <SidebarWrapper>{children}</SidebarWrapper>;
};

export default ThemeLayout;
