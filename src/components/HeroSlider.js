'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSlider({ banners }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const activeBanners = banners.filter(banner => banner.isActive)

  useEffect(() => {
    if (activeBanners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length)
    }, 5000) // 5 saniyede bir değiş

    return () => clearInterval(interval)
  }, [activeBanners.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeBanners.length) % activeBanners.length)
  }

  if (activeBanners.length === 0) {
    // Varsayılan banner
    return (
      <div className="relative h-[600px] bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent transform rotate-12 scale-150"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/10 to-transparent transform -rotate-12 scale-150"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>
        
        <div className="text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">Özel Tasarım Çantalar</h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md max-w-3xl mx-auto">Her tarza uygun kaliteli çantalar. Kadın, erkek ve özel koleksiyonlar.</p>
          <Link 
            href="/products" 
            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Ürünleri İncele
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Banner Slides */}
      {activeBanners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="relative h-full">
            <Image
              src={banner.imageUrl}
              alt={banner.title}
              fill
              className="object-cover transform scale-105 transition-transform duration-[6000ms] hover:scale-110"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
            {/* Additional Pattern Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50"></div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4 relative z-10">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl animate-fade-in-up">
                {banner.title}
              </h1>
              {banner.subtitle && (
                <h2 className="text-2xl md:text-3xl mb-6 drop-shadow-xl animate-fade-in-up delay-200">
                  {banner.subtitle}
                </h2>
              )}
              {banner.description && (
                <p className="text-lg md:text-xl mb-8 drop-shadow-lg max-w-3xl mx-auto opacity-90 animate-fade-in-up delay-300">
                  {banner.description}
                </p>
              )}
              {banner.buttonText && banner.buttonLink && (
                <Link 
                  href={banner.buttonLink} 
                  className="bg-white text-gray-800 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl inline-block animate-fade-in-up delay-500"
                  onClick={() => {
                    console.log('Banner button clicked:', {
                      title: banner.title,
                      buttonText: banner.buttonText,
                      buttonLink: banner.buttonLink,
                      isValidUrl: banner.buttonLink.startsWith('http') || banner.buttonLink.startsWith('/')
                    });
                  }}
                >
                  {banner.buttonText}
                </Link>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 