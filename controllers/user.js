const bcrypt = require('bcrypt');
const User = require("../models/user")
const service = require("../services")

function registrar(req, res) {
    const user = new User({
        displayName: req.body.displayName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    user.save((err) => {
        if (err) return res.status(500).send({
             message: `Error al registrarse: ${err}` 
        })
        return res.status(200).send({ 
            token: service.createToken(user) })
        })
    }

function loguear(req, res) {
    User.findOne({ username: req.body.username }).select('username +password').exec(function (err, user) {
        if (err) return res.status(500).send({ 
            message: err 
        })
        if (user == null) {
            return res.status(404).send({ 
                message: 'Usuario incorrecto' 
            })
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            req.user = user
            res.status(200).send({
                message: 'Login correcto',
                token: service.createToken(user),
            })
        }else {
            res.status(500).send({
                message: 'Login incorrecto',
                token: service.createToken(user),
            })
        }
    })
}

function agregarGPSLocation(req, res) {
    var currentDate = new Date();
    User.updateOne({ username: req.username },
        { $push: { gps_location: { 
            gpsLatitud: req.body.gpsLatitud, 
            gpsLongitud: req.body.gpsLongitud, 
            hora: currentDate.getHours(), 
            fecha: Date.now() } 
        } 
    },
        (err, extr) => {
            if (err) {
                res.status(500).send("Error al añadir la localización")
            } else {
                res.status(200).send("Localización añadida correctamente")
            }
        })
}

function obtenerGPSLocation(req, res) {
    User.findOne({ username: req.username }).select('username gps_location').exec(function (err, user) {
        if (err) return res.status(500).send({ message: err })
        res.status(200).send({
            message: 'Usuario encontrado',
            gpsInfo: user.gps_location,
        })
    })
}

function eliminarGPSLocation(req, res){
    User.updateOne({username: req.username},
        {"$set":{"gps_location":[]}
        },function(err, user){
        if(user == null) {
            return res.status(500).send({
                message: `El usuario no existe: ${err}`})
        }
        if(err){ return res.status(500).send({
            message: `El usuario no existe: ${err}`})
        }
        res.status(200).send({
            message: "Se eliminó la ruta de forma correcta"})
    })
}

module.exports = {
    registrar,
    loguear,
    agregarGPSLocation,
    obtenerGPSLocation,
    eliminarGPSLocation
}