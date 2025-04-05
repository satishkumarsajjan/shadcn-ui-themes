// src/lib/og.ts
export const generateOgImageUrl = (
  baseUrl: string,
  title: string,
  description: string
) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  return `${baseUrl}/api/og?title=${encodedTitle}&description=${encodedDescription}`;
};
