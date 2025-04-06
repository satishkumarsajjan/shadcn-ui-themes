'use client';

import { motion } from 'framer-motion';
import { MonitorIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { customThemes, customThemeType } from '@/lib/themes';
import { useTheme } from 'next-themes';
import Logo from '../Logo';
import CreateNewTheme from '../theme/createNewTheme/create-new-theme';
import { CarouselofThemes } from './CarouselofThemes';
import { ScrollAnimation } from './ScrollAnimation';

export function ThemeShowcaseSection() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [currentTheme, setCurrentTheme] = useState<customThemeType | null>(
    customThemes[0] || {}
  );

  // Find and update the current theme whenever the theme changes
  useEffect(() => {
    if (theme) {
      const themeIndex = customThemes.findIndex((t) => t.mode === theme);
      if (themeIndex !== -1) {
        setCurrentTheme(customThemes[themeIndex]);
      } else {
        setCurrentTheme(null);
      }
    }
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
              <span className='gradient-text'>light, dark and much more</span>{' '}
              with ease
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={2}>
            <p className='text-lg text-muted-foreground'>
              Some of the themes have more than just two modes. Why two when you
              can have more. 😉
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
              {customThemes.map((currtheme, index) => (
                <ThemeModeButton
                  key={index}
                  mode={currtheme.mode}
                  currentTheme={theme as string}
                  onSelect={() => setTheme(currtheme.mode)}
                  icon={currtheme.icon}
                  label={currtheme.label}
                  description={currtheme.description}
                />
              ))}

              <ThemeModeButton
                mode='system'
                currentTheme={theme as string}
                onSelect={() => setTheme('system')}
                icon={<MonitorIcon className='h-5 w-5' />}
                label='System Preference'
                description='Automatically match your device settings'
              />
            </div>

            <div className='py-4'>
              <CreateNewTheme className='bg-primary text-primary-foreground hover:bg-primary/50 hover:scale-105 transition-all' />
            </div>
          </ScrollAnimation>

          {/* Right side: Preview */}
          <ScrollAnimation animationType='scale' delay={3} className='relative'>
            {/* Preview card with current theme */}
            <div className='relative glass-effect rounded-xl border shadow-lg p-6 z-10'>
              <div className='mb-6 flex justify-between items-center'>
                <Logo />

                <div className='flex gap-1'>
                  <div className='w-3 h-3 rounded-full bg-red-500' />
                  <div className='w-3 h-3 rounded-full bg-yellow-500' />
                  <div className='w-3 h-3 rounded-full bg-green-500' />
                </div>
              </div>
              <CarouselofThemes />
              <div className='flex justify-between items-center'>
                <div className='py-1 px-3 rounded-full bg-muted text-xs font-medium'>
                  {currentTheme?.icon} {currentTheme?.label}
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
                    key={i}
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
  mode: string;
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
