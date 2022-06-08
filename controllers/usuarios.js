const { request, response } = require("express");

// const { validationResult } = require("express-validator");

// importar modelo de usuario
const Usuario = require("../models/usuario");

// importar bcryptjs

const bcryptjs = require("bcryptjs");

// ------------------ metodo get -----------------------

const usuariosGet = async (req = request, res = response) => {
  //   const query = req.query;
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find().skip(desde).limit(limite);
  // const total = await Usuario.countDocuments();

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

// ---------------------- metodo post ----------------------

const usuariosPost = async (req = request, res = response) => {
  // recibir la respues del check del correo
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json(errors);
  // }

  const datos = req.body;

  const { nombre, correo, password, rol } = datos;

  const usuario = new Usuario({ nombre, correo, password, rol });

  // verificar el correo
  // const existeEmail = await Usuario.findOne({ correo });

  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "El correo ya existe",
  //   });
  // }

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

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { password, correo, google, ...resto } = req.body;

  // validar el password contra la base de datos

  if (password) {
    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  // actualizo los datos
  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "PUT - info actualizada",
    usuario,
  });
};

// ---------------------- metodo delete ------------------------

const usuariosDelete = async (req = request, res = response) => {
  const id = req.params.id;

  // eliminar fisicamente el registro
  // const usuarioBorrado = await Usuario.findByIdAndDelete(id);

  // inactivar el registro
  const usuarioBorrado = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    // msg: "DELETE - Info eliminada",
    // id,
    usuarioBorrado,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
