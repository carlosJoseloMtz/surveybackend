var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', UserSchema);
