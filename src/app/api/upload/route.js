import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ 
    success: false, 
    error: 'Upload özelliği geçici olarak devre dışı' 
  })
} 