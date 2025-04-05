import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';
import BookmarksGrid from '@/components/theme/bookmarks/BookmarksGrid';

// Define page-specific metadata
export const metadata: Metadata = {
  title: 'Your Bookmarked Themes',
  description:
    'View and manage your bookmarked UI themes in one convenient location. Access your saved designs and style inspirations.',
  keywords: [
    'bookmarks',
    'saved themes',
    'UI themes',
    'design bookmarks',
    'shadcn themes',
  ],
  // Since this is a protected page, add no-index directive to prevent search engines from indexing private content
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: false,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Your Bookmarked Themes',
    description:
      'Manage your collection of saved UI themes and design inspirations.',
    type: 'website',
    // Use a generic image since this is a private page
    images: [
      {
        url: '/images/bookmarks-og.jpg', // Create this generic bookmarks preview image
        width: 1200,
        height: 630,
        alt: 'Bookmarked UI Themes',
      },
    ],
  },
};

const BookmarksPage = async () => {
  const session = await auth();

  if (!session) redirect('/themes');

  return (
    <main>
      <header className='mb-8 sr-only'>
        <h1 className='text-3xl font-bold tracking-tight mb-2'>
          Your Bookmarked Themes
        </h1>
        <p className='text-muted-foreground'>
          Your personal collection of saved themes and design inspirations.
        </p>
      </header>

      <section aria-label='Bookmarked themes grid'>
        <BookmarksGrid />
      </section>
    </main>
  );
};

export default BookmarksPage;
