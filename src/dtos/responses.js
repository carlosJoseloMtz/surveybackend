

var responses = {
  transactionSuccess: function (objId) {
    return { id: objId, 'status': 'ok' };
  },

  transactionError: function (objId) {
    return { id: objId, 'status': 'failed', message: 'Error while trying to write object' };
  },

  listSuccess: function (elements) {
    return { data: elements, 'status': 'ok'};
  },

  modelSuccess: function (element) {
    return { data: element, 'status': 'ok' };
  },

  loginError: function () {
    return {'status': 'failed', message: 'Could not login with given credentials'};
  },

  loginSuccess: function (_email, _name, _group, _token) {
    return {'status': 'ok', email: _email, name: _name, group: _group, token: _token};
  }
}

module.exports = responses;
