'use client';

import ComponentGrid from '@/components/Editor/ComponentGrid';
import { useThemeById } from '@/hooks/get-theme-by-Id';
import { DEFAULT_THEME } from '@/lib/constants';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { EditTheme } from '../Editor/ThemeSettings/ThemeSettings';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { ScrollArea } from '../ui/scroll-area';
import ColorSwatches from './ColorSwatches';

export interface ThemeConfig {
  [key: string]: string;
}

// Create a cache to store theme data by ID
const themeCache = new Map<string, string>();

/**
 * Converts CSS variable string to a JSON object
 */
const convertThemeToJSON = (str: string): ThemeConfig => {
  const regex = /(--[\w-]+):\s([^;]+);/g;
  let match;
  const result: ThemeConfig = {};

  while ((match = regex.exec(str)) !== null) {
    const key = match[1]; // Keep the -- prefix in the key
    const value = match[2].trim();
    result[key] = value;
  }

  return result;
};

/**
 * Converts ThemeConfig object back to CSS variable string
 */
const convertJSONToTheme = (config: ThemeConfig): string => {
  let themeStr = '';
  for (const [key, value] of Object.entries(config)) {
    themeStr += `${key}: ${value};\n`;
  }
  return themeStr;
};

function ThemeEditor({ id }: { id: string }) {
  const [theme, setTheme] = useState(() => themeCache.get(id) || DEFAULT_THEME);
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const { data, isFetching, error } = useThemeById(id);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  // Memoize the theme config to avoid recalculating on every render
  const themeConfig = useMemo(() => convertThemeToJSON(theme), [theme]);

  // Handle color change from ColorSwatches
  const handleColorChange = useCallback((key: string, colorValue: string) => {
    // Create a new theme by replacing the specific CSS variable
    setTheme((prevTheme) => {
      const themeLines = prevTheme.split('\n');
      const updatedThemeLines = themeLines.map((line) => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith(key + ':')) {
          return `${key}: ${colorValue};`;
        }
        return line;
      });

      return updatedThemeLines.join('\n');
    });
  }, []);
  // Add state for selected colors
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // Handle color swatch click
  const handleColorSwatchClick = useCallback((key: string) => {
    setSelectedColors((prev) => {
      // If color is already selected, remove it
      if (prev.includes(key)) {
        return prev.filter((color) => color !== key);
      }
      // If we already have 6 colors selected and trying to add more, replace the oldest one
      if (prev.length >= 6) {
        return [...prev.slice(1), key];
      }
      // Otherwise add the new color
      return [...prev, key];
    });
  }, []);

  // Get the selected colors data
  const selectedColorsData = useMemo(() => {
    return selectedColors.map((key) => ({
      key,
      value: themeConfig[key],
    }));
  }, [selectedColors, themeConfig]);
  // Handle data fetching and update theme state
  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
      return;
    }

    // Only set the theme from API data if we haven't loaded it before
    // or if there's no cached version
    if (!initialLoadDone && data?.theme?.modes && data.theme.modes.length > 0) {
      const newTheme = data.theme.modes[0].content;
      setTheme(newTheme);
      // Cache the theme data
      themeCache.set(id, newTheme);
      setInitialLoadDone(true);
    }

    // Set loading to false only after data is processed
    setIsLoading(false);
  }, [data, isFetching, id, initialLoadDone]);

  // Update theme cache whenever theme changes
  useEffect(() => {
    if (theme && id) {
      themeCache.set(id, theme);
    }
  }, [theme, id]);

  // Apply theme styles to the DOM
  useEffect(() => {
    // Create a style element for scoped styles if it doesn't exist
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      document.head.appendChild(styleRef.current);
    }

    // Generate CSS with higher specificity using the container's class
    let cssText = `.theme-editor-${id} {`;
    for (const [key, value] of Object.entries(themeConfig)) {
      cssText += `\n  ${key}: ${value};`;
    }
    cssText += '\n}';

    // Add styles that will override any card styles within this component
    cssText += `\n.theme-editor-${id} .card {
      border-color: hsl(var(--border)) !important;
    }`;

    styleRef.current.textContent = cssText;

    // Cleanup function to remove the style element when component unmounts
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [themeConfig, id]);

  // Memoize the theme update handler to avoid recreating on each render
  const handleThemeUpdate = useCallback((newTheme: string) => {
    setTheme(newTheme);
  }, []);

  // Show loading state while data is being fetched or processed
  if (isLoading && !initialLoadDone) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='flex flex-col items-center space-y-4'>
          <div className='w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
          <p className='text-muted-foreground'>Loading theme...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-[400px]'>
        <div className='p-4 bg-destructive/10 text-destructive rounded-md'>
          <h3 className='font-medium'>Error loading theme</h3>
          <p>{error.message || 'An unknown error occurred'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='m-4'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className='h-fit overflow-scroll'>
          <ScrollArea className='h-screen rounded-md'>
            <div
              ref={containerRef}
              className={`theme-editor-${id} p-4 rounded-lg`}
              style={{
                backgroundColor: `hsl(${
                  themeConfig['--background'] || '0 0% 0%'
                })`,
              }}
            >
              {/* Example of using Tailwind with the theme config */}
              <div className='mb-4'>
                <h2
                  className='text-xl font-bold'
                  style={{
                    color: `hsl(${themeConfig['--foreground'] || '0 0% 100%'})`,
                  }}
                >
                  Theme Preview
                </h2>
                <p
                  style={{
                    color: `hsl(${
                      themeConfig['--muted-foreground'] || '0 0% 70%'
                    })`,
                  }}
                >
                  Click on color swatches to configure their color values
                </p>
              </div>

              <ColorSwatches
                themeConfig={themeConfig}
                onThemeChange={handleColorChange}
              />
              {/* Main content using the theme */}
              <div
                className='border rounded-md p-4 mb-4'
                style={{
                  borderColor: `hsl(${themeConfig['--border'] || '0 0% 20%'})`,
                }}
              >
                <h3
                  className='text-lg font-medium'
                  style={{
                    color: `hsl(${themeConfig['--foreground'] || '0 0% 100%'})`,
                  }}
                >
                  Component with Themed Styles
                </h3>
                <p
                  style={{
                    color: `hsl(${
                      themeConfig['--muted-foreground'] || '0 0% 70%'
                    })`,
                  }}
                >
                  This component inherits styles from the theme configuration.
                </p>

                <div className='mt-2 flex gap-2'>
                  <button
                    className='px-3 py-1 rounded-md text-sm font-medium'
                    style={{
                      backgroundColor: `hsl(${
                        themeConfig['--primary'] || '0 0% 50%'
                      })`,
                      color: `hsl(${
                        themeConfig['--primary-foreground'] || '0 0% 100%'
                      })`,
                    }}
                  >
                    Primary Button
                  </button>

                  <button
                    className='px-3 py-1 rounded-md text-sm font-medium'
                    style={{
                      backgroundColor: `hsl(${
                        themeConfig['--secondary'] || '0 0% 30%'
                      })`,
                      color: `hsl(${
                        themeConfig['--secondary-foreground'] || '0 0% 100%'
                      })`,
                    }}
                  >
                    Secondary Button
                  </button>
                </div>
              </div>
              <ComponentGrid />
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <ScrollArea className='h-screen rounded-md'>
            <EditTheme
              theme={data?.theme}
              setTheme={handleThemeUpdate}
              currentTheme={theme} // Pass the current theme to EditTheme
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ThemeEditor;
