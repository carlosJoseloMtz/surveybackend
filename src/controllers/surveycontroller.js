
var Responses = require('../dtos/responses');
var Survey = require('../models/survey');

var surveyController = {

  createSurvey: function (req, res) {
    var _title = req.body.title,
        _createdBy = req.body.author;

    var survey = new Survey({
      title: _title,
      createdBy: _createdBy
    });

    // pass the created time to the updated one as it is the same for creation
    survey.updated = survey.createdAt;

    // save it
    survey.save(function (err, surv) {
      if (err) {
        console.error('error while trying to create a new survey');
        console.error(err);
        return res.json(new Responses.transactionError());
      }

      return res.json(new Responses.transactionSuccess(surv.id));
    });
  },

  list: function (req, res) {
    var page = req.params.page;
    // TODO: validate that the author being sent matches with the one on the sesion
    var author = req.params.author;
    // the default elements by page is 10
    var elementsByPage = 10;
    var _skip = (!page ? 0 : page) * elementsByPage;

    Survey.
      find({ createdBy: author }).
      sort("-updated").
      skip(_skip).
      limit(elementsByPage).exec(function (err, survies) {
        if (err) {
          console.error('could not list survies for user', author);
          console.error(err);
          return res.json(new Responses.transactionError());
        }

        return res.json(new Responses.listSuccess(survies));
      });
  }
};

module.exports = surveyController;
