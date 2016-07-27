
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
* this schema represents the possible option of a question,
* for example, Yes/No questions, or maybe numeric values.. but it's as
* String just to keep it simple
*/
var QuestionOptionSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  option: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('QuestionOption', QuestionOptionSchema);
