'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon, MonitorIcon, ArrowRightIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { ScrollAnimation } from './ScrollAnimation';

export function ThemeShowcaseSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Preview card content
  const previewContent = {
    card: 'bg-card border rounded-lg p-4',
    title: 'text-lg font-medium mb-2',
    text: 'text-muted-foreground text-sm mb-4',
    button: 'bg-primary text-primary-foreground text-sm px-3 py-1.5 rounded-md',
    outlineButton:
      'border border-primary text-primary px-3 py-1.5 rounded-md text-sm',
  };

  return (
    <section id='themes-toggle' className='section-container bg-muted/5'>
      <div className='container'>
        {/* Section header */}
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <ScrollAnimation animationType='fade-up'>
            <span className='mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
              Adaptive Themes
            </span>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={1}>
            <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
              Switch between{' '}
              <span className='gradient-text'>light and dark</span> with ease
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={2}>
            <p className='text-lg text-muted-foreground'>
              All themes automatically adapt between light and dark mode.
              Perfect for any time of day or user preference.
            </p>
          </ScrollAnimation>
        </div>

        {/* Theme toggle showcase */}
        <div className='grid gap-12 md:grid-cols-2 items-center'>
          {/* Left side: Theme controls */}
          <ScrollAnimation
            animationType='fade-up'
            delay={3}
            className='space-y-8'
          >
            <h3 className='text-2xl font-semibold mb-6'>
              Choose your preferred theme mode
            </h3>

            <p className='text-muted-foreground mb-6'>
              Switch between light and dark mode or use your system preference.
              All themes will automatically adapt to your chosen mode.
            </p>

            <div className='grid gap-4 max-w-sm'>
              <ThemeModeButton
                mode='light'
                currentTheme={theme}
                onSelect={() => setTheme('light')}
                icon={<SunIcon className='h-5 w-5' />}
                label='Light Mode'
                description='Clean, bright interface for daytime use'
              />

              <ThemeModeButton
                mode='dark'
                currentTheme={theme}
                onSelect={() => setTheme('dark')}
                icon={<MoonIcon className='h-5 w-5' />}
                label='Dark Mode'
                description='Easy on the eyes for nighttime viewing'
              />

              <ThemeModeButton
                mode='system'
                currentTheme={theme}
                onSelect={() => setTheme('system')}
                icon={<MonitorIcon className='h-5 w-5' />}
                label='System Preference'
                description='Automatically match your device settings'
              />
            </div>

            <div className='py-4'>
              <Button className='group'>
                Create Your Own Theme
                <ArrowRightIcon className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </div>
          </ScrollAnimation>

          {/* Right side: Preview */}
          <ScrollAnimation animationType='scale' delay={3} className='relative'>
            {/* Preview card with current theme */}
            <div className='relative glass-effect rounded-xl border shadow-lg p-6 z-10'>
              <div className='mb-6 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <div className='h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-semibold text-sm'>
                    TM
                  </div>
                  <h4 className='font-medium'>ThemeManager Preview</h4>
                </div>
                <div className='flex gap-1'>
                  <div className='w-3 h-3 rounded-full bg-red-500' />
                  <div className='w-3 h-3 rounded-full bg-yellow-500' />
                  <div className='w-3 h-3 rounded-full bg-green-500' />
                </div>
              </div>

              <div className='mb-6 rounded-lg border p-4 bg-card'>
                <h5 className='text-md font-medium mb-1'>Component Preview</h5>
                <p className='text-sm text-muted-foreground mb-3'>
                  This card adapts to your selected theme mode
                </p>
                <div className='flex gap-2 mb-1'>
                  <button className={previewContent.button}>
                    Primary Button
                  </button>
                  <button className={previewContent.outlineButton}>
                    Secondary
                  </button>
                </div>
              </div>

              <div className='flex justify-between items-center'>
                <div className='flex gap-4'>
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 rounded-full bg-primary mb-1' />
                    <span className='text-xs text-muted-foreground'>
                      Primary
                    </span>
                  </div>
                  <div className='flex flex-col items-center'>
                    <div className='h-6 w-6 rounded-full bg-muted mb-1' />
                    <span className='text-xs text-muted-foreground'>Muted</span>
                  </div>
                </div>

                <div className='py-1 px-3 rounded-full bg-muted text-xs font-medium'>
                  {theme === 'light'
                    ? '🌞 Light Mode'
                    : theme === 'dark'
                    ? '🌙 Dark Mode'
                    : '💻 System Mode'}
                </div>
              </div>
            </div>

            {/* Theme benefits */}
            <div className='mt-8 grid grid-cols-2 gap-4'>
              {[
                {
                  title: 'Accessibility',
                  description: 'WCAG AA compliant contrast ratios',
                },
                {
                  title: 'Consistency',
                  description: 'Unified look across all modes',
                },
              ].map((benefit, i) => {
                // Calculate a valid delay value (1-4)
                const delayValue = Math.min(Math.max(1, 4), 4) as 1 | 2 | 3 | 4;

                return (
                  <ScrollAnimation
                    key={benefit.title}
                    animationType='fade-up'
                    delay={delayValue}
                  >
                    <div className='p-4 rounded-lg border bg-card'>
                      <h4 className='font-medium text-sm mb-1'>
                        {benefit.title}
                      </h4>
                      <p className='text-xs text-muted-foreground'>
                        {benefit.description}
                      </p>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}

interface ThemeModeButtonProps {
  mode: 'light' | 'dark' | 'system';
  currentTheme: string;
  onSelect: () => void;
  icon: React.ReactNode;
  label: string;
  description: string;
}

function ThemeModeButton({
  mode,
  currentTheme,
  onSelect,
  icon,
  label,
  description,
}: ThemeModeButtonProps) {
  const isActive = currentTheme === mode;

  return (
    <motion.button
      onClick={onSelect}
      className={`flex items-center w-full text-left p-4 border rounded-lg ${
        isActive ? 'border-primary bg-primary/5' : 'bg-card hover:border-muted'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className={`mr-4 flex h-10 w-10 items-center justify-center rounded-full ${
          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted/50'
        }`}
      >
        {icon}
      </div>
      <div>
        <p className='font-medium'>{label}</p>
        <p className='text-sm text-muted-foreground'>{description}</p>
      </div>
    </motion.button>
  );
}
