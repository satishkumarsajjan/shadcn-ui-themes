'use client';

import ColorPicker from '@/components/themeEditor/ColorPicker';
import ColorPickerHex from '@/components/themeEditor/ColorPickerHex';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Label } from '@/components/ui/label';
import { PlusCircleIcon } from 'lucide-react';

interface ThemeThumbnailProps {
  colors: string[];
  onColorsChange?: (newColors: string[]) => void;
}

const ThemeThumbnail = ({ colors, onColorsChange }: ThemeThumbnailProps) => {
  const handleRemoveColor = (indexToRemove: number) => {
    const updatedColors = colors.filter((_, index) => index !== indexToRemove);

    // If parent component provided a callback, use it
    if (onColorsChange) {
      onColorsChange(updatedColors);
    }
  };

  return (
    <div>
      <span className='flex justify-between items-center'>
        <Label>Colors to represent your theme.</Label>
        <Button variant={'ghost'}>
          <PlusCircleIcon />
        </Button>
      </span>
      <div className='flex flex-wrap gap-2 mt-2'>
        {colors.map((color, index) => (
          <HoverCard key={index}>
            <HoverCardTrigger>
              <div key={`${color}-${index}`} className='relative group'>
                <span
                  className={`h-9 w-12 bg-[${color}] inline-block rounded-md`}
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
              <ColorPickerHex swatchColor={color} />
            </HoverCardContent>
          </HoverCard>
        ))}
      </div>
    </div>
  );
};

export default ThemeThumbnail;
