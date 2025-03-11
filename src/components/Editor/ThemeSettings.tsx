'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { TrashIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Textarea } from '../ui/textarea';
import { CreateMode } from './CreateMode';
interface UpdateModeResponse {
  message: string;
  mode: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    mode: string;
    themeId: string;
    content: string;
  };
}
export function EditTheme({
  theme,
  setTheme,
}: {
  theme: ThemeWithCounts | ThemeWithUserActions | undefined;
  setTheme: (newTheme: string) => void;
}) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [themeMode, setThemeMode] = useState(() => {
    if (theme && theme.modes && theme.modes.length > 0) {
      return {
        modeId: theme.modes[0].id,
        mode: theme.modes[0].mode,
        content: theme.modes[0].content,
      };
    }
    return { modeId: '', mode: '', content: '' };
  });

  // Track original values to detect changes
  const [originalValues, setOriginalValues] = useState(() => {
    if (theme && theme.modes && theme.modes.length > 0) {
      return {
        modeId: theme.modes[0].id,
        mode: theme.modes[0].mode,
        content: theme.modes[0].content,
      };
    }
    return { modeId: '', mode: '', content: '' };
  });

  // State to track if there are changes
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update hasChanges whenever themeMode changes
  useEffect(() => {
    const modeChanged = themeMode.mode !== originalValues.mode;
    const contentChanged = themeMode.content !== originalValues.content;
    setHasChanges(modeChanged || contentChanged);
  }, [themeMode, originalValues]);

  const handleModeChange = (newMode: string) => {
    const selectedMode = theme?.modes.find((mode) => mode.mode === newMode);
    if (selectedMode) {
      setThemeMode({
        modeId: selectedMode.id,
        mode: selectedMode.mode,
        content: selectedMode.content,
      });
      setTheme(selectedMode.content);
      // Update original values for the new mode
      setOriginalValues({
        modeId: selectedMode.id,
        mode: selectedMode.mode,
        content: selectedMode.content,
      });
    }
  };

  // Create a debounced function that persists across renders using useCallback with inline function
  const debouncedSetTheme = useCallback(
    (newContent: string) => {
      // Define the debounce function inside the callback
      const debouncedFn = debounce((content: string) => {
        setTheme(content);
      }, 300);

      // Call the debounced function
      debouncedFn(newContent);
    },
    [setTheme]
  ); // Add setTheme as a dependency

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newContent = event.target.value;

    // Update the local state immediately for a responsive UI
    setThemeMode((prevThemeMode) => ({
      ...prevThemeMode,
      content: newContent,
    }));

    // Debounce the more expensive setTheme operation
    debouncedSetTheme(newContent);
  };

  const handleModeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setThemeMode((prevThemeMode) => ({
      ...prevThemeMode,
      mode: event.target.value,
    }));
  };

  const mutation = useMutation({
    mutationFn: ({
      themeId,
      content,
      mode,
      modeId,
    }: {
      themeId: string;
      modeId: string;
      mode: string;
      content: string;
    }) => {
      return axios.post<UpdateModeResponse>('/api/theme/updateMode', {
        themeId,
        content,
        mode,
        modeId,
      });
    },

    onSuccess(data) {
      // Update both original values and current theme mode state
      const updatedMode = {
        modeId: data.data.mode.id,
        mode: data.data.mode.mode,
        content: data.data.mode.content,
      };

      setOriginalValues(updatedMode);
      setThemeMode(updatedMode);
      setIsLoading(false);
      setHasChanges(false);

      if (theme?.id) {
        // Ensure consistent casing in query key (lowercase 'theme')
        queryClient.invalidateQueries({
          queryKey: ['theme', theme.id],
        });

        // Also invalidate the themes list if needed
        queryClient.invalidateQueries({
          queryKey: ['theme'],
          exact: false,
        });
      }
    },
    onError() {
      setIsLoading(false);
    },
  });
  const onUpdate = async () => {
    setIsLoading(true);

    try {
      // Validate all required fields at once
      const validationErrors = [];

      if (!themeMode.mode) {
        validationErrors.push('Mode name cannot be null');
      }

      if (!themeMode.content) {
        validationErrors.push('Mode content cannot be null');
      }

      if (!themeMode.modeId) {
        validationErrors.push('Mode ID is missing');
      }

      if (!theme?.id) {
        validationErrors.push('Theme ID is missing');
      }

      // If any validation errors, show the first one and return early
      if (validationErrors.length > 0) {
        toast.error(validationErrors[0]);
        return;
      }

      // All validations passed, proceed with mutation
      await mutation.mutateAsync({
        themeId: theme!.id,
        modeId: themeMode.modeId,
        content: themeMode.content,
        mode: themeMode.mode,
      });

      // Optional: Show success toast
      toast.success('Theme mode updated successfully');
    } catch (error) {
      // Handle mutation errors
      console.error('Failed to update theme mode:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update theme mode'
      );
    } finally {
      // Always set loading to false when done, regardless of success or failure
      setIsLoading(false);
    }
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
    } catch {
      // If not JSON, apply basic text formatting
      // Split by lines, trim each line, and rejoin
      // (" @ts-expect-error Content might not be a string but we're handling it safely");
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

  const deleteMutation = useMutation({
    mutationFn: ({ themeId, modeId }: { themeId: string; modeId: string }) => {
      return axios.post<UpdateModeResponse>('/api/theme/deletemode', {
        themeId,
        modeId,
      });
    },

    onSuccess() {
      toast.success('Mode deleted successfully');
      setIsLoading(false);
      setHasChanges(false);
      if (theme?.id) {
        // Invalidate the specific theme query to trigger a refetch
        queryClient.invalidateQueries({
          queryKey: ['theme', theme.id],
        });

        // Also invalidate any themes list queries that might include this theme
        queryClient.invalidateQueries({
          queryKey: ['themes'],
        });
      }
    },
    onError() {
      toast.error('Failed to delete mode');
      setIsLoading(false);
    },
  });

  return (
    <div className='m-2 h-full'>
      <h1 className='font-bold text-xl mb-2'>{theme?.title}</h1>
      <span className='flex justify-between'>
        <Select defaultValue={themeMode.mode} onValueChange={handleModeChange}>
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
        {session && session.user?.id === theme?.userId && (
          <span className='ml-2'>
            <CreateMode themeId={theme?.id} />
          </span>
        )}
      </span>
      <Separator orientation='horizontal' className='my-3' />
      <div className='flex flex-col'>
        {session && session.user?.id === theme?.userId && (
          <div className='flex gap-2'>
            <Input value={themeMode.mode} onChange={handleModeNameChange} />
            <Button
              onClick={() => {
                onUpdate();
              }}
              disabled={!hasChanges || isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={'destructive'}>
                  <TrashIcon />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your mode.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      if (!themeMode.modeId) {
                        toast.error('Mode ID is missing');
                        setIsLoading(false);
                        return;
                      }
                      if (!theme?.id) {
                        toast.error('Theme ID is missing');
                        setIsLoading(false);
                        return;
                      }
                      deleteMutation.mutate({
                        themeId: theme?.id,
                        modeId: themeMode.modeId,
                      });
                    }}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        <div className='relative mt-2'>
          <Textarea
            value={themeMode.content}
            onChange={handleContentChange}
            placeholder='Type your message here.'
            className='h-[550px]'
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
    </div>
  );
}

// Helper function for debouncing
function debounce<T extends (...args: string[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
