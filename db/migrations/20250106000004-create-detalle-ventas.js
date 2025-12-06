'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleVentas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ventaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Ventas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Productos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });

    // Crear índices para mejorar el rendimiento
    await queryInterface.addIndex('DetalleVentas', ['ventaId'], {
      name: 'idx_detalle_ventas_venta_id'
    });

    await queryInterface.addIndex('DetalleVentas', ['productoId'], {
      name: 'idx_detalle_ventas_producto_id'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetalleVentas');
  }
};

