const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  usuarioExiste,
} = require("../helpers/db-validators");
// const Role = require("../models/role");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "La contraseña debe tener como minimo 6 caracteres y como maximo 15 caracteres"
    ).isLength({ min: 6, max: 15 }),
    check("correo", "No es un correo valido").isEmail(),
    check("correo").custom(emailExiste),
    // check("rol", "El rol no es valido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(usuarioExiste),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
