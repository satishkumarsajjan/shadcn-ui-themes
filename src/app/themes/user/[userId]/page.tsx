'use client';

import ThemesGrid from '@/components/theme/themes/themesGrid';
import { useUserThemes } from '@/hooks/get-myThemes';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface pageProps {}

const page = ({}: pageProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { userId } = useParams(); // Extract userId from the dynamic route
  const validUserId = typeof userId === 'string' ? userId : ''; // Ensure userId is a string
  const { data, isFetching, error } = useUserThemes(
    validUserId,
    page,
    pageSize
  );

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

export default page;
