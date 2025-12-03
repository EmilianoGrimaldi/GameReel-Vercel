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
      // Configuración del Pool para Serverless (IMPORTANTE)
      pool: {
        max: 5,     // Máximo de conexiones
        min: 0,     // Mínimo 0 para que no mantenga conexiones abiertas innecesariamente en serverless
        acquire: 30000, // Tiempo máximo (ms) para intentar conectar antes de tirar error (30 seg)
        idle: 10000  // Tiempo (ms) para liberar conexión si no se usa
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
        // Aumentar timeout de conexión para bases de datos que "duermen"
        connectionTimeoutMillis: 10000, 
      },
    }
  );
}

module.exports = sequelize;
