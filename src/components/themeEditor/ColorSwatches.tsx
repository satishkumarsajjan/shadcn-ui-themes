'use client';

import React, { useCallback, memo, useState, useEffect } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import { ThemeConfig } from './ThemeEditor';
import ColorPicker from './ColorPicker';
import { HslColor } from 'react-colorful';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ColorSwatchesProps {
  themeConfig: ThemeConfig;
  onThemeChange?: (key: string, colorValue: string) => void;
}

const ColorSwatches = memo(
  ({ themeConfig, onThemeChange }: ColorSwatchesProps) => {
    // Store the original theme config for reset functionality
    const [originalThemeConfig, setOriginalThemeConfig] = useState<ThemeConfig>(
      {}
    );

    // Track if any colors have been changed
    const [hasChanges, setHasChanges] = useState(false);

    // Store the original theme config when the component mounts or themeConfig changes
    useEffect(() => {
      setOriginalThemeConfig({ ...themeConfig });
    }, []); // Empty dependency array means this only runs once on mount

    // Memoize the color change handler to prevent it from changing on every render
    const handleColorChange = useCallback(
      (key: string, newColor: HslColor) => {
        if (!onThemeChange) return;

        // Convert HslColor object to string format
        const colorValue = `${Math.round(newColor.h)} ${Math.round(
          newColor.s
        )}% ${Math.round(newColor.l)}%`;

        // Call the parent's callback with just the key and new value
        onThemeChange(key, colorValue);
      },
      [onThemeChange, originalThemeConfig]
    );

    // Function to reset all colors to their original values
    const handleReset = useCallback(() => {
      if (!onThemeChange) return;

      // Reset each color to its original value
      Object.entries(originalThemeConfig).forEach(([key, value]) => {
        if (themeConfig[key] !== value) {
          onThemeChange(key, value);
        }
      });

      // Reset the hasChanges flag
      setHasChanges(false);
    }, [onThemeChange, originalThemeConfig, themeConfig]);

    return (
      <div className='space-y-4'>
        <div className='flex justify-between items-center'>
          <span>
            <h3 className='font-medium text-primary'>Color Swatches</h3>
            <p className='text-muted-foreground'>
              Click on color swatches to configure their color values
            </p>
          </span>
          <Button
            variant='secondary'
            size='sm'
            onClick={handleReset}
            disabled={!hasChanges}
          >
            <RefreshCw className='h-4 w-4 mr-2' />
            Reset Colors
          </Button>
        </div>

        <div className='flex flex-wrap gap-2 mb-4 justify-self-stretch'>
          {Object.entries(themeConfig)
            .filter(
              ([key]) =>
                key.includes('--') &&
                !key.includes('gradient') &&
                !key.includes('radius')
            )
            .map(([key, value]) => {
              // Determine if the value is an HSL string
              const isHsl = value.includes('%');

              // Check if this color has been changed from original
              const isChanged = originalThemeConfig[key] !== value;

              return (
                <HoverCard key={key}>
                  <HoverCardTrigger>
                    <div
                      className={`p-6 border rounded flex flex-col items-center justify-center shadow-md cursor-pointer relative ${
                        isChanged ? 'ring-2 ring-primary' : ''
                      }`}
                      style={{
                        backgroundColor: isHsl ? `hsl(${value})` : value,
                      }}
                    >
                      <div className='flex flex-col bg-black bg-opacity-50 p-2 rounded-md text-white'>
                        <span className='text-xs font-mono'>{key}</span>
                        <span className='text-xs'>{value}</span>
                        {isChanged && (
                          <span className='text-xs text-yellow-300'>
                            Modified
                          </span>
                        )}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    {isHsl ? (
                      <div className='space-y-4'>
                        <ColorPicker
                          key={`${key}-${value}`} // Add key to force re-creation when value changes
                          swatchColor={value}
                          onChange={(newColor) =>
                            handleColorChange(key, newColor)
                          }
                        />

                        {isChanged && (
                          <div className='flex justify-between items-center'>
                            <span className='text-xs text-muted-foreground'>
                              Original: {originalThemeConfig[key]}
                            </span>
                            <Button
                              variant='outline'
                              size='sm'
                              onClick={() =>
                                onThemeChange &&
                                onThemeChange(key, originalThemeConfig[key])
                              }
                            >
                              Reset
                            </Button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>Non-HSL colors not supported in color picker</div>
                    )}
                  </HoverCardContent>
                </HoverCard>
              );
            })}
        </div>
      </div>
    );
  }
);

ColorSwatches.displayName = 'ColorSwatches';

export default ColorSwatches;
