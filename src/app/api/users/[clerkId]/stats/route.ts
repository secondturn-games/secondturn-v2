import { NextRequest, NextResponse } from 'next/server'
import { getUserStats } from '@/lib/user-service'
import { auth } from '@clerk/nextjs/server'

interface RouteParams {
  params: Promise<{ clerkId: string }>
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Get the authenticated user
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Resolve the params promise
    const { clerkId } = await params

    // Users can only access their own stats
    if (userId !== clerkId) {
      return NextResponse.json(
        { error: 'Forbidden - Cannot access other user stats' },
        { status: 403 }
      )
    }

    const result = await getUserStats(clerkId)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data
    })

  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
