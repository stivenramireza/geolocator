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
    // start the express web server listening on 8080
    app.listen(3000, function () {
            console.log('listening on port 3000')
        })
});



app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/login/login.html")
})


app.post("/singin", function (req, res) {
    if (req.body.name == "") res.send("incorrect sing in");

    dbo.collection("usuarios").insertOne({ name: req.body.name, psswd: req.body.passwd, extraInfo: [] }, function (err, resp) {
        if (err) {
            res.send("incorrect sing in");
        } else {
            res.send("correct sing in");
        }

    })
})

app.post("/addInfoGps", function (req, res) {
    dbo.collection("usuarios").updateOne(
        { name: req.body.name },
        { $push: { extraInfo: { gpsLatitud: req.body.gpsLatitud, gpsLongitud: req.body.gpsLongitud, hora: req.body.hora, fecha: req.body.fecha } } },
        { 'upsert': true },
        function (err, re) {
            if (err) {
                res.send("error while adding info")
            }else{
                res.send("info added correctly")
            }
        });
})

app.post('/login', function (req, res) {
    console.log(req.body.name);
    dbo.collection("usuarios").findOne({ name: req.body.name }, function (err, items) {
        console.log(items);
        if (items == null) {
            console.log("is null")
            res.send("incorrect login")
        } else {
            if (req.body.passwd == items.psswd) { 
                res.send("correct")
            } else {
                res.send("incorrect login")
            }
        }
    })
})







