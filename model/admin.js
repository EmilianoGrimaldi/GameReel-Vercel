class Admin {
  correo;
  contrasenia;

  constructor() {}

  toJson() {
    return JSON.stringify(this);
  }
}

module.exports = Admin;
