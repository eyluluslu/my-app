'use client'

import { useState } from 'react'

export default function ImageWithFallback({ 
  src, 
  alt, 
  className = '', 
  fallbackText = 'Resim Yok',
  errorText = 'Resim Yüklenemedi',
  ...props 
}) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Eğer src yoksa veya hata varsa fallback göster
  if (!src || imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`} {...props}>
        <span className="text-gray-500 text-sm">
          {!src ? fallbackText : errorText}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      onLoad={() => setImageLoaded(true)}
      {...props}
    />
  )
} 