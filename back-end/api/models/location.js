'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = Schema({
  gps_latitud: String,
  gps_longitud: String,
  gps_hora: String,
  gps_fecha: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Location', LocationSchema)