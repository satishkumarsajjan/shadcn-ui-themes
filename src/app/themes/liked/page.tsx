import { auth } from '@/auth';
import LikedThemes from '@/components/theme/likedThemes/LikedThemes';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  if (!session) redirect('/themes');
  return <LikedThemes />;
};

export default page;
