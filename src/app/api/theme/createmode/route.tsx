import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { defaultTheme } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get themeId and mode name from request body
    const body = await req.json();
    const { themeId, modeName } = body;

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    if (!modeName) {
      return new NextResponse('Mode name is required', { status: 400 });
    }

    // Check if theme exists and belongs to the user
    const theme = await prisma.theme.findFirst({
      where: {
        id: themeId,
        userId: session.user?.id,
      },
      include: {
        modes: true,
      },
    });

    if (!theme) {
      return new NextResponse('Theme not found or unauthorized', {
        status: 404,
      });
    }

    // Check if mode already exists for this theme
    const existingMode = theme.modes.find((mode) => mode.mode === modeName);

    if (existingMode) {
      return new NextResponse('Mode already exists for this theme', {
        status: 400,
      });
    }

    // Create new mode for the theme
    const newMode = await prisma.themeMode.create({
      data: {
        mode: modeName,
        content: defaultTheme,
        themeId: themeId,
      },
    });

    return NextResponse.json(newMode);
  } catch (error) {
    console.error('[CREATE_MODE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
