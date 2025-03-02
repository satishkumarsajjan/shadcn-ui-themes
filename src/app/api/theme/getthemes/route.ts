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

    // Get query parameters for pagination and filtering
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10);
    const skip = (page - 1) * pageSize;
    
    // New filtering parameters
    const sortBy = url.searchParams.get('sortBy') || 'newest';
    const timeframe = url.searchParams.get('timeframe') || 'all';

    // Build where clause for timeframe filtering
    let whereClause: any = {};
    
    if (timeframe !== 'all') {
      const now = new Date();
      let dateFilter = new Date();
      
      switch (timeframe) {
        case 'today':
          dateFilter.setDate(now.getDate() - 1);
          break;
        case 'week':
          dateFilter.setDate(now.getDate() - 7);
          break;
        case 'month':
          dateFilter.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          dateFilter.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      whereClause.createdAt = { gte: dateFilter };
    }

    // Build orderBy clause based on sort parameter
    let orderByClause: any = {};
    
    switch (sortBy) {
      case 'newest':
        orderByClause = { createdAt: 'desc' };
        break;
      case 'oldest':
        orderByClause = { createdAt: 'asc' };
        break;
      case 'popular':
        // For popularity, we'll order by the count of likes
        orderByClause = [
          { likes: { _count: 'desc' } },
          { updatedAt: 'desc' } // Secondary sort for ties
        ];
        break;
      case 'alphabetical':
        orderByClause = { name: 'asc' };
        break;
      default:
        orderByClause = { createdAt: 'desc' };
    }

    // Get total count with filters applied
    const totalCount = await prisma.theme.count({ 
      where: whereClause 
    });

    // Fetch themes with filters
    const themes = await prisma.theme.findMany({
      where: whereClause,
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
      orderBy: orderByClause,
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

    return NextResponse.json({ 
      themes: themesWithUserActions, 
      totalCount,
      filters: {
        sortBy,
        timeframe,
        page,
        pageSize
      }
    });
  } catch (error) {
    console.error('[GET_THEMES]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// Type definitions for the filter options
export type SortOption = 'newest' | 'oldest' | 'popular' | 'alphabetical';
export type TimeframeOption = 'all' | 'today' | 'week' | 'month' | 'year';