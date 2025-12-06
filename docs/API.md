# 📡 Documentación Completa de la API

Esta documentación detalla todos los endpoints disponibles en Game Reel.

## Base URL

- **Local:** `http://localhost:3000`
- **Producción:** `https://tu-dominio.vercel.app`

## Autenticación

Las rutas de administración requieren autenticación previa. El sistema utiliza encriptación AES-256-CBC para las contraseñas.

---

## 🛒 Rutas Públicas

### Productos

#### GET `/pantalla-productos`

Obtiene una lista paginada de todos los productos activos.

**Query Parameters:**
- `page` (number, opcional, default: 0) - Número de página (0-indexed)
- `size` (number, opcional, default: 4) - Cantidad de productos por página

**Response:**
- **Content-Type:** `text/html` (renderiza vista EJS)
- **Status:** 200 OK

**Ejemplo:**
```bash
GET /pantalla-productos?page=0&size=4
```

---

#### GET `/pantalla-productos/juegos`

Obtiene una lista paginada de solo juegos activos.

**Query Parameters:**
- `page` (number, opcional, default: 0)
- `size` (number, opcional, default: 4)

**Response:**
- **Content-Type:** `text/html`
- **Status:** 200 OK

---

#### GET `/pantalla-productos/peliculas`

Obtiene una lista paginada de solo películas activas.

**Query Parameters:**
- `page` (number, opcional, default: 0)
- `size` (number, opcional, default: 4)

**Response:**
- **Content-Type:** `text/html`
- **Status:** 200 OK

---

#### GET `/pantalla-productos/:id`

Obtiene un producto específico por su ID.

**Path Parameters:**
- `id` (number, requerido) - ID del producto

**Response:**
```json
{
  "id": 1,
  "nombre": "Elden Ring",
  "precio": 59.99,
  "portada": "https://...",
  "descripcion": "Juego",
  "activo": true
}
```

**Status Codes:**
- 200 OK - Producto encontrado
- 400 Bad Request - Error en la solicitud

---

### Ventas

#### POST `/carrito`

Crea una nueva venta con los productos del carrito.

**Request Body:**
```json
{
  "usuario": "Juan Pérez",
  "carrito": [
    {
      "id": 1,
      "precio": 59.99,
      "cantidad": 2
    },
    {
      "id": 3,
      "precio": 19.99,
      "cantidad": 1
    }
  ]
}
```

**Response:**
```json
{
  "ventaId": 123
}
```

**Status Codes:**
- 200 OK - Venta creada exitosamente
- 500 Internal Server Error - Error al procesar la venta

**Notas:**
- El total se calcula automáticamente
- Se crean registros en `DetalleVenta` para cada producto

---

### Tickets

#### GET `/ticket/:id`

Renderiza el ticket de una venta en formato HTML.

**Path Parameters:**
- `id` (number, requerido) - ID de la venta

**Response:**
- **Content-Type:** `text/html`
- **Status:** 200 OK

---

#### GET `/ticket/pdf/:id`

Genera y descarga el ticket de una venta en formato PDF.

**Path Parameters:**
- `id` (number, requerido) - ID de la venta

**Response:**
- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename="Ticket_123.pdf"`
- **Status:** 200 OK

**Ejemplo:**
```bash
GET /ticket/pdf/123
# Descarga: Ticket_123.pdf
```

---

#### GET `/ticket/listado`

Descarga un archivo Excel con todas las ventas y sus detalles.

**Response:**
- **Content-Type:** `application/vnd.ms-excel`
- **Content-Disposition:** `attachment; filename="Listado_Ventas.xlsx"`
- **Status:** 200 OK

**Columnas del Excel:**
- Numero_De_Venta
- Fecha_De_Venta
- Cliente
- Producto
- Cantidad
- PrecioUnitario
- Subtotal
- Total_De_Venta

---

## 🔐 Rutas de Administración

### ABM (Altas, Bajas y Modificaciones)

#### GET `/abm`

Obtiene todos los productos (incluyendo inactivos) para el panel de administración.

**Response:**
- **Content-Type:** `text/html` (renderiza vista EJS)
- **Status:** 200 OK

---

#### GET `/abm/juegos`

Obtiene solo los juegos (incluyendo inactivos).

**Response:**
- **Content-Type:** `text/html`
- **Status:** 200 OK

---

#### GET `/abm/peliculas`

Obtiene solo las películas (incluyendo inactivos).

**Response:**
- **Content-Type:** `text/html`
- **Status:** 200 OK

---

#### GET `/abm/:id`

Obtiene un producto específico por ID.

**Path Parameters:**
- `id` (number, requerido) - ID del producto

**Response:**
```json
{
  "id": 1,
  "nombre": "Elden Ring",
  "precio": 59.99,
  "portada": "https://...",
  "descripcion": "Juego",
  "activo": true
}
```

**Status Codes:**
- 200 OK - Producto encontrado
- 400 Bad Request - Producto no encontrado

---

#### POST `/abm`

Crea un nuevo producto.

**Request:**
- **Content-Type:** `multipart/form-data`

**Form Data:**
- `nombre` (string, requerido) - Nombre del producto
- `precio` (number, requerido, > 0) - Precio del producto
- `descripcion` (string, requerido) - "Juego" o "Pelicula"
- `portada` (file, requerido) - Imagen del producto

**Response:**
```json
{
  "mensaje": "Producto agregado con exito",
  "status": 200
}
```

**Status Codes:**
- 200 OK - Producto creado exitosamente
- 400 Bad Request - Error de validación
- 404 Not Found - No se pudo crear el producto

**Validaciones:**
- `nombre`: No puede estar vacío
- `precio`: Debe ser un número mayor a 0
- `descripcion`: Debe ser "Juego" o "Pelicula"
- `portada`: Debe ser un archivo de imagen

---

#### PUT `/abm/:id`

Actualiza un producto existente.

**Path Parameters:**
- `id` (number, requerido) - ID del producto

**Request:**
- **Content-Type:** `multipart/form-data`

**Form Data (todos opcionales):**
- `nombre` (string) - Nuevo nombre
- `precio` (number) - Nuevo precio
- `descripcion` (string) - Nueva descripción
- `portada` (file) - Nueva imagen

**Response:**
```json
{
  "mensaje": "Se pudo modificar con exito",
  "status": 200
}
```

**Status Codes:**
- 200 OK - Producto actualizado
- 204 No Content - No se pudo modificar
- 400 Bad Request - Error al editar

**Notas:**
- Solo se actualizan los campos enviados
- Si se envía una nueva imagen, se sube a Vercel Blob Storage

---

#### DELETE `/abm/:id`

Desactiva un producto (soft delete).

**Path Parameters:**
- `id` (number, requerido) - ID del producto

**Response:**
```json
{
  "mensaje": "Producto eliminado con exito",
  "status": 200
}
```

**Status Codes:**
- 200 OK - Producto desactivado
- 400 Bad Request - Error al eliminar

**Notas:**
- El producto no se elimina físicamente, solo se marca como `activo: false`
- Los productos desactivados no aparecen en el catálogo público

---

#### PATCH `/abm/:id`

Reactiva un producto previamente desactivado.

**Path Parameters:**
- `id` (number, requerido) - ID del producto

**Response:**
```json
{
  "mensaje": "Producto reactivado con exito",
  "status": 200
}
```

**Status Codes:**
- 200 OK - Producto reactivado
- 400 Bad Request - Error al reactivar

---

### Autenticación

#### POST `/admin/login`

Autentica un administrador.

**Request Body:**
```json
{
  "user": "admin",
  "contrasenia": "password"
}
```

**Response:**
```json
{
  "mensaje": "Inicio de sesión exitoso.",
  "status": 200
}
```

**Status Codes:**
- 200 OK - Login exitoso
- 400 Bad Request - Contraseña incorrecta o campos faltantes
- 404 Not Found - Administrador no encontrado

**Validaciones:**
- `user`: Requerido, no puede estar vacío
- `contrasenia`: Requerido, no puede estar vacío

---

#### GET `/admin`

Crea el primer administrador (solo si no existe ninguno).

**Response:**
```json
{
  "mensaje": "Administrador creado exitosamente.",
  "status": 200
}
```

**Status Codes:**
- 200 OK - Administrador creado
- 400 Bad Request - Ya existe un administrador

**Notas:**
- Solo funciona si no hay administradores en la base de datos
- Crea un administrador por defecto:
  - Usuario: `admin`
  - Contraseña: `asdasd`
- ⚠️ **IMPORTANTE:** Cambia la contraseña después del primer login

---

## 📊 Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 204 | No Content - Operación exitosa sin contenido |
| 400 | Bad Request - Error de validación o solicitud incorrecta |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 🔒 Seguridad

- Las contraseñas de administradores se encriptan con AES-256-CBC
- Las rutas de administración deben protegerse en el frontend
- Las imágenes se almacenan en Vercel Blob Storage (acceso público)
- Validación de tipos y campos requeridos en todas las rutas

---

## 📝 Notas

- Todas las fechas se manejan en formato ISO 8601
- Los precios se almacenan como FLOAT
- Las imágenes deben ser archivos válidos (validación por multer)
- El soft delete permite recuperar productos eliminados

