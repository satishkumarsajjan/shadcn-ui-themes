
import { MetadataRoute } from 'next'

/**
 * Generates the robots.txt configuration for the application
 * 
 * This function returns a structured object that Next.js will automatically
 * convert into a properly formatted robots.txt file at build time.
 * 
 * @returns {MetadataRoute.Robots} The robots configuration object
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  // Extract base URL from environment variables or use a default for local development
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return {
    // Define the rules for web crawlers
    rules: {
      userAgent: '*',
      allow: ['/'],
      
      // Add any paths you want to disallow crawlers from accessing
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/*.json$',  // Prevent crawling of JSON endpoints
      ]
    },
    // Link to your sitemap for better indexing
    sitemap: `${baseUrl}/sitemap.xml`,
    // Add host directive for some crawlers that support it
    host: baseUrl,
  }
}
