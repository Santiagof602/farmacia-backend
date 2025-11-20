// src/Components/AuthModal.jsx
import React, { useState } from 'react';
import { authService } from '../services/api';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      // Llamada al backend
      const response = await authService.login({
        email: formData.email,
        password: formData.password
      });

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.user));

      alert(`¡Bienvenido de nuevo, ${response.user.firstname}!`);

      // Limpia el formulario y lo cierra
      resetForm();
      onClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!formData.agreeTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    if (formData.password.length < 8) {
      alert('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    try {
      // Separar nombre completo en firstname y lastname
      const nameParts = formData.name.trim().split(' ');
      const firstname = nameParts[0];
      const lastname = nameParts.slice(1).join(' ') || nameParts[0];

      // Llamada al backend
      const response = await authService.register({
        firstname,
        lastname,
        email: formData.email,
        password: formData.password
      });

      // Guardar usuario en localStorage
      localStorage.setItem('user', JSON.stringify(response.user));

      alert(`¡Cuenta creada exitosamente! Bienvenido, ${response.user.firstname}!`);

      // Limpia el formulario y cierra el modal
      resetForm();
      onClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      rememberMe: false,
      agreeTerms: false
    });
  };

  const switchForm = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  // Si el modal no está abierto, no renderizar nada
  if (!isOpen) return null;

  return (
    <>
      {/* Tiempo de carga del modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      >
        {/* Contenedor del modal */}
        <div 
          className="relative w-[90%] max-w-md p-8 bg-white rounded-2xl shadow-2xl animate-slideUp overflow-y-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600 hover:rotate-90 transition-all duration-300 z-10"
            aria-label="Cerrar modal"
          >
            ×
          </button>

          {/* Formulario de Login */}
          {isLogin ? (
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-2 text-green-600">
                Iniciar sesión
              </h2>
              <p className="text-gray-600 mb-6">Bienvenido a FarmaUY</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="login-email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="farmauy@correo.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-gray-700 font-medium mb-2">
                    Contraseña
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="cursor-pointer accent-green-600"
                    />
                    Recordarme
                  </label>
                  <button 
                    type="button"
                    className="text-green-600 text-sm hover:text-green-700 transition-colors"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                >
                  Iniciar Sesión
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm mt-6">
                ¿No tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={switchForm} 
                  className="text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  Regístrate aquí
                </button>
              </p>
            </div>
          ) : (
            /* Formulario de Registro */
            <div className="animate-fadeIn">
              <h2 className="text-3xl font-bold mb-2 text-green-600">
                Crear Cuenta
              </h2>
              <p className="text-gray-600 mb-6">Únete a FarmaUY hoy</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="register-name" className="block text-gray-700 font-medium mb-2">
                    Nombre Completo
                  </label>
                  <input
                    id="register-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Juan Nanio"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="register-email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="farmauy@correo.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="register-password" className="block text-gray-700 font-medium mb-2">
                    Contraseña
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    required
                    minLength="8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                  <small className="block mt-1 text-gray-500 text-xs">Mínimo 8 caracteres</small>
                </div>

                <div>
                  <label className="flex items-start gap-2 text-gray-600 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleInputChange}
                      required
                      className="mt-0.5 cursor-pointer accent-green-600"
                    />
                    <span>
                      Acepto los{' '}
                      <button 
                        type="button"
                        className="text-green-600 hover:text-green-700"
                      >
                        Términos y Condiciones
                      </button>
                      {' '}y la{' '}
                      <button 
                        type="button"
                        className="text-green-600 hover:text-green-700"
                      >
                        Política de Privacidad
                      </button>
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleRegister}
                  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-md"
                >
                  Crear Cuenta
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm mt-6">
                ¿Ya tienes cuenta?{' '}
                <button 
                  type="button"
                  onClick={switchForm} 
                  className="text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  Inicia sesión
                </button>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Estilos de animaciones */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default AuthModal;