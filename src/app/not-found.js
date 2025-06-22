import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-blue-400 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-2">Sayfa Bulunamadı</h2>
          <p className="text-slate-400 mb-6">
            Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          
          <div className="text-sm text-slate-500">
            <p>Sorun devam ederse lütfen iletişime geçin.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 