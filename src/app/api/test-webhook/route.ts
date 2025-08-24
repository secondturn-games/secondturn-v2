import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    console.log('Webhook test received:', {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
      body: body
    })
    
    return NextResponse.json({
      success: true,
      message: 'Webhook test endpoint working',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Webhook test error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Webhook test endpoint is accessible',
    timestamp: new Date().toISOString()
  })
}
