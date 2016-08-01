var express = require('express');

var User = require('../models/user');
var Responses = require('../dtos/responses');
var authService = require('../service/auth');

var userController = {

  createUser: function (req, res) {

    var _email = req.body.email,
        _password = req.body.password,
        _name = req.body.name,
        _title = req.body.title,
        _userGroup = req.body.userGroup;

    // get the information
    var usr = new User({
      email: _email,
      password: _password,
      name: _name,
      title: _title,
      userGroup: _userGroup
    });

    // save the user
    usr.save(function (err, usr) {
      if (err) {
        console.error('could not save the user');
        console.error(err);
        return res.json(new Responses.transactionError());
      }

      res.json(new Responses.transactionSuccess(usr.id));
    });
  },

  login: function (req, res) {

    var _user = req.body.user,
        _password = req.body.password;

    User.
      findOne({ email: _user }).
      exec(function (err, usr) {
        if (err || !usr) {
          console.error('error while finding user on login');
          console.error('username', _user);
          console.error(err);
          return res.json(new Responses.loginError());
        }

        usr.comparePassword(_password, function (err, isMatch) {
          if (err || !isMatch) {
            // no need to log an error since password simply didn't match
            return res.json(new Responses.loginError());
          }

          var _token = authService.createToken(usr);
          return res.json(new Responses.loginSuccess(usr.email, usr.name, usr.userGroup, _token));
        });

      });
  },

  _addMappings: function () {
    var router = express.Router();
    // userController
    router.post('/users', userController.createUser);
    router.post('/login', userController.login);
    // TODO: add all the admin handling and more
    return router;
  }

};


module.exports = userController._addMappings;
