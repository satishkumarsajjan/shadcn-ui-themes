import { auth } from '@/auth';
import MyThemes from '@/components/theme/my-themes/MyThemes';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  if (!session) redirect('/themes');
  return <MyThemes />;
};

export default page;
