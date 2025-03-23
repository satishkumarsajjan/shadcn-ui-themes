'use client';

import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { BsGithub, BsGoogle } from 'react-icons/bs';

const SignInDialogContent = () => {
  return (
    <DialogContent className='sm:max-w-[425px]'>
      <DialogHeader>
        <DialogTitle>Login to continue</DialogTitle>
      </DialogHeader>
      <Button
        variant={'default'}
        className='flex w-full justify-center px-2'
        onClick={() => {
          signIn('github');
        }}
      >
        <BsGithub className='h-6 w-6' />
        <span>Login with Github</span>
        <span className='sr-only'>Login with Github</span>
      </Button>
      <Button
        variant={'default'}
        className='flex w-full justify-center px-2'
        onClick={() => {
          signIn('google');
        }}
      >
        <BsGoogle className='h-6 w-6' />
        <span>Login with Google</span>
        <span className='sr-only'>Login with Google</span>
      </Button>
    </DialogContent>
  );
};

export default SignInDialogContent;
