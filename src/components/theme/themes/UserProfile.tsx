'use client';

import {
  UserProfileHero,
  UserProfileHeroSkeleton,
} from '@/components/profile/UserProfileHero';
import { useUserThemes } from '@/hooks/get-myThemes';
import { useGetUserInfo } from '@/hooks/get-user-by-id';
import { useMemo, useState } from 'react';
import ThemesGrid from './themesGrid';

interface UserProfileProps {
  userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const [currentPage, setPage] = useState(1);
  const pageSize = 9;

  const validUserId = typeof userId === 'string' ? userId : '';

  // Move all hooks to the top level before any conditional returns
  const {
    data: user,
    isFetching: isUserFetching,
    error: userError,
  } = useGetUserInfo(validUserId);

  // Memoize the date formatting for user.createdAt
  const formattedJoinDate = useMemo(() => {
    return user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '';
  }, [user?.createdAt]);

  const { data, isFetching, error } = useUserThemes(
    validUserId,
    currentPage,
    pageSize
  );

  // Handle invalid userId after hooks are called
  if (!validUserId) {
    return <div className='p-8 text-center'>No user selected</div>;
  }

  const errorMessage = userError?.message || error?.message;
  if (errorMessage) {
    return <p>Error: {errorMessage}</p>;
  }

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
