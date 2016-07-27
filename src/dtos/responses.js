

var responses = {
  transactionSuccess: function (objId) {
    return { id: objId, 'status': 'ok' };
  },

  transactionError: function (objId) {
    return { id: objId, 'status': 'failed', message: 'Error while trying to write object' };
  }
}

module.exports = responses;
