import { ThemeWithCounts, ThemeWithUserActions } from '@/types/apiReturnTypes';
import { useState } from 'react';
import { Textarea } from '../ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export function EditTheme({
  theme,
}: {
  theme: ThemeWithCounts | ThemeWithUserActions | undefined;
}) {
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
    }
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setThemeMode((prevThemeMode) => ({
      ...prevThemeMode,
      content: event.target.value,
    }));
  };

  return (
    <div className='m-2'>
      <span className='flex justify-start m-2'>
        <ToggleGroup
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
        </ToggleGroup>
      </span>

      <Textarea
        value={themeMode.content}
        onChange={handleContentChange}
        placeholder='Type your message here.'
        className='min-h-80 h-96 m-2'
      />
    </div>
  );
}
