import { NextResponse } from 'next/server'

// Temporarily disabled for Vercel deployment
export const dynamic = 'force-static'

export async function GET() {
  try {
    // Static response for now - upload functionality disabled during deployment
    return NextResponse.json({ 
      success: false, 
      error: 'Upload özelliği geçici olarak devre dışı' 
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ 
      error: 'Hata oluştu' 
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    // Static response for now - upload functionality disabled during deployment
    return NextResponse.json({ 
      success: false, 
      error: 'Dosya yükleme özelliği geçici olarak devre dışı' 
    }, { status: 503 })

  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    return NextResponse.json({ 
      error: 'Dosya yüklenirken bir hata oluştu' 
    }, { status: 500 })
  }
} 