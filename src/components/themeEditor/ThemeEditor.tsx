'use client';

import ComponentGrid from '@/components/Editor/ComponentGrid';
import { useThemeById } from '@/hooks/get-theme-by-Id';
import { DEFAULT_THEME } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AllAreaChartsObject } from '../displayComponents/charts/area-chart/AllAreaCharts';
import ChartsGrid from '../displayComponents/charts/ChartsGrid';
import { EditTheme } from '../Editor/ThemeSettings/ThemeSettings';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ColorSwatches from './ColorSwatches';
import DescriptionTextEditor from './RichTextEditor';
import { Separator } from '../ui/separator';
import { AllBarCharsObject } from '../displayComponents/charts/bar-chart/AllBarCharts';
import { AllLineChartsObject } from '../displayComponents/charts/line-chart/AllLineCharts';
import { AllPieChartsObject } from '../displayComponents/charts/pie-chart/AllPieCharts';
import { AllRadarChartsObject } from '../displayComponents/charts/radar-chart/AllRadarCharts';
import { AllRadialChartsObject } from '../displayComponents/charts/radial-chart/AllRadialCharts';
import { AllTooltipChartObject } from '../displayComponents/charts/tooltip/AllTooltipCharts';
import Buttons from '../displayComponents/simpletons/Buttons';
import Alerts from '../displayComponents/simpletons/Alerts';
import Badges from '../displayComponents/simpletons/Badges';
import { CommandDemo } from '../displayComponents/simpletons/CommandDemo';
import { MenubarDemo } from '../displayComponents/simpletons/MenubarDemo';
import { PaginationDemo } from '../displayComponents/simpletons/PaginationDemo';
import { ProgressDemo } from '../displayComponents/simpletons/ProgressDemo';
import { RadioGroupDemo } from '../displayComponents/simpletons/RadioGroupDemo';
import { ScrollAreaHorizontalDemo } from '../displayComponents/simpletons/ScrollareaDemo';
import { SeparatorDemo } from '../displayComponents/simpletons/SeparatorDemo';
import { SliderDemo } from '../displayComponents/simpletons/SliderDemo';
import { ToggleGroupDemo } from '../displayComponents/simpletons/ToggleGroupDemo';
import ImportThemeButton from '../theme/themes/ImportThemeButton';

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
const chartComponents = [
  AllAreaChartsObject,
  AllBarCharsObject,
  AllLineChartsObject,
  AllPieChartsObject,
  AllRadarChartsObject,
  AllRadialChartsObject,
  AllTooltipChartObject,
];
function ThemeEditor({ id }: { id: string }) {
  const { data: session } = useSession();
  const [theme, setTheme] = useState(() => themeCache.get(id) || DEFAULT_THEME);
  const containerRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const { data, isFetching, error, refetch } = useThemeById(id);
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  const [themeDescription, setThemeDescription] = useState<string>('');

  // Update themeDescription when data is fetched
  useEffect(() => {
    if (data?.theme?.description) {
      setThemeDescription(data.theme.description);
    }
  }, [data?.theme?.description]);

  // Add state to track the current mode ID
  const [currentModeId, setCurrentModeId] = useState<string>('');

  // Add a key to force re-mount of ColorSwatches when mode changes or updates happen
  const [colorSwatchesKey, setColorSwatchesKey] = useState(0);

  // Add a key to force re-mount of EditTheme when theme data changes
  const [editThemeKey, setEditThemeKey] = useState(0);

  // Function to explicitly reset the ColorSwatches component
  const resetColorSwatches = useCallback(() => {
    setColorSwatchesKey((prev) => prev + 1);
  }, []);

  // Function to explicitly refetch theme data and force remount of EditTheme
  const handleRefetchTheme = useCallback(async () => {
    await refetch();
    setEditThemeKey((prev) => prev + 1);
  }, [refetch]);

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

      // Set the initial mode ID
      if (data.theme.modes[0].id) {
        setCurrentModeId(data.theme.modes[0].id);
      }

      // Cache the theme data
      themeCache.set(id, newTheme);
      setInitialLoadDone(true);
    }

    // Force remount of EditTheme when data changes to refresh the title
    if (data?.theme) {
      setEditThemeKey((prev) => prev + 1);
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

  // Handle mode change from EditTheme
  const handleModeChange = useCallback(
    (modeId: string) => {
      if (modeId !== currentModeId) {
        setCurrentModeId(modeId);
        // Reset ColorSwatches when mode changes
        resetColorSwatches();
      }
    },
    [currentModeId, resetColorSwatches]
  );

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
              <div className='my-4 flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-foreground'>
                  Theme Preview
                </h2>
                <ImportThemeButton themeId={id} userId={data?.theme.userId} />
              </div>

              <ColorSwatches
                key={colorSwatchesKey} // Force re-mount when mode changes
                themeConfig={themeConfig}
                onThemeChange={handleColorChange}
              />
              <Separator className='my-4' />
              <span className='w-full flex items-center justify-center font-semibold text-2xl mt-4 p-4'>
                <h1 className='text-foreground'>Basic components</h1>
              </span>
              <div
                className='grid gap-4'
                style={{
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(min(100%, 500px), 1fr))',
                }}
              >
                <Buttons />
                <Badges />
                <MenubarDemo />
                <PaginationDemo />
                <ProgressDemo />
                <SliderDemo />
                <SeparatorDemo />
                <ToggleGroupDemo />
                <RadioGroupDemo />
                <Alerts />
                <CommandDemo />
                <ScrollAreaHorizontalDemo />
              </div>

              <div className='my-4'>
                {!themeDescription &&
                !(session?.user?.id === data?.theme.userId) ? null : (
                  <DescriptionTextEditor
                    themeId={data?.theme.id}
                    initialContent={themeDescription}
                    readonly={!(session?.user?.id === data?.theme.userId)}
                    onDescriptionUpdate={(updatedDescription: string) =>
                      setThemeDescription(updatedDescription)
                    }
                  />
                )}
              </div>
              <Separator className='my-4' />
              <span className='w-full flex items-center justify-center font-semibold text-2xl mt-4 p-4'>
                <h1 className='text-foreground'>Components & Charts</h1>
              </span>
              <Tabs defaultValue='components' className='w-full'>
                <TabsList className='w-full'>
                  <TabsTrigger value='components' className='w-full'>
                    Components
                  </TabsTrigger>
                  <TabsTrigger value='charts' className='w-full'>
                    Charts
                  </TabsTrigger>
                </TabsList>
                <TabsContent value='components'>
                  <ComponentGrid />
                </TabsContent>

                <TabsContent value='charts'>
                  <div className='flex flex-col gap-4'>
                    <Tabs defaultValue='Area Charts' className='w-full'>
                      <TabsList className='w-full'>
                        {chartComponents.map((chartObject, key) => (
                          <TabsTrigger
                            value={chartObject.title}
                            className='w-full'
                            key={key}
                          >
                            {chartObject.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      {chartComponents.map((chartObject, key) => (
                        <TabsContent value={chartObject.title} key={key}>
                          <ChartsGrid
                            Components={chartObject.Components}
                            title={chartObject.title}
                            Additional={chartObject.Additional}
                          />
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25}>
          <ScrollArea className='h-screen rounded-md'>
            <EditTheme
              key={editThemeKey} // Force re-mount when theme data changes
              theme={data?.theme}
              setTheme={handleThemeUpdate}
              currentTheme={theme} // Pass the current theme to EditTheme
              onModeChange={handleModeChange} // Pass the mode change handler
              onUpdate={resetColorSwatches} // Pass the reset function for updates
              onTitleUpdate={handleRefetchTheme} // Pass the refetch function for title updates
            />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default ThemeEditor;
