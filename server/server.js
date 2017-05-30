var express = require('express');
var app = express();
var service = require('./service');
var mongoose = require('mongoose');
var config = require('./config');
var route = require('./service');
var user = require('./model');
var bodyParser = require("body-parser");
var cors = require('cors');

app.use(cors());


const port = process.env.PORT || 3001;

mongoose.connect(config.database);



// view engine setup 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// app.use('/', route);
app.use('/', route);


var server = app.listen(port, function() {
    console.log("server at http://  " + server.address().address + server.address().port);	
});
