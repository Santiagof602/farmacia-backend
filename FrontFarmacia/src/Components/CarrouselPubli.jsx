import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarrouselPubli = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array de slides publicitarios
  const slides = [
    {
      id: 1,
      title: '¡MEGA OFERTAS hasta 50% OFF!',
      subtitle: '35% OFF en seleccionados',
      description: 'de cuidado capilar',
      buttonText: '¡Quiero!',
      bgColor: 'bg-pink-200',
      textColor: 'text-gray-900',
      image: 'link_a_la_imagen_1' // Reemplazar con tu imagen
    },
    {
      id: 2,
      title: '¡Cuida tu salud!',
      subtitle: '20% OFF',
      description: 'en vitaminas y suplementos',
      buttonText: 'Ver ofertas',
      bgColor: 'bg-blue-100',
      textColor: 'text-gray-900',
      image: '/api/placeholder/400/300'
    },
    {
      id: 3,
      title: 'Envío Gratis',
      subtitle: 'En compras',
      description: 'mayores a $1000',
      buttonText: 'Comprar ahora',
      bgColor: 'bg-green-100',
      textColor: 'text-gray-900',
      image: '/api/placeholder/400/300'
    }
  ];

  // Auto-play del carrusel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-[400px] md:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full w-full ${slide.bgColor} flex items-center justify-center`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Texto */}
                  <div className={`${slide.textColor} space-y-4`}>
                    <h2 className="text-4xl md:text-6xl font-bold">
                      {slide.title}
                    </h2>
                    <div className="space-y-2">
                      <p className="text-5xl md:text-7xl font-black">
                        {slide.subtitle}
                      </p>
                      <p className="text-2xl md:text-3xl">
                        {slide.description}
                      </p>
                    </div>
                    <button className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold shadow-lg">
                      {slide.buttonText}
                    </button>
                  </div>

                  {/* Imagen */}
                  <div className="flex justify-center">
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="max-h-80 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={28} className="text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all z-10"
        aria-label="Slide siguiente"
      >
        <ChevronRight size={28} className="text-gray-800" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all rounded-full ${
              index === currentSlide
                ? 'bg-green-600 w-8 h-3'
                : 'bg-white bg-opacity-60 w-3 h-3 hover:bg-opacity-80'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarrouselPubli;