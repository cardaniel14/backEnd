var express = require('express');
var router = express.Router();
var novedadesModel = require('./../models/novedadesModel');
var cloudinary = require('cloudinary').v2;
var nodemailer = require("nodemailer");

router.get('/novedades', async function (req, res, next) {

	var novedades = await novedadesModel.getNovedaddes();

	novedades = novedades.map(novedades => {

		if (novedades.img_id) {
			const imagen = cloudinary.url(novedades.img_id, {
				width: 400,
				height: 400,
			});
			return {
				...novedades,
				imagen
			}
		} else {
			return {
				...novedades,
				imagen: ' /'
			}
		}
	});
	res.json(novedades);
});

router.post('/contacto', async function (req, res, next) {
	const mail = {
		to: "carlosderazo.07@gmail.com",
		subject: "Contacto web",
		html: `${req.body.name} se contacto a traves de la web y quiere mas informacion a este correo: ${req.body.email}. <br> Ademas, hizo el siguiente comentario: ${req.body.message}`,
	}

	const transport = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	});

	await transport.sendMail(mail);

	res.status(201).json({
		error: false,
		message: 'Mensaje enviado'
	})
	})


module.exports = router;