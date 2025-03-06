'use client';

import { useEffect, useRef, useState } from 'react';
import ComponentGrid from '@/components/Editor/ComponentGrid';
import { EditTheme } from '../Editor/ThemeSettings';
import { useThemeById } from '@/hooks/get-theme-by-Id';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';

interface ThemeConfig {
  [key: string]: string;
}
const inputString = `
      --gradient: #00F5A0;

    --background: 169 65% 3.84%;
    --foreground: 169 10% 97.4%;

    --muted: 169 50% 14.399999999999999%;
    --muted-foreground: 169 10% 54.8%;

    --popover: 169 45% 6.24%;
    --popover-foreground: 169 10% 97.4%;

    --card: 169 45% 6.24%;
    --card-foreground: 169 10% 97.4%;

    --border: 169 50% 14.399999999999999%;
    --input: 169 50% 14.399999999999999%;

    --primary: 169 100% 48%;
    --primary-foreground: 169 10% 4.8%;

    --secondary: 169 50% 14.399999999999999%;
    --secondary-foreground: 169 10% 97.4%;

    --accent: 169 50% 14.399999999999999%;
    --accent-foreground: 169 10% 97.4%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 169 10% 97.4%;

    --ring: 169 100% 48%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
`;

function ThemeEditor({ id }: { id: string }) {
  const [theme, setTheme] = useState(inputString);
  const containerRef = useRef<HTMLDivElement>(null);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({});
  const { data, isFetching, error } = useThemeById(id);
  const [isLoading, setIsLoading] = useState(true);

  // First useEffect to handle data fetching and update theme state
  useEffect(() => {
    if (isFetching) {
      setIsLoading(true);
      return;
    }

    if (data && data.theme && data.theme.modes && data.theme.modes.length > 0) {
      setTheme(data.theme.modes[0].content);
    }

    // Set loading to false only after data is processed
    setIsLoading(false);
  }, [data, isFetching]);

  // Second useEffect to process the theme and apply styles
  useEffect(() => {
    const convertToJSON = (str: string) => {
      const regex = /(--[\w-]+):\s([^;]+);/g;
      let match;
      const result: { [key: string]: string } = {};

      while ((match = regex.exec(str)) !== null) {
        const key = match[1]; // Keep the -- prefix in the key
        const value = match[2].trim();

        result[key] = value;
      }

      return result;
    };

    const jsonResult = convertToJSON(theme);
    setThemeConfig(jsonResult);

    // Create a style element for scoped styles
    const styleElement = document.createElement('style');

    // Generate CSS with higher specificity using the container's class
    let cssText = `.theme-editor-${id} {`;
    for (const [key, value] of Object.entries(jsonResult)) {
      cssText += `\n  ${key}: ${value};`;
    }
    cssText += '\n}';

    // Add styles that will override any card styles within this component
    cssText += `\n.theme-editor-${id} .card {
      border-color: hsl(var(--border)) !important;
    }`;

    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);

    // Cleanup function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [theme, id]);

  // Show loading state while data is being fetched or processed
  if (isLoading) {
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
    <div className='mx-4'>
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className='h-fit overflow-scroll'>
          {' '}
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
                This component has its own scoped theme configuration.
              </p>
            </div>

            {/* Color swatches to demonstrate the theme */}
            <div className='flex flex-wrap gap-2 mb-4 justify-self-stretch'>
              {Object.entries(themeConfig)
                .filter(
                  ([key]) =>
                    key.includes('--') &&
                    !key.includes('gradient') &&
                    !key.includes('radius')
                )
                .map(([key, value]) => (
                  <div
                    key={key}
                    className='p-6 rounded flex flex-col items-center justify-center '
                    style={{
                      backgroundColor: value.includes('%')
                        ? `hsl(${value})`
                        : value,
                      color: `hsl(${
                        themeConfig['--foreground'] || '0 0% 100%'
                      })`,
                    }}
                  >
                    <div className='flex flex-col bg-black bg-opacity-50 p-2 rounded-md'>
                      <span className='text-xs font-mono'>{key}</span>
                      <span className='text-xs'>{value}</span>
                    </div>
                  </div>
                ))}
            </div>

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
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <EditTheme theme={data?.theme} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
export default ThemeEditor;
