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

    // Parse the request body
    const { userId, bio } = await req.json();

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    if (bio === undefined) {
      return new NextResponse('Bio is required', { status: 400 });
    }

    // Update the user's bio
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { bio },
    });

    return NextResponse.json({
      message: 'User bio updated successfully',
      user: updatedUser,
    }, { status: 200 });

  } catch (error) {
    console.error('[UPDATE_USER_BIO]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}