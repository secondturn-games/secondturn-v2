import { NextRequest, NextResponse } from 'next/server'
import { getUserStats } from '@/lib/user-service'
import { auth } from '@clerk/nextjs/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { clerkId: string } }
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

    // Users can only access their own stats
    if (userId !== params.clerkId) {
      return NextResponse.json(
        { error: 'Forbidden - Cannot access other user stats' },
        { status: 403 }
      )
    }

    const result = await getUserStats(params.clerkId)
    
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
