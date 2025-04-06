import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { DEFAULT_THEME } from '@/lib/constants'
import { NextResponse } from 'next/server'


export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const session = await auth()
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get theme name from request body
    const body = await req.json()
    const { theme_name } = body

    if (!theme_name) {
      return new NextResponse("Theme name is required", { status: 400 })
    }

    // Check if theme already exists for this user
    const existingTheme = await prisma.theme.findFirst({
      where: {
        title: theme_name,
        userId: session.user?.id
      }
    })

    if (existingTheme) {
      return new NextResponse("Theme already exists", { status: 400 })
    }

    // Create new theme with default values
    const theme = await prisma.theme.create({
     data: {
        title: theme_name,
        description: 'Light Mode for the bright days',
        userId: session.user?.id as string,
        modes: {
          create: {
            mode: "Light Mode",
            content: DEFAULT_THEME
          }
        },
        colors:['#ffa344','#ffe0bf','#552008','#fb923c','#f97316', '#7c2d12', '#fff7ed', '#c2410c'],
      }
    })

    return NextResponse.json(theme)

  } catch (error) {
    console.error("[THEMES_POST]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}