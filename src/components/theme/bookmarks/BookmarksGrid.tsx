'use client';

import { useMyBookmarks } from '@/hooks/get-my-bookmarks';
import { useState } from 'react';
import ThemesGrid from '../themes/themesGrid';

const BookmarksGrid = () => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { data, isFetching, error } = useMyBookmarks(page, pageSize);

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

export default BookmarksGrid;
