import { Bold, Italic, Underline } from 'lucide-react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';

export function ToggleGroupDemo() {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>
        Toggle group
      </Label>
      <div className='flex items-center justify-center'>
        <ToggleGroup type='multiple'>
          <ToggleGroupItem value='bold' aria-label='Toggle bold'>
            <Bold className='h-4 w-4 text-foreground' />
          </ToggleGroupItem>
          <ToggleGroupItem value='italic' aria-label='Toggle italic'>
            <Italic className='h-4 w-4 text-foreground' />
          </ToggleGroupItem>
          <ToggleGroupItem
            value='strikethrough'
            aria-label='Toggle strikethrough'
          >
            <Underline className='h-4 w-4 text-foreground' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
