const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol) => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`Èl rol ${rol} no esta en la base de datos`);
  }
};

const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({ correo });

  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado`);
  }
};

const usuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`No existe un usuario con el id ${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExiste,
};
