const express = require("express");
const app = express();
require("dotenv").config();
//process.loadEnvFile();

// Manejo de errores no capturados para evitar crashes en Vercel
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // No terminar el proceso, solo loguear el error
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // No terminar el proceso en producción
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// Deshabilitar cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// Config. EJS
const ejs = require("ejs");
const path = require("path");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "./public/uploads")));

// Importante para tomar datos del body!
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//Conexion a db
const sequelize = require("./db/sequelize.js");
const relacionarEntidades = require("./entity/relaciones.js");
relacionarEntidades();

// Sincronización lazy - solo en desarrollo o cuando sea necesario
// En producción/Vercel, las tablas ya deben existir
if (process.env.NODE_ENV !== "production" && process.env.SYNC_DB === "true") {
  sequelize.ensureConnection().then(() => {
    sequelize.sync({ alter: false }).catch((err) => {
      console.error("Error al sincronizar la base de datos:", err.message);
    });
  }).catch((err) => {
    console.error("Error al conectar antes de sincronizar:", err.message);
  });
}

//Inicio de rutas
const productosRoutes = require("./routes/productos.routes.js");
app.use("/pantalla-productos", productosRoutes);

const abmRoutes = require("./routes/abm.routes.js");
app.use("/abm", abmRoutes);

const ventasRoutes = require("./routes/ventas.routes.js");
app.use("/carrito", ventasRoutes);

const detalleVentaRoutes = require("./routes/detalleVentas.routes.js");
app.use("/ticket", detalleVentaRoutes);

const adminRoutes = require("./routes/admin.routes.js");
app.use("/admin", adminRoutes);

app.get("/", async (req, res) => {
  res.render("../public/landing-page.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App started!");
});

module.exports = app;