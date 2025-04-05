import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Extract themeId from URL parameters
    const url = new URL(req.url);
    const themeId = url.searchParams.get('themeId');

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    const theme = await prisma.theme.findUnique({
      where: {
        id: themeId,
      },
      select: {
        title: true, // Only select the name of the theme
      },
    });

    if (!theme) {
      return new NextResponse('Theme not found', { status: 404 });
    }

    return NextResponse.json({ name: theme.title });
  } catch (error) {
    console.error('[GET_THEME_NAME_BY_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}