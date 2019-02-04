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

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index/index.html")
})

app.post("/singin", function (req, res) {
    if (req.body.username == "") res.send("incorrect sing in");

    dbo.collection("users").insertOne({ displayName: req.body.displayName,username: req.body.username, password: req.body.password, extraInfo: [] }, function (err, resp) {
        if (err) {
            res.send("incorrect sing in");
        } else {
            res.send("correct sing in");
        }

    })
})

app.post('/login', function (req, res) {
    console.log(req.body.username);
    dbo.collection("users").findOne({ username: req.body.username }, function (err, items) {
        console.log(items);
        if (items == null) {
            console.log("is null")
            res.send("incorrect login")
        } else {
            if (req.body.passwd == items.psswd) { //this should be encrypted
                res.send("correct")
            } else {
                res.send("incorrect login")
            }
        }
    })
})
