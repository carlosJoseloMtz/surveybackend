
// external dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// custom implementation
var users = require('./src/controllers/usercontroller.js');


// DB connection
mongoose.connect('mongodb://localhost/survey_db');


// express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// routes
app.get('/', function (req, res) {
  res.send('yay!');
});

// define all the routes
app.post('/users', users.createUser);


// server start!
app.listen(3030);

console.log('API on port 3030');
