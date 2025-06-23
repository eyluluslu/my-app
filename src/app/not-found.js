export const dynamic = 'force-dynamic'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-red-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-slate-300 mb-8">
          Aradığınız sayfa mevcut değil veya silinmiş olabilir.
        </p>
        
        <div className="bg-slate-800 p-4 rounded-lg mb-6 text-left">
          <h3 className="text-white font-semibold mb-2">Debug Info:</h3>
          <p className="text-green-400 text-sm">
            Environment: {process.env.NODE_ENV || 'unknown'}
          </p>
          <p className="text-blue-400 text-sm">
            Database URL: {process.env.DATABASE_URL ? 'SET' : 'NOT_SET'}
          </p>
          <p className="text-purple-400 text-sm">
            Timestamp: {new Date().toISOString()}
          </p>
        </div>
        
        <div className="space-y-2">
          <a
            href="/"
            className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ana Sayfaya Dön
          </a>
          <a
            href="/test-page"
            className="block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Test Sayfası
          </a>
        </div>
      </div>
    </div>
  )
} 