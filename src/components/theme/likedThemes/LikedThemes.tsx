'use client';

import { useLikedThemes } from '@/hooks/get-liked-themes';
import { useState } from 'react';
import ThemesGrid from '../themes/themesGrid';

const LikedThemes = () => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { data, isFetching, error } = useLikedThemes(page, pageSize);

  return (
    <ThemesGrid
      data={data}
      error={error}
      isFetching={isFetching}
      page={page}
      pageSize={pageSize}
      setPage={setPage}
    />
  );
};

export default LikedThemes;
