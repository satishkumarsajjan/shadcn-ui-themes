import { EditThemeProps, ThemeModeState } from "@/components/Editor/ThemeSettings/ModeSelector";
import { UpdateModeResponse } from "@/types/apiReturnTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Custom hooks
export function useThemeModeState(
  theme: EditThemeProps['theme'],
  currentTheme?: string
) {
  // Initialize theme mode state
  const [themeMode, setThemeMode] = useState<ThemeModeState>(() => {
    if (theme?.modes?.length) {
      return {
        modeId: theme.modes[0].id,
        mode: theme.modes[0].mode,
        content: currentTheme || theme.modes[0].content,
      };
    }
    return { modeId: '', mode: '', content: '' };
  });

  // Track original values to detect changes
  const [originalValues, setOriginalValues] = useState<ThemeModeState>(() => {
    if (theme?.modes?.length) {
      return {
        modeId: theme.modes[0].id,
        mode: theme.modes[0].mode,
        content: theme.modes[0].content,
      };
    }
    return { modeId: '', mode: '', content: '' };
  });

  // Update themeMode when currentTheme changes
  useEffect(() => {
    if (currentTheme && themeMode.content !== currentTheme) {
      setThemeMode((prev) => ({
        ...prev,
        content: currentTheme,
      }));
    }
  }, [currentTheme, themeMode.content]);

  // Calculate if there are changes
  const hasChanges =
    themeMode.mode !== originalValues.mode ||
    themeMode.content !== originalValues.content;

  return {
    themeMode,
    setThemeMode,
    originalValues,
    setOriginalValues,
    hasChanges,
  };
}

export function useThemeMutations(theme: EditThemeProps['theme']) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  // Update mode mutation
  const updateMutation = useMutation({
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
      setIsLoading(false);
      invalidateQueries();
      toast.success('Theme mode updated successfully');
      return data.data.mode;
    },
    onError(error) {
      setIsLoading(false);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update theme mode'
      );
    },
  });

  // Delete mode mutation
  const deleteMutation = useMutation({
    mutationFn: ({ themeId, modeId }: { themeId: string; modeId: string }) => {
      return axios.post<UpdateModeResponse>('/api/theme/deletemode', {
        themeId,
        modeId,
      });
    },
    onSuccess() {
      setIsLoading(false);
      invalidateQueries();
      toast.success('Mode deleted successfully');
    },
    onError() {
      setIsLoading(false);
      toast.error('Failed to delete mode');
    },
  });

  // Update theme title mutation
  const updateTitleMutation = useMutation({
    mutationFn: ({ themeId, title }: { themeId: string; title: string }) => {
      return axios.post('/api/theme/updatethemetitle', {
        themeId,
        title,
      });
    },
    onSuccess() {
      setIsLoading(false);
      invalidateQueries();
      toast.success('Theme title updated successfully');
    },
    onError(error) {
      setIsLoading(false);
      toast.error(
        error instanceof Error ? error.message : 'Failed to update theme title'
      );
    },
  });

  // Delete theme mutation
  const deleteThemeMutation = useMutation({
    mutationFn: ({ themeId }: { themeId: string }) => {
      return axios.post('/api/theme/themedelete', {
        themeId,
      });
    },
    onSuccess() {
      setIsLoading(false);
      queryClient.invalidateQueries({
        queryKey: ['themes'],
      });
      window.location.href = '/themes';
      toast.success('Theme deleted successfully');
    },
    onError(error) {
      setIsLoading(false);
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete theme'
      );
    },
  });

  // Helper to invalidate queries
  const invalidateQueries = () => {
    if (theme?.id) {
      queryClient.invalidateQueries({
        queryKey: ['theme', theme.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['themes'],
      });
    }
  };

  return {
    updateMutation,
    deleteMutation,
    updateTitleMutation,
    deleteThemeMutation,
    isLoading,
    setIsLoading,
  };
}
