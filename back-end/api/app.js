'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('express-handlebars')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.engine('.ejs', ejs({
  defaultLayout: 'default',
  extname: '.ejs'
}))
app.set('view engine', '.ejs')

app.use('/api', api)
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/', (req, res) => {
  res.render('location')
})

module.exports = app
