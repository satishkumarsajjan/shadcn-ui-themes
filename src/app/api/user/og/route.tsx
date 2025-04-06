import { siteConfig } from '@/config/site';
import { prisma } from '@/db/prisma';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get('userId');

    let userName = 'Anonymous';
    let userImage = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/default-avatar.png`;
    let themeCount = 0;
    let joinDate = '';
    let bio = '';
    let borderColor = '#4f46e5';
    // Removed unused userDescription variable
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
      return arr.join(', ');
    }

    // Helper function to truncate text with ellipsis
    function truncateText(text: string, maxLength: number): string {
      if (!text) return '';
      return text.length > maxLength
        ? text.substring(0, maxLength) + '...'
        : text;
    }

    // Format date to a readable string
    function formatDate(dateString: string): string {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        });
      } catch (e) {
        console.error('Error formatting date:', e);
        return '';
      }
    }

    // If userId is provided, fetch user data and theme count from the database
    if (userId) {
      try {
        // Fetch user data from database
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });

        if (user) {
          // Update user information
          userName = truncateText(user.name || 'Anonymous', 30);
          userImage = user.image || userImage;
          joinDate = user.createdAt
            ? formatDate(user.createdAt.toISOString())
            : '';
          bio = truncateText(user.bio || '', 150);

          // Count themes created by this user
          themeCount = await prisma.theme.count({
            where: { userId: userId },
          });

          // Fetch a sample of user's themes to get colors for background
          const userThemes = await prisma.theme.findMany({
            where: { userId: userId },
            take: 1,
            orderBy: { createdAt: 'desc' },
          });

          // If user has themes, use colors from their most recent theme
          if (userThemes.length > 0 && userThemes[0].colors) {
            borderColor = userThemes[0].colors[0];
            themeColors = convertArrayToString(userThemes[0].colors);
          }

          // Removed assignment to unused userDescription variable
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Continue with default values if database query fails
      }
    } else {
      // Fallback to URL parameters if no userId
      userName = truncateText(searchParams.get('name') ?? userName, 30);
      themeCount = parseInt(searchParams.get('themeCount') ?? '0');
      // Removed assignment to unused userDescription variable
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
              {/* User profile section */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  marginTop: '0rem',
                }}
              >
                {/* User avatar and background */}
                <div
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: '2rem',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '9999px',
                        background:
                          'linear-gradient(to bottom right, rgba(255,255,255,0.2), transparent)',
                        filter: 'blur(4px)',
                      }}
                    />
                    <img
                      src={userImage}
                      alt={userName}
                      style={{
                        width: '5rem',
                        height: '5rem',
                        borderRadius: '9999px',
                        border: `4px solid ${borderColor}`,
                        boxShadow: '0px 0px 40px 40px rgba(0,0,0,0.2)',
                        position: 'relative',
                      }}
                    />
                  </div>

                  {/* User name */}
                  <h1
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 900,
                      color: '#ffffff',
                      textAlign: 'center',
                      marginBottom: '1rem',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      maxWidth: '800px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {userName}
                  </h1>

                  {/* Theme count badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '1rem',
                      marginBottom: '1rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '9999px',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        padding: '0.5rem 1.5rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                        }}
                      >
                        {themeCount} Theme{themeCount !== 1 ? 's' : ''}
                      </span>
                    </div>

                    {joinDate && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '9999px',
                          border: '1px solid rgba(255, 255, 255, 0.5)',
                          padding: '0.5rem 1.5rem',
                          backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#ffffff',
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                          }}
                        >
                          Member since {joinDate}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* User bio */}
                  {bio && (
                    <p
                      style={{
                        fontSize: '1.25rem',
                        color: '#ffffff',
                        textAlign: 'center',
                        maxWidth: '800px',
                        lineHeight: 1.4,
                        opacity: 0.9,
                      }}
                    >
                      {bio}
                    </p>
                  )}
                </div>
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
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/logo.png`}
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
                        color: '#ffffff',
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
                        color: '#ffffff',
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
                  {siteConfig.description}
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
