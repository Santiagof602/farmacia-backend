import React from 'react';

function CuidadoPersonal() {
  const productos = [
    { id: 1, name: 'Shampoo Anticaspa', marca: 'Head & Shoulders', price: '499' },
    { id: 2, name: 'Crema Dental Whitening', marca: 'Colgate', price: '450' },
    { id: 3, name: 'Desodorante 48h', marca: 'Dove', price: '675' },
    { id: 4, name: 'Jabón Líquido Antibacterial', marca: 'Protex', price: '525' },
    { id: 5, name: 'Crema Hidratante', marca: 'Nivea', price: '1100' },
    { id: 6, name: 'Protector Solar FPS 50', marca: 'Eucerin', price: '899' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cuidado Personal</h1>
      <p className="text-gray-600 mb-8">Productos para tu higiene y cuidado diario</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map(prod => (
          <div key={prod.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Imagen del producto</span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{prod.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{prod.marca}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">${prod.price}</p>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CuidadoPersonal;