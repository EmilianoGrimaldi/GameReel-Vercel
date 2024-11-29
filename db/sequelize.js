// conexion db
let Sequelize = require("sequelize");
const pg = require("pg");
let sequelize;
var db = {};
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
    }
  );
  //sequelize = new Sequelize(process.env.POSTGRES_URL);
}
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
