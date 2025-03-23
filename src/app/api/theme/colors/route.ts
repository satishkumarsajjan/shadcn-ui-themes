
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

// Helper function to validate hex color values
function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get themeId and colors from request body
    const body = await req.json();
    const { themeId, colors } = body;

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    if (!colors || !Array.isArray(colors)) {
      return new NextResponse('Colors array is required', { status: 400 });
    }

    // Validate colors array length
    if (colors.length < 4 || colors.length > 8) {
      return new NextResponse('Colors array must contain between 4 and 8 colors', {
        status: 400,
      });
    }

    // Validate each color is a valid hex value
    for (const color of colors) {
      if (!isValidHexColor(color)) {
        return new NextResponse(`Invalid hex color format: ${color}`, {
          status: 400,
        });
      }
    }

    // Check if theme exists and belongs to the user
    const theme = await prisma.theme.findFirst({
      where: {
        id: themeId,
        userId: session.user?.id,
      },
    });

    if (!theme) {
      return new NextResponse('Theme not found or unauthorized', {
        status: 404,
      });
    }

    // Update the theme with the new colors array
    const updatedTheme = await prisma.theme.update({
      where: {
        id: themeId,
      },
      data: {
        colors: colors,
      },
    });

    return NextResponse.json(updatedTheme);
  } catch (error) {
    console.error('[UPDATE_THEME_COLORS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
