var express = require("express");
var router = express.Router();
var novedadesModel = require("../../models/novedadesModel");

router.use(express.static("public"));

router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedaddes();

  res.render("admin/novedades", {
    layout: "admin/layout",
    nombre: req.session.nombre,
    novedades,
  });
});

router.get("/agregar", (req, res, next) => {
  res.render("admin/novedades", {
    layout: "admin/layout",
  });
});

router.post("/agregar", async (req, res, next) => {
  try {
    console.log(req.body);
    if (
      req.body.titulo != "" &&
      req.body.subtitulo != "" &&
      req.body.cuerpo != ""
    ) {
      await novedadesModel.insertNovedad(req.body);
      res.redirect("/admin/novedades");
    } else {
      res.render("admin/novedades", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    console.log(error);
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message: "No se cargo la novedad",
    });
  }
});
module.exports = router;
