import AllThemes from '@/components/theme/allthemes/Allthemes';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Explore All Themes | Shadcn UI Themes',
  description:
    'Discover and explore a wide range of beautifully crafted UI themes. Find the perfect theme for your next project.',
  keywords: [
    'UI themes',
    'Shadcn themes',
    'theme explorer',
    'beautiful themes',
    'design inspiration',
    'tailwind themes',
    'tailwind',
    'shadcn',
    'UI',
    'shadcnui',
  ],
  openGraph: {
    title: 'Explore All Themes | Shadcn UI Themes',
    description:
      'Discover and explore a wide range of beautifully crafted UI themes. Find the perfect theme for your next project.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/themes`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: 'Explore All Themes',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore All Themes | Shadcn UI Themes',
    description:
      'Discover and explore a wide range of beautifully crafted UI themes. Find the perfect theme for your next project.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/themes`,
  },
};

const page = () => {
  return (
    <>
      <Head>
        {/* Structured Data for SEO */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Explore All Themes | Shadcn UI Themes',
              description:
                'Discover and explore a wide range of beautifully crafted UI themes. Find the perfect theme for your next project.',
              url: `${process.env.NEXT_PUBLIC_BASE_URL}/themes`,
              image: `${process.env.NEXT_PUBLIC_BASE_URL}/og.png`,
              publisher: {
                '@type': 'Organization',
                name: 'Shadcn UI Themes',
                logo: {
                  '@type': 'ImageObject',
                  url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logo.png`,
                },
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': `${process.env.NEXT_PUBLIC_BASE_URL}/themes`,
              },
            }),
          }}
        />
      </Head>
      <AllThemes />
    </>
  );
};

export default page;
