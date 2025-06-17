import { ShoppingBag, User, Lock } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser, loginAction, registerAction } from '@/lib/actions'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'

export default async function LoginPage() {
  // Eğer kullanıcı zaten giriş yapmışsa yönlendir
  const user = await getCurrentUser()
  if (user) {
    if (user.role === 'ADMIN') {
      redirect('/admin')
    } else {
      redirect('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-2">💎</div>
            <span className="text-2xl font-bold text-yellow-500">Livkors</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Hesabınıza giriş yapın
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Hesabınız yok mu?{' '}
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
            Kayıt olun
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Test Hesapları</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Hesapları:</h4>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><strong>Admin:</strong> admin@test.com / 123456</p>
                  <p><strong>Kullanıcı:</strong> user@test.com / 123456</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/" 
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Ana sayfaya dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 