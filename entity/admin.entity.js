const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");

const AdminSequelize = sequelize.define(
  "Administrador",
  {
    user: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buffer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = AdminSequelize;
