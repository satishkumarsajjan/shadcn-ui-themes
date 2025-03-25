'use client';

import { UserCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useGetUser } from '@/hooks/get-user-by-id';
import { useSession } from 'next-auth/react';
import { Textarea } from '../ui/textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export function ProfileEditor() {
  const { data: session } = useSession();
  // Add useState for bio field
  const { data } = useGetUser(session?.user?.id || '');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (data) setBio(data?.bio || '');
  }, [data]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ userId, bio }: { userId: string; bio: string }) => {
      const response = await axios.post('/api/user/updateUserBio', {
        userId,
        bio,
      });
      return response.data;
    },

    onSuccess: (data, variables) => {
      // Invalidate and refetch user queries
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });

      // Show success toast
      toast.success(data.message || 'Bio updated successfully');
    },

    onError: (error) => {
      // Handle error
      const errorMessage =
        error.message || error.message || 'Failed to update bio';

      toast.error(errorMessage);
      console.error('Error updating user bio:', error);
    },
  });

  if (!data) {
    return (
      <div className='container max-w-3xl py-10'>
        <Card className='border-none shadow-lg'>
          <CardHeader className='space-y-1'>
            <Separator className='my-2' />
            <CardTitle className='text-2xl font-bold'>Profile</CardTitle>
            <CardDescription>Your profile information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='space-y-8'>
              <div className='flex flex-col gap-8 md:flex-row'>
                <div className='flex flex-col items-center gap-4 md:w-1/3'>
                  <Skeleton className='h-32 w-32 rounded-full' />
                </div>
                <div className='flex-1 space-y-4'>
                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Username</p>
                    <Skeleton className='h-6 w-32' />
                  </div>

                  <div className='space-y-1'>
                    <p className='text-sm font-medium'>Email</p>
                    <Skeleton className='h-6 w-48' />
                  </div>
                </div>
              </div>

              <Separator />

              <div className='space-y-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Bio</p>
                  <Skeleton className='h-24 w-full' />
                </div>
              </div>

              <div className='flex justify-end'>
                <Skeleton className='h-10 w-28' />
              </div>
            </div>
            <Separator className='mt-2' />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='container max-w-3xl py-10'>
      <Card className='border-none shadow-lg'>
        <CardHeader className='space-y-1'>
          <Separator className='my-2' />
          <CardTitle className='text-2xl font-bold'>Profile</CardTitle>
          <CardDescription>Your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-8'>
            <div className='flex flex-col gap-8 md:flex-row'>
              <div className='flex flex-col items-center gap-4 md:w-1/3'>
                <Avatar className='h-32 w-32'>
                  <AvatarImage src={data?.image || ''} alt='Profile picture' />
                  <AvatarFallback className='bg-zinc-200 text-4xl'>
                    <UserCircle className='h-20 w-20 text-zinc-400' />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className='flex-1 space-y-4'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Username</p>
                  <p className='text-base'>{data?.name}</p>
                </div>

                <div className='space-y-1'>
                  <p className='text-sm font-medium'>Email</p>
                  <p className='text-base'>{data?.email}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className='space-y-4'>
              <div className='space-y-1'>
                <p className='text-sm font-medium'>Bio</p>
                <Textarea
                  className='text-base whitespace-pre-wrap'
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></Textarea>
              </div>
            </div>

            <div className='flex justify-end'>
              <Button
                variant='outline'
                onClick={() => {
                  if (data?.id) {
                    mutate({ userId: data.id, bio: bio });
                  } else {
                    // Handle the case where ID is missing
                    toast.error('Cannot update: User ID is missing');
                  }
                }}
                disabled={isPending}
              >
                {isPending ? 'Updating...' : 'Update Bio'}
              </Button>
            </div>
          </div>
          <Separator className='mt-2' />
        </CardContent>
      </Card>
    </div>
  );
}
