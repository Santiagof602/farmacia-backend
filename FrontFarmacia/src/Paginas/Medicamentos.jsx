import React from 'react';

function Medicamentos() {
  const medicamentos = [
    { id: 1, image: 'imgg/Para.webp', name: 'Paracetamol 500mg', price: '300', stock: 'Disponible' },
    { id: 2, image: 'imgg/Ibu.webp', name: 'Ibuprofeno 400mg', price: '250', stock: 'Disponible' },
    { id: 3, image: 'imgg/amox.webp', name: 'Amoxicilina 500mg', price: '320', stock: 'Bajo stock' },
    { id: 4, image: 'imgg/Omep.jpg', name: 'Omeprazol 20mg', price: '230', stock: 'Disponible' },
    { id: 5, image: 'imgg/Loratra.webp', name: 'Loratadina 10mg', price: '199', stock: 'Disponible' },
    { id: 6, image: 'imgg/Redoxon.webp', name: 'Redoxon Naranja 1g', price: '100', stock: 'Disponible' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Medicamentos</h1>
      <p className="text-gray-600 mb-8">Encuentra los medicamentos que necesitas</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicamentos.map(med => (
          <div key={med.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <img src={med.image} alt={med.name} className="w-full h-48 object-contain mb-4" />
            <h3 className="text-lg font-semibold mb-2">{med.name}</h3>
            <p className="text-2xl font-bold text-blue-600 mb-2">${med.price}</p>
            <p className="text-sm text-gray-600 mb-4">Estado: {med.stock}</p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Medicamentos;