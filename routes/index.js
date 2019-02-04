'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api = express.Router()
const auth = require('../middlewares/auth')

// Servicios Web autenticados
api.post("/signup", userCtrl.signup)
api.post('/login', userCtrl.login)

module.exports = api