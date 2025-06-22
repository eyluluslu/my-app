import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  try {
    // Try to get from database first
    const { getSiteSettings } = await import('@/lib/site-actions')
    const settings = await getSiteSettings()
    
    if (settings) {
      return NextResponse.json(settings)
    }
  } catch (error) {
    console.warn('Database not available, using fallback settings:', error.message)
  }

  // Fallback settings if database is not available
  const fallbackSettings = {
    siteName: 'Livkors',
    siteDescription: 'En kaliteli çantalar burada!',
    contactEmail: 'info@livkors.com',
    contactPhone: '+90 555 123 4567',
    address: 'İstanbul, Türkiye',
    socialMedia: {
      facebook: 'https://facebook.com/livkors',
      instagram: 'https://instagram.com/livkors',
      twitter: 'https://twitter.com/livkors'
    }
  }

  return NextResponse.json(fallbackSettings)
} 