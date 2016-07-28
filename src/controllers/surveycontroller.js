
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
    // TODO: validate that the user on the sesion is from admin group
    var user = req.params.author;
    // the default elements by page is 10
    var elementsByPage = 10;
    var _skip = (!page ? 0 : page) * elementsByPage;

    Survey.
      find({}).
      sort("-updated").
      skip(_skip).
      limit(elementsByPage).exec(function (err, survies) {
        if (err) {
          console.error('could not list survies for user', user);
          console.error(err);
          return res.json(new Responses.transactionError());
        }

        return res.json(new Responses.listSuccess(survies));
      });
  },

  getById: function (req, res) {
    var _survey = req.params.survey;
    // TODO: validate that the logged user belongs to admin user or has this one
    // assigned
    Survey.
      findById(_survey, function (err, srv) {
        if (err) {
          console.error('could not retrieve survey by id', _survey);
          console.error(err);
          return res.json(new Responses.transactionError());
        }

        return res.json(new Responses.modelSuccess(srv));
      });
  }
};

module.exports = surveyController;
