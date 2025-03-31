import { auth } from '@/auth';
import SignIn from '@/components/auth/sign-in';
import { CommunitySection } from '@/components/Landingpage/CommunitySection';
import { CtaSection } from '@/components/Landingpage/CtaSection';
import { FeaturesSection } from '@/components/Landingpage/FeaturesSection';
import { Footer } from '@/components/Landingpage/Footer';
import { HeroSection } from '@/components/Landingpage/HeroSection';
import { Navbar } from '@/components/Landingpage/Navbar';
import { ThemeShowcaseSection } from '@/components/Landingpage/ThemeShowcaseSection';
import { ThemesShowcase } from '@/components/Landingpage/ThemesShowcase';

export default async function Home() {
  const session = await auth();
  return (
    <main className='relative'>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ThemesShowcase />
      <ThemeShowcaseSection />
      <CommunitySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
