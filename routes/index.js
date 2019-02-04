'use strict'

const express = require('express')
const locationCtrl = require('../controllers/location')
const userCtrl = require('../controllers/user')
const api = express.Router()
const auth = require('../middlewares/auth')

// Servicios Web autenticados
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

module.exports = api