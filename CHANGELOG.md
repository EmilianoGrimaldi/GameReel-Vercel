# 📋 Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [1.0.0] - 2025-01-06

### ✨ Agregado

#### Sistema de Migraciones
- Sistema completo de migraciones de Sequelize
- Script `runMigrations.js` para ejecutar migraciones programáticamente
- Migraciones idempotentes con rastreo en `SequelizeMeta`
- Soporte para PostgreSQL y MySQL
- Índices optimizados en tablas relacionadas

#### Optimizaciones para Vercel
- Configuración optimizada de pool de conexiones (max: 1)
- Conexión lazy para evitar timeouts en inicio
- Timeouts reducidos (10s acquire, 5s idle)
- Manejo robusto de errores no bloqueante
- Soporte para `POSTGRES_URL` y variables individuales

#### Manejo de Errores
- Captura de `unhandledRejection`
- Manejo de `uncaughtException` en producción
- Listeners de errores del pool de conexiones
- Logging detallado sin bloquear el proceso

#### Documentación
- README completo y actualizado
- Documentación completa de API (`docs/API.md`)
- Guía de despliegue (`docs/DEPLOYMENT.md`)
- Documentación de arquitectura (`docs/ARCHITECTURE.md`)
- README de migraciones (`db/migrations/README.md`)

#### UI/UX
- Landing page con diseño centrado
- Mejoras en responsive design
- Tema claro/oscuro mejorado

### 🐛 Corregido

#### Errores de Conexión
- **Bug:** `pool.on is not a function` - El pool no estaba inicializado
  - **Fix:** Listener configurado después de la autenticación
  - **Archivo:** `db/sequelize.js`

- **Bug:** `sync()` ejecutándose en producción causando timeouts
  - **Fix:** `sync()` solo en desarrollo con `SYNC_DB=true`
  - **Archivo:** `index.js`

- **Bug:** Conexión no establecida antes de cargar rutas
  - **Fix:** `ensureConnection()` llamado en todos los entornos
  - **Archivo:** `index.js`

#### Errores de Migraciones
- **Bug:** `runAllMigrations()` sin await causando terminación prematura
  - **Fix:** IIFE async con await y manejo de errores
  - **Archivo:** `db/runMigrations.js`

- **Bug:** Destructuring incorrecto en `QueryTypes.SELECT`
  - **Fix:** Asignación directa sin destructuring
  - **Archivo:** `db/runMigrations.js`

#### Errores de SSL
- **Bug:** SSL inconsistente entre `POSTGRES_URL` y variables individuales
  - **Fix:** SSL condicional en ambos casos (solo en producción)
  - **Archivos:** `db/sequelize.js`, `db/runMigrations.js`

#### Errores de Formularios
- **Bug:** Formulario recargando la página al presionar Enter
  - **Fix:** `preventDefault()` en submit y keypress
  - **Archivo:** `public/js/landing.js`

### ⚡ Mejorado

#### Performance
- Pool de conexiones optimizado para serverless
- Conexión lazy reduce tiempo de inicio
- Timeouts ajustados para mejor rendimiento
- Reintentos automáticos en caso de fallo

#### Código
- Patrón Singleton mejorado para Sequelize
- Manejo de errores más robusto
- Código más mantenible y documentado
- Mejores prácticas de async/await

#### Configuración
- Soporte para múltiples formas de configuración de BD
- Variables de entorno bien documentadas
- Configuración flexible para desarrollo y producción

### 📝 Documentación

- README principal completamente actualizado
- Documentación de API con ejemplos
- Guía paso a paso de despliegue
- Documentación de arquitectura
- Troubleshooting actualizado con soluciones

### 🔒 Seguridad

- Encriptación AES-256-CBC para contraseñas
- Validación de inputs en frontend y backend
- Manejo seguro de errores sin exponer información sensible

### 🎨 UI/UX

- Landing page con diseño centrado
- Mejoras en responsive design
- Tema claro/oscuro persistente
- Validación de formularios mejorada

## [0.1.0] - 2024-12

### ✨ Agregado

- Versión inicial del proyecto
- Sistema de productos (ABM)
- Sistema de ventas
- Generación de tickets PDF
- Exportación a Excel
- Autenticación de administradores
- Almacenamiento de imágenes en Vercel Blob

---

## Tipos de Cambios

- **✨ Agregado** - Para nuevas características
- **🔄 Cambiado** - Para cambios en funcionalidades existentes
- **🗑️ Deprecado** - Para funcionalidades que serán removidas
- **❌ Removido** - Para funcionalidades removidas
- **🐛 Corregido** - Para correcciones de bugs
- **⚡ Mejorado** - Para mejoras de performance
- **🔒 Seguridad** - Para vulnerabilidades de seguridad

