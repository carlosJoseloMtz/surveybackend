var User = require('../models/user');
var Responses = require('../dtos/responses');

var userController = {

  createUser: function (req, res) {

    var _email = req.body.email,
        _password = req.body.password,
        _name = req.body.name,
        _title = req.body.title,
        _userGroup = req.body.userGroup;

    // TODO: validate the information so that it will all be included

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
  }

};


module.exports = userController;
