import { prisma } from '@/db/prisma';

export default async function generateSitemap() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://themes-for-shadcn-ui.vercel.app';

    // Fetch data for sitemap
    const users = await prisma.user.findMany({
      select: { id: true },
    });

    const themes = await prisma.theme.findMany({
      select: { id: true },
    });


    if ((!users || users.length === 0) && (!themes || themes.length === 0) ) {
      console.error('No data found for sitemap generation');
      return [];
    }

    // Generate sitemap entries
    const userSitemap = users.map((user) => ({
      url: `${baseUrl}/themes/user/${user.id}`,
      lastModified: new Date().toISOString(),
    }));

    const themeSitemap = themes.map((theme) => ({
      url: `${baseUrl}/themes/${theme.id}`,
      lastModified: new Date().toISOString(),
    }));

 

    const sitemap = [...userSitemap, ...themeSitemap];

    console.log('Sitemap generated successfully:', sitemap);

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [];
  }
}
