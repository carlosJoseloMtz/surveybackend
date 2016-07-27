var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Saved',
    enum: ['Saved', 'Published']
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Survey', SurveySchema);
