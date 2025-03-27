import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface UserProfileHeroProps {
  avatar?: string;
  username: string;
  bio: string;
  themesCount: number;
  joinDate?: string;
  backgroundImage?: string;
}

export function UserProfileHero({
  avatar,
  username,
  bio,
  themesCount,
  joinDate,
  backgroundImage,
}: UserProfileHeroProps) {
  // Get initials from username for avatar fallback
  const initials = username
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Background with overlay */}
      <div
        className='absolute inset-0 bg-gradient-to-r from-primary/10 to-background/10 z-0'
        style={
          backgroundImage
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {}
        }
      >
        <div className='absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50 backdrop-blur-sm' />
      </div>

      <div className='container relative z-10 mx-auto px-4 py-12 md:py-24'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
          {/* Avatar section */}
          <div className='relative'>
            <div className='absolute -inset-1 bg-gradient-to-br from-primary/20 to-background/0 rounded-full blur-sm' />
            <Avatar className='h-32 w-32 md:h-40 md:w-40 border-4 border-background shadow-xl relative'>
              <AvatarImage src={avatar} alt={username} />
              <AvatarFallback className='bg-primary/5 text-3xl font-medium text-primary'>
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Content section */}
          <div className='flex flex-col items-center md:items-start text-center md:text-left'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-3'>
              {username}
            </h1>

            <div className='flex items-center gap-4 mb-4'>
              <Badge
                variant='secondary'
                className='text-sm px-3 py-1 rounded-full'
              >
                {themesCount} {themesCount === 1 ? 'Theme' : 'Themes'}
              </Badge>

              {joinDate && (
                <span className='text-sm text-muted-foreground'>
                  Member since {joinDate}
                </span>
              )}
            </div>

            <p className='text-lg text-muted-foreground max-w-2xl leading-relaxed'>
              {bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UserProfileHeroSkeleton() {
  return (
    <section className='relative w-full overflow-hidden'>
      {/* Background with overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary/10 to-background/10 z-0'>
        <div className='absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50 backdrop-blur-sm' />
      </div>

      <div className='container relative z-10 mx-auto px-4 py-12 md:py-24'>
        <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12'>
          {/* Avatar Skeleton */}
          <div className='relative'>
            <div className='absolute -inset-1 bg-gradient-to-br from-primary/20 to-background/0 rounded-full blur-sm' />
            <Skeleton className='h-32 w-32 md:h-40 md:w-40 rounded-full border-4 border-background shadow-xl' />
          </div>

          {/* Content Skeleton */}
          <div className='flex flex-col items-center md:items-start text-center md:text-left space-y-4'>
            {/* Username Skeleton */}
            <Skeleton className='h-8 w-48 md:w-64 rounded' />

            {/* Themes Count and Join Date Skeleton */}
            <div className='flex items-center gap-4'>
              <Skeleton className='h-6 w-24 rounded-full' />
              <Skeleton className='h-6 w-32 rounded' />
            </div>

            {/* Bio Skeleton */}
            <Skeleton className='h-4 w-64 md:w-96 rounded' />
            <Skeleton className='h-4 w-48 md:w-80 rounded' />
          </div>
        </div>
      </div>
    </section>
  );
}
