-----

# 🎮 Game Reel - Vercel Edition

**Game Reel** es una aplicación web *Fullstack* de comercio electrónico dedicada a la venta de videojuegos y películas. Esta versión está optimizada para su despliegue en la nube utilizando **Vercel** y **PostgreSQL**, aunque mantiene compatibilidad local con MySQL.

## 🚀 Características

### 🛒 Experiencia de Usuario

  * **Catálogo de Productos:** Visualización de juegos y películas (`/pantalla-productos`).
  * **Carrito de Compras:** Gestión de pedidos y selección de productos (`/carrito`).
  * **Generación de Tickets:** Creación automática de comprobantes de compra en formato **PDF** utilizando `pdf-lib` (`/ticket`).

### 🛠️ Panel de Administración (Backoffice)

  * **Gestión de Inventario (ABM):** Altas, Bajas y Modificaciones de productos mediante una interfaz protegida (`/abm`, `/admin`).
  * **Reportes:** Exportación de datos y listados en formato **Excel** (`xlsx`).
  * **Gestión de Imágenes:** Carga de imágenes de productos soportada por `@vercel/blob` para almacenamiento en la nube.

## 🛠️ Tecnologías Utilizadas

  * **Backend:** Node.js, Express.js.
  * **Frontend:** EJS (Motor de plantillas), HTML5, CSS3.
  * **Base de Datos:**
      * **ORM:** Sequelize.
      * **Producción:** PostgreSQL (`pg`).
      * **Desarrollo:** MySQL (`mysql2`).
  * **Despliegue:** Vercel (Serverless Functions).

## ⚙️ Configuración e Instalación

### 1\. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-de-la-carpeta>
```

### 2\. Instalar dependencias

```bash
npm install
```

### 3\. Configurar Variables de Entorno

El sistema soporta tanto MySQL como PostgreSQL. Crea un archivo `.env` en la raíz y configura según tu entorno:

**Opción A: Desarrollo Local (MySQL)**

```env
DB_TYPE=mysql
NOMBREBD=gamereel
USER=root
PASSWORD=tu_password
HOST=localhost
PORTBD=3306
PORT=3000
```

**Opción B: Producción / Vercel (PostgreSQL)**

```env
DB_TYPE=postgres
POSTGRES_DATABASE=nombre_bd_vercel
POSTGRES_USER=usuario_vercel
POSTGRES_PASSWORD=password_vercel
POSTGRES_HOST=host_vercel
PORT=3000
BLOB_READ_WRITE_TOKEN=tu_token_vercel_blob
```

### 4\. Ejecutar la aplicación

Para el entorno de desarrollo con reinicio automático:

```bash
npm run dev
```

Para iniciar el servidor normalmente:

```bash
npm start
```

## ☁️ Despliegue en Vercel

Este proyecto incluye un archivo `vercel.json` configurado para redirigir todas las solicitudes al archivo principal `index.js` y manejar el caché.

1.  Instala Vercel CLI o conecta tu repositorio de GitHub a Vercel.
2.  Asegúrate de configurar las **Variables de Entorno** (Environment Variables) en el panel de configuración de Vercel con las credenciales de tu base de datos PostgreSQL (ej. Vercel Postgres o NeonDB).
3.  Vercel detectará automáticamente la configuración y desplegará la aplicación.

## 📂 Estructura de Directorios

  * `/db`: Configuración de conexión a base de datos (lógica dual MySQL/Postgres).
  * `/entity`: Definición de relaciones entre tablas.
  * `/routes`: Definición de endpoints (Admin, Productos, Ventas).
  * `/views`: Vistas renderizadas con EJS.
  * `/public`: Archivos estáticos y subidas.

-----

**Autores:** [Espindola & Grimaldi] - TP Programación III 2024
