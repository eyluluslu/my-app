import Link from 'next/link'
import { getCurrentUser, getPublicProducts, getCartCount } from '@/lib/actions'
import AddToCartButton from '@/components/AddToCartButton'
import LogoutButton from '@/components/LogoutButton'
import ImageWithFallback from '@/components/ImageWithFallback'

export default async function ProductsPage() {
  const user = await getCurrentUser()
  const [products, cartCount] = await Promise.all([
    getPublicProducts(),
    user ? getCartCount() : Promise.resolve(0)
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl">💎</span>
                <span className="text-2xl font-bold text-yellow-500">Livkors</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-gray-900">Ana Sayfa</Link>
              <Link href="/categories" className="text-gray-700 hover:text-gray-900">Kategoriler</Link>
              <Link href="/products" className="text-blue-600 font-semibold">Ürünler</Link>
              {user && (
                <Link href="/messages" className="text-gray-700 hover:text-gray-900">Mesajlar</Link>
              )}
              <Link href="/about" className="text-gray-700 hover:text-gray-900">Hakkımızda</Link>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <Link 
                    href="/cart" 
                    className="relative text-gray-700 hover:text-gray-900 p-2"
                  >
                    🛒
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                  <span className="text-gray-600">Hoş geldin, {user.name}</span>
                  {user.role === 'ADMIN' && (
                    <Link 
                      href="/admin" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <LogoutButton />
                </>
              ) : (
              <Link 
                href="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Giriş Yap
              </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Tüm Ürünler
            </h1>
            <p className="text-xl text-gray-600">
              Kaliteli çanta koleksiyonumuzu keşfedin
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">
                Henüz ürün bulunmuyor
              </h2>
              <p className="text-gray-500 mb-6">
                Yakında yeni ürünler eklenecek.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                                     <div className="h-64 bg-gray-200 overflow-hidden">
                     <ImageWithFallback
                       src={product.imageUrl}
                       alt={product.name}
                       className="w-full h-full object-cover"
                     />
                   </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {product.category?.name}
                      </span>
                      <span className={`text-sm font-medium ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? `Stok: ${product.stock}` : 'Stokta Yok'}
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
                      {user ? (
                        <AddToCartButton 
                          productId={product.id} 
                          disabled={product.stock === 0}
                        />
                      ) : (
                        <Link
                          href="/login"
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Giriş Yap
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 