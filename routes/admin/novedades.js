var express = require("express");
var router = express.Router();
var novedadesModel = require("../../models/novedadesModel");
var util = require("util");
var cloudinary = require("cloudinary").v2;
var uploader = util.promisify(cloudinary.uploader.upload);

router.use(express.static("public"));

router.get("/", async function (req, res, next) {
  var novedades = await novedadesModel.getNovedaddes();

  novedades = novedades.map((novedad) => {
    if (novedad.img_id) {
      const imagen = cloudinary.image(novedad.img_id, {
        width: 80,
        height: 80,
        crop: "fill",
        borderRadius: "20%",
      });
      return {
        ...novedad, //por que le paso el spread?
        imagen,
      };
    } else {
      return {
        ...novedad,
      };
    }
  });
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
    var img_id = "";

    if (req.files && Object.keys(req.files).length > 0) {
      imagen = req.files.imagen;
      img_id = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (
      req.body.titulo != "" &&
      req.body.subtitulo != "" &&
      req.body.cuerpo != ""
    ) {
      await novedadesModel.insertNovedad({
        //Abre un objeto por que?
        ...req.body, //Por que tra el spread??
        img_id,
      });
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

    var obj = {
      titulo: req.body.modifyModalTitulo,
      subtitulo: req.body.modifyModalSubtitulo,
      cuerpo: req.body.modifyModalCuerpo,
    };

    var novedad1 = await novedadesModel.updateNovedadesById(obj, id);
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
