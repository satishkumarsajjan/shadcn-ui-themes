import { Skeleton } from '@/components/ui/skeleton';

export function ThemeCardSkeleton() {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='w-full h-[300px] rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    </div>
  );
}
