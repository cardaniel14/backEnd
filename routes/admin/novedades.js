var express = require("express");
var router = express.Router();
var novedadesModel = require("../../models/novedadesModel");

router.use(express.static("public"));

router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedaddes();
  console.log("novedades: ", novedades);
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

router.get("/eliminar/:id", async (req, res, next) => {
  var id = req.params.id;
  await novedadesModel.deleteNovedades(id);
  res.redirect("/admin/novedades");
});

router.get("/modificar/:id", async (req, res, next) => {
  console.log("get/modificar/id");
  try {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadesById(id);
    console.log("algo bonito", novedad);
    // res.render("admin/modificar", {
    //   layout: "admin/layout",
    //   novedad,
    // });
    return novedad;
  } catch (error) {
    console.log(error);
    res.render("error", { error });
  }
});

router.post("/modificar/", async (req, res, next) => {
  console.log("post/modificar/id");
  try {
    var id = req.body.modifyModalId;
    console.log("id", id);
    var obj = {
      titulo: req.body.modifyModalTitulo,
      subtitulo: req.body.modifyModalSubtitulo,
      cuerpo: req.body.modifyModalCuerpo,
    };
    console.log("body Id", req.body.modifyModalId);
    var novedad1 = await novedadesModel.updateNovedadesById(obj, id);
    console.log("novedad1", novedad1);
    res.redirect("/admin/novedades");
  } catch (error) {
    console.log(error);
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "No se modifico la novedad",
      novedad: req.body,
    });
  }
});

module.exports = router;
