import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { log } from 'console';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Extract themeId from URL parameters instead of request body
    const url = new URL(req.url);
    const themeId = url.searchParams.get('themeId');
    console.log(themeId);

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    const session = await auth();

    const theme = await prisma.theme.findUnique({
      where: {
        id: themeId,
      },
      include: {
        modes: true, // Include related ThemeMode records
        _count: {
          select: {
            likes: true,
            dislikes: true,
            bookmarks: true,
          },
        },
      },
    });

    if (!theme) {
      return new NextResponse('Theme not found', { status: 404 });
    }

    if (session) {
      const userId = session.user?.id;

      if (!userId) {
        return NextResponse.json({ theme });
      }

      // Optimize by running queries in parallel
      const [likes, dislikes, bookmarks] = await Promise.all([
        prisma.like.findMany({
          where: {
            userId,
          },
          select: {
            themeId: true,
          },
        }),
        prisma.dislike.findMany({
          where: {
            userId,
          },
          select: {
            themeId: true,
          },
        }),
        prisma.bookmark.findMany({
          where: {
            userId,
          },
          select: {
            themeId: true,
          },
        }),
      ]);

      const likedThemeIds = new Set(likes.map((like) => like.themeId));
      const dislikedThemeIds = new Set(
        dislikes.map((dislike) => dislike.themeId)
      );
      const bookmarkedThemeIds = new Set(
        bookmarks.map((bookmark) => bookmark.themeId)
      );

      const themeWithUserActions = {
        ...theme,
        isLiked: likedThemeIds.has(theme.id),
        isDisliked: dislikedThemeIds.has(theme.id),
        isBookmarked: bookmarkedThemeIds.has(theme.id),
      };

      return NextResponse.json({ theme: themeWithUserActions });
    }

    return NextResponse.json({ theme });
  } catch (error) {
    console.error('[GET_THEME_BY_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
