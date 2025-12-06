'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Administradores', {
      user: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      contrasenia: {
        type: Sequelize.STRING,
        allowNull: false
      },
      buffer: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Administradores');
  }
};

