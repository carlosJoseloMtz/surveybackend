var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  createdAt: Date,
  title: String,
  status: {
    type: String,
    enum: ['Saved', 'Published']
  }
});

module.exports = mongoose.model('Survey', SurveySchema);
