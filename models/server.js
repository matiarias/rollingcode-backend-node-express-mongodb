const express = require("express");
const cors = require("cors");
// ------- importando la configuración de la conección con la base de datos --------
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // conectar base de datos

    this.conectarDB();

    // middlewares

    this.middlewares();

    // rutas
    this.routes();
  }

  // funcion para conectar a la base de datos mongoDB que importamos desde config.js

  async conectarDB() {
    await dbConnection();
  }

  // ---------------------- middlewares ---------------------------

  middlewares() {
    // cors
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static("public"));
  }

  // ------------------------- rutas -----------------------------

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));

    // this.app.get("/api", (req, res) => {
    //   res.json({
    //     msg: "Bienvenido al modulo de Backend de RollingCode",
    //   });
    // });

    // this.app.post("/api", (req, res) => {
    //   res.status("201").json({
    //     msg: "POST - info creada",
    //   });
    // });

    // this.app.put("/api", (req, res) => {
    //   res.json({
    //     msg: "PUT - info actualizada",
    //   });
    // });

    // this.app.delete("/api", (req, res) => {
    //   res.json({
    //     msg: "DELETE - Info eliminada",
    //   });
    // });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
