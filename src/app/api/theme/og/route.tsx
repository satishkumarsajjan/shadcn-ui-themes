import { siteConfig } from '@/config/site';
import { prisma } from '@/db/prisma';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const themeId = searchParams.get('themeId');

    let themeName = 'Shadcn UI Themes';
    const themeDescription = siteConfig.description;
    let authorName = 'Anonymous';
    let authorImage = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/default-avatar.png`;
    let themeColors = convertArrayToString([
      '#4f46e5',
      '#9333ea',
      '#ec4899',
      '#f97316',
      '#10b981',
      '#06b6d4',
      '#a855f7',
      '#f472b6',
    ]);
    function convertArrayToString(arr: string[]): string {
      return arr.join(', '); // You can change the separator here if needed
    }
    // If themeId is provided, fetch theme and user data directly from the database
    if (themeId) {
      try {
        // Fetch theme data from database
        const theme = await prisma.theme.findUnique({
          where: { id: themeId },
          include: {
            user: true, // Include the user who created the theme
          },
        });

        if (theme) {
          // Update variables with theme data
          themeName = theme.title;

          // Extract theme colors if available
          if (theme.colors) {
            themeColors = convertArrayToString(theme.colors) || themeColors;
          }

          // Update author information if available
          if (theme.user) {
            authorName = theme.user.name || theme.user.name || authorName;
            authorImage = theme.user.image || authorImage;
          }
        }
      } catch (error) {
        console.error('Error fetching theme data:', error);
        // Continue with default values if database query fails
      }
    } else {
      // Fallback to URL parameters if no themeId
      themeName = searchParams.get('title') ?? themeName;
      authorName = searchParams.get('author') ?? authorName;
    }

    // Generate the image using JSX
    return new ImageResponse(
      (
        <div
          style={{
            position: 'relative',
            width: '1200px',
            height: '630px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Background gradient using theme colors */}
          <div
            style={{
              position: 'absolute',
              inset: '0',
              background: `linear-gradient(135deg, ${themeColors})`,
              height: '100%',
              width: '100%',
            }}
          ></div>
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              padding: '2rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
                borderRadius: '0.75rem',
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(0, 0, 0, 0.35)',
                padding: '2rem',
              }}
            >
              {/* Theme title */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',

                  marginTop: 'auto',
                  marginBottom: '4rem',
                }}
              >
                {/* Author info */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: 'auto',
                    gap: '0.6rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    Theme created by
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.5)',
                      padding: '0.5rem',
                      gap: '1rem',
                    }}
                  >
                    <img
                      src={authorImage}
                      alt={authorName}
                      style={{
                        width: '3rem',
                        height: '3rem',
                        borderRadius: '9999px',

                        boxShadow: '0px 0px 40px 40px rgba(0,0,0,0.2)',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#ffffff',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      }}
                    >
                      {authorName}
                    </span>
                  </div>
                </div>
                <h1
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 900,
                    color: '#ffffff',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    textWrap: 'balance',
                  }}
                >
                  {themeName}
                </h1>
              </div>
              {/* Logo and site name */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '0.5rem',
                    }}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/logo.png`} // Replace with the absolute URL of the logo
                      alt='logo'
                      style={{
                        height: '4rem',
                        width: '4rem',
                        boxShadow: '0px 0px 40px 40px rgba(0,0,0,0.2)',
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      lineHeight: '1.25',
                    }}
                  >
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: 900,
                        fontSize: '2.25rem',
                        color: '#ffffff', // Smooth white color
                      }}
                      className='text-4xl'
                    >
                      Themes
                    </span>
                    <span
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '1.5rem',
                        color: '#ffffff', // Smooth white color
                      }}
                    >
                      For Shadcn UI
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '1.0rem',
                    color: '#ffffff',
                    textAlign: 'center',
                    maxWidth: '800px',
                    lineHeight: 1.4,
                  }}
                >
                  {themeDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: Error | unknown) {
    console.error(
      `${e instanceof Error ? e.message : 'An unknown error occurred'}`
    );
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
