'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  ChevronRight,
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollAnimation } from './ScrollAnimation';

// List of sample themes to showcase
const showcaseThemes = {
  trending: [
    {
      id: 'midnight-purple',
      name: 'Midnight Purple',
      creator: 'Emma Design',
      avatar: 'ED',
      likes: 2584,
      comments: 37,
      colors: ['#7c3aed', '#2e1065', '#f5f3ff', '#4c1d95'],
    },
    {
      id: 'neon-future',
      name: 'Neon Future',
      creator: 'TechUI',
      avatar: 'TU',
      likes: 1932,
      comments: 23,
      colors: ['#10b981', '#064e3b', '#ecfdf5', '#059669'],
    },
    {
      id: 'pastel-dream',
      name: 'Pastel Dream',
      creator: 'SoftPalettes',
      avatar: 'SP',
      likes: 1756,
      comments: 19,
      colors: ['#f472b6', '#831843', '#fdf2f8', '#be185d'],
    },
  ],
  popular: [
    {
      id: 'dark-elegance',
      name: 'Dark Elegance',
      creator: 'NightOwl',
      avatar: 'NO',
      likes: 3254,
      comments: 42,
      colors: ['#3b82f6', '#1e3a8a', '#eff6ff', '#1d4ed8'],
    },
    {
      id: 'forest-vibes',
      name: 'Forest Vibes',
      creator: 'NatureUI',
      avatar: 'NU',
      likes: 2784,
      comments: 31,
      colors: ['#059669', '#064e3b', '#ecfdf5', '#10b981'],
    },
    {
      id: 'sunset-glow',
      name: 'Sunset Glow',
      creator: 'ColorMaster',
      avatar: 'CM',
      likes: 2321,
      comments: 27,
      colors: ['#f97316', '#7c2d12', '#fff7ed', '#c2410c'],
    },
  ],
  new: [
    {
      id: 'arctic-frost',
      name: 'Arctic Frost',
      creator: 'PolarDesigns',
      avatar: 'PD',
      likes: 947,
      comments: 12,
      colors: ['#06b6d4', '#0e7490', '#ecfeff', '#0891b2'],
    },
    {
      id: 'blooming-lavender',
      name: 'Blooming Lavender',
      creator: 'PurpleWave',
      avatar: 'PW',
      likes: 754,
      comments: 9,
      colors: ['#a855f7', '#6b21a8', '#f3e8ff', '#7e22ce'],
    },
    {
      id: 'golden-hour',
      name: 'Golden Hour',
      creator: 'SunsetStudio',
      avatar: 'SS',
      likes: 632,
      comments: 7,
      colors: ['#eab308', '#854d0e', '#fef9c3', '#ca8a04'],
    },
  ],
};

export function ThemesShowcase() {
  const [currentCategory, setCurrentCategory] = useState('trending');

  return (
    <section id='themes' className='section-container'>
      <div className='container'>
        {/* Section header */}
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <ScrollAnimation animationType='fade-up'>
            <span className='mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
              Theme Gallery
            </span>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={1}>
            <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
              Explore beautiful <span className='gradient-text'>themes</span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={2}>
            <p className='text-lg text-muted-foreground'>
              Browse through our collection of carefully crafted themes that
              will elevate your next project's design.
            </p>
          </ScrollAnimation>
        </div>

        {/* Tabs and themes display */}
        <ScrollAnimation animationType='fade-up' delay={3} className='relative'>
          <Tabs
            defaultValue='trending'
            onValueChange={setCurrentCategory}
            className='w-full'
          >
            <div className='mx-auto mb-12 max-w-sm'>
              <TabsList className='grid w-full grid-cols-3 p-1'>
                <TabsTrigger value='trending'>Trending</TabsTrigger>
                <TabsTrigger value='popular'>Popular</TabsTrigger>
                <TabsTrigger value='new'>New</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(showcaseThemes).map(([category, themes]) => (
              <TabsContent
                key={category}
                value={category}
                className='mt-0 focus-visible:outline-none'
              >
                <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                  {themes.map((theme, index) => {
                    // Calculate the delay (1, 2, 3 or 4)
                    const delayValue = ((index % 3) + 1) as 1 | 2 | 3 | 4;

                    return (
                      <ScrollAnimation
                        key={theme.id}
                        animationType='scale'
                        delay={delayValue}
                      >
                        <ThemeCard theme={theme} />
                      </ScrollAnimation>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className='mt-16 text-center'>
            <Button size='lg' variant='outline' className='btn-glow group'>
              Browse All Themes
              <ChevronRight className='ml-2 h-4 w-4 transition-all group-hover:translate-x-1' />
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}

interface ThemeCardProps {
  theme: {
    id: string;
    name: string;
    creator: string;
    avatar: string;
    likes: number;
    comments: number;
    colors: string[];
  };
}

function ThemeCard({ theme }: ThemeCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Card className='overflow-hidden border shadow-sm card-hover'>
        {/* Theme color preview */}
        <div className='relative h-36 overflow-hidden'>
          <div
            className='absolute inset-0'
            style={{
              background: `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`,
            }}
          />

          {/* Color pallette dots */}
          <div className='absolute bottom-4 left-4 flex gap-2'>
            {theme.colors.map((color, i) => (
              <motion.div
                key={i}
                className='h-6 w-6 rounded-full border-2 border-white/30'
                style={{ backgroundColor: color }}
                whileHover={{ scale: 1.2, y: -4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
            ))}
          </div>

          {/* Theme name tag */}
          <div className='absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md bg-black/20 text-white'>
            {theme.name}
          </div>
        </div>

        <div className='p-5'>
          {/* Creator info */}
          <div className='mb-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Avatar className='h-7 w-7 border border-border'>
                <AvatarFallback className='text-xs'>
                  {theme.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='text-sm font-medium'>{theme.creator}</p>
                <p className='text-xs text-muted-foreground'>Designer</p>
              </div>
            </div>
          </div>

          {/* Interaction buttons */}
          <div className='mt-3 flex items-center justify-between border-t pt-3'>
            <div className='flex items-center gap-3'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-muted-foreground hover:text-red-500'
              >
                <Heart className='h-4 w-4' />
                <span className='sr-only'>Like</span>
              </Button>
              <span className='text-xs font-medium text-muted-foreground'>
                {theme.likes.toLocaleString()}
              </span>

              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-muted-foreground hover:text-primary'
              >
                <MessageSquare className='h-4 w-4' />
                <span className='sr-only'>Comment</span>
              </Button>
              <span className='text-xs font-medium text-muted-foreground'>
                {theme.comments}
              </span>
            </div>

            <div className='flex gap-1'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-muted-foreground hover:text-amber-500'
              >
                <Bookmark className='h-4 w-4' />
                <span className='sr-only'>Bookmark</span>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 text-muted-foreground hover:text-blue-500'
              >
                <Share2 className='h-4 w-4' />
                <span className='sr-only'>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
