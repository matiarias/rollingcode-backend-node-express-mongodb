// extraemos de mongoose un Schema (esquema) y un model. para crear un modelo de usuario basado en un esquema

const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },

  correo: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },

  img: {
    type: String,
  },

  rol: {
    type: String,
    required: true,
    // enum: ["USER_ROLE", "ADMIN_ROLE", "VENTA_ROLE"],
  },

  estado: {
    type: Boolean,
    default: true,
  },

  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
