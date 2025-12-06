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
- [Optimizaciones para Vercel](#-optimizaciones-para-vercel)
- [Troubleshooting](#-troubleshooting)
- [Changelog](#-changelog)

## 🚀 Características

### 🛒 Experiencia de Usuario

- **Landing Page:** Página de bienvenida con ingreso de nombre de usuario y diseño centrado
- **Catálogo de Productos:** Visualización de juegos y películas con paginación (`/pantalla-productos`)
- **Filtros:** Separación entre juegos (`/pantalla-productos/juegos`) y películas (`/pantalla-productos/peliculas`)
- **Carrito de Compras:** Gestión de pedidos y selección de productos (`/carrito`)
- **Generación de Tickets:** Creación automática de comprobantes de compra en formato **PDF** utilizando `pdf-lib` (`/ticket/:id`)
- **Tema Claro/Oscuro:** Toggle de tema con persistencia en localStorage
- **Diseño Responsive:** Adaptado para dispositivos móviles y desktop

### 🛠️ Panel de Administración (Backoffice)

- **Gestión de Inventario (ABM):** Altas, Bajas y Modificaciones de productos mediante una interfaz protegida (`/abm`, `/admin`)
- **Autenticación:** Sistema de login con encriptación AES-256-CBC
- **Reportes:** Exportación de datos y listados en formato **Excel** (`xlsx`)
- **Gestión de Imágenes:** Carga de imágenes de productos soportada por `@vercel/blob` para almacenamiento en la nube
- **Soft Delete:** Los productos se desactivan en lugar de eliminarse físicamente
- **Validación de Formularios:** Validación completa en frontend y backend

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize v6.37.5** - ORM para gestión de base de datos
- **Multer** - Manejo de archivos multipart/form-data
- **@vercel/blob v0.27.0** - Almacenamiento de archivos en la nube

### Frontend
- **EJS v3.1.10** - Motor de plantillas
- **HTML5, CSS3** - Estructura y estilos
- **Bootstrap 5** - Framework CSS
- **Toastify.js** - Notificaciones toast
- **SweetAlert2** - Modales y alertas

### Base de Datos
- **ORM:** Sequelize v6.37.5
- **Producción:** PostgreSQL (`pg` v8.13.1)
- **Desarrollo:** MySQL (`mysql2` v3.11.5)

### Utilidades
- **pdf-lib v1.17.1** - Generación de PDFs
- **xlsx v0.18.5** - Exportación a Excel
- **crypto** (Node.js built-in) - Encriptación de contraseñas

### Despliegue
- **Vercel** - Plataforma de hosting serverless
- **Vercel Blob Storage** - Almacenamiento de imágenes
- **Vercel Postgres** - Base de datos PostgreSQL gestionada

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
│   └── sequelize.js            # Configuración optimizada de conexión
│
├── docs/                        # Documentación completa
│   ├── API.md                  # Documentación de API
│   ├── ARCHITECTURE.md         # Arquitectura del proyecto
│   └── DEPLOYMENT.md           # Guía de despliegue
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
│   └── ventas.routes.js        # Procesamiento de ventas
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
├── index.js                     # Punto de entrada de la aplicación
├── vercel.json                  # Configuración de Vercel
├── .sequelizerc                 # Configuración de Sequelize CLI
├── package.json                 # Dependencias y scripts
└── README.md                    # Este archivo
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

**Generar CLAVE_SECRETA:**
```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O en línea de comandos (Linux/Mac)
openssl rand -hex 32
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
- ✅ **Async/Await:** Manejo correcto de promesas para entornos serverless

Para más información, consulta [`db/migrations/README.md`](db/migrations/README.md)

## 📡 Documentación de la API

Para la documentación completa de la API, consulta [`docs/API.md`](docs/API.md)

### Resumen de Endpoints

#### Rutas Públicas
- `GET /pantalla-productos` - Lista productos (paginado)
- `GET /pantalla-productos/juegos` - Lista solo juegos
- `GET /pantalla-productos/peliculas` - Lista solo películas
- `GET /pantalla-productos/:id` - Obtiene un producto
- `POST /carrito` - Crea una nueva venta
- `GET /ticket/:id` - Vista HTML del ticket
- `GET /ticket/pdf/:id` - Descarga PDF del ticket
- `GET /ticket/listado` - Descarga Excel con todas las ventas

#### Rutas de Administración
- `GET /abm` - Lista todos los productos (admin)
- `POST /abm` - Crea un producto
- `PUT /abm/:id` - Actualiza un producto
- `DELETE /abm/:id` - Desactiva un producto
- `PATCH /abm/:id` - Reactiva un producto
- `POST /admin/login` - Autentica un administrador

## ☁️ Despliegue en Vercel

Para una guía detallada de despliegue, consulta [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

### Resumen Rápido

1. **Conectar Repositorio** a Vercel
2. **Configurar Variables de Entorno:**
   - `POSTGRES_URL`
   - `BLOB_READ_WRITE_TOKEN`
   - `CLAVE_SECRETA`
   - `NODE_ENV=production`
3. **Ejecutar Migraciones** (en build command o post-deploy)
4. **Desplegar**

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
  contrasenia: STRING (encriptada con AES-256-CBC),
  buffer: STRING (IV para desencriptación)
}
```

### Relaciones

- `Venta` ↔ `Producto` (Many-to-Many a través de `DetalleVenta`)
- Foreign keys con `CASCADE` para mantener integridad referencial

## ⚡ Optimizaciones para Vercel

### Conexión a Base de Datos

- **Pool Reducido:** Máximo 1 conexión (óptimo para serverless)
- **Conexión Lazy:** Solo se autentica cuando es necesario
- **Timeouts Optimizados:** 10s acquire, 5s idle
- **Manejo de Errores:** No termina el proceso en caso de error
- **Reintentos:** Máximo 2 intentos automáticos

### Migraciones

- **Ejecución Async:** Manejo correcto de promesas
- **Idempotentes:** Seguras de ejecutar múltiples veces
- **Rastreo:** Tabla `SequelizeMeta` para control

### Almacenamiento

- **Vercel Blob Storage:** Imágenes en la nube
- **No Filesystem:** Todo en memoria o cloud

### Manejo de Errores

- **Unhandled Rejection:** Capturados y logueados
- **Uncaught Exception:** Manejo en producción
- **Pool Errors:** Listeners configurados correctamente

## 🔧 Troubleshooting

### Error: Connection timeout

**Problema:** Timeouts al conectar con la base de datos en Vercel.

**Solución:**
- Verifica que `POSTGRES_URL` esté correctamente configurada
- Asegúrate de que la base de datos permita conexiones desde Vercel
- Revisa los logs de Vercel para más detalles
- Verifica que `NODE_ENV=production` esté configurado

### Error: SequelizeConnectionAcquireTimeoutError

**Problema:** Pool de conexiones agotado.

**Solución:**
- El pool está configurado para 1 conexión máxima (óptimo para serverless)
- Si persiste, verifica que no haya conexiones colgadas
- Revisa la configuración en `db/sequelize.js`
- Asegúrate de que las conexiones se cierren correctamente

### Error: pool.on is not a function

**Problema:** El pool no está inicializado cuando se intenta agregar el listener.

**Solución:**
- ✅ **Corregido:** El listener se configura después de la autenticación
- El código maneja correctamente la inicialización lazy del pool

### Error: Migraciones no ejecutadas

**Problema:** Las tablas no existen en producción.

**Solución:**
```bash
# Ejecutar migraciones manualmente
npm run migrate
```

O agregar al build command en Vercel:
```bash
npm install && npm run migrate
```

### Error: BLOB_READ_WRITE_TOKEN no configurado

**Problema:** No se pueden subir imágenes.

**Solución:**
- Verifica que el token esté en las variables de entorno de Vercel
- Asegúrate de que el Blob Store esté creado en Vercel
- Revisa los logs para ver el error específico

### Error: Unhandled Rejection

**Problema:** Errores no capturados terminan el proceso.

**Solución:**
- ✅ **Corregido:** El proyecto incluye manejo de errores no capturados
- Revisa los logs para identificar el error específico
- Los errores se loguean pero no terminan el proceso en producción

### Error: sync() ejecutándose en producción

**Problema:** Se intenta sincronizar tablas en producción.

**Solución:**
- ✅ **Corregido:** `sync()` solo se ejecuta en desarrollo con `SYNC_DB=true`
- En producción, solo se asegura la conexión sin sync
- Las tablas deben crearse con migraciones

## 📝 Notas Adicionales

- **Soft Delete:** Los productos se desactivan (`activo: false`) en lugar de eliminarse
- **Encriptación:** Las contraseñas de administradores se encriptan con AES-256-CBC
- **Paginación:** Por defecto, 4 productos por página
- **Tema:** El tema claro/oscuro se guarda en localStorage del navegador
- **Imágenes:** En producción, las imágenes se almacenan en Vercel Blob Storage
- **Conexión Lazy:** La conexión a la base de datos se establece solo cuando es necesario
- **UI Mejorada:** Landing page con diseño centrado y responsive

## 📚 Documentación Adicional

- [`docs/API.md`](docs/API.md) - Documentación completa de la API
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) - Arquitectura del proyecto
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) - Guía detallada de despliegue
- [`db/migrations/README.md`](db/migrations/README.md) - Guía de migraciones

## 📋 Changelog

### Versión 1.0.0 (Enero 2025)

#### ✨ Nuevas Características
- Sistema de migraciones completo
- Optimización para Vercel serverless
- Conexión lazy a base de datos
- Manejo robusto de errores
- UI mejorada con diseño centrado

#### 🐛 Correcciones
- Fix: `pool.on is not a function` - Listener configurado correctamente
- Fix: `sync()` ejecutándose en producción - Solo en desarrollo
- Fix: Timeouts de conexión - Pool optimizado
- Fix: Migraciones sin await - Manejo correcto de async/await
- Fix: Destructuring incorrecto en QueryTypes.SELECT

#### ⚡ Optimizaciones
- Pool reducido a 1 conexión para serverless
- Timeouts optimizados (10s acquire, 5s idle)
- Conexión lazy para evitar timeouts en inicio
- Manejo de errores no bloqueante

#### 📝 Documentación
- Documentación completa de API
- Guía de despliegue detallada
- Documentación de arquitectura
- README actualizado

## 👥 Autores

**Espindola & Grimaldi** - TP Programación III 2024

## 📄 Licencia

Este proyecto es parte de un trabajo práctico académico.

---

**Versión:** 1.0.0  
**Última actualización:** Enero 2025  
**Estado:** ✅ Producción - Estable
