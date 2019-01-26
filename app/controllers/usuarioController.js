var express = require('express'),
  config = require('../../config/config'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario');

  module.exports = function(app) {
    app.use('/', router);
  };
/**
 *  Método: POST
    URI: /registro
    Descripción: Inserta el registro de la cuenta del usuario.
    Datos de entrada:
    nombreCliente, nombreUsuario, contrasenaUsuario, emailUsuario, fechaRegistroUsuario
 */
  router.post('/registro', function(req, res, next) {
    var newUser = new Article({
        idUsuario: req.body.idUsuario,
        nombreCliente: req.body.nombreCliente,
        nombreUsuario: req.body.nombreUsuario,
        contrasenaUsuario: req.body.contrasenaUsuario
    });
    newUser.save(function(err, newUser) {
      if (err) return next(err);
      res.redirect(config.baseUrl);
    });
  });

