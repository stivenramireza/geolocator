'use strict'

const express = require('express')
const locationCtrl = require('../controllers/location')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

// Servicios Web autenticados
api.get('/location', auth, locationCtrl.getLocations)
api.get('/location/:locationId', locationCtrl.getLocation)
api.post('/location', auth, locationCtrl.saveLocation)
api.put('/location/:locationId', auth, locationCtrl.updateLocation)
api.delete('/location/:locationId', auth, locationCtrl.deleteLocation)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.post("/users/save", userCtrl.postUsuarios)
api.get("/users/all", userCtrl.getUsuarios)

module.exports = api