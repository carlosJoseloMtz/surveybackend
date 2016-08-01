var jwt = require('jwt-simple');
var moment = require('moment');
var express = require('express');
var appConfig = require('../../config');

var auth = {

  /**
  * Creates a token based on the user information.
  */
  createToken: function (user) {
    var _usr = {
      uid: user.id,
      email: user.email,
      group: user.userGroup,
    };

    var payload = {
      sub: _usr,
      iat: moment().unix(),
      exp: moment().add(
        appConfig.auth.expirationTime,
        appConfig.auth.expirationFactor).unix()
    };

    return jwt.encode(payload, appConfig.auth.secureToken);
  },

  /**
  * Sets the mapping to be validated based on a router under the mapping of /api/*.
  */
  secureMapping: function (mapping) {
    var router = express.Router();
    router.all(mapping, auth._validateUserToken);
    return router;
  },

  /**
  * Base user authentication based on the token.
  */
  _validateUserToken: function (req, res, next) {
    if (!req.headers.authorization) {
      return res.status(403).json({message: 'please login'});
    }

    var token = req.headers.authorization;

    try {
      var payload = jwt.decode(token, appConfig.auth.secureToken);
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
  }
};

module.exports = auth;
