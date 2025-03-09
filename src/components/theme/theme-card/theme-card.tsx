/* eslint-disable @next/next/no-img-element */

'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ThemeWithUserActions } from '@/types/apiReturnTypes';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Bookmark,
  BookmarkCheckIcon,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { Link } from 'next-view-transitions';
import { useState } from 'react';
import { toast } from 'sonner';

export function ThemeCard({ theme }: { theme: ThemeWithUserActions }) {
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

  const likeMutation = useMutation({
    mutationFn: (themeId: string) =>
      axios.post('/api/theme/liketheme', { themeId }),
    onMutate: async (themeId: string) => {
      // Optimistically update the UI
      setIsLiked((prev) => !prev);
      setLikeCounts((prev) => (isLiked ? prev - 1 : prev + 1));

      if (isDisliked) {
        setIsDisliked(false);
        setDislikeCounts((prev) => prev - 1);
      }
    },
    onError: (error, themeId, context) => {
      // Revert the optimistic update if the mutation fails
      setIsLiked((prev) => !prev);
      setLikeCounts((prev) => (isLiked ? prev + 1 : prev - 1));

      if (isDisliked) {
        setIsDisliked(true);
        setDislikeCounts((prev) => prev + 1);
      }

      toast.error('Failed to update like status');
    },
    onSettled: () => {
      // Optionally refetch or update the data
    },
  });

  const dislikeMutation = useMutation({
    mutationFn: (themeId: string) =>
      axios.post('/api/theme/disliketheme', { themeId }),
    onMutate: async (themeId: string) => {
      // Optimistically update the UI
      setIsDisliked((prev) => !prev);
      setDislikeCounts((prev) => (isDisliked ? prev - 1 : prev + 1));

      if (isLiked) {
        setIsLiked(false);
        setLikeCounts((prev) => prev - 1);
      }
    },
    onError: (error, themeId, context) => {
      // Revert the optimistic update if the mutation fails
      setIsDisliked((prev) => !prev);
      setDislikeCounts((prev) => (isDisliked ? prev + 1 : prev - 1));

      if (isLiked) {
        setIsLiked(true);
        setLikeCounts((prev) => prev + 1);
      }

      toast.error('Failed to update dislike status');
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: (themeId: string) =>
      axios.post('/api/theme/bookmark', { themeId }),
    onMutate: async (themeId: string) => {
      // Optimistically update the UI
      setIsBookmarked((prev) => !prev);
      setBookmarkCounts((prev) => (isBookmarked ? prev - 1 : prev + 1));
    },
    onError: (error, themeId, context) => {
      // Revert the optimistic update if the mutation fails
      setIsBookmarked((prev) => !prev);
      setBookmarkCounts((prev) => (isDisliked ? prev + 1 : prev - 1));

      toast.error('Failed to update dislike status');
    },
  });
  const handleShare = (id: string) => {
    const pageUrl = `${window.location.origin}/themes/id/${id}`;
    navigator.clipboard.writeText(pageUrl).then(
      () => {
        toast.success('Theme link copied to clipboard');
      },
      (err) => {
        toast.error('Failed to copy theme link');
      }
    );
  };
  const colors = [
    '#ccd5ae',
    '#f8b595',
    '#f67280',
    '#c06c84',
    '#6c5b7b',
    '#355c7d',
  ];
  return (
    <Card className='relative shadow-none bg-neutral-900'>
      <CardHeader>
        <div className='w-full h-[300px] grid grid-cols-6 rounded-md overflow-hidden'>
          {colors?.map((item) => (
            <div
              key={item}
              className={`col-span-1 h-full`}
              style={{ backgroundColor: item }}
            ></div>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <Link href={`/themes/id/${theme.id}`}>
          <CardTitle className='text-2xl'>{theme.title}</CardTitle>
        </Link>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex items-center gap-0'>
          <Button
            variant={'ghost'}
            onClick={() => likeMutation.mutate(theme.id)}
          >
            <ThumbsUp className={cn(isLiked && 'font-bold text-cyan-500')} />
            <p>{likeCounts}</p>
          </Button>
          <Button
            variant='ghost'
            onClick={() => dislikeMutation.mutate(theme.id)}
          >
            <ThumbsDown
              className={cn(isDisliked && 'font-bold text-red-500')}
            />
            <p>{dislikeCounts}</p>
          </Button>
        </div>
        <div>
          <Button
            variant='ghost'
            onClick={() => bookmarkMutation.mutate(theme.id)}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheckIcon
                  className={cn(
                    isBookmarked && 'font-extrabold text-yellow-500'
                  )}
                />
              </>
            ) : (
              <>
                <Bookmark />
              </>
            )}
            <p>{bookmarkCounts}</p>
          </Button>
          <Button variant='ghost' onClick={() => handleShare(theme.id)}>
            <Share2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
