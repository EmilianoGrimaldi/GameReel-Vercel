const express = require("express");
const router = express.Router();
const Producto = require("../model/producto.js");
const ProductoSequelize = require("../entity/producto.entity.js");

router.get("/", async (req, res) => {
  try {
    const { page = 0, size = 4 } = req.query;
    const currentPage = Number(page);
    const pageSize = Number(size);

    const options = {
      limit: pageSize,
      offset: currentPage * pageSize,
      where: {
        activo: true,
      },
    };

    const { count, rows } = await ProductoSequelize.findAndCountAll(options);

    const totalPages = Math.ceil(count / pageSize);

    res.render("pantalla-productos", {
      productos: rows,
      currentPage,
      totalPages,
      size: pageSize,
      modo: "todo",
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "No se pueden mostrar los productos", status: 400 });
  }
});

router.get("/juegos", async (req, res) => {
  try {
    const { page = 0, size = 4 } = req.query;
    const currentPage = Number(page);
    const pageSize = Number(size);

    const options = {
      where: {
        activo: true,
        descripcion: "Juego",
      },
      limit: pageSize,
      offset: currentPage * pageSize,
    };

    const { count, rows } = await ProductoSequelize.findAndCountAll(options);

    const totalPages = Math.ceil(count / pageSize);

    res.render("pantalla-productos", {
      productos: rows,
      currentPage,
      totalPages,
      size: pageSize,
      modo: "juegos",
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "No se pueden mostrar los productos", status: 400 });
  }
});

router.get("/peliculas", async (req, res) => {
  try {
    const { page = 0, size = 4 } = req.query; // Parámetros para paginación
    const currentPage = Number(page);
    const pageSize = Number(size);

    const options = {
      where: {
        activo: true,
        descripcion: "Pelicula",
      },
      limit: pageSize,
      offset: currentPage * pageSize,
    };

    const { count, rows } = await ProductoSequelize.findAndCountAll(options);

    const totalPages = Math.ceil(count / pageSize);

    res.render("pantalla-productos", {
      productos: rows,
      currentPage,
      totalPages,
      size: pageSize,
      modo: "peliculas",
    });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "No se pueden mostrar los productos", status: 400 });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const resultado = await ProductoSequelize.findOne({
      where: {
        id: req.params.id,
        activo: true,
      },
    });

    res.send(resultado);
  } catch (error) {
    res.send("Error");
  }
});

module.exports = router;
