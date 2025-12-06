# 🏗️ Arquitectura del Proyecto

Esta documentación explica la arquitectura y estructura del código de Game Reel.

## 📐 Arquitectura General

Game Reel sigue una arquitectura **MVC (Model-View-Controller)** adaptada para Node.js/Express:

```
┌─────────────┐
│   Cliente   │
│  (Browser)  │
└──────┬──────┘
       │ HTTP
       ▼
┌─────────────────┐
│   Express.js    │
│   (Router)      │
└──────┬──────────┘
       │
       ├──► Routes (Controladores)
       │         │
       │         ├──► Models (Lógica de negocio)
       │         │
       │         └──► Entities (ORM)
       │                    │
       │                    ▼
       │              ┌─────────────┐
       │              │  Database   │
       │              │ (PostgreSQL)│
       │              └─────────────┘
       │
       └──► Views (EJS Templates)
```

---

## 📁 Estructura de Directorios Detallada

### `/db` - Configuración de Base de Datos

#### `sequelize.js`
Configuración principal de Sequelize con:
- Patrón Singleton para reutilización de conexiones
- Configuración optimizada para Vercel (pool reducido)
- Autenticación lazy (solo cuando se necesita)
- Soporte para MySQL (desarrollo) y PostgreSQL (producción)

**Características clave:**
- Pool máximo de 1 conexión (serverless)
- Timeouts reducidos (10s acquire, 5s idle)
- Manejo de errores robusto
- SSL automático en producción

#### `runMigrations.js`
Script para ejecutar migraciones programáticamente:
- Detecta migraciones pendientes
- Ejecuta en orden cronológico
- Rastrea ejecuciones en `SequelizeMeta`
- Compatible con Vercel serverless

#### `migrations/`
Archivos de migración versionados:
- Timestamp en el nombre para orden
- `up()` y `down()` para rollback
- Foreign keys con CASCADE

---

### `/entity` - Modelos Sequelize (ORM)

Los modelos definen la estructura de las tablas y relaciones:

#### `producto.entity.js`
```javascript
Producto {
  id: INTEGER (PK)
  nombre: STRING
  precio: FLOAT
  portada: STRING (URL)
  descripcion: STRING ("Juego" | "Pelicula")
  activo: BOOLEAN (default: true)
}
```

#### `venta.entity.js`
```javascript
Venta {
  id: INTEGER (PK)
  usuario: STRING
  total: FLOAT
  FechaVenta: DATE (timestamp)
}
```

#### `detalleVenta.entity.js`
```javascript
DetalleVenta {
  id: INTEGER (PK)
  ventaId: INTEGER (FK → Ventas)
  productoId: INTEGER (FK → Productos)
  cantidad: INTEGER
  subtotal: FLOAT
}
```

#### `admin.entity.js`
```javascript
Administrador {
  user: STRING (PK)
  contrasenia: STRING (encriptada)
  buffer: STRING (IV para desencriptación)
}
```

#### `relaciones.js`
Define las relaciones entre modelos:
- `Venta` ↔ `Producto` (Many-to-Many a través de `DetalleVenta`)
- Foreign keys: `ventaId`, `productoId`

---

### `/model` - Modelos de Dominio

Clases de JavaScript que representan la lógica de negocio:

- `producto.js` - Lógica de productos
- `venta.js` - Lógica de ventas
- `admin.js` - Lógica de administradores

**Nota:** Estos modelos pueden contener métodos de negocio adicionales.

---

### `/routes` - Controladores (Rutas)

Cada archivo maneja un grupo de endpoints relacionados:

#### `productos.routes.js`
Rutas públicas para el catálogo:
- `GET /` - Lista paginada
- `GET /juegos` - Solo juegos
- `GET /peliculas` - Solo películas
- `GET /:id` - Detalle de producto

#### `abm.routes.js`
CRUD completo de productos (admin):
- `GET /` - Lista todos
- `POST /` - Crear
- `PUT /:id` - Actualizar
- `DELETE /:id` - Soft delete
- `PATCH /:id` - Reactivar

**Características:**
- Validación de campos con middleware
- Subida de imágenes a Vercel Blob Storage
- Manejo de archivos con Multer

#### `ventas.routes.js`
Procesamiento de ventas:
- `POST /` - Crear venta y detalles

#### `detalleVentas.routes.js`
Tickets y reportes:
- `GET /:id` - Vista HTML del ticket
- `GET /pdf/:id` - Generar PDF
- `GET /listado` - Exportar Excel

#### `admin.routes.js`
Autenticación:
- `POST /login` - Login
- `GET /` - Crear primer admin

**Seguridad:**
- Encriptación AES-256-CBC
- Validación de campos

---

### `/views` - Vistas (Templates EJS)

Plantillas renderizadas en el servidor:

- `pantalla-productos.ejs` - Catálogo con paginación
- `abm.ejs` - Panel de administración
- `ticket.ejs` - Vista de ticket
- `header.ejs`, `header-abm.ejs` - Headers reutilizables
- `producto-card.ejs`, `producto-card-carrito.ejs` - Componentes de producto

**Características:**
- Renderizado server-side
- Variables inyectadas desde el controlador
- Componentes reutilizables

---

### `/public` - Archivos Estáticos

#### `/css`
Estilos organizados por página:
- `estilos-landing.css`
- `estilos-carrito.css`
- `styles-pantalla-productos.css`
- `styles-ticket.css`
- `estilos-login-admin.css`

#### `/js`
Scripts del frontend:
- `landing.js` - Lógica de landing page
- `pantalla-productos.js` - Catálogo interactivo
- `carrito.js` - Gestión del carrito
- `ticket.js` - Visualización de tickets
- `abm.js` - Panel de administración
- `login-admin.js` - Autenticación

#### `/images`
Imágenes estáticas (logo, etc.)

---

## 🔄 Flujo de Datos

### Crear un Producto

```
1. Cliente → POST /abm (multipart/form-data)
2. Express → abm.routes.js
3. Multer → Procesa archivo
4. subirImagenesNube() → Vercel Blob Storage
5. ProductoSequelize.create() → Base de datos
6. Response JSON → Cliente
```

### Procesar una Venta

```
1. Cliente → POST /carrito (JSON)
2. Express → ventas.routes.js
3. Calcular total
4. VentaSequelize.create() → Crear venta
5. Loop: DetalleVenta.create() → Crear detalles
6. Response JSON → Cliente
```

### Generar PDF

```
1. Cliente → GET /ticket/pdf/:id
2. Express → detalleVentas.routes.js
3. VentaSequelize.findByPk() → Obtener venta
4. venta.getProductos() → Obtener productos
5. PDFDocument.create() → Generar PDF
6. Response PDF → Cliente (download)
```

---

## 🔐 Seguridad

### Encriptación de Contraseñas

```javascript
// Encriptar
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
const encrypted = cipher.update(password, 'utf8', 'hex') + cipher.final('hex');

// Almacenar: { encrypted, iv }
```

### Validación

- Middleware de validación en rutas
- Validación de tipos en Sequelize
- Sanitización de inputs

---

## 🗄️ Base de Datos

### Esquema de Relaciones

```
Productos (1) ──┐
                │
                ├──► DetalleVentas (N) ◄──┐
                │                         │
Ventas (1) ─────┘                         │
                                           │
Administradores (independiente)
```

### Índices

- `DetalleVentas.ventaId` - Índice para búsquedas por venta
- `DetalleVentas.productoId` - Índice para búsquedas por producto

---

## 🚀 Optimizaciones para Vercel

### Serverless Functions

- **Pool reducido:** Máximo 1 conexión
- **Conexión lazy:** Solo cuando se necesita
- **Timeouts cortos:** 10s acquire, 5s idle
- **Manejo de errores:** No termina el proceso

### Almacenamiento

- **Vercel Blob Storage:** Imágenes en la nube
- **No filesystem:** Todo en memoria o cloud

### Migraciones

- **Ejecución programática:** No requiere Sequelize CLI
- **Idempotentes:** Seguras de ejecutar múltiples veces
- **Rastreo:** Tabla `SequelizeMeta`

---

## 📦 Dependencias Principales

### Backend Core
- `express` - Framework web
- `sequelize` - ORM
- `pg` / `mysql2` - Drivers de base de datos

### Utilidades
- `multer` - Manejo de archivos
- `@vercel/blob` - Almacenamiento cloud
- `pdf-lib` - Generación de PDFs
- `xlsx` - Exportación Excel
- `crypto` - Encriptación

### Frontend
- `ejs` - Templates
- `bootstrap` - CSS framework (CDN)
- `toastify-js` - Notificaciones (CDN)

---

## 🔧 Configuración

### Variables de Entorno

**Desarrollo:**
```env
DB_TYPE=mysql
NOMBREBD=...
```

**Producción:**
```env
POSTGRES_URL=...
BLOB_READ_WRITE_TOKEN=...
CLAVE_SECRETA=...
```

### Vercel Config

`vercel.json`:
- Rewrite todas las rutas a `index.js`
- Headers de cache control
- Build con `@vercel/node`

---

## 📝 Convenciones de Código

### Nombres
- **Modelos:** PascalCase (`ProductoSequelize`)
- **Rutas:** camelCase (`productos.routes.js`)
- **Variables:** camelCase
- **Constantes:** UPPER_SNAKE_CASE

### Estructura
- Un archivo por modelo
- Un archivo por grupo de rutas
- Middleware separado cuando es reutilizable

---

## 🧪 Testing (Futuro)

Estructura recomendada para tests:
```
/tests
  /unit
  /integration
  /e2e
```

---

## 📚 Referencias

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [Vercel Documentation](https://vercel.com/docs)
- [EJS Documentation](https://ejs.co/)

---

**Última actualización:** Enero 2025

