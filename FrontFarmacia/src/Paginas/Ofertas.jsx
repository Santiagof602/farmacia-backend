// pages/Ofertas.jsx
// pages/Ofertas.jsx
import React from 'react';

function Ofertas() {
  const ofertas = [
    { id: 1, name: 'Pack Vitaminas C + D', price: '2499', descuento: '30%', precioAnterior: '3599' },
    { id: 2, name: 'Protector Solar FPS 50', price: '1399', descuento: '25%', precioAnterior: '1899' },
    { id: 3, name: 'Kit Dental Completo', price: '1599', descuento: '40%', precioAnterior: '2699' },
    { id: 4, name: 'Suplemento Omega 3', price: '1999', descuento: '35%', precioAnterior: '3099' },
    { id: 5, name: 'Multivitamínico 60 tabs', price: '899', descuento: '20%', precioAnterior: '1125' },
    { id: 6, name: 'Crema Facial Anti-Edad', price: '2199', descuento: '45%', precioAnterior: '3999' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Ofertas Especiales</h1>
      <p className="text-gray-600 mb-8">Aprovecha nuestras mejores promociones</p>
      
      <div className="bg-yellow-50 border-2 border-yellow-400 p-4 rounded-lg mb-8"> 
        <h3 className="text-xl font-bold mb-2">⏰ Ofertas válidas por tiempo limitado</h3>
        <p className="text-gray-700">No te pierdas estos increíbles descuentos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ofertas.map(oferta => (
          <div key={oferta.id} className="bg-white rounded-lg shadow-md p-6 border-2 border-red-500 relative hover:shadow-lg transition-shadow">
            <span className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{oferta.descuento}
            </span>
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Oferta</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">{oferta.name}</h3>
            <p className="text-sm text-gray-500 line-through mb-1">Antes: ${oferta.precioAnterior}</p>
            <p className="text-3xl font-bold text-red-500 mb-4">Ahora: ${oferta.price}</p>
            <button className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors font-semibold">
              ¡Aprovechar Oferta!
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ofertas;