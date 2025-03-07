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
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { CreateMode } from './CreateMode';
import { useSession } from 'next-auth/react';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

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
  setTheme: Dispatch<SetStateAction<string>>;
}) {
  const { data: session } = useSession();

  const [themeMode, setThemeMode] = useState({
    modeId: theme?.modes[0].id,
    mode: theme?.modes[0].mode,
    content: theme?.modes[0].content,
  });

  // Track original values to detect changes
  const [originalValues, setOriginalValues] = useState({
    modeId: theme?.modes[0].id,
    mode: theme?.modes[0].mode,
    content: theme?.modes[0].content,
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

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setThemeMode((prevThemeMode) => ({
      ...prevThemeMode,
      content: event.target.value,
    }));
    setTheme(event.target.value);
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

    onSuccess() {
      setOriginalValues({
        modeId: themeMode.modeId,
        mode: themeMode.mode,
        content: themeMode.content,
      });
      toast.success('Mode updated successfully');
      setIsLoading(false);
      setHasChanges(false);
    },
    onError(error) {
      toast.error('Failed to update mode');
      setIsLoading(false);
    },
  });

  const onUpdate = async () => {
    setIsLoading(true);
    if (!themeMode.mode) {
      toast.error('Mode name cannot be null');
      setIsLoading(false);
      return;
    }
    if (!themeMode.content) {
      toast.error('Mode content cannot be null');
      setIsLoading(false);
      return;
    }
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

    mutation.mutate({
      themeId: theme.id,
      modeId: themeMode.modeId,
      content: themeMode.content,
      mode: themeMode.mode,
    });
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
        <div className='flex'>
          <Input value={themeMode.mode} onChange={handleModeNameChange} />
          <Button
            className='ml-2'
            onClick={onUpdate}
            disabled={!hasChanges || isLoading}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </div>
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
