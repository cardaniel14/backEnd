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
      console.log("condicional ejecutado");
      await novedadesModel.insertNovedad(req.body);
      res.redirect("/admin/novedades");
    } else {
      var novedades = await novedadesModel.getNovedaddes();
      res.render("admin/novedades", {
        layout: "admin/layout",
        nombre: req.session.nombre,
        novedades,
        error: true,
        message: "Todos los campos son requeridos",
      });
    }
  } catch (error) {
    var novedades = await novedadesModel.getNovedaddes();
    console.log(error);
    res.render("admin/novedades", {
      layout: "admin/layout",
      error: true,
      message: "No se cargo la novedad",
      novedades,
    });
  }
});
module.exports = router;
