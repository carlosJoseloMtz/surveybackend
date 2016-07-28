var Responses = require('../dtos/responses');
var QuestionOption = require('../models/option');
var Question = require('../models/question');

var optionController = {

  create: function (req, res) {
    // TODO: validate user permissions to write to this survey
    // var _survey = req.params.survey;
    var _question = req.params.question;
    var _option = req.body.option;

    var opt = new QuestionOption({
      question: _question,
      option: _option
    });

    opt.save(function (err, nOpt) {
      if (err) {
        console.error('error while trying to save new option for survey', _survey);
        console.error(err);
        return res.json(new Responses.transactionError());
      }

      return res.json(new Responses.transactionSuccess(nOpt.id));
    });
  },

  findBySurvey: function (req, res) {
    // TODO: validate the assignment for the survey to display the options
    // var _survey = req.params.survey;
    var _question = req.params.question;

    QuestionOption.
      find({ question: _question }).
      exec(function (err, options) {
        if (err) {
          console.error('could not list options for survey', _survey);
          console.error(err);
          return res.json(new Responses.transactionError());
        }

        return res.json(new Responses.listSuccess(options));
      });
  }
};

module.exports = optionController;
