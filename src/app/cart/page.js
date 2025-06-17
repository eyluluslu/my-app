import { getCartItems } from '@/lib/actions'
import CartList from '@/components/CartList'

export default async function CartPage() {
  const cartItems = await getCartItems()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
              🛒
            </div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Sepetiniz boş
            </h2>
            <p className="text-gray-500 mb-6">
              Alışverişe başlamak için ürünleri sepetinize ekleyin.
            </p>
            <a
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Alışverişe Başla
            </a>
          </div>
        ) : (
          <CartList items={cartItems} />
        )}
      </div>
    </div>
  )
} 