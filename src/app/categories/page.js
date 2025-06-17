import Link from 'next/link'
import { getPublicCategories } from '@/lib/actions'

export default async function CategoriesPage() {
  let categories = []
  
  try {
    const result = await getPublicCategories()
    categories = result || []
    console.log('📄 Categories page - received categories:', categories.length)
    if (categories.length > 0) {
      console.log('📄 First category:', categories[0].name)
    } else {
      console.log('⚠️ No categories received')
    }
  } catch (error) {
    console.error('📄 Categories page error:', error)
    categories = []
  }
  
  // Kategoriler varsa ama boş görünüyorsa force render
  const hasCategories = Array.isArray(categories) && categories.length > 0

  function getCategoryIcon(categoryName) {
    const name = categoryName.toLowerCase()
    if (name.includes('women') || name.includes('kadın')) return '👜'
    if (name.includes('men') || name.includes('erkek')) return '🎒'
    if (name.includes('travel') || name.includes('seyahat')) return '🧳'
    if (name.includes('business') || name.includes('iş')) return '💼'
    if (name.includes('sport') || name.includes('spor')) return '🏃‍♂️'
    if (name.includes('school') || name.includes('okul')) return '🎓'
    return '👜'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              🛍️ Kategoriler
            </h1>
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Ana Sayfa
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!hasCategories ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Kategoriler yükleniyor...
            </h3>
            <p className="text-gray-600">
              Kategori verileri yüklenemedi. Sayfayı yenileyin.
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Categories count: {categories?.length || 0}</p>
              <p className="text-sm text-gray-500">Is array: {Array.isArray(categories) ? 'Yes' : 'No'}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group-hover:scale-105">
                  {/* Category Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-6xl text-white">
                      {getCategoryIcon(category.name)}
                    </div>
                  </div>
                  
                  {/* Category Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {category.description || 'Bu kategorideki ürünleri keşfedin'}
                    </p>
                    
                    {/* Product Count */}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {category._count?.products || 0} ürün
                      </span>
                      <span className="text-blue-600 group-hover:text-blue-800 font-medium text-sm">
                        Ürünleri Gör →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Ana Sayfa
              </Link>
              <Link href="/products" className="text-gray-600 hover:text-gray-900">
                Tüm Ürünler
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Giriş Yap
              </Link>
            </div>
            <div className="text-sm text-gray-500">
              © 2024 Livkors. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 