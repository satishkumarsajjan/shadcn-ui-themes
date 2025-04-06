export const siteConfig = {
  name: 'Shadcn UI Themes', 
  description:
    'Beautiful themes for your next project. Discover, create, and share stunning shadcn/ui themes. Join a growing community of designers creating colourful UI themes.', 
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com', 
  ogImage: `${process.env.NEXT_PUBLIC_BASE_URL}og-image.jpg`, 
  twitterHandle: '@iamsatish4564',
};


export type SiteConfig = typeof siteConfig;