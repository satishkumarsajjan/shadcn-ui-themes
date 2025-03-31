'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { ScrollAnimation } from './ScrollAnimation';

// Sample theme color schemes to showcase
const themeExamples = [
  {
    name: 'Midnight',
    primary: '#6366f1',
    background: '#0f172a',
    foreground: '#e2e8f0',
    muted: '#1e293b',
    card: '#1e293b',
  },
  {
    name: 'Ocean',
    primary: '#0ea5e9',
    background: '#0c4a6e',
    foreground: '#f0f9ff',
    muted: '#075985',
    card: '#075985',
  },
  {
    name: 'Forest',
    primary: '#10b981',
    background: '#064e3b',
    foreground: '#ecfdf5',
    muted: '#065f46',
    card: '#065f46',
  },
  {
    name: 'Sunset',
    primary: '#f97316',
    background: '#7c2d12',
    foreground: '#ffedd5',
    muted: '#9a3412',
    card: '#9a3412',
  },
  {
    name: 'Lavender',
    primary: '#a855f7',
    background: '#581c87',
    foreground: '#f3e8ff',
    muted: '#6b21a8',
    card: '#6b21a8',
  },
];

export function HeroSection() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const { theme: appTheme } = useTheme();
  const isDark = appTheme === 'dark';

  // Choose a different theme every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themeExamples.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const theme = themeExamples[currentTheme];

  return (
    <section className='relative min-h-[90vh] pt-20 pb-12 md:pt-24 lg:pt-28'>
      <div className='container mx-auto'>
        <div className='grid items-center gap-12 lg:grid-cols-2'>
          {/* Left side: Text content */}
          <div className='max-w-3xl'>
            <ScrollAnimation animationType='fade-up'>
              <div className='mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm bg-background/50 backdrop-blur'>
                <Sparkles className='mr-2 h-4 w-4 text-primary' />
                <span>Create & discover beautiful UI themes</span>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType='fade-up' delay={1}>
              <h1 className='mb-6 font-bold tracking-tight'>
                Beautiful themes for your{' '}
                <span className='gradient-text'>next project</span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation animationType='fade-up' delay={2}>
              <p className='mb-8 text-xl text-muted-foreground'>
                Discover, create, and share stunning shadcn/ui themes. Join a
                growing community of designers crafting the perfect UI
                experience.
              </p>
            </ScrollAnimation>

            <ScrollAnimation animationType='fade-up' delay={3}>
              <div className='flex flex-wrap gap-4'>
                <Button size='lg' className='btn-glow'>
                  Get Started
                  <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
                </Button>
                <Button variant='outline' size='lg'>
                  Browse Themes
                </Button>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animationType='fade-up' delay={4}>
              <div className='mt-10 space-y-3'>
                {[
                  '100+ ready-to-use themes',
                  'Powerful theme customization tools',
                  'Active community & sharing',
                ].map((feature, index) => (
                  <div
                    key={feature}
                    className='flex items-center gap-2 text-muted-foreground'
                  >
                    <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/10'>
                      <Check className='h-3 w-3 text-primary' />
                    </span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </ScrollAnimation>
          </div>

          {/* Right side: Theme showcase */}
          <ScrollAnimation
            className='relative mx-auto w-full max-w-md lg:max-w-none'
            animationType='scale'
          >
            <div className='relative'>
              <motion.div
                key={theme.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className='relative z-10 overflow-hidden rounded-xl border shadow-xl'
                style={{
                  backgroundColor: theme.background,
                  color: theme.foreground,
                  borderColor: `${theme.muted}80`,
                }}
              >
                {/* Theme preview header with window controls */}
                <div
                  className='flex items-center justify-between border-b p-4'
                  style={{ borderColor: `${theme.muted}80` }}
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='flex h-7 w-7 items-center justify-center rounded-full'
                      style={{ backgroundColor: theme.primary }}
                    >
                      <span className='text-xs font-semibold text-white'>
                        TM
                      </span>
                    </div>
                    <span className='text-sm font-medium'>
                      {theme.name} Theme
                    </span>
                  </div>
                  <div className='flex gap-1.5'>
                    <div className='h-3 w-3 rounded-full bg-red-500' />
                    <div className='h-3 w-3 rounded-full bg-yellow-500' />
                    <div className='h-3 w-3 rounded-full bg-green-500' />
                  </div>
                </div>

                {/* Theme preview content */}
                <div className='p-5'>
                  <div className='space-y-4'>
                    {/* Card component preview */}
                    <Card
                      className='overflow-hidden'
                      style={{
                        backgroundColor: theme.card,
                        color: theme.foreground,
                      }}
                    >
                      <div
                        className='h-1.5 w-full'
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div className='p-4'>
                        <h3 className='mb-1 text-base font-medium'>
                          Component Preview
                        </h3>
                        <p className='mb-3 text-sm opacity-80'>
                          Beautiful UI components with your theme
                        </p>
                        <div className='flex gap-2'>
                          <motion.button
                            className='rounded-md px-3 py-1 text-xs'
                            style={{
                              backgroundColor: theme.primary,
                              color: 'white',
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Primary
                          </motion.button>
                          <motion.button
                            className='rounded-md border px-3 py-1 text-xs'
                            style={{
                              backgroundColor: 'transparent',
                              borderColor: theme.primary,
                              color: theme.primary,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Secondary
                          </motion.button>
                        </div>
                      </div>
                    </Card>

                    {/* Color palette preview */}
                    <div
                      className='rounded-md border p-4'
                      style={{ borderColor: `${theme.muted}80` }}
                    >
                      <div className='mb-3 flex items-center justify-between'>
                        <h4 className='text-sm font-medium'>Color System</h4>
                        <span className='text-xs opacity-70'>Customizable</span>
                      </div>

                      <div className='flex flex-wrap gap-2'>
                        {[
                          theme.primary,
                          theme.muted,
                          theme.card,
                          theme.foreground,
                        ].map((color, index) => (
                          <motion.div
                            key={index}
                            className='group flex flex-col items-center'
                            whileHover={{ y: -2 }}
                          >
                            <div
                              className='h-8 w-8 rounded-md'
                              style={{
                                backgroundColor: color,
                                opacity: index === 3 ? 0.5 : 1,
                              }}
                            />
                            <span className='mt-1 text-xs opacity-70'>
                              {index === 0
                                ? 'Primary'
                                : index === 1
                                ? 'Muted'
                                : index === 2
                                ? 'Card'
                                : 'Text'}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Theme name tag */}
                    <div
                      className='inline-flex items-center rounded-md px-3 py-1'
                      style={{
                        backgroundColor: theme.primary + '20',
                        color: theme.primary,
                      }}
                    >
                      <span className='text-xs font-medium'>
                        {theme.name} Theme
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Theme selection indicator */}
            <div className='mt-6 flex justify-center gap-1.5'>
              {themeExamples.map((t, i) => (
                <motion.button
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentTheme ? 'w-6 bg-primary' : 'w-1.5 bg-muted'
                  }`}
                  onClick={() => setCurrentTheme(i)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
