'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(isLogin ? 'Giriş başarılı!' : 'Kayıt başarılı!');
        if (isLogin) {
          // Kullanıcı rolünü kontrol et
          const userResponse = await fetch('/api/auth/me');
          const userData = await userResponse.json();
          
          if (userData.user?.role === 'ADMIN') {
            router.push('/admin');
          } else {
            router.push('/');
          }
        } else {
          setIsLogin(true);
          setFormData({ email: '', password: '', name: '' });
        }
      } else {
        setMessage(data.error || 'Bir hata oluştu');
      }
    } catch (error) {
      setMessage('Sunucu hatası: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🛍️ Bag Store
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}
          </p>
        </div>

        {/* Test Accounts Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Test Hesapları:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>Admin:</strong> admin@test.com / 123456</div>
            <div><strong>Kullanıcı:</strong> user@test.com / 123456</div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ad Soyad
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Adınız ve soyadınız"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="ornek@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.includes('başarılı') 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading 
              ? 'Lütfen bekleyin...' 
              : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')
            }
          </button>
        </form>

        {/* Toggle Form */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({ email: '', password: '', name: '' });
              setMessage('');
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {isLogin 
              ? 'Hesabınız yok mu? Kayıt olun' 
              : 'Zaten hesabınız var mı? Giriş yapın'
            }
          </button>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <a
            href="/"
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            ← Ana sayfaya dön
          </a>
        </div>
      </div>
    </div>
  );
} 