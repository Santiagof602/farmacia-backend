import React from 'react';
import { useCart } from '../context/CartContext';

const Productos = ({ id, image, name, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, image, name, price });
    alert(`${name} agregado al carrito`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="flex justify-center items-center p-4">
        <img src={image} alt={name} className="h-32 w-32 object-contain" />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h5 className="font-semibold text-gray-800 mb-2 text-center">{name}</h5>
        <p className="text-gray-500 text-center mb-4">UYU {price}</p>
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Productos;