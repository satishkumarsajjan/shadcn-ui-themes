import { auth } from '@/auth';
import { ProfileEditor } from '@/components/profile/ProfileEditor';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { Link } from 'next-view-transitions';

const page = async () => {
  const session = await auth();
  if (!session) {
    return (
      <div className='w-full h-full flex flex-col items-center justify-center space-y-4'>
        <h1 className='text-4xl font-bold'>Unauthorized</h1>
        <Link href={'/'}>
          <Button className='flex items-center justify-center gap-2'>
            <Home />
            <p>Go back to home</p>
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <ProfileEditor />
    </div>
  );
};

export default page;
