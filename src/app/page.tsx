import { CommunitySection } from '@/components/Landingpage/CommunitySection';
import { CtaSection } from '@/components/Landingpage/CtaSection';
import { FeaturesSection } from '@/components/Landingpage/FeaturesSection';
import { Footer } from '@/components/Landingpage/Footer';
import { HeroSection } from '@/components/Landingpage/HeroSection';
import { Navbar } from '@/components/Landingpage/Navbar';
import { ThemeShowcaseSection } from '@/components/Landingpage/ThemeShowcaseSection';
import { ThemesShowcase } from '@/components/Landingpage/ThemesShowcase';
import { siteConfig } from '@/config/site';
import { Metadata } from 'next';

// Ensure we have a valid base URL
const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://themes-for-shadcn-ui.vercel.app';

// Define image URL with fallback
const ogImageUrl = siteConfig.ogImage;

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords:
    'UI themes, Tailwind themes, Shadcn themes, modern web design, theme showcase, responsive themes, accessible themes, web development',
  authors: [{ name: 'Shadcn UI Themes Team' }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [ogImageUrl],
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default async function Home() {
  return (
    <main>
      <Navbar />

      <section id='hero-section' aria-labelledby='hero-section-title'>
        <HeroSection />
      </section>
      <section id='features-section' aria-labelledby='features-section-title'>
        <FeaturesSection />
      </section>
      <section
        id='themes-showcase-section'
        aria-labelledby='themes-showcase-section-title'
      >
        <ThemesShowcase />
      </section>
      <section
        id='theme-showcase-section'
        aria-labelledby='theme-showcase-section-title'
      >
        <ThemeShowcaseSection />
      </section>
      <section id='community-section' aria-labelledby='community-section-title'>
        <CommunitySection />
      </section>
      <section id='cta-section' aria-labelledby='cta-section-title'>
        <CtaSection />
      </section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
}
