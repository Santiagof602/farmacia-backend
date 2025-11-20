// src/Components/NavBar.jsx
// src/Components/NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import AuthModal from '../Paginas/AuthModal';

// Componente Navbar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
    setIsOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-green-600">
                FarmaUY
              </Link>
            </div>

            {/* Menu PC */}
            <div className="hidden lg:flex space-x-8">
              <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors">
                Inicio
              </Link>
              <Link to="/medicamentos" className="text-gray-700 hover:text-green-600 transition-colors">
                Medicamentos
              </Link>
              <Link to="/cuidado-personal" className="text-gray-700 hover:text-green-600 transition-colors">
                Cuidado personal
              </Link>
              <Link to="/ofertas" className="text-gray-700 hover:text-green-600 transition-colors">
                Ofertas
              </Link>
              <Link to="/donaciones" className="text-red-700 hover:text-green-600 transition-colors">
                Donaciones
              </Link>
            </div>

            {/* Botones PC */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* ← BOTÓN DEL CARRITO COMO LINK */}
              <Link 
                to="/carrito"
                className="flex items-center px-4 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors"
              >
                <ShoppingCart size={18} className="mr-2" />
                Carrito
              </Link>
              
              <button 
                onClick={openAuthModal}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <User size={18} className="mr-2" />
                Iniciar sesión
              </button>
            </div>

            {/* Boton del celu */}
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu desde el celu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/medicamentos" 
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Medicamentos
              </Link>
              <Link 
                to="/cuidado-personal" 
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cuidado personal
              </Link>
              <Link 
                to="/ofertas" 
                className="block px-3 py-2 text-gray-700 hover:bg-green-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Ofertas
              </Link>
              <Link 
                to="/donaciones" 
                className="block px-3 py-2 text-red-700 hover:bg-green-50 rounded"
                onClick={() => setIsOpen(false)}
              >
                Donaciones
              </Link>
              
              {/* ← Link del boton del carrito, desde el celu. */}
              <Link 
                to="/carrito"
                className="block w-full mt-2 px-3 py-2 border border-green-600 text-green-600 rounded hover:bg-green-50"
                onClick={() => setIsOpen(false)}
              >
                🛒 Carrito
              </Link>
              
              <button 
                onClick={openAuthModal}
                className="w-full mt-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        )}
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
      />
    </>
  );
};

export default Navbar;