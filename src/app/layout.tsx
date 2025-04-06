import ClientQueryProvider from '@/components/providers/QueryClientProvider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import type { Metadata, Viewport } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ViewTransitions } from 'next-view-transitions';
import { siteConfig } from '@/config/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Viewport metadata
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

// Enhanced metadata configuration
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
  authors: [
    {
      name: 'Satishkumar',
      url: 'https://x.com/iamsatish4564',
    },
  ],
  creator: 'Satishkumar',
  publisher: 'https://x.com/iamsatish4564',

  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.twitterHandle,
  },

  // Robots directives
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification tokens for search engines
  verification: {
    google: 'your-google-verification-code', // Replace with your verification code
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },

  // Icons configuration - Updated for better cross-browser support
  icons: {
    icon: [
      { url: '/assets/logo.png', type: 'image/png', sizes: 'any' },
      { url: '/assets/logo.png', type: 'image/png' },
      { url: '/assets/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },

  // Category to help with SEO
  category: 'web development', // e.g., 'technology', 'design', etc.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the Google Analytics ID from environment variables
  const gaId = process.env.GAID || '';

  return (
    <html lang='en'>
      <head>
        {/* Additional critical SEO tags */}
        <link rel='canonical' href={siteConfig.url} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {gaId && <GoogleAnalytics gaId={gaId} />}
        <ViewTransitions>
          <SessionProvider>
            <ClientQueryProvider>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
                themes={['dark', 'nautical-sunset', 'hasiru']}
              >
                {children}
                <Toaster />
              </ThemeProvider>
            </ClientQueryProvider>
          </SessionProvider>
        </ViewTransitions>
      </body>

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      ></script>
    </html>
  );
}
