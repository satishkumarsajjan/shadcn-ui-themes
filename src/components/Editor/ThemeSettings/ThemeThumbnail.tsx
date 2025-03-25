'use client';

import ColorPickerHex from '@/components/themeEditor/ColorPickerHex';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { DEFAULT_THEME_COLORS } from '@/lib/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { PlusCircleIcon, Save } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ThemeThumbnailProps {
  themeId: string;
  theme_Colors?: string[];
}

const ThemeThumbnail = ({ themeId, theme_Colors }: ThemeThumbnailProps) => {
  const [themeColors, setThemeColors] = useState(
    theme_Colors || DEFAULT_THEME_COLORS
  ); // Then in your JSX
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (colors: string[]) => {
      return axios.post('/api/theme/colors', {
        themeId: themeId,
        colors: colors,
      });
    },
    onSuccess() {
      toast.success('Theme colors updated successfully');
      if (themeId) {
        // Invalidate the specific theme query to trigger a refetch
        queryClient.invalidateQueries({
          queryKey: ['Theme', themeId],
        });
      }
    },
    onError(error) {
      toast.error('Failed to update theme colors');
      console.error(error);
    },
  });
  const onColorsChange = (newColors: string[]) => setThemeColors(newColors);
  const handleColorChange = (newColor: string, index: number) => {
    if (onColorsChange) {
      const updatedColors = [...themeColors];
      updatedColors[index] = newColor;
      onColorsChange(updatedColors);
    }
  };

  const handleRemoveColor = (indexToRemove: number) => {
    const updatedColors = themeColors.filter(
      (_, index) => index !== indexToRemove
    );

    // If parent component provided a callback, use it
    if (onColorsChange) {
      onColorsChange(updatedColors);
    }
  };

  const handleAddColor = () => {
    if (onColorsChange) {
      // Add a default color (black)
      onColorsChange([...themeColors, '#000000']);
    }
  };

  const handleSaveColors = () => {
    // Validate colors before saving
    if (themeColors.length < 4) {
      toast.error('At least 4 colors are required', {});
      return;
    }
    if (themeColors.length > 8) {
      toast.error('Maximum 8 colors are allowed');
      return;
    }

    // Save colors using the mutation
    mutation.mutate(themeColors);
  };

  return (
    <div>
      <span className='flex justify-between items-center'>
        <Label className='text-lg font-semibold'>
          Colors to represent your theme.
        </Label>
      </span>
      <div className='flex flex-wrap gap-2 mt-2'>
        {themeColors.map((color, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div key={`${color}-${index}`} className='relative group'>
                <span
                  className='h-9 w-12 inline-block rounded-md'
                  style={{ backgroundColor: color }}
                ></span>
                <button
                  className='absolute -top-1 -right-1 h-5 w-5 rounded-full bg-popover text-popover-foreground flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity'
                  onClick={() => handleRemoveColor(index)}
                  aria-label={`Remove ${color} color`}
                >
                  <span className='leading-none' style={{ fontSize: '15px' }}>
                    ×
                  </span>
                </button>
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <ColorPickerHex
                swatchColor={color}
                onChange={(newColor) => handleColorChange(newColor, index)}
              />
            </HoverCardContent>
          </HoverCard>
        ))}
        <Button variant={'secondary'} onClick={handleAddColor}>
          <PlusCircleIcon />
        </Button>
      </div>

      <div className='mt-4 flex justify-end'>
        <Button
          onClick={handleSaveColors}
          disabled={mutation.isPending}
          className='flex items-center gap-2'
        >
          <Save size={16} />
          {mutation.isPending ? 'Saving...' : 'Save Colors'}
        </Button>
      </div>
    </div>
  );
};

export default ThemeThumbnail;
