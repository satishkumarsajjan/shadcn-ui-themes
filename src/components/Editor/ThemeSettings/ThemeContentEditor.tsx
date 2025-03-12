import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const ThemeContentEditor = ({
  content,
  onChange,
  onFormat,
}: {
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFormat: () => void;
}) => (
  <div className='relative mt-2'>
    <Textarea
      value={content}
      onChange={onChange}
      placeholder='Type your theme here.'
      className='h-[550px]'
    />
    <Button
      onClick={onFormat}
      className='absolute top-4 right-4'
      size='sm'
      variant='outline'
    >
      Format
    </Button>
  </div>
);
