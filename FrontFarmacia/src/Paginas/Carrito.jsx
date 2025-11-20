// src/Paginas/Carrito.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/api';

const Carrito = () => {
  const {
    cartItems,
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    calcularSubtotal,
    calcularEnvio,
    calcularTotal,
  } = useCart();

  // Función para proceder al pago
  const procederAlPago = async () => {
    if (cartItems.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    // Verificar si hay usuario logueado
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Debes iniciar sesión para realizar una compra');
      return;
    }

    const user = JSON.parse(userStr);

    try {
      // Preparar items para la orden
      const orderItems = cartItems.map(item => ({
        articleId: item.id,
        quantity: item.cantidad
      }));

      // Crear orden en el backend
      const response = await orderService.create({
        userId: user.id,
        items: orderItems
      });

      alert('¡Orden creada exitosamente! ID de orden: ' + response.order.id);

      // Vaciar carrito después de crear la orden
      vaciarCarrito();
    } catch (error) {
      alert(`Error al crear la orden: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Volver a la tienda
          </Link>
          <h1 className="text-4xl font-bold text-gray-800">Tu Carrito</h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length === 0
              ? 'Tu carrito está vacío'
              : `${cartItems.length} producto${cartItems.length !== 1 ? 's' : ''} en tu carrito`}
          </p>
        </div>

        {/* Contenido principal */}
        {cartItems.length === 0 ? (
          // Carrito vacío
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <ShoppingBag size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8">
              Agrega productos a tu carrito para comenzar tu compra
            </p>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Explorar productos
            </Link>
          </div>
        ) : (
          // Carrito con productos
          <div className="grid lg:grid-cols-3 gap-8">

            {/* Lista de productos */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Imagen del producto */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Información del producto */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">
                            {item.name}
                          </h3>
                        </div>
                        <button
                          onClick={() => eliminarProducto(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors p-2"
                          aria-label="Eliminar producto"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        {/* Control de cantidad */}
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">Cantidad:</span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => disminuirCantidad(item.id)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                              disabled={item.cantidad <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-semibold">
                              {item.cantidad}
                            </span>
                            <button
                              onClick={() => incrementarCantidad(item.id)}
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Precio */}
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            ${item.price} c/u
                          </p>
                          <p className="text-xl font-bold text-green-600">
                            ${(parseFloat(item.price) * item.cantidad).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen del pedido */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Resumen del pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${calcularSubtotal().toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="font-semibold">
                      {calcularEnvio() === 0 ? (
                        <span className="text-green-600">¡Gratis!</span>
                      ) : (
                        `$${calcularEnvio()}`
                      )}
                    </span>
                  </div>

                  {calcularSubtotal() < 1000 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700">
                        💡 Agrega ${(1000 - calcularSubtotal()).toFixed(2)} más para envío gratis
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-800">Total</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${calcularTotal().toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={procederAlPago}
                  className="w-full py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transform hover:-translate-y-1 transition-all shadow-lg mb-4"
                >
                  Proceder al pago
                </button>

                <Link
                  to="/"
                  className="block w-full py-3 text-center border border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
                >
                  Seguir comprando
                </Link>

                {/* Métodos de pago */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Aceptamos:</p>
                  <div className="flex gap-2 flex-wrap">
                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-700">
                      💳 Tarjeta
                    </div>
                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-700">
                      💵 Efectivo
                    </div>
                    <div className="px-3 py-2 bg-gray-100 rounded text-xs font-semibold text-gray-700">
                      📱 MercadoPago
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Entrega en 24-48 horas</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Garantía de calidad</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Compra 100% segura</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner promocional */}
        {cartItems.length > 0 && (
          <div className="mt-12 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold mb-2">¿Necesitas algo más?</h3>
              <p className="mb-4">
                Aprovecha nuestras ofertas especiales en productos seleccionados
              </p>
              <Link
                to="/ofertas"
                className="inline-block px-6 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Ver ofertas
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
