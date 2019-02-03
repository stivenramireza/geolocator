'use strict'

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const api = require("./routes")

app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', api)

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index/index.html")
})

module.exports = app
