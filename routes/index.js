const express = require('express')
const userController = require("../controllers/user")
const api  = express.Router()
const auth = require('../middlewares/auth')

api.post("/signup", userController.registrar)
api.post('/login', userController.loguear)
api.post("/location", auth, userController.agregarGPSLocation)
api.get("/locations", auth, userController.obtenerGPSLocation)

module.exports = api