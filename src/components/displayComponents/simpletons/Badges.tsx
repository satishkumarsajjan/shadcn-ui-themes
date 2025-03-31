'use client';

import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';

const Badges = () => {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>Badges</Label>
      <div className='flex flex-wrap gap-4 '>
        <Badge variant={'default'}>Default</Badge>
        <Badge variant={'secondary'}>Secondary</Badge>
        <Badge variant={'destructive'}>Destructive</Badge>
        <Badge variant={'outline'}>Outline</Badge>
      </div>
    </div>
  );
};

export default Badges;
