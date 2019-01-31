'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('express-handlebars')
const app = express()
const api = require('./routes')
var path = "/home/stiven/Codes/Telematic/Projects/Geolocator/"

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// View Engine
app.set('front-end', path.join(path, 'front-end'));
app.engine('ejs', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.render(path + "js/main")
});

app.use(express.static(path));

app.use('/api', api)

module.exports = app
