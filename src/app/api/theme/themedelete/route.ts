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
    const { themeId } = await req.json();

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
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
      return new NextResponse('Unauthorized: You can only delete your own themes', { status: 403 });
    }

    // Delete the theme
    await prisma.theme.delete({
      where: { id: themeId }
    });

    return NextResponse.json({ 
      message: 'Theme deleted successfully'
    }, { status: 200 });
    
  } catch (error) {
    console.error('[DELETE_THEME]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
