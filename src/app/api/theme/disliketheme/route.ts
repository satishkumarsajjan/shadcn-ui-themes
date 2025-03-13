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

    // Check if the user has already disliked the theme
    const existingDislike = await prisma.dislike.findFirst({
      where: { themeId: themeId, userId: userId },
    });

    if (existingDislike) {
      // If the dislike exists, remove it (undislike)
      await prisma.dislike.delete({
        where: { id: existingDislike.id },
      });
      return new NextResponse('Theme undisliked successfully', { status: 200 });
    } else {
      // If the dislike does not exist, create a new dislike
      await prisma.dislike.create({
        data: {
          userId: userId as string,
          themeId: themeId as string,
        },
      });

      // Check if the user has liked the theme and remove the like if it exists
      const existingLike = await prisma.like.findFirst({
        where: { themeId: themeId, userId: userId },
      });

      if (existingLike) {
        await prisma.like.delete({
          where: { id: existingLike.id },
        });
      }

      return new NextResponse('Theme disliked successfully', { status: 200 });
    }
  } catch (error) {
    console.error('[DISLIKE_THEME]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}