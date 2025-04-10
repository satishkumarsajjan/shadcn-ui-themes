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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LucidePlusSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useTransitionRouter } from 'next-view-transitions';

import { useForm } from 'react-hook-form';

import SignInDialogContent from '@/components/auth/SignInDialogContent';
import { cn } from '@/lib/utils';
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
} from '../../ui/form';

const formSchema = z.object({
  theme_name: z.string().min(3, {
    message: 'Theme name must be at least 3 characters.',
  }),
});
const CreateNewTheme = ({ className }: { className?: string }) => {
  const { data: session } = useSession();
  // if (!session) return <NotSignedIn />;
  const router = useTransitionRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      theme_name: '',
    },
  });
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => {
      return axios.post('/api/theme/createtheme', values);
    },
    onSuccess(data) {
      // Do something on success
      toast.success('Theme created successfully');
      router.push(`/themes/id/${data.data.id}`);
    },
    onError(error) {
      // Handle error
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || 'Error creating theme';
        toast.error(errorMessage);
        console.error('Error creating theme:', errorMessage);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error creating theme:', error);
      }
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn('flex justify-between px-2', className)}
        >
          <LucidePlusSquare className='' />
          <span>Create theme</span>
          <span className='sr-only'>Create theme</span>
        </Button>
      </DialogTrigger>
      {session ? (
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Create new theme</DialogTitle>
            <DialogDescription>
              Give a name to your theme. You can always change it later.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='theme_name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Theme name</FormLabel>
                    <FormControl>
                      <Input placeholder='theme name' {...field} />
                    </FormControl>
                    <FormDescription>
                      You can always change it later.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type='submit' disabled={mutation.isPending}>
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      ) : (
        <SignInDialogContent />
      )}
    </Dialog>
  );
};

export default CreateNewTheme;
