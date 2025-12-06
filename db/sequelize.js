//db/sequelize.js
const { Sequelize } = require("sequelize");
const pg = require("pg");

let sequelize = null;

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
        ssl: process.env.NODE_ENV === "production" ? {
          require: true,
          rejectUnauthorized: false,
        } : false,
      },
      pool: {
        max: 5, // Máximo de conexiones en el pool (optimizado para serverless)
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      logging: process.env.NODE_ENV === "development" ? console.log : false,
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
        },
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
        },
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

  // Verificar conexión
  sequelize
    .authenticate()
    .then(() => {
      console.log("✅ Conexión a la base de datos establecida correctamente");
    })
    .catch((err) => {
      console.error("❌ Error al conectar con la base de datos:", err);
    });

  return sequelize;
}

// Exportar la instancia (singleton)
sequelize = getSequelize();

module.exports = sequelize;