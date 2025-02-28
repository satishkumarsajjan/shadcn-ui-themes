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
import { cn } from '@/lib/utils';
import { Theme } from '@/types/apiReturnTypes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Bookmark,
  BookMarked,
  Share,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ThemeCard({ theme }: { theme: Theme }) {
  const [isLiked, setIsLiked] = useState<boolean>(theme.isLiked);
  const [likeCounts, setLikeCounts] = useState<number>(theme._count.likes);
  const [isDisliked, setIsDisliked] = useState<boolean>(theme.isDisliked);
  const [dislikeCounts, setDislikeCounts] = useState<number>(
    theme._count.dislikes
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(theme.isBookmarked);
  const [bookmarkCounts, setBookmarkCounts] = useState<number>(
    theme._count.bookmarks
  );
  const mutation = useMutation({
    mutationFn: (themeId: string) => {
      setIsLiked(!isLiked);
      setLikeCounts(isLiked ? likeCounts - 1 : likeCounts + 1);
      return axios.post('/api/theme/liketheme', { themeId });
    },
  });
  return (
    <Card className='relative shadow-none'>
      <CardHeader>
        <div className='w-full h-[300px] rounded-md bg-cyan-800'></div>
      </CardHeader>
      <CardContent>
        <CardTitle className='text-2xl'>{theme.title}</CardTitle>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex items-center gap-0'>
          <Button variant={'ghost'} onClick={() => mutation.mutate(theme.id)}>
            <ThumbsUp className={cn(isLiked && 'font-bold text-cyan-500')} />
            <p>{likeCounts}</p>
          </Button>
          <Button variant='ghost'>
            <ThumbsDown
              className={cn(theme.isDisliked && 'font-bold text-red-500')}
            />
            <p>{theme._count.dislikes}</p>
          </Button>
        </div>
        <div>
          <Button variant='ghost'>
            <Bookmark
              className={cn(theme.isBookmarked && 'font-bold text-yellow-500')}
            />
            <p>{theme._count.bookmarks}</p>
          </Button>
          <Button variant='ghost'>
            <Share2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
