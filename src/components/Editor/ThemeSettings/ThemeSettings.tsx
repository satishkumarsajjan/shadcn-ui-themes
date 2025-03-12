'use client';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'sonner';

// UI Components
import {
  useThemeModeState,
  useThemeMutations,
} from '@/hooks/ThemeSettings/themeSettings';
import { debounce } from '@/lib/utils';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Separator } from '../../ui/separator';
import { DeleteModeDialog } from './DeleteModeDialog';
import { ModeSelector } from './ModeSelector';
import { ThemeContentEditor } from './ThemeContentEditor';
import { ThemeWithCounts, ThemeWithUserActions } from '@/types/apiReturnTypes';

// Component props
export interface EditThemeProps {
  theme: ThemeWithCounts | ThemeWithUserActions | undefined;
  setTheme: (content: string) => void;
  currentTheme?: string;
  onModeChange?: (modeId: string) => void;
  onUpdate?: () => void; // Add this prop for explicit updates
}

// Main component
export function EditTheme({
  theme,
  setTheme,
  currentTheme,
  onModeChange,
  onUpdate,
}: EditThemeProps) {
  const { data: session } = useSession();
  const isOwner = session?.user?.id === theme?.userId;

  const { themeMode, setThemeMode, setOriginalValues, hasChanges } =
    useThemeModeState(theme, currentTheme);

  const { updateMutation, deleteMutation, isLoading, setIsLoading } =
    useThemeMutations(theme);

  // Create a debounced function for theme updates
  const debouncedSetTheme = useCallback(
    debounce((content: string) => {
      setTheme(content);
    }, 300),
    [setTheme]
  );

  // Handle mode selection change
  const handleModeChange = (newMode: string) => {
    const selectedMode = theme?.modes.find((mode) => mode.mode === newMode);
    if (selectedMode) {
      // If we have a currentTheme and we're on the currently selected mode,
      // keep using the current theme content
      const useCurrentContent =
        currentTheme &&
        themeMode.modeId === selectedMode.id &&
        themeMode.content === currentTheme;

      const newContent = useCurrentContent
        ? currentTheme
        : selectedMode.content;

      setThemeMode({
        modeId: selectedMode.id,
        mode: selectedMode.mode,
        content: newContent,
      });

      setTheme(newContent);

      // Update original values for the new mode
      setOriginalValues({
        modeId: selectedMode.id,
        mode: selectedMode.mode,
        content: selectedMode.content,
      });

      // Call the onModeChange prop if provided
      if (onModeChange) {
        onModeChange(selectedMode.id);
      }
    }
  };

  // Handle content changes
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setThemeMode((prev) => ({ ...prev, content: newContent }));
    debouncedSetTheme(newContent);
  };

  // Handle mode name changes
  const handleModeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode((prev) => ({ ...prev, mode: e.target.value }));
  };

  // Format the content
  const formatContent = () => {
    try {
      // Check if content is JSON
      if (themeMode.content.trim().startsWith('{')) {
        // Try to parse as JSON
        const parsedContent = JSON.parse(themeMode.content);
        const formattedContent = JSON.stringify(parsedContent, null, 2);
        setThemeMode((prev) => ({ ...prev, content: formattedContent }));
        debouncedSetTheme(formattedContent);
        return;
      }

      // Handle CSS variables format (--variable: value;)
      const cssVarRegex = /(--[\w-]+):\s*([^;]+);?/g;
      const matches = Array.from(themeMode.content.matchAll(cssVarRegex));

      if (matches.length > 0) {
        // Format CSS variables
        const formattedLines = matches.map((match) => {
          const [_, variable, value] = match;
          return `${variable}: ${value.trim()};`;
        });

        const formattedContent = formattedLines.join('\n');
        setThemeMode((prev) => ({ ...prev, content: formattedContent }));
        debouncedSetTheme(formattedContent);
        return;
      }

      // Fallback to basic text formatting
      const lines = themeMode.content.split('\n');
      const formattedLines = lines
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .filter(
          (line, index, array) => !(line === '' && array[index - 1] === '')
        );

      const formattedContent = formattedLines.join('\n');
      setThemeMode((prev) => ({ ...prev, content: formattedContent }));
      debouncedSetTheme(formattedContent);
    } catch (error) {
      console.error('Error formatting content:', error);
      toast.error('Failed to format content');
    }
  };

  // Handle update
  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      // Validate all required fields
      const validationErrors = [];
      if (!themeMode.mode) validationErrors.push('Mode name cannot be null');
      if (!themeMode.content)
        validationErrors.push('Mode content cannot be null');
      if (!themeMode.modeId) validationErrors.push('Mode ID is missing');
      if (!theme?.id) validationErrors.push('Theme ID is missing');

      if (validationErrors.length > 0) {
        toast.error(validationErrors[0]);
        setIsLoading(false);
        return;
      }

      // Perform the update
      const {
        data: {
          mode: { id, mode, content },
        },
      } = await updateMutation.mutateAsync({
        themeId: theme!.id,
        modeId: themeMode.modeId,
        content: themeMode.content,
        mode: themeMode.mode,
      });

      // Update state with the response
      setOriginalValues({
        modeId: id,
        mode: mode,
        content: content,
      });

      setThemeMode({
        modeId: id,
        mode: mode,
        content: content,
      });

      // Call onModeChange if the mode ID changed
      if (onModeChange && id !== themeMode.modeId) {
        onModeChange(id);
      }

      // Call onUpdate to explicitly reset ColorSwatches
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Failed to update theme mode:', error);
      toast.error('Failed to update theme');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle delete
  const handleDelete = () => {
    if (!themeMode.modeId) {
      toast.error('Mode ID is missing');
      return;
    }
    if (!theme?.id) {
      toast.error('Theme ID is missing');
      return;
    }

    setIsLoading(true);
    deleteMutation.mutate({
      themeId: theme.id,
      modeId: themeMode.modeId,
    });
  };

  return (
    <div className='m-2 h-full'>
      <h1 className='font-bold text-xl mb-2'>{theme?.title}</h1>

      <ModeSelector
        theme={theme}
        themeMode={themeMode}
        onModeChange={handleModeChange}
      />

      <Separator orientation='horizontal' className='my-3' />

      <div className='flex flex-col'>
        {isOwner && (
          <div className='flex gap-2'>
            <Input
              value={themeMode.mode}
              onChange={handleModeNameChange}
              placeholder='Mode name'
            />
            <Button onClick={handleUpdate} disabled={!hasChanges || isLoading}>
              {isLoading ? 'Updating...' : 'Update'}
            </Button>

            <DeleteModeDialog onDelete={handleDelete} isDisabled={isLoading} />
          </div>
        )}

        <ThemeContentEditor
          content={themeMode.content}
          onChange={handleContentChange}
          onFormat={formatContent}
        />
      </div>
    </div>
  );
}
