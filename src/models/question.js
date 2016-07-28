var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  updated: {
    type: Date,
    required: true
  },
  order: {
    type: Number,
    required: true
  },
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Question', QuestionSchema);
