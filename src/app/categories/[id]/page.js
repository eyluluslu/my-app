import Link from 'next/link'
import { getProductsByCategory } from '@/lib/actions'
import { getCurrentUser, getCartCount } from '@/lib/actions'
import ImageWithFallback from '@/components/ImageWithFallback'
import AddToCartButton from '@/components/AddToCartButton'

export default async function CategoryPage({ params }) {
  const [products, user] = await Promise.all([
    getProductsByCategory(params.id),
    getCurrentUser()
  ])
  
  const cartCount = user ? await getCartCount() : 0

  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bu kategoride ürün bulunamadı
          </h1>
          <p className="text-gray-600 mb-6">
            Lütfen başka kategorileri kontrol edin
          </p>
          <Link
            href="/categories"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kategorilere Dön
          </Link>
        </div>
      </div>
    )
  }

  const categoryName = products[0]?.category?.name || 'Kategori'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-4">
                  <li>
                    <Link href="/" className="text-gray-500 hover:text-gray-700">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li>
                    <Link href="/categories" className="text-gray-500 hover:text-gray-700">
                      Kategoriler
                    </Link>
                  </li>
                  <li>
                    <svg className="flex-shrink-0 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li>
                    <span className="text-gray-900 font-medium">{categoryName}</span>
                  </li>
                </ol>
              </nav>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {categoryName}
              </h1>
            </div>
            
            {user && (
              <Link href="/cart" className="relative">
                <span className="sr-only">Sepet</span>
                <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1 5a1 1 0 001 1h9a1 1 0 001-1v-4M9 21h6" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {products.length} ürün bulundu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="h-64 bg-gray-200 overflow-hidden">
                <ImageWithFallback
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    ₺{product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stok: {product.stock}
                  </span>
                </div>
                
                {user ? (
                  <AddToCartButton 
                    productId={product.id} 
                    disabled={product.stock === 0}
                    className="w-full"
                  />
                ) : (
                  <Link
                    href="/login"
                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center"
                  >
                    Giriş Yap
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 