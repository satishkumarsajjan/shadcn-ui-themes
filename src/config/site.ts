export const siteConfig = {
  name: 'Themes for shadcn UI', 
  description:
    'Beautiful themes for your next project. Discover, create, and share stunning shadcn/ui themes. Join a growing community of designers creating colourful UI themes.', 
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://themes-for-shadcn-ui.vercel.app', 
  ogImage: `${process.env.NEXT_PUBLIC_BASE_URL}/og.png`, 
  twitterHandle: '@iamsatish4564',
};


export type SiteConfig = typeof siteConfig;