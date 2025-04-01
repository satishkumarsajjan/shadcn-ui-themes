'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';
import CreateNewTheme from '../theme/createNewTheme/create-new-theme';
import { previewThemes } from './previewComponents/previewThemes';
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

  // Choose a different theme every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTheme((prev) => (prev + 1) % themeExamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const theme = previewThemes[currentTheme];

  return (
    <section id='hero' className='min-h-[90vh] pt-20 pb-12 md:pt-24 lg:pt-28'>
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
                <CreateNewTheme className='bg-primary text-primary-foreground' />
                <Link href={'/themes'}>
                  <Button variant='outline' size='lg'>
                    Browse Themes
                  </Button>
                </Link>
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
                    key={index}
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
                key={
                  typeof theme === 'string'
                    ? theme
                    : `theme-${Math.random().toString(36).substr(2, 9)}`
                }
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8 }}
                className='relative z-10 overflow-hidden rounded-xl border shadow-xl'
              >
                {theme}
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
