var User = require('../models/user');
var Responses = require('../dtos/responses');

var userController = {

  createUser: function (req, res) {
    console.log('user information');
    console.log(req.body);

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
        return res.json({ status: 'failed', message: 'Error while trying to write object'});
      }

      // TODO: encapsulate the responses using the dtos
      res.json({ id: usr.id, status: 'ok'});
    });
  }

};


module.exports = userController;
