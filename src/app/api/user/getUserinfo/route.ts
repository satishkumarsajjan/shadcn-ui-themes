import { prisma } from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // Extract userId from query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 });
    }

    // Fetch the user details
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

  
    const { bio,createdAt,id,image,name,updatedAt } = user;

    return NextResponse.json({
      message: 'User fetched successfully',
      user: { bio,createdAt,id,image,name,updatedAt }, 
    }, { status: 200 });

  } catch (error) {
    console.error('[GET_USER]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
