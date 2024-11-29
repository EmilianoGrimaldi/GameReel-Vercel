const express = require("express");
const router = express.Router();
const VentaSequelize = require("../entity/venta.entity.js");
const DetalleVentaSequelize = require("../entity/detalleVenta.entity.js");
const ProductoSequelize = require("../entity/producto.entity.js");
const XLSX = require("xlsx");
const { PDFDocument, rgb, StandardFonts } = require("pdf-lib");

router.get("/listado", async (req, res) => {
  try {
    const ventas = await VentaSequelize.findAll({
      include: [
        {
          model: ProductoSequelize,
          through: DetalleVentaSequelize,
        },
      ],
    });

    const data = [];
    for (const venta of ventas) {
      const productos = await venta.getProductos();
      for (const producto of productos) {
        data.push({
          Numero_De_Venta: venta.id,
          Fecha_De_Venta: venta.FechaVenta,
          Cliente: venta.usuario,
          Producto: producto.nombre,
          Cantidad: producto.DetalleVenta.cantidad,
          PrecioUnitario: producto.precio,
          Subtotal: producto.DetalleVenta.subtotal,
          Total_De_Venta: venta.total,
        });
      }
    }

    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(libro, hoja, "Hoja1");

    const buffer = XLSX.write(libro, { type: "buffer" });

    res.type("application/vnd.ms-excel");
    res.attachment("Listado_Ventas.xlsx");
    res.send(buffer);
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send("Error en el servidor");
  }
});

router.get("/pdf/:id", async (req, res) => {
  try {
    const venta = await VentaSequelize.findByPk(req.params.id);
    const productos = await venta.getProductos();

    const fecha = new Date(venta.FechaVenta);
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const fechaFormateada = fecha.toLocaleDateString("es-AR", opciones);
    const horaFormateada = fecha.toLocaleTimeString("es-AR");
    const fechaCompleta = `${fechaFormateada}, ${horaFormateada}`;

    const documento = await PDFDocument.create();
    const pagina = documento.addPage([600, 800]);

    pagina.drawText("GAME REEL", {
      x: 240,
      y: 750,
      size: 20,
    });

    pagina.drawText("Comprobante de pago", {
      x: 210,
      y: 720,
      size: 16,
    });

    pagina.drawText(`Fecha de compra: ${fechaCompleta}`, {
      x: 50,
      y: 680,
      size: 14,
    });
    pagina.drawText(`ID de compra: ${venta.id}`, { x: 50, y: 660, size: 14 });
    pagina.drawText(`Cliente: ${venta.usuario}`, { x: 50, y: 640, size: 14 });

    pagina.drawText("Detalle de compra", {
      x: 210,
      y: 600,
      size: 16,
    });

    pagina.drawText("Producto", { x: 50, y: 570, size: 12 });
    pagina.drawText("Cantidad", { x: 200, y: 570, size: 12 });
    pagina.drawText("P. Unitario", { x: 320, y: 570, size: 12 });
    pagina.drawText("Subtotal", { x: 440, y: 570, size: 12 });

    let y = 550;
    productos.forEach((producto) => {
      pagina.drawText(producto.nombre, { x: 50, y, size: 12 });
      pagina.drawText(`${producto.DetalleVenta.cantidad}`, {
        x: 200,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      pagina.drawText(`$${producto.precio}`, {
        x: 320,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      pagina.drawText(`$${producto.DetalleVenta.subtotal}`, {
        x: 440,
        y,
        size: 12,
        color: rgb(0, 0, 0),
      });
      y -= 20;
    });

    pagina.drawText(`Total de la venta: $${venta.total}`, {
      x: 50,
      y: 440,
      size: 20,
    });

    // Exportar PDF
    const pdfBytes = await documento.save();
    res.type("application/pdf");
    res.attachment(`Ticket_${venta.id}.pdf`);
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error al generar el PDF");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const venta = await VentaSequelize.findByPk(req.params.id);

    const ventaJSON = venta.toJSON();

    const fecha = new Date(ventaJSON.FechaVenta);
    const opciones = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const fechaFormateada = fecha.toLocaleDateString("es-AR", opciones);
    const horaFormateada = fecha.toLocaleTimeString("es-AR");

    const fechaCompleta = `${fechaFormateada}, ${horaFormateada}`;

    const productos = await venta.getProductos();

    res.render("ticket", {
      venta: { ...ventaJSON, FechaVenta: fechaCompleta },
      productos,
    });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).send("Error en el servidor");
  }
});

module.exports = router;
