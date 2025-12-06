# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar Game Reel en Vercel paso a paso.

## 📋 Prerrequisitos

1. ✅ Cuenta en [Vercel](https://vercel.com)
2. ✅ Repositorio en GitHub (recomendado) o GitLab
3. ✅ Base de datos PostgreSQL (Vercel Postgres, Neon, Supabase, etc.)
4. ✅ Token de Vercel Blob Storage

---

## 🔧 Paso 1: Preparar el Repositorio

Asegúrate de que tu código esté en un repositorio Git:

```bash
git add .
git commit -m "Preparar para despliegue"
git push origin main
```

---

## 🔗 Paso 2: Conectar con Vercel

### Opción A: Desde el Dashboard de Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz clic en **"Add New Project"**
3. Selecciona tu repositorio de GitHub/GitLab
4. Vercel detectará automáticamente la configuración

### Opción B: Usando Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel
```

---

## 🗄️ Paso 3: Configurar Base de Datos PostgreSQL

### Opción A: Vercel Postgres (Recomendado)

1. En el dashboard de Vercel, ve a **Storage**
2. Haz clic en **"Create Database"** → **"Postgres"**
3. Selecciona un plan (Hobby es gratuito)
4. Vercel creará automáticamente la variable `POSTGRES_URL`

### Opción B: Base de Datos Externa

Si usas Neon, Supabase u otro proveedor:

1. Obtén la URL de conexión de tu base de datos
2. Formato: `postgres://usuario:password@host:5432/database`

---

## 🔐 Paso 4: Configurar Variables de Entorno

En el dashboard de Vercel:

1. Ve a tu proyecto → **Settings** → **Environment Variables**
2. Agrega las siguientes variables:

### Variables Requeridas

```env
# Base de datos (si usas Vercel Postgres, se crea automáticamente)
POSTGRES_URL=postgres://usuario:password@host:5432/database

# O si prefieres variables individuales:
DB_TYPE=postgres
POSTGRES_DATABASE=nombre_bd
POSTGRES_USER=usuario
POSTGRES_PASSWORD=password
POSTGRES_HOST=host
POSTGRES_PORT=5432

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx

# Encriptación (genera una clave de 32 bytes)
CLAVE_SECRETA=tu_clave_secreta_de_32_bytes_aqui

# Entorno
NODE_ENV=production
```

### Generar CLAVE_SECRETA

```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O en línea de comandos (Linux/Mac)
openssl rand -hex 32
```

---

## 📦 Paso 5: Configurar Vercel Blob Storage

1. En el dashboard de Vercel, ve a **Storage**
2. Haz clic en **"Create Database"** → **"Blob"**
3. Crea un nuevo Blob Store
4. Copia el token `BLOB_READ_WRITE_TOKEN`
5. Agrégalo a las variables de entorno

---

## 🗃️ Paso 6: Ejecutar Migraciones

### Opción 1: Build Command (Recomendado)

En la configuración del proyecto en Vercel:

1. Ve a **Settings** → **General** → **Build & Development Settings**
2. En **Build Command**, agrega:
   ```bash
   npm install && npm run migrate
   ```
3. En **Output Directory**, deja vacío (no aplica para este proyecto)
4. En **Install Command**, deja el predeterminado: `npm install`

### Opción 2: Post-deploy Hook

Después del primer despliegue:

```bash
# Instalar Vercel CLI si no lo tienes
npm i -g vercel

# Obtener variables de entorno
vercel env pull .env.production

# Ejecutar migraciones localmente (conectado a la BD de producción)
npm run migrate
```

### Opción 3: Manualmente desde Vercel

1. Ve a tu proyecto en Vercel
2. Abre la consola de funciones serverless
3. Ejecuta:
   ```bash
   node db/runMigrations.js
   ```

---

## ⚙️ Paso 7: Configuración de Vercel

El archivo `vercel.json` ya está configurado, pero puedes verificar:

```json
{
  "version": 2,
  "builds": [{ "src": "index.js", "use": "@vercel/node" }],
  "rewrites": [{ "source": "/(.*)", "destination": "index.js" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "no-store, max-age=0" }]
    }
  ]
}
```

Esta configuración:
- ✅ Usa `@vercel/node` para funciones serverless
- ✅ Redirige todas las rutas a `index.js`
- ✅ Desactiva el cache para desarrollo

---

## 🚀 Paso 8: Desplegar

### Primera Vez

1. Haz clic en **"Deploy"** en el dashboard de Vercel
2. Espera a que termine el build
3. Revisa los logs para verificar que las migraciones se ejecutaron

### Actualizaciones Futuras

Cada push a la rama principal (`main` o `master`) desplegará automáticamente:

```bash
git push origin main
```

---

## ✅ Paso 9: Verificar el Despliegue

1. **Verifica la URL:** Vercel te proporcionará una URL como `https://tu-proyecto.vercel.app`
2. **Prueba la landing page:** Debe cargar correctamente
3. **Verifica la base de datos:** Intenta crear un producto desde el panel de admin
4. **Revisa los logs:** En el dashboard de Vercel → **Deployments** → **Functions**

---

## 🔍 Troubleshooting

### Error: "Cannot find module"

**Problema:** Dependencias no instaladas.

**Solución:**
- Verifica que `package.json` tenga todas las dependencias
- Asegúrate de que `node_modules` no esté en `.gitignore` (no debería estar)

### Error: "Connection timeout"

**Problema:** No puede conectar con la base de datos.

**Solución:**
- Verifica que `POSTGRES_URL` esté correctamente configurada
- Asegúrate de que la base de datos permita conexiones desde Vercel
- Revisa los logs de Vercel para más detalles

### Error: "Table does not exist"

**Problema:** Las migraciones no se ejecutaron.

**Solución:**
```bash
# Ejecutar migraciones manualmente
vercel env pull .env.production
npm run migrate
```

### Error: "BLOB_READ_WRITE_TOKEN is not defined"

**Problema:** Token de Blob Storage no configurado.

**Solución:**
- Verifica que el token esté en las variables de entorno
- Asegúrate de que el Blob Store esté creado

### Error: "Function exceeded maximum duration"

**Problema:** Timeout en funciones serverless.

**Solución:**
- Optimiza las consultas a la base de datos
- Considera usar conexiones persistentes (ya implementado)
- Revisa la configuración del pool en `db/sequelize.js`

---

## 📊 Monitoreo

### Logs en Vercel

1. Ve a tu proyecto → **Deployments**
2. Selecciona un deployment
3. Haz clic en **Functions** para ver los logs

### Métricas

Vercel proporciona métricas de:
- Tiempo de respuesta
- Uso de funciones
- Errores
- Ancho de banda

---

## 🔄 Actualizaciones

Para actualizar la aplicación:

1. Haz cambios en tu código local
2. Commit y push:
   ```bash
   git add .
   git commit -m "Descripción de cambios"
   git push origin main
   ```
3. Vercel desplegará automáticamente

---

## 🌐 Dominio Personalizado

Para usar tu propio dominio:

1. Ve a **Settings** → **Domains**
2. Agrega tu dominio
3. Sigue las instrucciones de DNS
4. Espera a que se propague (puede tardar hasta 48 horas)

---

## 💰 Planes de Vercel

- **Hobby (Gratis):**
  - 100 GB de ancho de banda
  - Funciones serverless ilimitadas
  - Perfecto para proyectos pequeños

- **Pro ($20/mes):**
  - Más ancho de banda
  - Analytics avanzado
  - Soporte prioritario

---

## 📝 Checklist de Despliegue

- [ ] Repositorio conectado a Vercel
- [ ] Base de datos PostgreSQL configurada
- [ ] Variables de entorno configuradas
- [ ] Vercel Blob Storage configurado
- [ ] Migraciones ejecutadas
- [ ] Build exitoso
- [ ] Landing page carga correctamente
- [ ] Panel de admin funciona
- [ ] Subida de imágenes funciona
- [ ] Logs sin errores críticos

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs en Vercel
2. Verifica las variables de entorno
3. Consulta la [documentación de Vercel](https://vercel.com/docs)
4. Revisa el [README principal](../README.md)

---

**¡Listo! Tu aplicación debería estar funcionando en Vercel.** 🎉

