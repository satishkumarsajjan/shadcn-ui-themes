import { prisma } from '@/db/prisma';
import { ThemeSearchResults } from '@/types/apiReturnTypes';

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const skip = (page - 1) * pageSize;

    const results:ThemeSearchResults = await prisma.theme.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          {
            tags: {
              some: { tag: { name: { contains: query, mode: 'insensitive' } } },
            },
          }, // Search by tag name
        ],
      },
      skip,
      take: pageSize,
      include: {
        tags: {
          include: {
            tag: true, // Include tag details in the response
          },
        },
      },
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('[SEARCH_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
