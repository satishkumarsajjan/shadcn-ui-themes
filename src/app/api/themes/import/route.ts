import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the user session
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the request body
    const body = await request.json();
    const { sourceThemeId } = body;

    if (!sourceThemeId) {
      return NextResponse.json({ message: 'Source theme ID is required' }, { status: 400 });
    }

    // Get the user from the database
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Get the source theme with its modes and tags
    const sourceTheme = await prisma.theme.findUnique({
      where: { id: sourceThemeId },
      include: {
        modes: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!sourceTheme) {
      return NextResponse.json({ message: 'Source theme not found' }, { status: 404 });
    }

    // Check if the theme already belongs to the user
    if (sourceTheme.userId === user.id) {
      return NextResponse.json(
        { message: 'You already own this theme', themeId: sourceTheme.id }, 
        { status: 409 }
      );
    }

    // Create a new theme for the user
    const newTheme = await prisma.theme.create({
      data: {
        title: `${sourceTheme.title} (Imported)`,
        description: sourceTheme.description,
        userId: user.id,
        colors: sourceTheme.colors,
        // Create the theme modes
        modes: {
          create: sourceTheme.modes.map(mode => ({
            mode: mode.mode,
            content: mode.content,
          })),
        },
        // Create the theme tags
        tags: {
          create: sourceTheme.tags.map(themeTag => ({
            tag: {
              connectOrCreate: {
                where: { id: themeTag.tag.id },
                create: { name: themeTag.tag.name },
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(newTheme, { status: 200 });
  } catch (error) {
    console.error('Error importing theme:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}