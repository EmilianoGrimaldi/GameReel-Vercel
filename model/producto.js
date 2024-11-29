class Producto {
  nombre;
  precio;
  portada;
  descripcion;
  activo;

  constructor(nombre, precio, portada, descripcion, activo) {
    this.nombre = nombre;
    this.precio = precio;
    this.portada = portada;
    this.descripcion = descripcion;
    this.activo = activo;
  }

  toJson() {
    return JSON.stringify(this);
  }
}

module.exports = Producto;
