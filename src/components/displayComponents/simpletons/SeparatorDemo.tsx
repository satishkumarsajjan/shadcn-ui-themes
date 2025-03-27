import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export function SeparatorDemo() {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>Separator</Label>
      <div className='flex items-center justify-center'>
        <div>
          <div className='space-y-1'>
            <h4 className='text-sm font-medium leading-none'>
              Radix Primitives
            </h4>
            <p className='text-sm text-muted-foreground'>
              An open-source UI component library.
            </p>
          </div>
          <Separator className='my-4' />
          <div className='flex h-5 items-center space-x-4 text-sm'>
            <div>Blog</div>
            <Separator orientation='vertical' />
            <div>Docs</div>
            <Separator orientation='vertical' />
            <div>Source</div>
          </div>
        </div>
      </div>
    </div>
  );
}
