import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ImportThemeButtonProps {
  themeId: string;
  userId?: string;
}

export default function ImportThemeButton({
  themeId,
  userId,
}: ImportThemeButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Check if the theme belongs to the current user
  const isOwnTheme = session?.user?.id === userId;

  const handleImportTheme = async () => {
    if (!session?.user) {
      // Redirect to login if user is not authenticated
      router.push('/auth/signin');
      return;
    }

    // If it's the user's own theme, just navigate to it
    if (isOwnTheme) {
      router.push(`/themes/id/${themeId}`);
      return;
    }

    try {
      setIsLoading(true);

      // Call API to import the theme
      const response = await fetch('/api/themes/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sourceThemeId: themeId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          // Theme already belongs to user, navigate to it
          router.push(`/themes/${data.themeId}`);
          return;
        }
        throw new Error(data.message || 'Failed to import theme');
      }

      // Navigate to the newly created theme
      router.push(`/themes/id/${data.id}`);
    } catch (error) {
      console.error('Error importing theme:', error);
      // Handle error (could add toast notification here)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOwnTheme ? null : (
        <Button onClick={handleImportTheme} disabled={isLoading}>
          {isLoading
            ? 'Importing...'
            : isOwnTheme
            ? 'View Theme'
            : 'Import Theme'}
        </Button>
      )}
    </>
  );
}
