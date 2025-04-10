'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useGetUserInfo } from '@/hooks/get-user-by-id';
import { cn } from '@/lib/utils';
import { ThemeWithUserActions } from '@/types/apiReturnTypes';
import { User } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
  Bookmark,
  BookmarkCheckIcon,
  Share2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Link } from 'next-view-transitions';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function ThemeCard({ theme }: { theme: ThemeWithUserActions }) {
  const { data: session } = useSession();
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
  const [user, setUser] = useState<User | null>(null);

  // Call the hook directly in the component body
  const { data, error } = useGetUserInfo(theme.userId);

  useEffect(() => {
    if (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
    } else {
      setUser(data || null);
    }
  }, [data, error]);

  const likeMutation = useMutation({
    mutationFn: (themeId: string) =>
      axios.post('/api/theme/liketheme', { themeId }),
    onMutate: async () => {
      // Optimistically update the UI
      setIsLiked((prev) => !prev);
      setLikeCounts((prev) => (isLiked ? prev - 1 : prev + 1));

      if (isDisliked) {
        setIsDisliked(false);
        setDislikeCounts((prev) => prev - 1);
      }
    },
    onError: () => {
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
    onMutate: async () => {
      // Optimistically update the UI
      setIsDisliked((prev) => !prev);
      setDislikeCounts((prev) => (isDisliked ? prev - 1 : prev + 1));

      if (isLiked) {
        setIsLiked(false);
        setLikeCounts((prev) => prev - 1);
      }
    },
    onError: () => {
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
    onMutate: async () => {
      // Optimistically update the UI
      setIsBookmarked((prev) => !prev);
      setBookmarkCounts((prev) => (isBookmarked ? prev - 1 : prev + 1));
    },
    onError: () => {
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
      () => {
        toast.error('Failed to copy theme link');
      }
    );
  };
  const handleNotSignedIn = () => {
    toast.error('Please sign in to like, dislike, or bookmark themes.');
  };
  return (
    <Card className='relative shadow-none'>
      <CardHeader>
        <Link href={`/themes/id/${theme.id}`}>
          <div
            className={`w-full h-[200px] grid rounded-md overflow-hidden`}
            style={{
              gridTemplateColumns: `repeat(${theme.colors.length}, minmax(0, 1fr))`,
            }}
          >
            {theme.colors.map((color, index) => (
              <div
                key={index}
                className='col-span-1 h-full'
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </Link>
      </CardHeader>
      <CardContent>
        <Link href={`/themes/id/${theme.id}`}>
          <CardTitle className='text-2xl'>{theme.title}</CardTitle>
        </Link>
        <span className='flex my-2 items-center justify-start gap-2'>
          <Avatar className='size-6'>
            <AvatarImage src={user?.image || ''} alt={user?.name || 'User'} />
            <AvatarFallback>
              {user?.name
                ? user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                : 'CN'}
            </AvatarFallback>
          </Avatar>
          <Link
            href={`/themes/user/${user?.id}`}
            className='text-sm hover:underline'
          >
            {user?.name}
          </Link>
        </span>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <div className='flex items-center gap-0'>
          <Button
            variant={'ghost'}
            onClick={() =>
              !session ? handleNotSignedIn() : likeMutation.mutate(theme.id)
            }
            aria-label={isLiked ? 'Unlike theme' : 'Like theme'}
            aria-pressed={isLiked}
          >
            <ThumbsUp className={cn(isLiked && 'font-bold text-cyan-500')} />
            <p>{likeCounts}</p>
          </Button>
          <Button
            variant='ghost'
            onClick={() =>
              !session ? handleNotSignedIn() : dislikeMutation.mutate(theme.id)
            }
            aria-label={isDisliked ? 'Remove dislike' : 'Dislike theme'}
            aria-pressed={isDisliked}
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
            onClick={() =>
              !session ? handleNotSignedIn() : bookmarkMutation.mutate(theme.id)
            }
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark theme'}
            aria-pressed={isBookmarked}
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
          <Button
            variant='ghost'
            onClick={() => handleShare(theme.id)}
            aria-label='Share theme'
          >
            <Share2 />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
