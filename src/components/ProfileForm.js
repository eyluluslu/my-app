'use client'

import { useState, useEffect } from 'react'
import { updateProfile, updatePassword } from '@/lib/actions'

export default function ProfileForm({ user }) {
  const [isEditing, setIsEditing] = useState(true) // TEST: Zorla true
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || ''
  })

  console.log('🔍 ProfileForm Render:', { isEditing, userName: user.name, userEmail: user.email })

  // User prop değiştiğinde formData'yı güncelle
  useEffect(() => {
    setFormData({
      name: user.name || '',
      email: user.email || ''
    })
    console.log('ProfileForm: User prop değişti, form data güncellendi:', { name: user.name, email: user.email })
  }, [user.name, user.email])
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    console.log('ProfileForm: Güncelleme başlıyor...', formData)
    console.log('ProfileForm: Mevcut user verisi:', { name: user.name, email: user.email })

    // Client-side validation
    if (!formData.name?.trim()) {
      setMessage('Ad soyad boş olamaz')
      setLoading(false)
      return
    }

    if (!formData.email?.trim()) {
      setMessage('E-posta adresi boş olamaz')
      setLoading(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setMessage('Geçerli bir e-posta adresi girin')
      setLoading(false)
      return
    }

    try {
      const result = await updateProfile(formData)
      
      console.log('ProfileForm: Sunucu yanıtı:', result)
      
      if (result.success) {
        setMessage('Profil başarıyla güncellendi!')
        setIsEditing(false)
        // Sayfayı yenile
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      } else {
        setMessage(result.error || 'Güncelleme sırasında hata oluştu')
      }
    } catch (error) {
      console.error('ProfileForm: Hata:', error)
      setMessage('Bağlantı hatası: ' + error.message)
    }
    
    setLoading(false)
  }

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value
    }
    setFormData(newFormData)
    console.log('ProfileForm: Form değişti:', newFormData)
  }

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || ''
    })
    setIsEditing(false)
    setMessage('')
    console.log('ProfileForm: İptal edildi, form data sıfırlandı:', { name: user.name, email: user.email })
  }

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage('Tüm şifre alanları doldurulmalıdır')
      setLoading(false)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Yeni şifre ve onay şifresi eşleşmiyor')
      setLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage('Yeni şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    console.log('ProfileForm: Şifre değiştirme başlıyor...', {
      currentPassword: '***',
      newPassword: '***',
      confirmPassword: '***'
    })

    try {
      const result = await updatePassword(passwordData)
      
      console.log('ProfileForm: Şifre değiştirme yanıtı:', result)
      
      if (result.success) {
        setMessage('Şifre başarıyla değiştirildi!')
        setIsChangingPassword(false)
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
      } else {
        setMessage(result.error || 'Şifre değiştirme sırasında hata oluştu')
      }
    } catch (error) {
      console.error('ProfileForm: Şifre değiştirme hatası:', error)
      setMessage('Bağlantı hatası: ' + error.message)
    }
    
    setLoading(false)
  }

  const handlePasswordCancel = () => {
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
    setIsChangingPassword(false)
    setMessage('')
  }

  return (
    <div>
      {message && (
        <div className={`p-4 rounded-lg mb-6 border-l-4 ${
          message.includes('başarıyla') 
            ? 'bg-green-50 text-green-950 border border-green-200 border-l-green-700 font-bold' 
            : 'bg-amber-50 text-amber-950 border border-amber-200 border-l-amber-700 font-bold'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Ad Soyad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ad Soyad
            </label>
            {(() => {
              console.log('ProfileForm: Ad alanı render - isEditing:', isEditing)
              return isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adınız ve soyadınız"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {user.name}
                </div>
              )
            })()}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-posta Adresi
            </label>
            {(() => {
              console.log('ProfileForm: Email alanı render - isEditing:', isEditing)
              return isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E-posta adresiniz"
                />
              ) : (
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                  {user.email}
                </div>
              )
            })()}
          </div>

          {/* Kullanıcı ID (Sadece Görüntüleme) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kullanıcı ID
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 text-sm font-mono">
              {user.id}
            </div>
          </div>

          {/* Üyelik Tarihi (Sadece Görüntüleme) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Üyelik Tarihi
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {new Date(user.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Son Güncelleme (Sadece Görüntüleme) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Son Güncelleme
            </label>
            <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
              {new Date(user.updatedAt).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>

          {/* Butonlar */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            {(() => {
              console.log('ProfileForm: Buton alanı render - isEditing:', isEditing)
              return isEditing
            })() ? (
              <>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? '⏳ Güncelleniyor...' : '💾 Kaydet'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ❌ İptal
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    console.log('ProfileForm: Düzenle butonuna tıklandı, isEditing:', isEditing, '→ true')
                    setIsEditing(true)
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  ✏️ Düzenle
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingPassword(true)}
                  className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  🔑 Şifre Değiştir
                </button>
              </>
            )}
          </div>
        </div>
      </form>

      {/* Şifre Değiştirme Modal */}
      {isChangingPassword && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Şifre Değiştir</h3>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Mevcut şifrenizi girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yeni şifrenizi girin (en az 6 karakter)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yeni Şifre Onay
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Yeni şifrenizi tekrar girin"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Değiştiriliyor...' : 'Şifre Değiştir'}
                </button>
                <button
                  type="button"
                  onClick={handlePasswordCancel}
                  disabled={loading}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
} 