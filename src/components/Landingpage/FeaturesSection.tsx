'use client';

import {
  BookmarkIcon,
  HeartIcon,
  PaletteIcon,
  Share2Icon,
  ShuffleIcon,
  UsersIcon,
} from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimation';

const features = [
  {
    icon: <PaletteIcon className='h-5 w-5' />,
    title: 'Theme Creation',
    description:
      'Build beautiful themes with our intuitive color picker and real-time preview.',
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    icon: <ShuffleIcon className='h-5 w-5' />,
    title: 'Theme Explorer',
    description:
      'Browse hundreds of community-created themes with powerful filters.',
    color: 'bg-green-500/10 text-green-500',
  },
  {
    icon: <HeartIcon className='h-5 w-5' />,
    title: 'Like & Bookmark',
    description:
      'Save favorites and show appreciation for creators with a simple click.',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    icon: <Share2Icon className='h-5 w-5' />,
    title: 'Easy Sharing',
    description:
      'Generate shareable links and export themes directly to your projects.',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: <UsersIcon className='h-5 w-5' />,
    title: 'Community',
    description:
      'Connect with designers and developers to share ideas and inspiration.',
    color: 'bg-amber-500/10 text-amber-500',
  },
  {
    icon: <BookmarkIcon className='h-5 w-5' />,
    title: 'Collections',
    description:
      'Organize themes into collections for different projects or design systems.',
    color: 'bg-cyan-500/10 text-cyan-500',
  },
];

export function FeaturesSection() {
  return (
    <section id='features' className='section-container bg-muted/10'>
      <div className='container'>
        {/* Section header */}
        <div className='mx-auto mb-16 max-w-2xl text-center'>
          <ScrollAnimation animationType='fade-up'>
            <span className='mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
              Features
            </span>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={1}>
            <h2 className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>
              Everything you need to manage your{' '}
              <span className='gradient-text'>UI themes</span>
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animationType='fade-up' delay={2}>
            <p className='text-lg text-muted-foreground'>
              Our platform offers a complete solution for creating, discovering,
              and sharing beautiful themes with a vibrant community of
              designers.
            </p>
          </ScrollAnimation>
        </div>

        {/* Features grid */}
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => {
            // Calculate the delay (1, 2, 3 or 4)
            const delayValue = ((index % 3) + 1) as 1 | 2 | 3 | 4;

            return (
              <ScrollAnimation
                key={feature.title}
                animationType='fade-up'
                delay={delayValue}
                rootMargin='-50px'
              >
                <div className='group'>
                  <div className='card-hover relative rounded-xl border bg-card p-6'>
                    <div
                      className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${feature.color}`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className='mb-2 text-xl font-medium group-hover:text-primary transition-colors'>
                      {feature.title}
                    </h3>

                    <p className='text-muted-foreground'>
                      {feature.description}
                    </p>

                    {/* Subtle decorative element */}
                    <div
                      className='absolute bottom-0 right-0 h-16 w-16 -z-10 opacity-20 rounded-br-xl'
                      style={{
                        background: `conic-gradient(from 225deg, ${
                          feature.color.split(' ')[1]
                        }, transparent)`,
                      }}
                    />
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* Stats section */}
        <ScrollAnimation
          className='mt-24 rounded-xl border bg-card/50 p-8 backdrop-blur-sm'
          animationType='fade-up'
        >
          <div className='grid gap-8 md:grid-cols-4'>
            {[
              { value: '500+', label: 'Themes' },
              { value: '10k+', label: 'Users' },
              { value: '30k+', label: 'Downloads' },
              { value: '4.9/5', label: 'Rating' },
            ].map((stat, i) => {
              // Calculate the delay (1, 2, 3 or 4)
              const delayValue = ((i % 4) + 1) as 1 | 2 | 3 | 4;

              return (
                <ScrollAnimation
                  key={stat.label}
                  animationType='scale'
                  delay={delayValue}
                >
                  <div className='text-center'>
                    <p className='mb-1 text-3xl font-bold text-primary'>
                      {stat.value}
                    </p>
                    <p className='text-muted-foreground'>{stat.label}</p>
                  </div>
                </ScrollAnimation>
              );
            })}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
