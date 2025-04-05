import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}

export function WebsiteStructuredData({
  siteUrl = 'https://yourdomain.com',
  siteName = 'Your Site Name',
}: {
  siteUrl?: string;
  siteName?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: siteName,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd data={data} />;
}

export function OrganizationStructuredData({
  url = 'https://yourdomain.com',
  logo = 'https://yourdomain.com/logo.png',
  name = 'Your Organization Name',
}: {
  url?: string;
  logo?: string;
  name?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    url,
    logo,
    name,
  };

  return <JsonLd data={data} />;
}

export function LocalBusinessStructuredData({
  name = 'Your Business Name',
  image = 'https://yourdomain.com/image.jpg',
  telephone = '+15551234567',
  priceRange = '$$',
  address = {
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressRegion: 'State',
    postalCode: '12345',
    addressCountry: 'US',
  },
  geo = {
    latitude: '40.7128',
    longitude: '-74.0060',
  },
}: {
  name?: string;
  image?: string;
  telephone?: string;
  priceRange?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: string;
    longitude: string;
  };
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image,
    telephone,
    priceRange,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...geo,
    },
  };

  return <JsonLd data={data} />;
}
