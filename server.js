
// external dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// TODO: setup morgan logger
// TODO: handle database connection error
// TODO: add token base auth

// custom controllers
var users = require('./src/controllers/usercontroller');
var survies = require('./src/controllers/surveycontroller');


// use the native promise support
mongoose.Promise = global.Promise;

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

// users routes
app.post('/users', users.createUser);
// TODO implement the rest of the user roots for controlling the groups and access

// survey -meta info-
app.post('/survies', survies.createSurvey);
app.get('/survies/:author/:page', survies.list);

// server start!
app.listen(3030);

console.log('API on port 3030');
