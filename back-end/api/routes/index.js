'use strict'

const express = require('express')
const locationCtrl = require('../controllers/location')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/location', auth, locationCtrl.getLocations)
api.get('/location/:locationId', locationCtrl.getLocation)
api.post('/location', auth, locationCtrl.saveLocation)
api.put('/location/:locationId', auth, locationCtrl.updateLocation)
api.delete('/location/:locationId', auth, locationCtrl.deleteLocation)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api