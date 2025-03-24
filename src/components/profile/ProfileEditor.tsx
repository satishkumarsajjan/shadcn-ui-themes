'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Camera, UserCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

// Define the form schema
const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters.' })
    .max(30, { message: 'Username cannot be longer than 30 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  bio: z
    .string()
    .max(160, { message: 'Bio cannot be longer than 160 characters.' })
    .optional(),
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name cannot be longer than 50 characters.' }),
  avatarUrl: z.string().optional(),
  notifications: z.boolean().default(true),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This simulates a user profile loaded from a database
const defaultValues: Partial<ProfileFormValues> = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  bio: 'Software developer with a passion for UI/UX design and building beautiful web applications.',
  name: 'John Doe',
  avatarUrl: '',
  notifications: true,
};

export function ProfileEditor() {
  const [avatar, setAvatar] = useState<string | null>(null);

  // Initialize the form
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  // Form submission handler
  function onSubmit(data: ProfileFormValues) {
    // In a real application, you would send this data to your API
    console.log(data);
  }

  return (
    <div className='container max-w-3xl py-10'>
      <Card className='border-none shadow-lg'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl font-bold'>Edit Profile</CardTitle>
          <CardDescription>
            Update your profile information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex flex-col items-center gap-4 md:w-1/3'>
                  <Avatar className='h-32 w-32'>
                    <AvatarImage src={avatar || ''} alt='Profile picture' />
                    <AvatarFallback className='bg-zinc-200 text-4xl'>
                      <UserCircle className='h-20 w-20 text-zinc-400' />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant='outline' className='w-full gap-2'>
                    <Camera className='h-4 w-4' />
                    Change Avatar
                  </Button>
                </div>
                <div className='flex-1 space-y-4'>
                  <FormField
                    control={form.control}
                    name='username'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder='username' {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name. It can be your real
                          name or a pseudonym.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Your name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder='email@example.com' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <FormField
                  control={form.control}
                  name='bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Tell us a little bit about yourself'
                          className='min-h-32 resize-none'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can <span>@mention</span> other users and
                        organizations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <div className='space-y-4'>
                <h3 className='text-lg font-medium'>Preferences</h3>
                <FormField
                  control={form.control}
                  name='notifications'
                  render={({ field }) => (
                    <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                      <div className='space-y-0.5'>
                        <FormLabel className='text-base'>
                          Email Notifications
                        </FormLabel>
                        <FormDescription>
                          Receive emails about updates, features, and activity.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className='flex justify-end'>
                <Button type='submit'>Save Changes</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
