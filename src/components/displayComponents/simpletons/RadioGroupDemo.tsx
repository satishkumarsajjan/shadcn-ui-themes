import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function RadioGroupDemo() {
  return (
    <div className='flex flex-col gap-4 border rounded-md drop-shadow-md p-4 w-full'>
      <Label className='font-semibold text-xl text-foreground'>
        Radio Group
      </Label>
      <div className='flex items-center justify-center'>
        <RadioGroup defaultValue='comfortable'>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='default' id='r1' />
            <Label htmlFor='r1'>Default</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='comfortable' id='r2' />
            <Label htmlFor='r2'>Comfortable</Label>
          </div>
          <div className='flex items-center space-x-2'>
            <RadioGroupItem value='compact' id='r3' />
            <Label htmlFor='r3'>Compact</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
