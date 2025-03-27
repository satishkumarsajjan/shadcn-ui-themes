'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const Buttons = () => {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>Buttons</Label>
      <div className='flex flex-wrap gap-4 '>
        <Button variant={'default'}>Default</Button>
        <Button variant={'secondary'}>Secondary</Button>
        <Button variant={'destructive'}>Destructive</Button>
        <Button variant={'outline'}>Outline</Button>
        <Button variant={'ghost'}>Ghost</Button>
        <Button variant={'link'}>Link</Button>
      </div>
    </div>
  );
};

export default Buttons;
