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
    const { themeId, description } = await req.json();

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    if (description === undefined) {
      return new NextResponse('Description is required', { status: 400 });
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

    // Update the theme description
    const updatedTheme = await prisma.theme.update({
      where: { id: themeId },
      data: {
        description: description
      }
    });

    return NextResponse.json({ 
      message: 'Theme description updated successfully',
      theme: updatedTheme
    }, { status: 200 });
    
  } catch (error) {
    console.error('[UPDATE_THEME_DESCRIPTION]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}