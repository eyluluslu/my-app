import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  try {
    // Return static response for now
    return NextResponse.json({ count: 0 })
  } catch (error) {
    console.error('Sepet sayısı hatası:', error)
    return NextResponse.json({ count: 0 })
  }
} 