'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>Progress</Label>
      <div className='flex items-center justify-center'>
        <Progress value={progress} className='w-full' />
      </div>
    </div>
  );
}
