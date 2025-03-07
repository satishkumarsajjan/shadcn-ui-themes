'use client';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThemeWithCounts, ThemeWithUserActions } from '@/types/apiReturnTypes';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { CreateMode } from './CreateMode';
import { useSession } from 'next-auth/react';
export function EditTheme({
  theme,
  setTheme,
}: {
  theme: ThemeWithCounts | ThemeWithUserActions | undefined;
  setTheme: Dispatch<SetStateAction<string>>;
}) {
  const { data: session } = useSession();

  const [themeMode, setThemeMode] = useState({
    mode: theme?.modes[0].mode,
    content: theme?.modes[0].content,
  });

  const handleModeChange = (newMode: string) => {
    const selectedMode = theme?.modes.find((mode) => mode.mode === newMode);
    if (selectedMode) {
      setThemeMode({
        mode: selectedMode.mode,
        content: selectedMode.content,
      });
      setTheme(selectedMode.content);
    }
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setThemeMode((prevThemeMode) => ({
      ...prevThemeMode,
      content: event.target.value,
    }));
    setTheme(event.target.value);
  };
  const formatContent = () => {
    try {
      // Try to parse as JSON first (if it's JSON content)

      const parsedContent = JSON.parse(themeMode.content as string);
      const formattedContent = JSON.stringify(parsedContent, null, 2);
      setThemeMode({
        ...themeMode,
        content: formattedContent,
      });
    } catch (e) {
      // If not JSON, apply basic text formatting
      // Split by lines, trim each line, and rejoin
      //@ts-ignore
      const lines = themeMode.content.split('\n');
      const formattedLines = lines.map((line) => line.trim());

      // Remove empty consecutive lines
      const filteredLines = formattedLines.filter(
        (line, index, array) => !(line === '' && array[index - 1] === '')
      );

      const formattedContent = filteredLines.join('\n');
      setThemeMode({
        ...themeMode,
        content: formattedContent,
      });
    }
  };
  return (
    <div className='m-2 h-full'>
      <h1 className='ml-2 font-bold text-xl'>{theme?.title}</h1>
      <span className='flex justify-between m-2'>
        <Select defaultValue={themeMode.mode} onValueChange={handleModeChange}>
          <SelectTrigger className='mr-2'>
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
        {/* <ToggleGroup
          type='single'
          defaultValue={themeMode.mode}
          onValueChange={handleModeChange}
          className='flex flex-wrap'
        >
          {theme?.modes.map((mode, index) => (
            <ToggleGroupItem
              value={mode.mode}
              aria-label='Toggle bold'
              key={index}
            >
              {mode.mode}
            </ToggleGroupItem>
          ))}
        </ToggleGroup> */}
        {session && session.user?.id === theme?.userId && (
          <CreateMode themeId={theme?.id} />
        )}
      </span>
      <div className='relative'>
        <Textarea
          value={themeMode.content}
          onChange={handleContentChange}
          placeholder='Type your message here.'
          className='h-[500px] m-2'
        />
        <Button
          onClick={formatContent}
          className='absolute top-4 right-4'
          size='sm'
          variant='outline'
        >
          Format
        </Button>
      </div>
    </div>
  );
}
