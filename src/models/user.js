var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

// define the user schema
// will consider only the employee and admin groups for now
var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true,
    enum: ['Developer', 'Manager', 'Team Lead', 'Other']
  },
  userGroup: {
    type: String,
    required: true,
    enum: ['employee', 'admin']
  },
  // the assigned survies
  survies: [{ type: Schema.Types.ObjectId, ref: 'Survey'}]
});

// TODO: define the password check and encryption methods
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
