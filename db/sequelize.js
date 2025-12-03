// db/sequelize.js
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
      dialect: process.env.DB_TYPE,
      dialectModule: pg,
      // // --- INICIO DE LA SOLUCIÓN ---
      // // 1. Configuración del Pool para Serverless:
      // // Evita mantener conexiones abiertas innecesariamente y espera más tiempo.
      // pool: {
      //   max: 2,         // Mantenlo bajo en Vercel para no saturar la base de datos
      //   min: 0,         // Mínimo 0 para desconectar cuando no se use
      //   idle: 10000,    // Desconectar tras 10 segundos de inactividad
      //   acquire: 60000, // IMPORTANTE: Esperar hasta 60 segundos a que la BD responda
      // },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        // 2. Aumentar el tiempo de espera de conexión TCP:
        //connectionTimeoutMillis: 30000, // Esperar 30 segundos antes de tirar error de red
      },
      // --- FIN DE LA SOLUCIÓN ---
      //logging: false, // Opcional: limpia la consola de logs SQL
    }
  );
}

module.exports = sequelize;