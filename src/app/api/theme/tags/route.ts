import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const themeId = searchParams.get('themeId');

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    // Fetch tags associated with the theme
    const tags = await prisma.themeTag.findMany({
      where: { themeId },
      include: { tag: true },
    });


    

    return NextResponse.json(tags);
  } catch (error) {
    console.error('[TAG_FETCH_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { themeId, tags } = await req.json();

    if (!themeId || !Array.isArray(tags)) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    // Normalize tags to lowercase
    const normalizedTags = tags.map((tag) => tag.toLowerCase());

    // Upsert tags
    const tagRecords = await Promise.all(
      normalizedTags.map((tag) =>
        prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        })
      )
    );

    // Link tags to the theme
    await prisma.themeTag.createMany({
      data: tagRecords.map((tag) => ({
        themeId,
        tagId: tag.id,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ message: 'Tags updated successfully' });
  } catch (error) {
    console.error('[TAG_ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
