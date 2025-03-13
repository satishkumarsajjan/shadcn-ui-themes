import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user?.id;
    const { themeId, modeId, mode, content } = await req.json();

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    if (!modeId) {
      return new NextResponse('Mode ID is required', { status: 400 });
    }

    if (!mode) {
      return new NextResponse('Mode name is required', { status: 400 });
    }

    if (content === undefined) {
      return new NextResponse('Mode content is required', { status: 400 });
    }

    // Check if the theme exists and belongs to the user
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
      select: { userId: true }
    });

    if (!theme) {
      return new NextResponse('Theme not found', { status: 404 });
    }

    // Check if the user is the owner of the theme
    if (theme.userId !== userId) {
      return new NextResponse('Unauthorized: You can only update your own themes', { status: 403 });
    }

    // Check if the mode exists and belongs to the theme
    const existingMode = await prisma.themeMode.findUnique({
      where: { id: modeId },
      select: { themeId: true }
    });

    if (!existingMode) {
      return new NextResponse('Mode not found', { status: 404 });
    }

    if (existingMode.themeId !== themeId) {
      return new NextResponse('Mode does not belong to this theme', { status: 400 });
    }

    // Update the mode
    const updatedMode = await prisma.themeMode.update({
      where: { id: modeId },
      data: {
        mode: mode,
        content: content
      }
    });

    return NextResponse.json({ 
      message: 'Theme mode updated successfully',
      mode: updatedMode
    }, { status: 200 });
    
  } catch (error) {
    console.error('[UPDATE_THEME_MODE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}   