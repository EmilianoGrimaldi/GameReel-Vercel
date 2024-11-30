const path = require("path");

module.exports = {
  entry: "C:/Users/grima/OneDrive/Escritorio/GameReel Vercel/public/js/abm.js", // Tu archivo principal
  output: {
    filename: "bundle.js", // Salida empaquetada
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
