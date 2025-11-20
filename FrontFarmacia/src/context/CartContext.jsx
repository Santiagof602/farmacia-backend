import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Cargar carrito desde localStorage al iniciar
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto al carrito
  const addToCart = (producto) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === producto.id);

      if (existingItem) {
        // Si ya existe, incrementar cantidad
        return prevItems.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregar nuevo
        return [...prevItems, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Incrementar cantidad
  const incrementarCantidad = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  // Disminuir cantidad
  const disminuirCantidad = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  // Eliminar producto
  const eliminarProducto = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Vaciar carrito
  const vaciarCarrito = () => {
    setCartItems([]);
  };

  // Calcular totales
  const calcularSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const precio = parseFloat(item.price || item.precio);
      return total + (precio * item.cantidad);
    }, 0);
  };

  const calcularEnvio = () => {
    return calcularSubtotal() >= 1000 ? 0 : 150;
  };

  const calcularTotal = () => {
    return calcularSubtotal() + calcularEnvio();
  };

  const value = {
    cartItems,
    addToCart,
    incrementarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    calcularSubtotal,
    calcularEnvio,
    calcularTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
}
