// Configuración base de la API
const API_URL = 'http://localhost:3000';

// Función helper para hacer peticiones
async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }

  return data;
}

// Servicios de autenticación
export const authService = {
  // Registrar nuevo usuario
  register: async (userData) => {
    return await fetchAPI('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // Login de usuario
  login: async (credentials) => {
    return await fetchAPI('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
};

// Servicios de artículos/productos
export const articleService = {
  // Obtener todos los artículos
  getAll: async () => {
    return await fetchAPI('/articles');
  },

  // Obtener un artículo por ID
  getById: async (id) => {
    return await fetchAPI(`/articles/${id}`);
  },

  // Crear un nuevo artículo (admin)
  create: async (articleData) => {
    return await fetchAPI('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  },

  // Actualizar un artículo (admin)
  update: async (id, articleData) => {
    return await fetchAPI(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(articleData),
    });
  },

  // Eliminar un artículo (admin)
  delete: async (id) => {
    return await fetchAPI(`/articles/${id}`, {
      method: 'DELETE',
    });
  },
};

// Servicios de órdenes/compras
export const orderService = {
  // Obtener todas las órdenes de un usuario
  getByUser: async (userId) => {
    return await fetchAPI(`/orders?userId=${userId}`);
  },

  // Obtener una orden específica
  getById: async (id) => {
    return await fetchAPI(`/orders/${id}`);
  },

  // Crear una nueva orden (realizar compra)
  create: async (orderData) => {
    return await fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Actualizar estado de una orden
  updateStatus: async (id, status) => {
    return await fetchAPI(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  // Cancelar una orden
  cancel: async (id) => {
    return await fetchAPI(`/orders/${id}`, {
      method: 'DELETE',
    });
  },
};

export default {
  authService,
  articleService,
  orderService,
};
