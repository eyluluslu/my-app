'use client'

import { useState, useActionState } from 'react'
import { updateCartItemQuantity, removeFromCart, clearCart } from '@/lib/actions'
import Image from 'next/image'

export default function CartList({ items }) {
  const [updateState, updateAction] = useActionState(updateCartItemQuantity, {})
  const [clearState, clearAction] = useActionState(clearCart, {})
  
  // Toplam hesaplama
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleRemoveItem = async (cartItemId) => {
    if (confirm('Bu ürünü sepetten çıkarmak istediğinizden emin misiniz?')) {
      await removeFromCart(cartItemId)
    }
  }

  const handleClearCart = () => {
    if (confirm('Sepetteki tüm ürünleri silmek istediğinizden emin misiniz?')) {
      clearAction()
    }
  }

  return (
    <div className="space-y-6">
      {/* Sepet Özeti */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-600">Toplam {totalItems} ürün</span>
            <h2 className="text-2xl font-bold text-gray-900">₺{total.toFixed(2)}</h2>
          </div>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Sepeti Temizle
          </button>
        </div>
      </div>

      {/* Mesajlar */}
      {updateState.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{updateState.error}</p>
        </div>
      )}
      
      {updateState.success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800">{updateState.success}</p>
        </div>
      )}

      {clearState.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{clearState.error}</p>
        </div>
      )}

      {clearState.success && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <p className="text-green-800">{clearState.success}</p>
        </div>
      )}

      {/* Sepet Öğeleri */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              {/* Ürün Resmi */}
              <div className="flex-shrink-0">
                {item.product.imageUrl ? (
                  <div className="relative w-20 h-20">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="rounded-lg object-cover"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-lg">
                    <span className="text-xs text-gray-500">Resim Yok</span>
                  </div>
                )}
              </div>

              {/* Ürün Bilgileri */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {item.product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.product.category.name}
                </p>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  ₺{item.product.price.toFixed(2)}
                </p>
              </div>

              {/* Miktar Kontrolü */}
              <div className="flex items-center space-x-2">
                <form action={updateAction} className="flex items-center space-x-2">
                  <input type="hidden" name="cartItemId" value={item.id} />
                  <label htmlFor={`quantity-${item.id}`} className="text-sm text-gray-600">
                    Adet:
                  </label>
                  <select
                    id={`quantity-${item.id}`}
                    name="quantity"
                    defaultValue={item.quantity}
                    onChange={(e) => {
                      const form = e.target.closest('form')
                      if (form) {
                        const formData = new FormData(form)
                        updateAction(formData)
                      }
                    }}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[...Array(Math.min(item.product.stock, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </form>
              </div>

              {/* Ara Toplam */}
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  ₺{(item.product.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium mt-1"
                >
                  Kaldır
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Satın Alma Butonu */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-900">Toplam Tutar:</span>
          <span className="text-2xl font-bold text-gray-900">₺{total.toFixed(2)}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Satın Al
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Satın alma işlemi demo amaçlı çalışmamaktadır
        </p>
      </div>
    </div>
  )
} 