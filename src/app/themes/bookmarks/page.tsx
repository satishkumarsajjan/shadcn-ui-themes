import { auth } from '@/auth';
import BookmarksGrid from '@/components/theme/bookmarks/BookmarksGrid';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  if (!session) redirect('/themes');
  return <BookmarksGrid />;
};

export default page;
