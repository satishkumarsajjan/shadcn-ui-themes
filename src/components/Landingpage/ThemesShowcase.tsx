'use client';

import { ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useThemes } from '@/hooks/get-themes';
import { Link } from 'next-view-transitions';
import { ThemeCard } from '../theme/theme-card/theme-card';
import { ScrollAnimation } from './ScrollAnimation';

export function ThemesShowcase() {
  const { data } = useThemes({
    page: 1,
    pageSize: 6,
    sortBy: 'popular',
    timeframe: 'all',
  });
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
              will elevate your next project&apos;s design.
            </p>
          </ScrollAnimation>
        </div>

        {/* Tabs and themes display */}

        <ScrollAnimation animationType='fade-up' delay={3} className='relative'>
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
            {data?.themes.map((item, index) => (
              <div key={index}>
                <ThemeCard theme={item} />
              </div>
            ))}
          </div>

          <div className='mt-16 text-center'>
            <Link href={'/themes'}>
              <Button size='lg' variant='outline' className='btn-glow group'>
                Browse All Themes
                <ChevronRight className='ml-2 h-4 w-4 transition-all group-hover:translate-x-1' />
              </Button>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
