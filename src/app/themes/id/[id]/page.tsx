import ThemeEditor from '@/components/themeEditor/ThemeEditor';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

// Update the interface to match the expected type from Next.js in this project
interface PageProps {
  params: Promise<{ id: string }>;
}

// Enhanced metadata generation with OG image support
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // Resolve the params promise
  const resolvedParams = await params;
  const id = resolvedParams.id;

  try {
    // Fetch theme data
    const response = await fetch(
      `https://themes-for-shadcn-ui.vercel.app/api/theme/getthemenamebyId?themeId=${id}`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
      throw new Error('Failed to fetch theme name');
    }

    const data = await response.json();
    const themeName = data.name;

    // Create OG image URL with theme name and author if available
    const ogImageUrl = new URL(
      `https://themes-for-shadcn-ui.vercel.app/api/theme/og?themeId=${id}`
    );
    ogImageUrl.searchParams.append('title', `${themeName} Theme`);
    ogImageUrl.searchParams.append('author', data.author || 'UI Theme Editor');

    // Construct canonical URL
    const canonicalUrl = `https://themes-for-shadcn-ui.vercel.app/themes/id/${id}`;

    return {
      title: `${themeName} Theme | UI Theme Editor`,
      description: `Explore and customize the ${themeName} UI theme. Create beautiful user interfaces with this customizable shadcn theme.`,
      keywords: [
        `${themeName} theme`,
        'UI theme',
        'shadcn',
        'design system',
        'customizable theme',
        'web design',
      ],
      authors: [{ name: data.author || 'UI Theme Editor' }],
      openGraph: {
        title: `${themeName} UI Theme`,
        description: `Explore and customize the ${themeName} UI theme. Create beautiful user interfaces with this customizable shadcn theme.`,
        url: canonicalUrl,
        siteName: 'UI Theme Editor',
        images: [
          {
            url: ogImageUrl.toString(),
            width: 1200,
            height: 630,
            alt: `${themeName} UI Theme Preview`,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${themeName} UI Theme | UI Theme Editor`,
        description: `Explore and customize the ${themeName} UI theme. Create beautiful user interfaces with this customizable shadcn theme.`,
        images: [ogImageUrl.toString()],
        creator: siteConfig.twitterHandle,
        site: siteConfig.url,
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    // Fallback metadata if fetch fails
    console.error('Error generating metadata:', error);
    return {
      title: 'UI Theme | Theme Editor',
      description:
        'Explore and customize UI themes. Create beautiful user interfaces with customizable shadcn themes.',
    };
  }
}

// Page component with params as a Promise
const ThemePage = async ({ params }: PageProps) => {
  // Resolve the params promise
  const resolvedParams = await params;
  const id = resolvedParams.id;

  return (
    <main>
      <div>
        <ThemeEditor id={id} />
      </div>
    </main>
  );
};

export default ThemePage;
