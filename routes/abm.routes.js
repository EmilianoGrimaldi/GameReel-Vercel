const express = require("express");
const router = express.Router();
const Producto = require("../model/producto.js");
const ProductoSequelize = require("../entity/producto.entity.js");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    const mimetype = file.mimetype;
    const [tipo, extension] = mimetype.split("/");
    if (tipo !== "image") {
      callback(new Error("No es imagen"));
    } else {
      const nombre = file.originalname;
      callback(null, nombre);
    }
  },
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
});
const uploads = multer({ storage: storage });

const validarCamposProductos = (req, res, next) => {
  const nombre = req.body.nombre;
  const precio = parseFloat(req.body.precio);
  const portada = req.file ? req.file.filename : undefined;
  const descripcion = req.body.descripcion;
  if (typeof descripcion !== "string" || descripcion.trim() === "") {
    return res.json({
      mensaje:
        "Error, el campo descripción es obligatorio. Indicar el tipo de producto.",
      status: 400,
    });
  }
  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.json({ mensaje: "El campo nombre es obligatorio", status: 400 });
  }
  if (typeof precio !== "number" || parseFloat(precio) <= 0 || isNaN(precio)) {
    return res.json({
      mensaje: "El campo precio es obligatorio y debe ser mayor a cero.",
      status: 400,
    });
  }
  if (portada === undefined) {
    return res.json({
      mensaje: "Error, el campo imagen es obligatorio",
      status: 400,
    });
  }

  next();
};

router.get("/", async (req, res) => {
  try {
    const productos = await ProductoSequelize.findAll();
    res.render("abm", { productos });
  } catch (error) {
    res.json({ mensaje: "Error al mostrar los productos", status: 400 });
  }
});

router.post(
  "/",
  uploads.single("portada"),
  validarCamposProductos,
  async (req, res) => {
    try {
      const nombre = req.body.nombre;
      const precio = parseFloat(req.body.precio);
      const portada = req.file ? req.file.filename : undefined;
      const descripcion = req.body.descripcion;

      const producto = new Producto();
      producto.nombre = nombre;
      producto.precio = precio;
      producto.portada = portada;
      producto.descripcion = descripcion;

      const resultado = await ProductoSequelize.create({
        ...producto,
      });
      res
        .status(200)
        .json({ mensaje: "Producto agregado con exito", status: 200 });
    } catch (error) {
      res
        .status(400)
        .json({ mensaje: "Error al agregar el producto", status: 400 });
    }
  }
);
router.get("/juegos", async (req, res) => {
  try {
    const productos = await ProductoSequelize.findAll({
      where: {
        descripcion: "Juego",
      },
    });
    res.render("abm", { productos });
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "No se pueden mostrar los productos", status: 400 });
  }
});

router.get("/peliculas", async (req, res) => {
  try {
    const productos = await ProductoSequelize.findAll({
      where: {
        descripcion: "Pelicula",
      },
    });
    res.render("abm", { productos });
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
    if (resultado) {
      res.send(resultado);
    } else {
      res.json({
        mensaje: "No se encontro el producto solicitado",
        status: 400,
      });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error al traer productos", status: 400 });
  }
});

router.put("/:id", uploads.single("portada"), async (req, res) => {
  try {
    const { nombre, precio, descripcion } = req.body;
    const portada = req.file ? req.file.filename : undefined;
    const camposActualizados = {
      nombre,
      precio: parseFloat(precio),
      descripcion,
    };
    if (portada) {
      camposActualizados.portada = portada;
    }

    const resultado = await ProductoSequelize.update(camposActualizados, {
      where: {
        id: req.params.id,
        activo: true,
      },
    });
    if (!resultado) {
      res.status(204).json({ mensaje: "No se pudo modificar", status: 204 });
    } else {
      res
        .status(200)
        .json({ mensaje: "Se pudo modificar con exito", status: 200 });
    }
  } catch (error) {
    res.status(400).json({ mensaje: "Error al editar productos", status: 400 });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const resultado = await ProductoSequelize.update(
      { activo: false },
      { where: { id: req.params.id } }
    );
    if (resultado) {
      res
        .status(200)
        .json({ mensaje: "Producto eliminado con exito", status: 200 });
    }
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "No se pudo eliminar el producto", status: 400 });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const resultado = await ProductoSequelize.update(
      { activo: true },
      { where: { id: req.params.id } }
    );
    if (resultado) {
      res
        .status(200)
        .json({ mensaje: "Producto reactivado con exito", status: 200 });
    }
  } catch (error) {
    res
      .status(400)
      .json({ mensaje: "No se pudo reactivar el producto", status: 400 });
  }
});

module.exports = router;
