'use client';

import {
  UserProfileHero,
  UserProfileHeroSkeleton,
} from '@/components/profile/UserProfileHero';
import ThemesGrid from '@/components/theme/themes/themesGrid';
import { useUserThemes } from '@/hooks/get-myThemes';
import { useGetUser } from '@/hooks/get-user-by-id';
import { useParams } from 'next/navigation';
import { useState } from 'react';
interface pageProps {}

const page = ({}: pageProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 9;
  const { userId } = useParams(); // Extract userId from the dynamic route
  const validUserId = typeof userId === 'string' ? userId : ''; // Ensure userId is a string
  const {
    data: user,
    isFetching: isUserFetching,
    error: userError,
  } = useGetUser(validUserId); // Call the hook directly in the component body
  const { data, isFetching, error } = useUserThemes(
    validUserId,
    page,
    pageSize
  );

  return (
    <div>
      {isUserFetching ? (
        <UserProfileHeroSkeleton />
      ) : (
        <>
          {userError ? (
            <p>Error fetching user: {userError.message}</p>
          ) : (
            <div className='w-full flex items-center justify-center p-8'>
              <UserProfileHero
                bio={user?.bio || ''}
                themesCount={data?.totalCount || 0}
                username={user?.name || ''}
                avatar={user?.image || ''}
                joinDate={
                  user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : ''
                }
              />
            </div>
          )}
        </>
      )}
      <ThemesGrid
        data={data}
        error={error}
        isFetching={isFetching}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
};

export default page;
