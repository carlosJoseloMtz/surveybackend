

var userController = {

  createUser: function (req, res) {
    console.log('creating user');
    res.json({ some: 'nice' });
  }

};


module.exports = userController;
