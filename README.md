# 🎮 Game Reel - Vercel Edition

**Game Reel** es una aplicación web *Fullstack* de comercio electrónico dedicada a la venta de videojuegos y películas. Esta versión está optimizada para su despliegue en la nube utilizando **Vercel** y **PostgreSQL**, aunque mantiene compatibilidad local con MySQL.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Migraciones de Base de Datos](#-migraciones-de-base-de-datos)
- [API Documentation](#-documentación-de-la-api)
- [Despliegue en Vercel](#-despliegue-en-vercel)
- [Scripts Disponibles](#-scripts-disponibles)
- [Modelos de Datos](#-modelos-de-datos)
- [Troubleshooting](#-troubleshooting)

## 🚀 Características

### 🛒 Experiencia de Usuario

- **Landing Page:** Página de bienvenida con ingreso de nombre de usuario
- **Catálogo de Productos:** Visualización de juegos y películas con paginación (`/pantalla-productos`)
- **Filtros:** Separación entre juegos (`/pantalla-productos/juegos`) y películas (`/pantalla-productos/peliculas`)
- **Carrito de Compras:** Gestión de pedidos y selección de productos (`/carrito`)
- **Generación de Tickets:** Creación automática de comprobantes de compra en formato **PDF** utilizando `pdf-lib` (`/ticket/:id`)
- **Tema Claro/Oscuro:** Toggle de tema con persistencia en localStorage

### 🛠️ Panel de Administración (Backoffice)

- **Gestión de Inventario (ABM):** Altas, Bajas y Modificaciones de productos mediante una interfaz protegida (`/abm`, `/admin`)
- **Autenticación:** Sistema de login con encriptación AES-256-CBC
- **Reportes:** Exportación de datos y listados en formato **Excel** (`xlsx`)
- **Gestión de Imágenes:** Carga de imágenes de productos soportada por `@vercel/blob` para almacenamiento en la nube
- **Soft Delete:** Los productos se desactivan en lugar de eliminarse físicamente

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para gestión de base de datos
- **Multer** - Manejo de archivos multipart/form-data
- **@vercel/blob** - Almacenamiento de archivos en la nube

### Frontend
- **EJS** - Motor de plantillas
- **HTML5, CSS3** - Estructura y estilos
- **Bootstrap 5** - Framework CSS
- **Toastify.js** - Notificaciones toast
- **SweetAlert2** - Modales y alertas

### Base de Datos
- **ORM:** Sequelize v6.37.5
- **Producción:** PostgreSQL (`pg` v8.13.1)
- **Desarrollo:** MySQL (`mysql2` v3.11.5)

### Utilidades
- **pdf-lib** - Generación de PDFs
- **xlsx** - Exportación a Excel
- **crypto** - Encriptación de contraseñas

### Despliegue
- **Vercel** - Plataforma de hosting serverless
- **Vercel Blob Storage** - Almacenamiento de imágenes

## 📂 Estructura del Proyecto

```
GameReel-Vercel/
├── db/                          # Configuración de base de datos
│   ├── config.json             # Configuración de Sequelize CLI
│   ├── migrations/             # Migraciones de base de datos
│   │   ├── 20250106000001-create-productos.js
│   │   ├── 20250106000002-create-administradores.js
│   │   ├── 20250106000003-create-ventas.js
│   │   ├── 20250106000004-create-detalle-ventas.js
│   │   └── README.md
│   ├── runMigrations.js        # Script para ejecutar migraciones
│   └── sequelize.js            # Configuración de conexión Sequelize
│
├── entity/                      # Modelos de Sequelize (Entidades)
│   ├── admin.entity.js
│   ├── detalleVenta.entity.js
│   ├── producto.entity.js
│   ├── relaciones.js           # Definición de relaciones entre modelos
│   └── venta.entity.js
│
├── model/                       # Modelos de dominio (Clases)
│   ├── admin.js
│   ├── producto.js
│   └── venta.js
│
├── routes/                      # Rutas de la API
│   ├── abm.routes.js           # CRUD de productos (admin)
│   ├── admin.routes.js         # Autenticación de administradores
│   ├── detalleVentas.routes.js # Tickets y reportes
│   ├── productos.routes.js     # Catálogo público de productos
│   └── ventas.routes.js         # Procesamiento de ventas
│
├── views/                       # Plantillas EJS
│   ├── abm.ejs                 # Panel de administración
│   ├── pantalla-productos.ejs  # Catálogo de productos
│   ├── ticket.ejs              # Vista de ticket
│   └── ...
│
├── public/                      # Archivos estáticos
│   ├── css/                     # Estilos CSS
│   ├── js/                      # Scripts del frontend
│   ├── images/                  # Imágenes estáticas
│   ├── landing-page.html        # Página de inicio
│   └── login-administrador.html # Login de admin
│
├── uploads/                     # Archivos subidos (local, no usado en producción)
│
├── index.js                     # Punto de entrada de la aplicación
├── vercel.json                  # Configuración de Vercel
├── .sequelizerc                 # Configuración de Sequelize CLI
└── package.json                 # Dependencias y scripts
```

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd GameReel-Vercel
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

#### Opción A: Desarrollo Local (MySQL)

```env
# Base de datos
DB_TYPE=mysql
NOMBREBD=gamereel
USER=root
PASSWORD=tu_password
HOST=localhost
PORTBD=3306

# Servidor
PORT=3000
NODE_ENV=development

# Encriptación (generar una clave de 32 bytes)
CLAVE_SECRETA=tu_clave_secreta_de_32_bytes_aqui
```

#### Opción B: Producción / Vercel (PostgreSQL)

```env
# Base de datos (Vercel Postgres)
POSTGRES_URL=postgres://usuario:password@host:5432/database
# O variables individuales:
DB_TYPE=postgres
POSTGRES_DATABASE=nombre_bd
POSTGRES_USER=usuario
POSTGRES_PASSWORD=password
POSTGRES_HOST=host
POSTGRES_PORT=5432

# Servidor
PORT=3000
NODE_ENV=production

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=tu_token_vercel_blob

# Encriptación
CLAVE_SECRETA=tu_clave_secreta_de_32_bytes_aqui
```

### 4. Ejecutar Migraciones

Antes de iniciar la aplicación, ejecuta las migraciones para crear las tablas:

```bash
npm run migrate
```

### 5. Ejecutar la aplicación

**Desarrollo** (con reinicio automático):
```bash
npm run dev
```

**Producción**:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🗄️ Migraciones de Base de Datos

El proyecto utiliza migraciones de Sequelize para gestionar el esquema de la base de datos de forma versionada y controlada.

### Ejecutar Migraciones

```bash
npm run migrate
```

O directamente:
```bash
node db/runMigrations.js
```

### Orden de Ejecución

Las migraciones se ejecutan en el siguiente orden:

1. **Productos** - Tabla base de productos
2. **Administradores** - Tabla de usuarios administradores
3. **Ventas** - Tabla de ventas
4. **DetalleVentas** - Tabla de relación entre ventas y productos (con foreign keys)

### Características

- ✅ **Idempotentes:** Pueden ejecutarse múltiples veces sin errores
- ✅ **Rastreo:** Usa la tabla `SequelizeMeta` para registrar migraciones ejecutadas
- ✅ **Relaciones:** Foreign keys con CASCADE para integridad referencial
- ✅ **Índices:** Optimización de consultas en tablas relacionadas

Para más información, consulta [`db/migrations/README.md`](db/migrations/README.md)

## 📡 Documentación de la API

### Rutas Públicas

#### Productos

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/pantalla-productos` | Lista todos los productos activos (paginado) |
| GET | `/pantalla-productos/juegos` | Lista solo juegos (paginado) |
| GET | `/pantalla-productos/peliculas` | Lista solo películas (paginado) |
| GET | `/pantalla-productos/:id` | Obtiene un producto por ID |

**Query Parameters:**
- `page` (default: 0) - Número de página
- `size` (default: 4) - Tamaño de página

**Ejemplo:**
```bash
GET /pantalla-productos?page=0&size=4
```

#### Ventas

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/carrito` | Crea una nueva venta |

**Body:**
```json
{
  "usuario": "Nombre del cliente",
  "carrito": [
    {
      "id": 1,
      "precio": 59.99,
      "cantidad": 2
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

#### Tickets

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/ticket/:id` | Renderiza el ticket de una venta (HTML) |
| GET | `/ticket/pdf/:id` | Genera y descarga el ticket en PDF |
| GET | `/ticket/listado` | Descarga un Excel con todas las ventas |

### Rutas de Administración

#### ABM (Altas, Bajas y Modificaciones)

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/abm` | Lista todos los productos (admin) |
| GET | `/abm/juegos` | Lista solo juegos (admin) |
| GET | `/abm/peliculas` | Lista solo películas (admin) |
| GET | `/abm/:id` | Obtiene un producto por ID |
| POST | `/abm` | Crea un nuevo producto |
| PUT | `/abm/:id` | Actualiza un producto |
| DELETE | `/abm/:id` | Desactiva un producto (soft delete) |
| PATCH | `/abm/:id` | Reactiva un producto |

**POST /abm Body (multipart/form-data):**
```
nombre: string (requerido)
precio: number (requerido, > 0)
descripcion: "Juego" | "Pelicula" (requerido)
portada: File (requerido, imagen)
```

**PUT /abm/:id Body (multipart/form-data):**
```
nombre: string (opcional)
precio: number (opcional)
descripcion: string (opcional)
portada: File (opcional)
```

#### Autenticación

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/admin/login` | Autentica un administrador |
| GET | `/admin` | Crea el primer administrador (solo si no existe) |

**POST /admin/login Body:**
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

## ☁️ Despliegue en Vercel

### Prerrequisitos

1. Cuenta en [Vercel](https://vercel.com)
2. Base de datos PostgreSQL (Vercel Postgres, Neon, Supabase, etc.)
3. Token de Vercel Blob Storage

### Pasos para Desplegar

1. **Conectar Repositorio:**
   - Conecta tu repositorio de GitHub a Vercel
   - O usa Vercel CLI: `vercel`

2. **Configurar Variables de Entorno:**
   En el panel de Vercel, agrega las siguientes variables:

   ```
   POSTGRES_URL=postgres://...
   BLOB_READ_WRITE_TOKEN=vercel_blob_...
   CLAVE_SECRETA=tu_clave_secreta_32_bytes
   NODE_ENV=production
   ```

3. **Ejecutar Migraciones:**
   
   **Opción 1: Build Command**
   - En la configuración de Vercel, agrega al Build Command:
   ```bash
   npm install && npm run migrate && npm run build
   ```
   
   **Opción 2: Post-deploy Hook**
   - Ejecuta manualmente después del primer despliegue:
   ```bash
   vercel env pull .env.production
   npm run migrate
   ```

4. **Configuración de Vercel:**
   El archivo `vercel.json` ya está configurado con:
   - Rewrite de todas las rutas a `index.js`
   - Headers de cache control

### Configuración de Vercel Blob Storage

1. Ve a tu proyecto en Vercel
2. Navega a Storage → Blob
3. Crea un nuevo Blob Store
4. Copia el token `BLOB_READ_WRITE_TOKEN`
5. Agrégalo a las variables de entorno

## 📜 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor en modo producción |
| `npm run dev` | Inicia el servidor con nodemon (desarrollo) |
| `npm run migrate` | Ejecuta todas las migraciones pendientes |
| `npm run migrate:up` | Alias de `migrate` |

## 🗃️ Modelos de Datos

### Producto

```javascript
{
  id: INTEGER (PK, auto-increment),
  nombre: STRING (requerido),
  precio: FLOAT (requerido),
  portada: STRING (URL de imagen, requerido),
  descripcion: STRING ("Juego" | "Pelicula", requerido),
  activo: BOOLEAN (default: true)
}
```

### Venta

```javascript
{
  id: INTEGER (PK, auto-increment),
  usuario: STRING (nombre del cliente, requerido),
  total: FLOAT (requerido),
  FechaVenta: DATE (auto, timestamp)
}
```

### DetalleVenta

```javascript
{
  id: INTEGER (PK, auto-increment),
  ventaId: INTEGER (FK → Ventas.id),
  productoId: INTEGER (FK → Productos.id),
  cantidad: INTEGER (requerido),
  subtotal: FLOAT (requerido)
}
```

### Administrador

```javascript
{
  user: STRING (PK),
  contrasenia: STRING (encriptada),
  buffer: STRING (IV para desencriptación)
}
```

### Relaciones

- `Venta` ↔ `Producto` (Many-to-Many a través de `DetalleVenta`)
- Foreign keys con `CASCADE` para mantener integridad referencial

## 🔧 Troubleshooting

### Error: Connection timeout

**Problema:** Timeouts al conectar con la base de datos en Vercel.

**Solución:**
- Verifica que `POSTGRES_URL` esté correctamente configurada
- Asegúrate de que la base de datos permita conexiones desde Vercel
- Revisa los logs de Vercel para más detalles

### Error: SequelizeConnectionAcquireTimeoutError

**Problema:** Pool de conexiones agotado.

**Solución:**
- El pool está configurado para 1 conexión máxima (óptimo para serverless)
- Si persiste, verifica que no haya conexiones colgadas
- Revisa la configuración en `db/sequelize.js`

### Error: Migraciones no ejecutadas

**Problema:** Las tablas no existen en producción.

**Solución:**
```bash
# Ejecutar migraciones manualmente
npm run migrate
```

### Error: BLOB_READ_WRITE_TOKEN no configurado

**Problema:** No se pueden subir imágenes.

**Solución:**
- Verifica que el token esté en las variables de entorno de Vercel
- Asegúrate de que el Blob Store esté creado en Vercel

### Error: Unhandled Rejection

**Problema:** Errores no capturados terminan el proceso.

**Solución:**
- El proyecto ya incluye manejo de errores no capturados
- Revisa los logs para identificar el error específico

## 📝 Notas Adicionales

- **Soft Delete:** Los productos se desactivan (`activo: false`) en lugar de eliminarse
- **Encriptación:** Las contraseñas de administradores se encriptan con AES-256-CBC
- **Paginación:** Por defecto, 4 productos por página
- **Tema:** El tema claro/oscuro se guarda en localStorage del navegador
- **Imágenes:** En producción, las imágenes se almacenan en Vercel Blob Storage

## 👥 Autores

**Espindola & Grimaldi** - TP Programación III 2024

## 📄 Licencia

Este proyecto es parte de un trabajo práctico académico.

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025
