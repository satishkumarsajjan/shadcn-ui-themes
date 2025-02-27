import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user?.id;

    // Fetch themes created by the logged-in user
    const themes = await prisma.theme.findMany({
      where: {
        userId: userId,
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

    // Fetch likes, dislikes, and bookmarks by the user
    const likes = await prisma.like.findMany({
      where: {
        userId: userId,
      },
      select: {
        themeId: true,
      },
    });

    const dislikes = await prisma.dislike.findMany({
      where: {
        userId: userId,
      },
      select: {
        themeId: true,
      },
    });

    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      select: {
        themeId: true,
      },
    });

    const likedThemeIds = new Set(likes.map((like) => like.themeId));
    const dislikedThemeIds = new Set(
      dislikes.map((dislike) => dislike.themeId)
    );
    const bookmarkedThemeIds = new Set(
      bookmarks.map((bookmark) => bookmark.themeId)
    );

    const themesWithUserActions = themes.map((theme) => ({
      ...theme,
      isLiked: likedThemeIds.has(theme.id),
      isDisliked: dislikedThemeIds.has(theme.id),
      isBookmarked: bookmarkedThemeIds.has(theme.id),
    }));

    return NextResponse.json(themesWithUserActions);
  } catch (error) {
    console.error('[GET_MY_THEMES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
