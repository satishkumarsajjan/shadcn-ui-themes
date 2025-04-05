'use client';

import {
  UserProfileHero,
  UserProfileHeroSkeleton,
} from '@/components/profile/UserProfileHero';
import { useUserThemes } from '@/hooks/get-myThemes';
import { useGetUser } from '@/hooks/get-user-by-id';
import { useMemo, useState } from 'react';
import ThemesGrid from './themesGrid';

interface UserProfileProps {
  userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [currentPage, setPage] = useState(1);
  const pageSize = 9;

  const validUserId = typeof userId === 'string' ? userId : '';

  if (!validUserId) {
    return <div className='p-8 text-center'>No user selected</div>;
  }

  const {
    data: user,
    isFetching: isUserFetching,
    error: userError,
  } = useGetUser(validUserId);

  const { data, isFetching, error } = useUserThemes(
    validUserId,
    currentPage,
    pageSize
  );

  const errorMessage = userError?.message || error?.message;
  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

  // Memoize the date formatting for user.createdAt
  const formattedJoinDate = useMemo(() => {
    return user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';
  }, [user?.createdAt]);

  return (
    <div>
      {isUserFetching ? (
        <UserProfileHeroSkeleton />
      ) : (
        <div className='w-full flex items-center justify-center p-8'>
          <UserProfileHero
            bio={user?.bio ?? ''}
            themesCount={data?.totalCount ?? 0}
            username={user?.name ?? ''}
            avatar={user?.image ?? ''}
            joinDate={formattedJoinDate}
            backgroundImage={user?.image ?? ''}
          />
        </div>
      )}
      <ThemesGrid
        data={data}
        error={error}
        isFetching={isFetching}
        page={currentPage}
        pageSize={pageSize}
        setPage={setPage}
      />
    </div>
  );
};

export default UserProfile;
