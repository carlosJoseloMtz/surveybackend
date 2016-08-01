
// external dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');
var appAuth = require('./src/service/auth');

// TODO: handle database connection error

// custom controllers
var users = require('./src/controllers/usercontroller');
var survies = require('./src/controllers/surveycontroller');
var questions = require('./src/controllers/questioncontroller');

// use the native promise support
mongoose.Promise = global.Promise;

// DB connection
mongoose.connect('mongodb://localhost/survey_db');


// express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));

app.use(appAuth.secureMapping('/api/*'));

// routes

app.use(users());
app.use(survies());
app.use(questions());
// TODO: update question
// TODO: update survey
// TODO: assign survey to users (basically by id)
// TODO: assign survey by group
// TODO: answer questions by user and survey
// TODO: get user profile
// TODO: edit user profile

// server start!
app.listen(3030);

console.log('API on port 3030');
