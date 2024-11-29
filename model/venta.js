class Venta {
  usuario;
  producto;
  cantidad;
  total;

  constructor(usuario, producto, cantidad, total) {
    this.usuario = usuario;
    this.producto = producto;
    this.cantidad = cantidad;
    this.total = total;
  }

  toJson() {
    return JSON.stringify(this);
  }
}

module.exports = Venta;
