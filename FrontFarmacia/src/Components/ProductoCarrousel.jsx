import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Productos from './Productos';

const ProductosCarrousel = ({ title, products }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = Math.ceil(products.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const getCurrentProducts = () => {
    const start = currentSlide * 3;
    return products.slice(start, start + 3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <h3 className="text-3xl font-bold text-green-600 mb-6 text-center">{title}</h3>
      
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {getCurrentProducts().map((product, index) => (
            <Productos
              key={product.id || index}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>

        {/* Controles del carrusel */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(slidesCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-green-600 w-8' : 'bg-gray-300 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductosCarrousel;