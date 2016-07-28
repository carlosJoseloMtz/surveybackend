var User = require('../models/user');
var Responses = require('../dtos/responses');
var jwt = require('jwt-simple');
var moment = require('moment');

var userController = {

  _generateToken: function (user) {
    var _usr = {
      uid: user.id,
      email: user.email,
      group: user.userGroup,
    };

    var payload = {
      sub: _usr,
      iat: moment().unix(),
      exp: moment().add(14, "days").unix()
    };

    return jwt.encode(payload, '__PLEASE_REFACTOR_ME__');
  },

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

          var _token = userController._generateToken(usr);
          return res.json(new Responses.loginSuccess(usr.email, usr.name, usr.userGroup, _token));
        });

      });
  }

};


module.exports = userController;
