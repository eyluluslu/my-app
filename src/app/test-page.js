export const dynamic = 'force-dynamic'

export default function TestPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Livkors Test Page
        </h1>
        <p className="text-slate-300 mb-4">
          Vercel deployment working! ✅
        </p>
        <div className="bg-slate-800 p-4 rounded-lg">
          <p className="text-green-400">
            Environment: {process.env.NODE_ENV || 'unknown'}
          </p>
          <p className="text-blue-400">
            Timestamp: {new Date().toISOString()}
          </p>
        </div>
      </div>
    </div>
  )
} 