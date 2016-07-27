

var responses = {
  transactionSuccess: function (objId) {
    return { id: objId, 'status': 'ok' };
  },

  transactionError: function (objId) {
    return { id: objId, 'status': 'failed', message: 'Error while trying to write object' };
  },

  listSuccess: function (elements) {
    return { data: elements, 'status': 'ok'};
  }
}

module.exports = responses;
