# farmacia-backend

Repositorio único y exclusivamente para el backend
PROBLEMAS CORREGIDOS

Backend

1. CORS instalado y habilitado - server.js:3,8
2. Auth.js corregido - errores de sintaxis y typos arreglados
3. Modelo User extendido - agregados email, password, role
4. Modelo Article mejorado - name, price, image, stock, category
5. Modelos Order y OrderItem creados - sistema completo de órdenes
6. Controladores implementados:

   - userController.js - register/login funcionales
   - articleController.js - CRUD completo
   - orderController.js - gestión de compras con actualización de stock

7. Rutas agregadas - /orders con todos los endpoints

Frontend

8. Servicio API creado - src/services/api.js para todas las llamadas
9. AuthModal conectado - registro y login funcionan con el backend
10. Productos dinámicos - se cargan desde el backend en Inicio.jsx
11. CartContext creado - gestión global del carrito con localStorage
12. Carrito funcional - procesa órdenes reales al backend

Base de Datos

13. Seeder actualizado - 1 producto de ejemplo (Paracetamol)

CÓMO INICIAR

Backend

cd farmacia-backend
npm run tables # Crear tablas
npm run seeders # Cargar datos de ejemplo
npm start # Puerto 3000

Frontend

cd FrontEnd/FrontFarmacia
npm run dev # Puerto 5173

FLUJO FUNCIONAL

1. Usuario se registra o inicia sesión
2. Ve el producto de ejemplo (Paracetamol $150)
3. Lo agrega al carrito
4. Va a /carrito
5. Click en "Proceder al pago"
6. Se crea la orden en el backend
7. Se actualiza el stock automáticamente

USUARIO DE PRUEBA

- Email: test@farmauy.com
- Password: 12345678
