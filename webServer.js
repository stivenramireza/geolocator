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
    app.listen(3000, function () {
            console.log('Listening on port 3000')
    })
});

app.post('/signin', function (req, res) {
    console.log(req.body.username);
    dbo.collection("users").findOne({ name: req.body.username }, function (err, items) {
        console.log(items);
        if (items == null) {
            console.log("Está vacío")
            res.send("Login incorrecto")
        } else {
            if (req.body.password == items.password) { 
                res.send("Login correcto")
            } else {
                res.send("Login incorrecto")
            }
        }
    })
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index/index.html")
})

