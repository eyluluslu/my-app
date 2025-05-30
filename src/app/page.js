'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        // İlk 6 ürünü öne çıkarılan ürünler olarak göster
        setFeaturedProducts(data.products?.slice(0, 6) || []);
      }
    } catch (error) {
      console.error('Ürünler yüklenemedi:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories?.slice(0, 4) || []);
      }
    } catch (error) {
      console.error('Kategoriler yüklenemedi:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🛍️ Bag Store
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Ana Sayfa</Link>
              <Link href="/categories" className="text-gray-700 hover:text-gray-900">Kategoriler</Link>
              <Link href="/products" className="text-gray-700 hover:text-gray-900">Ürünler</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">Hakkımızda</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Özel Tasarım Çantalar
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Her tarza uygun kaliteli çantalar. Kadın, erkek ve özel koleksiyonlar.
            </p>
            <div className="space-x-4">
              <Link
                href="/categories"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
              >
                Alışverişe Başla
              </Link>
              <Link
                href="/products"
                className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
              >
                Ürünleri İncele
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20">👜</div>
        <div className="absolute top-20 right-20 text-4xl opacity-20">🎒</div>
        <div className="absolute bottom-10 left-1/4 text-5xl opacity-20">🧳</div>
        <div className="absolute bottom-20 right-10 text-3xl opacity-20">💼</div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popüler Kategoriler
            </h2>
            <p className="text-xl text-gray-600">
              İhtiyacınıza uygun çanta kategorilerini keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-6xl text-white group-hover:scale-110 transition-transform">
                      {getCategoryIcon(category.name)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {category.description || 'Bu kategorideki ürünleri keşfedin'}
                    </p>
                    <span className="text-blue-600 font-medium group-hover:text-blue-800">
                      Ürünleri Gör →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {categories.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Kategoriler yükleniyor...
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Öne Çıkan Ürünler
            </h2>
            <p className="text-xl text-gray-600">
              En popüler ve trend çanta modellerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={product.imageUrl || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-600 font-medium">
                      {product.category?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Stok: {product.stock}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                      ₺{product.price}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {featuredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Ürünler yükleniyor...
              </h3>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Bizi Seçmelisiniz?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ücretsiz Kargo
              </h3>
              <p className="text-gray-600">
                500₺ ve üzeri alışverişlerde ücretsiz kargo imkanı
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kalite Garantisi
              </h3>
              <p className="text-gray-600">
                Tüm ürünlerimizde 2 yıl kalite garantisi sunuyoruz
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">🔄</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Kolay İade
              </h3>
              <p className="text-gray-600">
                14 gün içinde koşulsuz iade ve değişim imkanı
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Kampanyalardan Haberdar Olun
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Yeni ürünler ve özel indirimler için bültenimize abone olun
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🛍️ Bag Store</h3>
              <p className="text-gray-400">
                Kaliteli çantalar ve aksesuarlar için güvenilir adresiniz.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/categories" className="hover:text-white">Kadın Çantaları</Link></li>
                <li><Link href="/categories" className="hover:text-white">Erkek Çantaları</Link></li>
                <li><Link href="/categories" className="hover:text-white">Seyahat Çantaları</Link></li>
                <li><Link href="/categories" className="hover:text-white">İş Çantaları</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-white">İletişim</Link></li>
                <li><Link href="/shipping" className="hover:text-white">Kargo Bilgileri</Link></li>
                <li><Link href="/returns" className="hover:text-white">İade & Değişim</Link></li>
                <li><Link href="/faq" className="hover:text-white">Sık Sorulan Sorular</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Hesap</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/login" className="hover:text-white">Giriş Yap</Link></li>
                <li><Link href="/login" className="hover:text-white">Kayıt Ol</Link></li>
                <li><Link href="/admin" className="hover:text-white">Admin Panel</Link></li>
                <li><Link href="/profile" className="hover:text-white">Hesabım</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Bag Store. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getCategoryIcon(categoryName) {
  const name = categoryName.toLowerCase();
  if (name.includes('women') || name.includes('kadın')) return '👜';
  if (name.includes('men') || name.includes('erkek')) return '🎒';
  if (name.includes('travel') || name.includes('seyahat')) return '🧳';
  if (name.includes('business') || name.includes('iş')) return '💼';
  if (name.includes('sport') || name.includes('spor')) return '🏃‍♂️';
  if (name.includes('school') || name.includes('okul')) return '🎓';
  return '👜';
}
