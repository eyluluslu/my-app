import Link from 'next/link'
import { getCurrentUser } from '@/lib/actions'
import { getHeroBanners, getSiteSettings } from '@/lib/site-actions'
import HeroSlider from '@/components/HeroSlider'

export default async function HomePage() {
  const user = await getCurrentUser()
  
  // Banner ve site ayarlarını getir
  const [banners, siteSettings] = await Promise.all([
    getHeroBanners().then(result => result.success ? result.data : []),
    getSiteSettings().then(result => result.success ? result.data : null)
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
                          <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-2">
                  {siteSettings?.logoUrl ? (
                    <img 
                      src={siteSettings.logoUrl} 
                      alt={siteSettings?.siteName || 'Livkors'} 
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    <span className="text-2xl">💎</span>
                  )}
                  <span className="text-2xl font-bold text-yellow-500">
                    {siteSettings?.siteName || 'Livkors'}
                  </span>
                </Link>
              </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Ana Sayfa</Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600">Ürünler</Link>
              <Link href="/categories" className="text-gray-700 hover:text-blue-600">Kategoriler</Link>
              {user && (
                <>
                  <Link href="/messages" className="text-gray-700 hover:text-blue-600">Mesajlar</Link>
                  <Link href="/profile" className="text-gray-700 hover:text-blue-600">Profil</Link>
                </>
              )}
              <Link href="/about" className="text-gray-700 hover:text-blue-600">Hakkımızda</Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Hoş geldin, <span className="font-medium">{user.name}</span>
                    {user.role === 'ADMIN' && <span className="ml-1 px-2 py-1 bg-amber-100 text-amber-950 text-xs rounded font-bold border-l-4 border-amber-700">Admin</span>}
                  </span>
                  {user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link href="/cart" className="text-gray-600 hover:text-blue-600">
                    🛒 Sepet
                  </Link>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Link 
                    href="/login" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link 
                    href="/register" 
                    className="border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Banner Slider */}
      <HeroSlider banners={banners} />

      {/* Welcome Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {siteSettings?.heroTitle || 'Özel Tasarım Çantalar'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {siteSettings?.heroSubtitle || 'Her tarza uygun kaliteli çantalar. Kadın, erkek ve özel koleksiyonlarımızla stilinizi tamamlayın.'}
            </p>
            {user?.role === 'ADMIN' && (
              <div className="inline-flex items-center px-4 py-2 bg-gray-700 text-gray-100 rounded-lg border border-gray-600">
                <span className="text-sm">💡 Admin olarak banner'ları <Link href="/admin" className="font-medium underline text-gray-100 hover:text-white">yönetim panelinden</Link> düzenleyebilirsiniz</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Çanta Koleksiyonlarımız
            </h2>
            <p className="text-xl text-gray-600">
              Her ihtiyaca ve stile uygun kaliteli çanta seçenekleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Kadın Çantaları */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-pink-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6 filter drop-shadow-lg">👜</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Kadın Çantaları</h3>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-pink-500 mr-3">✨</span> El çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-pink-500 mr-3">✨</span> Omuz çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-pink-500 mr-3">✨</span> Clutch çantalar
                </li>
                <li className="flex items-center">
                  <span className="text-pink-500 mr-3">✨</span> Çapraz askılı çantalar
                </li>
              </ul>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Koleksiyonu İncele 
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Erkek Çantaları */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6 filter drop-shadow-lg">💼</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Erkek Çantaları</h3>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">🔥</span> Evrak çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">🔥</span> Laptop çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">🔥</span> Sırt çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-3">🔥</span> Spor çantaları
                </li>
              </ul>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Koleksiyonu İncele 
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Seyahat Çantaları */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl shadow-lg border border-emerald-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6 filter drop-shadow-lg">🧳</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Seyahat Çantaları</h3>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-emerald-500 mr-3">🌟</span> Bavullar
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-500 mr-3">🌟</span> Seyahat çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-500 mr-3">🌟</span> Kabin çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-emerald-500 mr-3">🌟</span> Spor çantaları
                </li>
              </ul>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Koleksiyonu İncele 
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Okul Çantaları */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl shadow-lg border border-orange-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6 filter drop-shadow-lg">🎒</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Okul Çantaları</h3>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-orange-500 mr-3">📚</span> Öğrenci sırt çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-3">📚</span> Laptop bölmeli çantalar
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-3">📚</span> Günlük kullanım çantaları
                </li>
                <li className="flex items-center">
                  <span className="text-orange-500 mr-3">📚</span> Ergonomik tasarımlar
                </li>
              </ul>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Koleksiyonu İncele 
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Özel Koleksiyonlar */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl shadow-lg border border-purple-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6 filter drop-shadow-lg">✨</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Özel Koleksiyonlar</h3>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">💎</span> Limited Edition
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">💎</span> Tasarımcı koleksiyonları
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">💎</span> Özel dikiş çantalar
                </li>
                <li className="flex items-center">
                  <span className="text-purple-500 mr-3">💎</span> Vintage modeller
                </li>
              </ul>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg">
                Koleksiyonu İncele 
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Cüzdan & Aksesuar */}
            <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="text-5xl mb-6 filter drop-shadow-lg">👛</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Cüzdan & Aksesuar</h3>
              <ul className="text-gray-600 space-y-3 mb-6">
                <li className="flex items-center">
                  <span className="text-gray-500 mr-3">💰</span> Deri cüzdanlar
                </li>
                <li className="flex items-center">
                  <span className="text-gray-500 mr-3">💰</span> Kartlık ve para kesesileri
                </li>
                <li className="flex items-center">
                  <span className="text-gray-500 mr-3">💰</span> Anahtarlık setleri
                </li>
                <li className="flex items-center">
                  <span className="text-gray-500 mr-3">💰</span> Çanta aksesuarları
                </li>
              </ul>
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-slate-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-slate-800 transition-all duration-300 shadow-md hover:shadow-lg">
                Koleksiyonu İncele 
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">
              Neden Livkors?
            </h2>
            <p className="text-lg text-gray-600">
              Kalite, şıklık ve müşteri memnuniyetinde öncü markayız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-6 filter drop-shadow-lg">🏆</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Premium Kalite</h3>
              <p className="text-gray-600 leading-relaxed">
                En kaliteli malzemeler ve titiz işçilik ile üretilen çantalarımız, uzun yıllar kullanım garantisi sunar.
              </p>
              <div className="mt-4 flex justify-center">
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">⭐ 5 Yıl Garanti</span>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-6 filter drop-shadow-lg">🚚</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Hızlı Teslimat</h3>
              <p className="text-gray-600 leading-relaxed">
                Siparişlerinizi 24 saat içinde kargolayıp, en geç 3 iş günü içinde kapınıza teslim ediyoruz.
              </p>
              <div className="mt-4 flex justify-center">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">⚡ Ücretsiz Kargo</span>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-6 filter drop-shadow-lg">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Mükemmel Hizmet</h3>
              <p className="text-gray-600 leading-relaxed">
                7/24 müşteri hizmetlerimiz ve kolay iade politikamız ile alışveriş deneyiminizi üst seviyeye taşıyoruz.
              </p>
              <div className="mt-4 flex justify-center">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">🛡️ 30 Gün İade</span>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Yıllık Deneyim</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                <div className="text-gray-600">Mutlu Müşteri</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-gray-600">Çanta Modeli</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                <div className="text-gray-600">Memnuniyet Oranı</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            Alışverişe Başlayın
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Stilinizi yansıtan mükemmel çantayı bulmak için hemen üye olun ve özel fırsatları kaçırmayın!
          </p>
          
          <div className="bg-gray-800 p-6 rounded-lg mb-8">
            <h3 className="text-lg font-semibold mb-4">✨ Üyelik Avantajları</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>🎁 Özel İndirimler:</strong><br />
                Sadece üyelere özel %20'ye varan indirimler<br />
                <span className="text-yellow-300">→ İlk alışverişte %15 indirim</span>
              </div>
              <div>
                <strong>🚀 Hızlı Alışveriş:</strong><br />
                Kayıtlı adres ve ödeme bilgileri<br />
                <span className="text-yellow-300">→ Hızlı sepet ve sipariş takibi</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              👜 Çantaları İncele
            </Link>
            <Link
              href="/register"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Üye Ol & İndirim Kazan
            </Link>
          </div>
          
          <div className="mt-8 text-gray-400 text-sm">
            Zaten üye misiniz? <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">Giriş yapın</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
                            <p>&copy; 2024 {siteSettings?.siteName || 'Livkors'}. Tüm hakları saklıdır.</p>
            <p className="text-gray-400 text-sm mt-2">
              {siteSettings?.footerText || 'Kaliteli çantalar ve mükemmel müşteri hizmetinde öncü markayız.'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
