import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Check if any user profiles exist
    const userCount = await prisma.userProfile.count()
    
    // Get a sample of user profiles if they exist
    const users = await prisma.userProfile.findMany({
      take: 5,
      select: {
        id: true,
        clerkId: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Database user check completed',
      userCount: userCount,
      users: users,
      hasUsers: userCount > 0
    })
    
  } catch (error) {
    console.error('User check failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
