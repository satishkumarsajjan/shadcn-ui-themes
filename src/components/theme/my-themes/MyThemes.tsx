'use client';

import { useMyThemes } from '@/hooks/get-myThemes';
import { useState } from 'react';
import ThemesGrid from '../themes/themesGrid';

const MyThemes = () => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { data, isFetching, error } = useMyThemes(page, pageSize);

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

export default MyThemes;
