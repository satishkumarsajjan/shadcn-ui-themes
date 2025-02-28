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

    // Check if the theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return new NextResponse('Theme not found', { status: 404 });
    }

    // Check if the user has already liked the theme
    const existingLike = await prisma.like.findFirst({
     where: {themeId: themeId, userId: userId},
    });

    if (existingLike) {
      // If the like exists, remove it (unlike)
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      return new NextResponse('Theme unliked successfully', { status: 200 });
    } else {
      // If the like does not exist, create a new like
      await prisma.like.create({
        data: {
          userId: userId as string,
          themeId: themeId as string,
        },
      });
      return new NextResponse('Theme liked successfully', { status: 200 });
    }

  } catch (error) {
    console.error('[LIKE_THEME]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}