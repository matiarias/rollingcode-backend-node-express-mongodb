const { request, response } = require("express");

const { validationResult, Result } = require("express-validator");

// importar modelo de usuario
const Usuario = require("../models/usuario");

// importar bcryptjs

const bcryptjs = require("bcryptjs");

// ------------------ metodo get -----------------------

const usuariosGet = (req = request, res = response) => {
  //   const query = req.query;
  const { nombre = "No Name", apikey, limit = "5" } = req.query;

  res.json({
    msg: "Bienvenido al modulo de Backend de RollingCode",
    nombre,
    apikey,
    limit,
  });
};

// ---------------------- metodo post ----------------------

const usuariosPost = async (req = request, res = response) => {
  // recibir la respues del check del correo
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const datos = req.body;

  const { nombre, correo, password, rol } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol });

  // verificar el correo
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    return res.status(400).json({
      msg: "El correo ya existe",
    });
  }

  // encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // guardar los datos en la base de datos
  await usuario.save();

  res.status("201").json({
    usuario,
  });
};

// --------------------- metodo put ------------------------

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "PUT - info actualizada",
    id,
  });
};

// ---------------------- metodo delete ------------------------

const usuariosDelete = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "DELETE - Info eliminada",
    id,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
