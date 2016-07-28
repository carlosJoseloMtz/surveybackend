var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  survey: {
    type: Schema.Types.ObjectId,
    ref: 'Survey',
    required: true
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  // the one who answered the question
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // response is required even though the question "can be empty",
  // the questions with an actual response will be here, any other question that
  // is not represented here just means that hasn't been answer yet
  response: {
    type: String,
    required: true
  }
});

module.exports = AnswerSchema;
