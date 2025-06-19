import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    message: 'Newsletter özelliği geçici olarak devre dışı' 
  })
} 