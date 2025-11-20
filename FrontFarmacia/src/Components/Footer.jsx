import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 pt-12 pb-6 mt-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Información de la empresa */}
          <div>
            <h5 className="text-xl font-bold text-green-600 mb-4">FarmaUY</h5>
            <p className="text-gray-600">
              Siempre a tu lado, cuidando de tu salud con los mejores productos y servicios.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h6 className="font-bold text-gray-800 mb-4">Enlaces rápidos</h6>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-green-600">Inicio</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600">Medicamentos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600">Cuidado personal</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600">Ofertas</a></li>
              <li><a href="#" className="text-gray-600 hover:text-green-600">Donaciones</a></li>
            </ul>
          </div>

          {/* Contacto y redes sociales */}
          <div>
            <h6 className="font-bold text-gray-800 mb-4">Contacto</h6>
            <p className="text-gray-600 mb-2">Email: contacto@farmauy.com</p>
            <p className="text-gray-600 mb-2">Tel: 092970747</p>
            <p className="text-gray-600 mb-2">Dirección Canelones 1162</p>
            <p className="text-gray-600 mb-2">Horario: Lun-Vie 8:00-19:00</p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-600 hover:text-green-700">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-green-600 hover:text-green-700">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-green-600 hover:text-green-700">
                <MessageCircle size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea final */}
        <div className="text-center pt-6 border-t border-gray-200">
          <small className="text-gray-500">&copy; 2025 FarmaUY. Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;