---

### Usuario Admin (para testing)

El seeder ahora crea un usuario admin de forma idempotente. Credenciales de prueba:

- Email: `admin@farmauy.com`
- Password: `12345678`

Usá este usuario para probar endpoints protegidos por rol admin (crear/editar/eliminar artículos y categorías). Recordá ejecutar:

```bash
npm run seeders
```

## Comandos de testeo (rápidos)

Estos comandos automatizan pruebas básicas del backend (login admin, crear artículo, crear/cancelar órdenes).

- `npm run test:admin` — ejecuta `scripts/test_admin.js`: hace login con `admin@farmauy.com` y crea un artículo de prueba.
- `npm run test:orders` — ejecuta `scripts/test_orders.js`: hace login con `test@farmauy.com`, crea una orden y luego la cancela (propietario).

Recomendación (PowerShell):
```powershell
cd backend
# Inicia el servidor (en otra terminal o background):
npm start
# En esta terminal ejecutá los tests:
npm run test:admin
# y/o
npm run test:orders
```

Si preferís arrancar el servidor en background desde PowerShell (como lo hice yo durante las pruebas), podés usar:
```powershell
Start-Job -ScriptBlock { cd "C:\ruta\a\tu\proyecto\backend"; npm start }
```

Los scripts asumen que el servidor está corriendo en `http://localhost:3000` y que los seeders ya se ejecutaron (`npm run seeders`).

### Configurar variables de entorno (.env)

Para que tus compañeros puedan levantar el backend rápidamente, incluimos un archivo de ejemplo `.env.example` en `backend/`.

Pasos:

1. Copiar el archivo ejemplo a `.env`:

```powershell
cd backend
copy .env.example .env
```

2. Editar `.env` y completar los valores según tu entorno local (usuario/contraseña de MySQL y `JWT_SECRET`).

3. No subir el archivo `.env` al repositorio (ya está en `.gitignore`).

Variables principales a completar:

- `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` — para conectar a MySQL
- `JWT_SECRET` — cadena secreta para firmar tokens (usar un valor seguro)

4. Luego ejecutar:

```powershell
npm run seeders
npm start
```

Con esto cualquier compañero podrá levantar la API localmente y usar el user admin de prueba.


## Guía rápida: Probar Login y Registro (Postman/curl)

### Registro de usuario

**POST** http://localhost:3000/users/register

Body (JSON):
```json
{
   "firstname": "Juan",
   "lastname": "Pérez",
   "email": "juan@mail.com",
   "password": "12345678"
}
```

**Respuesta exitosa:**
```json
{
   "message": "Usuario creado exitosamente",
   "user": { ... },
   "token": "...JWT..."
}
```

### Login de usuario

**POST** http://localhost:3000/users/login

Body (JSON):
```json
{
   "email": "juan@mail.com",
   "password": "12345678"
}
```

**Respuesta exitosa:**
```json
{
   "message": "Login exitoso",
   "user": { ... },
   "token": "...JWT..."
}
```

### Usar el token JWT

Para acceder a rutas protegidas, agrega este header en Postman:

```
Authorization: Bearer TU_TOKEN_AQUI
```

### Ejemplo con curl

Registro:
```bash
curl -X POST http://localhost:3000/users/register \
   -H "Content-Type: application/json" \
   -d '{"firstname":"Juan","lastname":"Pérez","email":"juan@mail.com","password":"12345678"}'
```

Login:
```bash
curl -X POST http://localhost:3000/users/login \
   -H "Content-Type: application/json" \
   -d '{"email":"juan@mail.com","password":"12345678"}'
```

---
# farmacia-backend

Repositorio único y exclusivamente para el backend

## PROBLEMAS CORREGIDOS

### Backend

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

### Frontend

8. Servicio API creado - src/services/api.js para todas las llamadas
9. AuthModal conectado - registro y login funcionan con el backend
10. Productos dinámicos - se cargan desde el backend en Inicio.jsx
11. CartContext creado - gestión global del carrito con localStorage
12. Carrito funcional - procesa órdenes reales al backend

### Base de Datos

13. Seeder actualizado - 1 producto de ejemplo (Paracetamol)

## CÓMO INICIAR

### Backend
```bash
cd farmacia-backend
npm run tables # Crear tablas
npm run seeders # Cargar datos de ejemplo
npm start # Puerto 3000
```

### Frontend
```bash
cd FrontEnd/FrontFarmacia
npm run dev # Puerto 5173
```

## FLUJO FUNCIONAL

1. Usuario se registra o inicia sesión
2. Ve el producto de ejemplo (Paracetamol $150)
3. Lo agrega al carrito
4. Va a /carrito
5. Click en "Proceder al pago"
6. Se crea la orden en el backend
7. Se actualiza el stock automáticamente

## USUARIO DE PRUEBA

- Email: test@farmauy.com
- Password: 12345678

---

## 📚 DOCUMENTACIÓN ADICIONAL - NOVEMBER 2025

### Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor Express en puerto 3000 |
| `npm run tables` | Recrea la base de datos desde cero (DESTRUCTIVO - elimina datos) |
| `npm run seeders` | Carga datos de prueba: usuario, 5 categorías, 13 artículos |
| `netstat -ano \| findstr ":3000"` | Verifica que el puerto 3000 está escuchando (PowerShell) |
| `Get-Job -Name "servidor" \| Remove-Job -Force; Start-Job -ScriptBlock { cd "ruta\backend"; npm start } -Name "servidor"` | Reinicia servidor en background sin cerrar terminal (PowerShell) |
| `curl http://localhost:3000/health` | Realiza health check para confirmar que el servidor responde |
| `node -e "const http = require('http'); http.get('http://localhost:3000/articles', ...)"` | Prueba un endpoint GET directamente desde Node.js |

---

### Conceptos Técnicos - Endpoints REST

#### ¿Qué es un Endpoint?
Un **endpoint** es una URL específica en una API REST que representa un recurso o acción. Cada endpoint está asociado a un método HTTP (GET, POST, PATCH, DELETE) que define la operación a realizar sobre ese recurso. Los endpoints siguen la estructura: `protocol://host:port/resource/:id`

#### Métodos HTTP Principales

**GET** - Obtener/Leer datos
- Recupera información del servidor sin modificar datos
- Es "seguro" (no produce efectos secundarios)
- Ejemplo: `GET /articles` → devuelve lista de artículos

**POST** - Crear nuevos datos
- Envía datos al servidor para crear un nuevo recurso
- El servidor genera el ID
- Ejemplo: `POST /articles` + body { name, price, stock } → crea artículo

**PATCH** - Actualizar datos parcialmente
- Modifica uno o más campos de un recurso existente
- Solo envía los campos que cambian
- Ejemplo: `PATCH /articles/1` + body { stock: 100 } → actualiza solo stock

**DELETE** - Eliminar datos
- Elimina un recurso del servidor
- Ejemplo: `DELETE /articles/1` → elimina artículo con ID 1

#### Health Check
Un **health check** es un endpoint especial (`GET /health`) que devuelve el estado del servidor sin acceder a la base de datos. Responde con un JSON simple indicando si el servidor está "vivo" y funcionando. Se usa para:
- Verificación rápida sin latencia de base de datos
- Monitoreo automático de disponibilidad del servidor
- Debugging inicial para confirmar que la API está activa

---

### Endpoints Disponibles

#### Artículos
- `GET /articles` - Lista todos los artículos con sus categorías incluidas
- `GET /articles/:id` - Obtiene detalle de un artículo específico
- `POST /articles` - Crea un nuevo artículo (requiere validaciones)
- `PATCH /articles/:id` - Actualiza campos de un artículo
- `DELETE /articles/:id` - Elimina un artículo

#### Categorías
- `GET /categories` - Lista todas las categorías
- `GET /categories/:id` - Obtiene detalle de una categoría
- `POST /categories` - Crea una nueva categoría
- `PATCH /categories/:id` - Actualiza una categoría
- `DELETE /categories/:id` - Elimina una categoría (protegido si tiene artículos)

#### Health Check
- `GET /health` - Retorna `{ "status": "ok", "timestamp": "..." }`

---

### Librerías Utilizadas

#### Backend (Production)

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **express** | ^4.18.2 | Framework para REST API |
| **sequelize** | ^6.35.1 | ORM (Object-Relational Mapping) para base de datos |
| **mysql2** | ^3.6.5 | Driver/conector para MySQL |
| **cors** | ^2.8.5 | Middleware para Cross-Origin Resource Sharing |
| **dotenv** | ^16.3.1 | Carga variables de entorno desde archivo .env |
| **express-validator** | ^7.3.0 | Validación de datos en requests |
| **bcrypt** | ^6.0.0 | Hash seguro de contraseñas |
| **date-fns** | ^2.30.0 | Utilidades para manipular fechas |
| **sqlite3** | ^5.1.6 | Driver para SQLite (alternativa MySQL) |

#### Backend (Development)

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **@faker-js/faker** | ^8.3.1 | Generador de datos ficticios para seeders |

#### Frontend (Production)

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **react** | ^19.1.1 | Framework para UI |
| **react-dom** | ^19.1.1 | Rendering de React en el DOM |
| **react-router-dom** | ^7.9.4 | Enrutamiento para SPA (Single Page Application) |
| **lucide-react** | ^0.548.0 | Librería de iconos |

#### Frontend (Development)

| Librería | Versión | Propósito |
|----------|---------|-----------|
| **vite** | ^7.1.7 | Build tool y dev server ultra rápido |
| **@vitejs/plugin-react** | ^5.0.4 | Plugin de Vite para soporte React |
| **tailwindcss** | ^3.4.18 | Framework CSS utility-first para estilos |
| **autoprefixer** | ^10.4.21 | Agrega prefijos CSS automáticamente |
| **postcss** | ^8.5.6 | Procesador CSS avanzado |
| **@tailwindcss/postcss** | ^4.1.16 | Plugin Tailwind para PostCSS |
| **eslint** | ^9.36.0 | Linter para detectar errores JavaScript |
| **eslint-plugin-react-hooks** | ^5.2.0 | Reglas ESLint específicas para React Hooks |
| **eslint-plugin-react-refresh** | ^0.4.22 | Soporte para Fast Refresh en desarrollo |
| **@types/react** | ^19.1.16 | Type definitions para TypeScript en React |
| **@types/react-dom** | ^19.1.9 | Type definitions para TypeScript en React DOM |
| **globals** | ^16.4.0 | Variables globales para configuración ESLint |

---

### Estado del Proyecto (Última actualización: 20 Nov 2025)

✅ **PHASE 2** - CRUD Artículos: Completo  
✅ **PHASE 3** - Validaciones: Completo  
✅ **PHASE 4** - Seeders: Completo (13 artículos, 5 categorías)  
✅ **PHASE 5** - CRUD Categorías: Completo + Include en respuestas  
⏳ **PHASE 5.1** - Filtrado por categoryId: Pendiente (próximos días)  
⏳ **PHASE 6** - JWT Authentication: Próxima fase  
⏳ **PHASE 7** - Orders Management: Próxima fase
