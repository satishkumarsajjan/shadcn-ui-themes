'use client';

import { useLikedThemes } from '@/hooks/get-liked-themes';
import { useState } from 'react';
import ThemesGrid from '../themes/themesGrid';
import { Banner } from '../themes/banner';
import { ThumbsUp } from 'lucide-react';

const LikedThemes = () => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { data, isFetching, error } = useLikedThemes(page, pageSize);

  return (
    <>
      <section className='container py-12 w-full flex items-center justify-center'>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 max-w-screen-lg'>
          <div className='space-y-4'>
            <Banner
              title='Liked Themes'
              icon={<ThumbsUp className='w-5 h-5' />}
              size='lg'
            />

            <h1 className='text-4xl font-bold'>Your Liked Themes</h1>
            <p className='text-muted-foreground text-lg'>
              Access and manage all your liked themes in one place.
            </p>
          </div>

          <div className='hidden md:flex items-center justify-center'>
            <div className='w-full max-w-[250px] aspect-square bg-card rounded-lg flex items-center justify-center'>
              <ThumbsUp className='w-16 h-16 text-cyan-500' />
            </div>
          </div>
        </div>
      </section>
      <ThemesGrid
        data={data}
        error={error}
        isFetching={isFetching}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
      />
    </>
  );
};

export default LikedThemes;
