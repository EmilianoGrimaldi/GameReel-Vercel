const express = require("express");
const router = express.Router();
const Admin = require("../model/admin.js");
const AdminSequelize = require("../entity/admin.entity.js");
const crypto = require("crypto");

const claveSecretaDelServer = process.env.CLAVE_SECRETA;
const algoritmo = "aes-256-cbc";

function encriptar(password) {
  const iv = crypto.randomBytes(16);
  const encriptador = crypto.createCipheriv(
    algoritmo,
    claveSecretaDelServer,
    iv
  );

  let encriptado = encriptador.update(password, "utf8", "hex");
  encriptado += encriptador.final("hex");

  return { iv, encriptado };
}

function desencriptar(iv, passEncriptada) {
  const decifrador = crypto.createDecipheriv(
    algoritmo,
    claveSecretaDelServer,
    Buffer.from(iv, "hex")
  );

  let decifrado = decifrador.update(passEncriptada, "hex", "utf8");
  decifrado += decifrador.final("utf8");
  return decifrado;
}

const validarIngresoAdmin = (req, res, next) => {
  const { user, contrasenia } = req.body;

  if (user === "" && contrasenia === "") {
    return res.json({
      mensaje: "Usuario y contraseña requerido",
      status: 400,
    });
  }

  if (!user) {
    return res.json({
      mensaje: "Usuario requerido",
      status: 400,
    });
  }

  if (!contrasenia) {
    return res.json({
      mensaje: "Contraseña requerida",
      status: 400,
    });
  }

  next();
};

router.post("/login", validarIngresoAdmin, async (req, res) => {
  try {
    const { user, contrasenia } = req.body;

    const admin = await AdminSequelize.findOne({
      where: { user },
    });

    if (!admin) {
      return res.json({
        mensaje: "Administrador no encontrado.",
        status: 404,
      });
    }

    const contraseniaDescifrada = desencriptar(admin.buffer, admin.contraseña);

    if (contrasenia !== contraseniaDescifrada) {
      return res.json({
        mensaje: "Contraseña incorrecta.",
        status: 400,
      });
    }

    res.json({
      mensaje: "Inicio de sesión exitoso.",
      status: 200,
    });
  } catch (error) {
    res.json({
      mensaje: `Error en el inicio de sesión: ${error.message}`,
      status: 400,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const existeAdmin = await AdminSequelize.findOne();

    if (existeAdmin) {
      return res.json({
        mensaje: "El administrador ya existe. No se puede crear otro.",
        status: 400,
      });
    }

    const user = "admin";
    const contrasenia = "asdasd";

    const { encriptado, iv } = encriptar(contrasenia);

    await AdminSequelize.create({
      user,
      contraseña: encriptado,
      buffer: iv.toString("hex"),
    });

    res.json({
      mensaje: "Administrador creado exitosamente.",
      status: 200,
    });
  } catch (error) {
    res.json({
      mensaje: `Error al crear el administrador: ${error.message}`,
      status: 400,
    });
  }
});

module.exports = router;
