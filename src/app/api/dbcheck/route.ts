import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    // Test basic connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Get database info
    const dbInfo = await prisma.$queryRaw<Array<{
      database_name: string;
      user_name: string;
      postgres_version: string;
    }>>`
      SELECT 
        current_database() as database_name,
        current_user as user_name,
        version() as postgres_version
    `;
    
    return NextResponse.json({ 
      ok: true, 
      message: "Database connection successful",
      database: dbInfo[0],
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Database connection failed:', error);
    
    return NextResponse.json({ 
      ok: false, 
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
