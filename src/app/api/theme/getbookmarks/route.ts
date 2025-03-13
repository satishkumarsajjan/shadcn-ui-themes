import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Check if user is authenticated
    const session = await auth();

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userId = session.user?.id;

    // Get query parameters for pagination
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const skip = (page - 1) * pageSize;

    // Fetch total count of themes bookmarked by the logged-in user
    const totalCount = await prisma.theme.count({
     where: {
       bookmarks :{ some: { userId: userId } },
      },
    });

    // Fetch themes bookmarked by the logged-in user with pagination
    const themes = await prisma.theme.findMany({
      where: {
       bookmarks :{ some: { userId: userId } },
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
      orderBy: {
        updatedAt: 'desc', // Order by last modified
      },
      skip: skip,
      take: pageSize,
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

    return NextResponse.json({ themes: themesWithUserActions, totalCount });
  } catch (error) {
    console.error('[GET_BOOKMARKS]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
