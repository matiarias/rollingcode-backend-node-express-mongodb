const { request, response } = require("express");

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

const usuariosPost = (req = request, res = response) => {
  const datos = req.body;

  res.status("201").json({
    msg: "POST - info creada",
    datos,
  });
};

const usuariosPut = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "PUT - info actualizada",
    id,
  });
};

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
