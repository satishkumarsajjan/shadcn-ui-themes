'use client';

import axios from 'axios';
import { LucidePlusSquare } from 'lucide-react';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { redirect, useRouter } from 'next/navigation';

interface CreateNewThemeProps {}
const formSchema = z.object({
  theme_name: z.string().min(3, {
    message: 'Theme name must be at least 3 characters.',
  }),
});
const CreateNewTheme = ({}: CreateNewThemeProps) => {
  const router = useRouter();

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
    onSuccess(data, variables, context) {
      // Do something on success
      toast.success('Theme created successfully');
      console.log(data.data);
      router.push(`/themes/${data.data.id}`);
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
          size='icon'
          className='flex w-full justify-between px-2'
        >
          <LucidePlusSquare className='' />
          <span>Create theme</span>
          <span className='sr-only'>Create theme</span>
        </Button>
      </DialogTrigger>
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
    </Dialog>
  );
};

export default CreateNewTheme;
