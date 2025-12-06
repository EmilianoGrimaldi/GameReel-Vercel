/**
 * Script para ejecutar migraciones de Sequelize
 * Compatible con Vercel y entornos serverless
 */

const { Sequelize, DataTypes } = require('sequelize');
const pg = require('pg');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno
require('dotenv').config();

/**
 * Obtener la instancia de Sequelize para migraciones
 */
function getSequelizeForMigrations() {
  let connectionString;
  let dialectOptions = {};

  // Configuración para Vercel/Producción
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
  }
  // Configuración para PostgreSQL con variables individuales
  else if (process.env.DB_TYPE === 'postgres') {
    connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DATABASE}`;
    if (process.env.NODE_ENV === 'production') {
      dialectOptions = {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      };
    }
  }
  // Configuración para MySQL (desarrollo local)
  else if (process.env.DB_TYPE === 'mysql') {
    connectionString = `mysql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORTBD || 3306}/${process.env.NOMBREBD}`;
  } else {
    throw new Error('No se pudo determinar la configuración de la base de datos');
  }

  const sequelize = new Sequelize(connectionString, {
    dialect: process.env.DB_TYPE === 'mysql' ? 'mysql' : 'postgres',
    dialectModule: process.env.DB_TYPE === 'mysql' ? null : pg,
    dialectOptions,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 1,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  });

  return sequelize;
}

/**
 * Ejecutar una migración
 */
async function runMigration(sequelize, migrationFile) {
  const migration = require(path.join(__dirname, 'migrations', migrationFile));
  
  console.log(`Ejecutando migración: ${migrationFile}`);
  
  try {
    await migration.up(sequelize.getQueryInterface(), { Sequelize, DataTypes });
    console.log(`✅ Migración ${migrationFile} ejecutada correctamente`);
    return true;
  } catch (error) {
    console.error(`❌ Error en migración ${migrationFile}:`, error.message);
    throw error;
  }
}

/**
 * Verificar si una migración ya fue ejecutada
 */
async function isMigrationExecuted(sequelize, migrationName) {
  try {
    // Crear tabla de migraciones si no existe
    const queryInterface = sequelize.getQueryInterface();
    const tableExists = await queryInterface.tableExists('SequelizeMeta');
    
    if (!tableExists) {
      await queryInterface.createTable('SequelizeMeta', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
      });
    }
  } catch (error) {
    // La tabla ya existe o hubo un error, continuar
    console.log('Tabla SequelizeMeta ya existe o error al crearla:', error.message);
  }

  try {
    const [results] = await sequelize.query(
      'SELECT name FROM "SequelizeMeta" WHERE name = :name',
      {
        replacements: { name: migrationName },
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    return results && results.length > 0;
  } catch (error) {
    // Si hay error, asumir que no está ejecutada
    return false;
  }
}

/**
 * Registrar migración como ejecutada
 */
async function markMigrationAsExecuted(sequelize, migrationName) {
  await sequelize.query(
    'INSERT INTO "SequelizeMeta" (name) VALUES (:name)',
    {
      replacements: { name: migrationName },
      type: Sequelize.QueryTypes.INSERT,
    }
  );
}

/**
 * Ejecutar todas las migraciones pendientes
 */
async function runAllMigrations() {
  const sequelize = getSequelizeForMigrations();

  try {
    // Autenticar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');

    // Obtener lista de archivos de migración
    const migrationsPath = path.join(__dirname, 'migrations');
    const migrationFiles = fs
      .readdirSync(migrationsPath)
      .filter((file) => file.endsWith('.js'))
      .sort(); // Ordenar por nombre (timestamp)

    console.log(`\n📦 Encontradas ${migrationFiles.length} migraciones\n`);

    // Ejecutar cada migración
    for (const migrationFile of migrationFiles) {
      const migrationName = migrationFile.replace('.js', '');

      // Verificar si ya fue ejecutada
      const executed = await isMigrationExecuted(sequelize, migrationName);
      
      if (executed) {
        console.log(`⏭️  Migración ${migrationName} ya fue ejecutada, omitiendo...`);
        continue;
      }

      // Ejecutar migración
      await runMigration(sequelize, migrationFile);
      
      // Registrar como ejecutada
      await markMigrationAsExecuted(sequelize, migrationName);
    }

    console.log('\n✅ Todas las migraciones se ejecutaron correctamente\n');
  } catch (error) {
    console.error('\n❌ Error al ejecutar migraciones:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  (async () => {
    try {
      await runAllMigrations();
      process.exit(0);
    } catch (error) {
      console.error('Error fatal al ejecutar migraciones:', error);
      process.exit(1);
    }
  })();
}

module.exports = { runAllMigrations, getSequelizeForMigrations };
