import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  try {
    // Static response for now - newsletter functionality disabled during deployment
    return NextResponse.json({ 
      success: true, 
      message: 'Newsletter özelliği geçici olarak devre dışı' 
    })
  } catch (error) {
    console.error('Newsletter error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Hata oluştu' 
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Static response for now - newsletter functionality disabled during deployment
    return NextResponse.json({ 
      success: true, 
      message: 'Teşekkürler! Newsletter özelliği yakında aktif olacak.' 
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Abone olurken hata oluştu' 
    }, { status: 500 })
  }
} 