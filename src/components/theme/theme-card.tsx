/* eslint-disable @next/next/no-img-element */

'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Theme } from '@/types/apiReturnTypes';

export function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <Card className='relative shadow-none'>
      <CardHeader>
        <div className='w-full h-[300px] rounded-md bg-cyan-800'></div>
      </CardHeader>
      <CardContent>
        <CardTitle className='text-2xl'>{theme.title}</CardTitle>
        <CardDescription>
          See our latest and best camp destinations all across the five
          continents of the globe.
        </CardDescription>
      </CardContent>
      <CardFooter className='space-x-4'>
        <Button>Let&apos;s go</Button>
        <Button variant='secondary'>Another time</Button>
      </CardFooter>
    </Card>
  );
}
