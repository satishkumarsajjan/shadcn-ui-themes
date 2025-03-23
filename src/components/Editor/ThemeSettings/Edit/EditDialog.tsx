import { Copy, Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useThemeMutations } from '@/hooks/ThemeSettings/themeSettings';
import { ThemeWithCounts, ThemeWithUserActions } from '@/types/apiReturnTypes';
import { useQueryClient } from '@tanstack/react-query';

interface props {
  theme: ThemeWithCounts | ThemeWithUserActions;
  onTitleUpdate?: () => Promise<void>;
}
export function ThemeEditDialog({ theme, onTitleUpdate }: props) {
  const [themeTitle, setThemeTitle] = useState(theme.title);
  const [open, setOpen] = useState(false);
  const { updateTitleMutation, isLoading, setIsLoading } =
    useThemeMutations(theme);
  const queryClient = useQueryClient();

  const handleUpdateTitle = async () => {
    setIsLoading(true);
    try {
      await updateTitleMutation.mutateAsync({
        themeId: theme.id,
        title: themeTitle,
      });

      // Explicitly refetch the theme data
      await queryClient.refetchQueries({ queryKey: ['theme', theme.id] });
      await queryClient.refetchQueries({ queryKey: ['themes'] });

      // Call the onTitleUpdate callback if provided
      if (onTitleUpdate) {
        await onTitleUpdate();
      }

      // Close the dialog after successful update
      setOpen(false);
    } catch (error) {
      console.error('Failed to update theme title:', error);
    } finally {
      setIsLoading(false);
    }
  };
  const { deleteThemeMutation } = useThemeMutations(theme);

  const handleDeleteTheme = async () => {
    setIsLoading(true);
    await deleteThemeMutation.mutateAsync({ themeId: theme.id });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md border-none'>
        <DialogHeader>
          <DialogTitle>Edit theme title</DialogTitle>
        </DialogHeader>
        <div className='flex items-center'>
          <Label htmlFor='link' className='sr-only'>
            Title
          </Label>
          <Input
            id='link'
            defaultValue={themeTitle}
            onChange={(e) => setThemeTitle(e.target.value)}
          />
        </div>
        <DialogFooter className='flex items-center sm:justify-between'>
          <div>
            <DialogClose asChild>
              <AlertDelete handleDeleteTheme={handleDeleteTheme} />
            </DialogClose>
          </div>
          <div>
            <Button
              type='button'
              variant='outline'
              disabled={isLoading}
              onClick={handleUpdateTitle}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AlertDelete({
  handleDeleteTheme,
}: {
  handleDeleteTheme: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Delete Theme</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='border-none'>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            theme.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTheme}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
