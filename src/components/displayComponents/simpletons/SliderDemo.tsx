import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

type SliderProps = React.ComponentProps<typeof Slider>;

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>Slider</Label>
      <div className='flex items-center justify-center'>
        <Slider
          defaultValue={[50]}
          max={100}
          step={1}
          className={cn('w-full', className)}
          {...props}
        />
      </div>
    </div>
  );
}
