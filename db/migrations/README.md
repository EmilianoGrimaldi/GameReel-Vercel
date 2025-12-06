# Migraciones de Base de Datos

Este directorio contiene las migraciones de Sequelize para gestionar el esquema de la base de datos.

## Estructura de Migraciones

Las migraciones están ordenadas por timestamp y se ejecutan en el siguiente orden:

1. **20250106000001-create-productos.js** - Crea la tabla `Productos`
2. **20250106000002-create-administradores.js** - Crea la tabla `Administradores`
3. **20250106000003-create-ventas.js** - Crea la tabla `Ventas`
4. **20250106000004-create-detalle-ventas.js** - Crea la tabla `DetalleVentas` con relaciones

## Uso

### Ejecutar Migraciones

Para ejecutar todas las migraciones pendientes:

```bash
npm run migrate
```

O directamente:

```bash
node db/runMigrations.js
```

### Variables de Entorno Requeridas

Para producción (Vercel):
- `POSTGRES_URL` o `DATABASE_URL`

Para desarrollo local:
- `DB_TYPE=postgres` o `DB_TYPE=mysql`
- Variables correspondientes según el tipo de base de datos

## Notas Importantes

- Las migraciones solo se ejecutan si no han sido ejecutadas previamente
- La tabla `SequelizeMeta` se crea automáticamente para rastrear las migraciones ejecutadas
- En producción, las migraciones deben ejecutarse manualmente o mediante un script de despliegue
- Las migraciones son idempotentes: pueden ejecutarse múltiples veces sin causar errores

## Para Vercel

En Vercel, puedes ejecutar las migraciones usando:

1. **Build Command**: Agregar `npm run migrate` al build command
2. **Post-deploy Hook**: Ejecutar migraciones después del despliegue
3. **Manualmente**: Conectarte a la base de datos y ejecutar `npm run migrate`

## Orden de Ejecución

Es importante mantener el orden de las migraciones porque:
- `DetalleVentas` depende de `Ventas` y `Productos`
- Las foreign keys requieren que las tablas referenciadas existan primero

