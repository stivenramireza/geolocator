'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api', api)
app.get('/', (req, res) => {
  res.render('index')
})
app.get('/signup', (req, res) => {
  res.render('signup')
})
app.get('/login', (req, res) => {
  res.render('login')
})

module.exports = app
