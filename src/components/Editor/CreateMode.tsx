'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoaderCircle, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
const formSchema = z.object({
  mode_name: z.string().min(3, {
    message: 'Theme name must be at least 3 characters.',
  }),
});

export function CreateMode({ themeId }: { themeId?: string }) {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode_name: '',
    },
  });

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return axios.post('/api/theme/createmode', {
        themeId: themeId,
        modeName: values.mode_name,
      });
    },
    onSuccess() {
      toast.success('Mode created successfully');
      form.reset();
      setOpen(false);
      window.location.reload();
    },
    onError(error) {
      toast.error('Failed to create mode');
      console.error(error);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant='default'>
                <PlusIcon />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className='sm:max-w-md border-none'>
        <DialogHeader>
          <DialogTitle>Create a new mode</DialogTitle>
          <DialogDescription>You can edit the name later.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='mode_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode name</FormLabel>
                  <FormControl>
                    <Input placeholder='mode name' {...field} />
                  </FormControl>
                  <FormDescription>
                    You can always change it later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='sm:justify-start'>
              <Button
                type='submit'
                variant='secondary'
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <span className='flex gap-2'>
                    <LoaderCircle className='animate-spin' />
                    <p>Creating...</p>
                  </span>
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
