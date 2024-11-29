const express = require("express");
const router = express.Router();
const VentaSequelize = require("../entity/venta.entity.js");
const DetalleVenta = require("../entity/detalleVenta.entity.js");

router.post("/", async (req, res) => {
  try {
    await VentaSequelize.sync();
    await DetalleVenta.sync();
    const { usuario, carrito } = req.body;

    let totalVenta = 0;

    for (const item of carrito) {
      totalVenta += item.precio * item.cantidad;
    }
    const nuevaVenta = await VentaSequelize.create({
      usuario: usuario,
      total: totalVenta,
    });

    for (const item of carrito) {
      await DetalleVenta.create({
        ventaId: nuevaVenta.id,
        productoId: item.id,
        cantidad: item.cantidad,
        subtotal: item.precio * item.cantidad,
      });
    }

    res.json({ ventaId: nuevaVenta.id });
  } catch (error) {
    console.error("Error al procesar la venta:", error);
    res.status(500).send({
      success: false,
      message: "Hubo un error al procesar la venta.",
    });
  }
});

module.exports = router;
