import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date().toISOString(),
      changefreq: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/themes`,
      lastModified: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.8,
    },
    // Add dynamic routes for themes
    ...(await fetch(`${baseUrl}/api/themes`)
      .then((res) => res.json())
      .then((themes) =>
        themes.map((theme: { id: string }) => ({
          url: `${baseUrl}/themes/${theme.id}`,
          lastModified: new Date().toISOString(),
          changefreq: 'weekly',
          priority: 0.6,
        }))
      )),
  ];
}
