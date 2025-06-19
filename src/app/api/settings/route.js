import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  try {
    // Return static response for now
    return NextResponse.json({ 
      siteName: "Livkors",
      siteDescription: "Kaliteli çantalar ve mükemmel müşteri hizmetinde öncü markayız",
      logoUrl: null 
    })
  } catch (error) {
    console.error('Site ayarları hatası:', error)
    return NextResponse.json({ logoUrl: null })
  }
} 