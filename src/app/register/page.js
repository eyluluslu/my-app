import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/actions'
import { redirect } from 'next/navigation'
import RegisterForm from '@/components/RegisterForm'

export default async function RegisterPage() {
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
          Yeni hesap oluşturun
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Giriş yapın
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <RegisterForm />

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