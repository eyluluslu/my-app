import Navigation from '@/components/Navigation'
import HeroSlider from '@/components/HeroSlider'
import Newsletter from '@/components/Newsletter'

export const dynamic = 'force-dynamic'

// Static data for reliable deployment
const heroBanners = [
  {
    id: 1,
    title: "Livkors'a Hoş Geldiniz",
    subtitle: "En kaliteli çantalar burada!",
    image: "/images/hero1.jpg",
    buttonText: "Ürünleri Keşfet",
    buttonUrl: "/products"
  }
]

const categories = [
  { id: 1, name: "Kadın Çantaları", slug: "kadin-cantalari", image: "/images/category1.jpg" },
  { id: 2, name: "Erkek Çantaları", slug: "erkek-cantalari", image: "/images/category2.jpg" },
  { id: 3, name: "Sırt Çantaları", slug: "sirt-cantalari", image: "/images/category3.jpg" }
]

const featuredProducts = [
  {
    id: 1,
    name: "Kadın El Çantası",
    price: 299.99,
    image: "/images/product1.jpg",
    category: { name: "Kadın Çantaları" }
  },
  {
    id: 2,
    name: "Erkek Omuz Çantası", 
    price: 199.99,
    image: "/images/product2.jpg",
    category: { name: "Erkek Çantaları" }
  },
  {
    id: 3,
    name: "Laptop Çantası",
    price: 349.99,
    image: "/images/product3.jpg",
    category: { name: "Sırt Çantaları" }
  },
  {
    id: 4,
    name: "Spor Çantası",
    price: 159.99,
    image: "/images/product4.jpg",
    category: { name: "Spor" }
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <HeroSlider banners={heroBanners} />
      
      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Kategoriler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group cursor-pointer">
                <div className="relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-semibold text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Öne Çıkan Ürünler
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-white/50 text-sm">Ürün Görseli</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-blue-400 font-bold text-xl mb-1">
                    ₺{product.price}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {product.category?.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-400 text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Hızlı Kargo</h3>
              <p className="text-slate-400">24 saat içinde kargoya teslim</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-400 text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Kalite Garantisi</h3>
              <p className="text-slate-400">2 yıl garanti</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-400 text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Güvenli Ödeme</h3>
              <p className="text-slate-400">SSL sertifikalı ödeme</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}
