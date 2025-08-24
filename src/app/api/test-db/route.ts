import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    // Test 1: Check if we can connect to the database
    const dbInfo = await prisma.$queryRaw`SELECT current_database() as db_name, current_user as user_name, version() as pg_version`
    
    // Test 2: Check if our tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('user_profiles', 'listings', 'reviews')
      ORDER BY table_name
    `
    
    // Test 3: Try to create a test user profile (we'll delete it immediately)
    const testProfile = await prisma.userProfile.create({
      data: {
        clerkId: 'test-clerk-id-' + Date.now(),
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        displayName: 'Test User',
      },
    })
    
    // Test 4: Delete the test profile
    await prisma.userProfile.delete({
      where: { id: testProfile.id }
    })
    
    return NextResponse.json({
      success: true,
      message: 'Database operations test successful',
      database: dbInfo,
      tables: tables,
      writeTest: 'PASSED - Created and deleted test user profile'
    })
    
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
