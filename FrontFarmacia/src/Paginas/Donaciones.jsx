import React from 'react';

function Donaciones() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Donaciones</h1>
      <p className="text-gray-600 mb-8">Aqui podras ver a toda la gente que se pudo ayudar, gracias a tu compra.</p>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">¿Cómo donar?</h2>
        <ol className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
            <span>Verifica que los medicamentos estén en buen estado y vigentes</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
            <span>Empaqueta los productos de manera segura</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
            <span>Acércate a nuestras sucursales o agenda una recolección</span>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">4</span>
            <span>Recibe tu comprobante de donación</span>
          </li>
        </ol>
      </div>

      <h2 className="text-2xl font-bold mb-4">Local</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Local del Centro</h3>
          <p className="text-gray-600 mb-2">📍 Dirección: Canelones 1162 </p>
          <p className="text-gray-600 mb-2">📞 Teléfono: 092970747</p>
          <p className="text-gray-600">🕐 Horario: Lun-Vie 8:00-19:00</p>
        </div>
      </div>
    </div>
  );
}

export default Donaciones;