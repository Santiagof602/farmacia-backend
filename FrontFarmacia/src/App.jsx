// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

// Importa tus páginas
import Inicio from './Paginas/Inicio';
import Medicamentos from './Paginas/Medicamentos';
import CuidadoPersonal from './Paginas/CuidadoPersonal';
import Donaciones from './Paginas/Donaciones';
import Ofertas from './Paginas/Ofertas';
import Carrito from './Paginas/Carrito';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">

          {/* NavBar siempre visible */}
          <NavBar />

          {/* Contenido principal que cambia según la ruta */}
          <main>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/medicamentos" element={<Medicamentos />} />
              <Route path="/cuidado-personal" element={<CuidadoPersonal />} />
              <Route path="/donaciones" element={<Donaciones />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </main>

          {/* Footer siempre visible */}
          <Footer />

        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;