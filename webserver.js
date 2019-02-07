var express = require("express");
var https = require('https')
var fs = require('fs')
var app = express();
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

let dbo;

const url = 'mongodb://mongo-server:27017';

app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(url, { useNewUrlParser: true }, (err, database) => {
    if (err) {
        return console.log(err);
    }
    dbo = database.db("geolocator");
    app.listen(8080, function () {
            console.log('Web server corriendo en 8080')
        })
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/login/login.html")
})