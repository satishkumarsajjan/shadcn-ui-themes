import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateMode } from '../CreateMode';
import { ThemeWithCounts, ThemeWithUserActions } from '@/types/apiReturnTypes';
import { useSession } from 'next-auth/react';

export interface ThemeModeState {
  modeId: string;
  mode: string;
  content: string;
}

export interface EditThemeProps {
  theme: ThemeWithCounts | ThemeWithUserActions | undefined;
  setTheme: (newTheme: string) => void;
  currentTheme?: string;
}

export const ModeSelector = ({
  theme,
  themeMode,
  onModeChange,
}: {
  theme: EditThemeProps['theme'];
  themeMode: ThemeModeState;
  onModeChange: (mode: string) => void;
}) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === theme?.userId;

  return (
    <span className='flex justify-between'>
      <Select defaultValue={themeMode.mode} onValueChange={onModeChange}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a mode' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Modes</SelectLabel>
            {theme?.modes.map((mode, index) => (
              <SelectItem value={mode.mode} key={index}>
                {mode.mode}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {isOwner && (
        <span className='ml-2'>
          <CreateMode themeId={theme?.id} />
        </span>
      )}
    </span>
  );
};
