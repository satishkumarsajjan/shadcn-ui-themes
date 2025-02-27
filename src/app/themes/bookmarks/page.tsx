import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }
  return <div>page</div>;
};

export default page;
