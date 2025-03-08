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
    const { themeId, modeId } = await req.json();

    if (!themeId) {
      return new NextResponse('Theme ID is required', { status: 400 });
    }

    if (!modeId) {
      return new NextResponse('Mode ID is required', { status: 400 });
    }

    // Check if the theme exists
    const theme = await prisma.theme.findUnique({
      where: { id: themeId },
    });

    if (!theme) {
      return new NextResponse('Theme not found', { status: 404 });
    }

    // Check if the theme belongs to the user
    if (theme.userId !== userId) {
      return new NextResponse('Not authorized to modify this theme', { status: 403 });
    }

    // Check if the mode exists
    const mode = await prisma.themeMode.findUnique({
      where: { id: modeId },
    });

    if (!mode) {
      return new NextResponse('Mode not found', { status: 404 });
    }

    // Check if the mode belongs to the theme
    if (mode.themeId !== themeId) {
      return new NextResponse('Mode does not belong to the specified theme', { status: 400 });
    }

    // Count the number of modes for this theme
    const modeCount = await prisma.themeMode.count({
      where: { themeId },
    });

    // Prevent deletion if this is the only mode
    if (modeCount <= 1) {
      return new NextResponse('Cannot delete the only mode of a theme', { status: 400 });
    }

    // Delete the mode
    await prisma.themeMode.delete({
      where: { id: modeId },
    });

    return new NextResponse('Mode deleted successfully', { status: 200 });
  } catch (error) {
    console.error('[DELETE_MODE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}