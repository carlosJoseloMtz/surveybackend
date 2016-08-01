
// external dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var appAuth = require('./src/service/auth');
var cors = require('cors');
var appConfig = require('./config');

// TODO: handle database connection error

// custom controllers
var users = require('./src/controllers/usercontroller');
var survies = require('./src/controllers/surveycontroller');
var questions = require('./src/controllers/questioncontroller');

// use the native promise support
mongoose.Promise = global.Promise;

// DB connection
mongoose.connect(appConfig.database);


// express
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(cors());

app.use(appAuth.secureMapping('/api/*'));
app.use(appAuth.secureAdmin());

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
app.listen(appConfig.port);

console.log('API on port 3030');
