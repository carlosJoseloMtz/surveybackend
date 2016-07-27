

var transactionSuccess = function (objId) {
  return { id: objId, 'status': 'ok'};
}

var transactionError = function (objId) {
  return { id: objId, 'status': 'failed', message: 'Error while trying to write object'};
}
