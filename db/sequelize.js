//db/sequelize.js
const { Sequelize } = require("sequelize");
const pg = require("pg");

let sequelize = null;
let isAuthenticated = false;
let authPromise = null;

/**
 * Configuración optimizada para Vercel Serverless Functions
 * Pool reducido y timeouts más cortos para evitar timeouts
 */
const getPoolConfig = () => ({
  max: 1, // Máximo 1 conexión para serverless (evita problemas de conexión)
  min: 0,
  acquire: 10000, // 10 segundos (reducido de 30)
  idle: 5000, // 5 segundos (reducido de 10)
  evict: 1000, // Verificar conexiones inactivas cada segundo
});

/**
 * Función para obtener o crear la instancia de Sequelize
 * Patrón Singleton optimizado para Vercel Serverless Functions
 */
function getSequelize() {
  // Si ya existe una instancia, la reutilizamos (importante para serverless)
  if (sequelize) {
    return sequelize;
  }

  // Configuración para Vercel (PostgreSQL)
  if (process.env.POSTGRES_URL || process.env.DATABASE_URL) {
    // Vercel proporciona POSTGRES_URL o DATABASE_URL
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    
    sequelize = new Sequelize(connectionString, {
      dialect: "postgres",
      dialectModule: pg,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        connectTimeout: 10000, // Timeout de conexión de 10 segundos
      },
      pool: getPoolConfig(),
      logging: process.env.NODE_ENV === "development" ? console.log : false,
      retry: {
        max: 2, // Reintentar máximo 2 veces
      },
    });
  }
  // Configuración para PostgreSQL con variables individuales
  else if (process.env.DB_TYPE === "postgres") {
    sequelize = new Sequelize(
      process.env.POSTGRES_DATABASE,
      process.env.POSTGRES_USER,
      process.env.POSTGRES_PASSWORD,
      {
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT || 5432,
        dialect: "postgres",
        dialectModule: pg,
        dialectOptions: {
          ssl: process.env.NODE_ENV === "production" ? {
            require: true,
            rejectUnauthorized: false,
          } : false,
          connectTimeout: 10000,
        },
        pool: getPoolConfig(),
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        retry: {
          max: 2,
        },
      }
    );
  }
  // Configuración para MySQL (desarrollo local)
  else if (process.env.DB_TYPE === "mysql") {
    sequelize = new Sequelize(
      process.env.NOMBREBD,
      process.env.USER,
      process.env.PASSWORD,
      {
        host: process.env.HOST,
        port: process.env.PORTBD || 3306,
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        logging: process.env.NODE_ENV === "development" ? console.log : false,
      }
    );
  }
  // Fallback: intentar con PostgreSQL por defecto
  else {
    console.warn("⚠️  DB_TYPE no especificado, usando PostgreSQL por defecto");
    sequelize = new Sequelize(
      process.env.POSTGRES_DATABASE || "postgres",
      process.env.POSTGRES_USER || "postgres",
      process.env.POSTGRES_PASSWORD || "",
      {
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.POSTGRES_PORT || 5432,
        dialect: "postgres",
        dialectModule: pg,
        dialectOptions: {
          ssl: process.env.NODE_ENV === "production" ? {
            require: true,
            rejectUnauthorized: false,
          } : false,
          connectTimeout: 10000,
        },
        pool: getPoolConfig(),
        logging: process.env.NODE_ENV === "development" ? console.log : false,
        retry: {
          max: 2,
        },
      }
    );
  }

  // Manejo de errores de conexión
  sequelize.connectionManager.pool.on("error", (err) => {
    console.error("❌ Error en el pool de conexiones:", err);
    isAuthenticated = false; // Resetear estado de autenticación
  });

  return sequelize;
}

/**
 * Autenticación lazy - solo se ejecuta cuando es necesario
 * Evita timeouts en el inicio de funciones serverless
 */
async function ensureConnection() {
  if (isAuthenticated && sequelize) {
    return sequelize;
  }

  // Si ya hay una autenticación en proceso, esperar a que termine
  if (authPromise) {
    return authPromise;
  }

  // Crear nueva promesa de autenticación
  authPromise = (async () => {
    try {
      if (!sequelize) {
        sequelize = getSequelize();
      }
      
      await sequelize.authenticate();
      isAuthenticated = true;
      console.log("✅ Conexión a la base de datos establecida correctamente");
      return sequelize;
    } catch (err) {
      isAuthenticated = false;
      console.error("❌ Error al conectar con la base de datos:", err.message);
      // No lanzar el error, solo loguearlo para evitar crashes
      return sequelize;
    } finally {
      authPromise = null;
    }
  })();

  return authPromise;
}

// Exportar la instancia (singleton) - sin autenticación inmediata
sequelize = getSequelize();

// Exportar función para asegurar conexión cuando sea necesario
sequelize.ensureConnection = ensureConnection;

module.exports = sequelize;