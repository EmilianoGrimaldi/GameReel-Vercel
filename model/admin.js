class Admin {
  correo;
  contraseña;

  constructor() {}

  toJson() {
    return JSON.stringify(this);
  }
}

module.exports = Admin;
