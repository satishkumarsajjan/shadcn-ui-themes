import { siteConfig } from '@/config/site';
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          id='og-image'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
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
            <div
              style={{
                position: 'absolute',
                inset: '0',
                background: `linear-gradient(135deg, #4f46e5, #9333ea, #ec4899, #f97316, #10b981, #06b6d4, #a855f7, #f472b6)`,

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
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  borderRadius: '0.5rem',
                  backdropFilter: 'blur(8px)',
                  backgroundColor: 'rgba(0, 0, 0, 0.35)',
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
                      style={{ height: '4rem', width: '4rem' }}
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

                <span
                  style={{
                    padding: '1rem 8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.125rem',
                      color: '#ffffff',
                    }}
                  >
                    {siteConfig.description}
                  </h3>
                </span>
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
  } catch (e: any) {
    console.error(`${e.message}`);
    return new Response(`Failed to generate the image`, { status: 500 });
  }
}
