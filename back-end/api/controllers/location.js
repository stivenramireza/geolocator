'use strict'

const Location = require('../models/location')

function getLocation (req, res) {
  let locationId = req.params.locationId

  Location.findById(locationId, (err, location) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!location) return res.status(404).send({message: `La localización no existe`})

    res.status(200).send({ location })
  })
}

function getLocations (req, res) {
  Location.find({}, (err, locations) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!locations) return res.status(404).send({message: 'No existen localizaciones'})

    res.send(200, { locations })
  })
}

function saveLocation (req, res) {
  console.log('POST /api/location')
  console.log(req.body)

  let location = new Location()
  location.gps_latitud = req.body.gps_latitud
  location.gps_longitud = req.body.gps_longitud
  location.gps_hora = req.body.gps_hora
  location.gps_fecha = req.body.gps_fecha

  location.save((err, locationStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ location: locationStored })
  })
}

function updateLocation (req, res) {
  let locationId = req.params.locationId
  let update = req.body

  Location.findByIdAndUpdate(locationId, update, (err, locationUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar la localización: ${err}`})

    res.status(200).send({ location: locationUpdated })
  })
}

function deleteLocation (req, res) {
  let locationId = req.params.locationId

  Location.findById(locationId, (err, location) => {
    if (err) res.status(500).send({message: `Error al borrar la localización: ${err}`})

    location.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar la localización: ${err}`})
      res.status(200).send({message: 'La localización ha sido eliminada'})
    })
  })
}

module.exports = {
  getLocation,
  getLocations,
  saveLocation,
  updateLocation,
  deleteLocation
}
