'use strict'

const User = require('../models/user')
const service = require('../services')
var users = [];

function postUsuarios(req, res){
    var user = {};
    user.displayName = req.body.displayName;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.push(user);
    return res.send(user);
}

function getUsuarios(req, res){
  return res.send(users);
}

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
    res.status(201).send({ token: service.createToken(user) })
});
  
}

function signIn (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'No existe el usuario' })

    req.user = user
    res.sendFile('profile.ejs')
    res.status(200).send({
      message: 'Te has logueado correctamente',
      token: service.createToken(user)
    })
    
  })
}

module.exports = {
  signUp,
  signIn,
  postUsuarios,
  getUsuarios
}
