var express = require('express');

var Responses = require('../dtos/responses');
var Question = require('../models/question');

var questionController = {

  create: function (req, res) {
    // TODO: validate the author on the session is on admin group
    var _survey = req.params.survey,
        _author = req.params.author,
        _question = req.body.question,
        _order = req.body.order;

    var question = new Question({
      survey: _survey,
      question: _question,
      order: _order,
      updated: Date.now(),
      createdBy: _author
    });

    question.save(function (err, qst) {
      if (err) {
        console.error('error while trying to create a question for user', _author);
        console.error(err);
        return res.json(new Responses.transactionError());
      }

      return res.json(new Responses.transactionSuccess(qst.id));
    });
  },

  addOption: function (req, res) {
    // TODO: validate that the author being sent matches with the one on the sesion
    var _author = req.params.author,
        _question = req.params.question;

    var _option = req.body.option;

    Question.
      findByIdAndUpdate(_question,
        { $push: { options: _option } },
        function (err, nOpt) {
          if (err) {
            console.error('error while trying to add an option for question', _question);
            console.error(err);
            return res.json(new Response.transactionError());
          }

          return res.json(new Responses.transactionSuccess());
        });
  },

  list: function (req, res) {
    var page = req.params.page;
    // TODO: validate that the author being sent matches with the one on the sesion
    var author = req.params.author;
    var _survey = req.params.survey;
    // the default elements by page is 10
    var elementsByPage = 10;
    var _skip = (!page ? 0 : page) * elementsByPage;

    Question.
      find({ createdBy: author, survey: _survey }).
      sort("-updated").
      skip(_skip).
      limit(elementsByPage).exec(function (err, questions) {
        if (err) {
          console.error('could not list questions for user', author);
          console.error(err);
          return res.json(new Responses.transactionError());
        }

        return res.json(new Responses.listSuccess(questions));
      });
  },

  _addMapping: function () {
    var router = express.Router();
    router.post('/api/questions/:survey', questionController.create);
    router.get('/api/questions/list/:survey/:page', questionController.list);
    // add an option to question
    router.post('/api/options/:question', questionController.addOption);
    return router;
  }
};


module.exports = questionController._addMapping;
