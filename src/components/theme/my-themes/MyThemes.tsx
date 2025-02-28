'use client';

import { useMyThemes } from '@/hooks/get-myThemes';
import { ThemeCard } from '../theme-card/theme-card';
import { ThemeCardSkeleton } from '../theme-card/theme-card-skeleton';

interface MyThemesProps {}

const MyThemes = ({}: MyThemesProps) => {
  const { data, isFetching, error } = useMyThemes();
  return (
    <div className='p-4'>
      {isFetching && (
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-8'>
          {[0, 1, 2, 3, 4, 5]?.map((item) => (
            <div key={item}>
              <ThemeCardSkeleton />
            </div>
          ))}
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4'>
        {data?.map((item) => (
          <div key={item.id}>
            <ThemeCard theme={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyThemes;
