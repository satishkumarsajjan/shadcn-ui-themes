import { Link } from 'next-view-transitions';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link href={'#hero'}>
      <div className='flex justify-between items-center gap-2'>
        <div className='flex items-center justify-center rounded-lg'>
          <Image src='/assets/logo.png' alt='logo' height='28' width='28' />
        </div>
        <div className='grid flex-1 text-left text-sm leading-tight'>
          <span className='truncate font-semibold'>Themes</span>
          <span className='truncate text-xs'>For Shadcn UI</span>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
