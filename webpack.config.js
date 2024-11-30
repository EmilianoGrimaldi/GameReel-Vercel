const path = require("path");

module.exports = {
  entry: "./index.js", // Archivo de entrada
  output: {
    path: path.resolve(__dirname, "dist"), // Carpeta de salida
    filename: "bundle.js", // Nombre del archivo de salida
  },
  mode: "production", // Cambia a 'development' para desarrollo
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica a archivos .js
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Permite usar nuevas características de JS
          options: {
            presets: ["@babel/preset-env"], // Transpila código moderno a JS compatible con navegadores
          },
        },
      },
    ],
  },
};
