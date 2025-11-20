import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BannerCarrousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array de banners publicitarios
  const banners = [
    {
      id: 1,
      image: '/api/placeholder/1200/300', // Reemplazar Imagén
      alt: 'Promoción 2x1 Maquillaje',
      bgColor: 'bg-pink-200',
      link: '#'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200', // Reemplazar Imagén
      alt: '15% OFF con Scotiabank',
      bgColor: 'bg-white',
      link: '#'
    },
    {
      id: 3,
      image: '/api/placeholder/1200/300', // Reemplazar Imagén
      alt: 'Envío gratis',
      bgColor: 'bg-blue-100',
      link: '#'
    }
  ];

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor del carrusel */}
        <div className="relative h-[200px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <a href={banner.link} className="block h-full w-full">
                <div className={`h-full w-full ${banner.bgColor} flex items-center justify-center`}>
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </a>
            </div>
          ))}

          {/* Botones de navegación */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all z-10"
            aria-label="Banner anterior"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all z-10"
            aria-label="Banner siguiente"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? 'bg-green-600 w-8 h-2'
                    : 'bg-white bg-opacity-60 w-2 h-2 hover:bg-opacity-80'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCarrousel;