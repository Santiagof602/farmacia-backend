# API ENDPOINTS TESTING - ARTICLES

## 1. GET - Listar todos los artículos
```
GET http://localhost:3000/articles
```

---

## 2. GET - Obtener un artículo específico
```
GET http://localhost:3000/articles/1
```

---

## 3. POST - Crear un nuevo artículo (VÁLIDO)
```
POST http://localhost:3000/articles
Content-Type: application/json

{
  "name": "Ibuprofeno Genérico 600mg",
  "description": "Antiinflamatorio potente para dolores intensos",
  "price": 220.50,
  "stock": 100,
  "category": "Medicamentos",
  "image": "https://images.unsplash.com/photo-1631549916768-4873f991f397?w=300"
}
```

---

## 4. POST - Crear artículo con validación fallida (nombre vacío)
```
POST http://localhost:3000/articles
Content-Type: application/json

{
  "name": "",
  "price": 100
}
```

---

## 5. POST - Crear artículo con validación fallida (precio inválido)
```
POST http://localhost:3000/articles
Content-Type: application/json

{
  "name": "Producto Test",
  "price": -50
}
```

---

## 6. POST - Crear artículo con validación fallida (categoría inválida)
```
POST http://localhost:3000/articles
Content-Type: application/json

{
  "name": "Producto Test",
  "price": 100,
  "category": "Categoría Inexistente"
}
```

---

## 7. PATCH - Actualizar artículo (VÁLIDO)
```
PATCH http://localhost:3000/articles/1
Content-Type: application/json

{
  "name": "Paracetamol 500mg - Actualizado",
  "price": 175.00,
  "stock": 45
}
```

---

## 8. PATCH - Actualizar solo el precio
```
PATCH http://localhost:3000/articles/2
Content-Type: application/json

{
  "price": 250.00
}
```

---

## 9. PATCH - Actualizar con categoría inválida (fallará)
```
PATCH http://localhost:3000/articles/1
Content-Type: application/json

{
  "category": "CategoríaInválida"
}
```

---

## 10. DELETE - Eliminar un artículo
```
DELETE http://localhost:3000/articles/5
```

---

## RESPUESTAS ESPERADAS

### ✅ Éxito en POST (201)
```json
{
  "message": "Artículo creado exitosamente",
  "article": {
    "id": 14,
    "name": "Ibuprofeno Genérico 600mg",
    "description": "Antiinflamatorio potente para dolores intensos",
    "price": "220.50",
    "stock": 100,
    "category": "Medicamentos",
    "image": "https://images.unsplash.com/photo-1631549916768-4873f991f397?w=300"
  }
}
```

### ❌ Error de validación (400)
```json
{
  "message": "Errores de validación",
  "errors": [
    {
      "field": "name",
      "message": "El nombre es obligatorio"
    },
    {
      "field": "price",
      "message": "El precio debe ser un número mayor a 0"
    }
  ]
}
```

### ❌ No encontrado (404)
```json
{
  "message": "Artículo no encontrado"
}
```

### ❌ Error interno (500)
```json
{
  "message": "Error al crear artículo",
  "error": "Error interno del servidor"
}
```
