import UserProfile from '@/components/theme/themes/UserProfile';
import { prisma } from '@/db/prisma';
import { Metadata, ResolvingMetadata } from 'next';
// Import your Prisma client

// Generate metadata for the page
export async function generateMetadata(
  { params }: { params: { userId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const userId = params.userId;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourapp.com/';

  try {
    console.log(`Fetching user data from database for userId: ${userId}`);

    // Fetch user directly from the database
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        image: true,
        bio: true,
        createdAt: true,
      },
    });

    if (!userData) {
      console.error(`User not found for ID: ${userId}`);
      throw new Error('User not found');
    }

    console.log('User data fetched successfully from DB:', userData);

    // Count user's themes directly from the database
    const themesCount = await prisma.theme.count({
      where: {
        userId: userId,
      },
    });

    console.log('Themes count fetched successfully from DB:', themesCount);

    // Generate dynamic OG image URL
    const ogImageUrl = `${baseUrl}api/user/og?userId=${userId}`;

    // Get metadata from parent (if needed)
    const previousImages = (await parent).openGraph?.images || [];

    const title = userData.name
      ? `${userData.name}'s Themes | MyApp`
      : 'User Themes | MyApp';

    const description = userData.bio
      ? `${userData.bio.substring(0, 150)}${
          userData.bio.length > 150 ? '...' : ''
        } • ${themesCount} themes`
      : `Explore a curated collection of ${themesCount} themes created by this user.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}themes/user/${userId}`,
        siteName: 'MyApp',
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: `${userData.name || 'User'}'s profile and themes`,
          },
          ...previousImages,
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `${baseUrl}themes/user/${userId}`,
      },
      keywords: [
        'themes',
        'user themes',
        userData.name as string,
        'design',
        'customization',
      ],
      authors: [{ name: userData.name || 'MyApp User' }],
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);

    // Fallback metadata if fetch fails
    return {
      title: 'User Themes | MyApp',
      description: 'Explore themes created by this user.',
      openGraph: {
        title: 'User Themes | MyApp',
        description: 'Explore themes created by this user.',
        url: `${baseUrl}themes/user/${userId}`,
        siteName: 'MyApp',
        images: [
          {
            url: `${baseUrl}api/user/og?userId=${userId}`,
            width: 1200,
            height: 630,
            alt: 'User profile and themes',
          },
        ],
      },
    };
  }
}

const UserThemesPage = ({ params }: { params: { userId: string } }) => {
  return <UserProfile userId={params.userId as string} />;
};

export default UserThemesPage;
