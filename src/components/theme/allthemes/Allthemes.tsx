'use client';

import { useThemes } from '@/hooks/get-themes';
import { useState, useEffect } from 'react';
import ThemesGrid from '../themes/themesGrid';
import { FilterByTimeframe, SortBy } from '../themes/Filters';
import { useThemeFiltersStore } from '@/hooks/useThemeFilter';

const AllThemes = () => {
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // Get filter values from the store
  const { sortBy, timeframe } = useThemeFiltersStore();

  // Pass filter values to the useThemes hook
  const { data, isFetching, error } = useThemes({
    page,
    pageSize,
    sortBy,
    timeframe,
  });

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [sortBy, timeframe]);

  return (
    <>
      <span className='ml-4 mt-2 flex gap-4'>
        <SortBy />
        <FilterByTimeframe />
      </span>
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

export default AllThemes;
