
// external dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jwt-simple');
var moment = require('moment');

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

var router = express.Router();
router.all('/api/*', function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({message: 'please login'});
  }

  var token = req.headers.authorization;

  try {
    var payload = jwt.decode(token, '__PLEASE_REFACTOR_ME__');
  } catch (err) {
    console.error('could not parse token', token);
    console.error(err);
    return res.status(403).json({message: 'Invalid token'});
  }

  if (payload.exp <= moment().unix()) {
    return re.status(401).json({message: 'Token already expired'});
  }

  req.user = payload.sub;
  next();
});
// router.all('/api/*', auth.jwtAuthProtected);
app.use(router);

// routes

// users routes
app.post('/users', users.createUser);
app.post('/login', users.login);

// TODO implement the rest of the user roots for controlling the groups and access
// survey -meta info-
app.post('/api/survies', survies.createSurvey);
app.get('/api/survies/list/:page', survies.list);
app.get('/api/survies/:survey', survies.getById);
app.post('/api/questions/:survey', questions.create);
app.get('/api/questions/list/:survey/:page', questions.list);
// add an option to question
app.post('/api/options/:question', questions.addOption);
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
