const Producto = require("./producto.entity");
const Venta = require("./venta.entity");
const DetalleVenta = require("./detalleVenta.entity");

function relacionarEntidades() {
  Venta.belongsToMany(Producto, {
    through: DetalleVenta,
    foreignKey: "ventaId",
  });

  Producto.belongsToMany(Venta, {
    through: DetalleVenta,
    foreignKey: "productoId",
  });
}

module.exports = relacionarEntidades;
