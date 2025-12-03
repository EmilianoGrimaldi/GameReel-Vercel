const { Sequelize } = require("sequelize");
const pg = require("pg");
let sequelize;

if (process.env.DB_TYPE === "mysql") {
  sequelize = new Sequelize(
    process.env.NOMBREBD,
    process.env.USER,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: process.env.DB_TYPE,
      port: process.env.PORTBD,
    }
  );
} else if (process.env.DB_TYPE === "postgres") {
  sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      host: process.env.POSTGRES_HOST,
      dialect: "postgres", // Forzamos el string directo para evitar errores de env
      dialectModule: pg,
      pool: {
        max: 2,          // Máximo 2 conexiones para no saturar Vercel
        min: 0,
        idle: 5000,      // Liberar conexión tras 5 seg de inactividad
        acquire: 60000,  // IMPORTANTE: Esperar hasta 60s si la BD está "durmiendo"
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 30000, // 30s de timeout de red
        keepAlive: true, // Mantiene la conexión viva
      },
      logging: false,
    }
  );
}

module.exports = sequelize;