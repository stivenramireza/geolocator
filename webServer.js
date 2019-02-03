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
            console.log('listening on port 3000')
        })
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/views/index/index.html")
})