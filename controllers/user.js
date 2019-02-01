'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp (req, res) {
  const user = new User({
    displayName: req.body.displayName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  user.save(function (err, newUser) {
    if (err) {
        console.error(err);
        return next(err);
    }
    console.log('---------------> Nuevo usuario registrado: ', newUser);
    res.status(200);
    res.redirect(301, '/login/');
});
  
}

function signIn (req, res) {
  var credentials = {
    username: req.body.username,
    password: req.body.password
  };

  User.findOne(credentials, function (err, user) {
    if (err) {
        console.error(err);
        return next(err);
    }
    if (user === null) {
        console.log('------------> Usuario no registrado');
        res.redirect('index');
    }else {
        console.log('------------> Usuario logueado: ', user.username);
        //res.render('profile');
        req.user = user
        res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(user)
      })
    }
  });
}

module.exports = {
  signUp,
  signIn
}
