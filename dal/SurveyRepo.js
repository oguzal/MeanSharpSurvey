var models = require("../model/Survey");
var utils = require("../utils/Utils");

//#region Get
async function getSurveys() {
  try {
    return await models.Survey.find({});
  } catch (err) {
    return "An error has occured while getting surveys";
  }
}

async function getSurveyByName(name) {
  try {
    return await models.Survey.find({ name: name });
  } catch (err) {
    return "An error has occured while getting the survey";
  }
}

async function getSurveysQuestionsByName(name) {
  try {
    var survey = await models.Survey.find({ name: name });
    return survey.questions;
  } catch (err) {
    return "An error has occured while getting the survey";
  }
}


async function getQuestion(id) {
  try {
    var question=await models.Question.find({ id: id });
    if (question==null)
    return "No question by this id"; 
    return question;  
 } catch (err) {
    return "An error has occured while getting the question";
  }
}

//#endregion

//#region Create
async function createSurvey(req) {
  try {
    return await models.Survey.create({
      name: req.body.name,
      questions: req.body.questions,
      launchTime: utils.toTime(req.body.launchTime),
      dueTime: utils.toTime(req.body.dueTime),
      frequency: req.body.frequency,
      number: req.body.number,
      createdDate: Date.now()
    });
  } catch (err) {
    console.log(err);
    return "An error has occured while creating survey";
  }
}
//#endregion

//#region Update
async function updateSurvey(id, sValues) {
  try {
    var survey = await models.Survey.findById(id);

    if (survey == null) {
      return "The survey by this id does not exist.";
    } else {
      survey.name = sValues.name;
      survey.questions = sValues.questions;
      survey.launchTime = utils.toTime(sValues.launchTime);
      survey.dueTime = utils.toTime(sValues.dueTime);
      survey.frequency = sValues.frequency;
      survey.number = sValues.number;
      survey.updatedDate = Date.now();
      survey.isActive = sValues.isActive;
      await survey.save();
      return survey;
    }
  } catch (err) {
    //TODO Add logging
    console.log(err);
    return "An error has occured while updating survey";
  }
}

// Togles survey IsActive
async function updateSurveyActive(id, isActive) {
  try {
    var survey = await models.Survey.findById(id);
    if (survey == null) {
      return "The survey by this id does not exist.";
    }
     else {
      survey.isActive = isActive;
      await survey.save();
      return survey;
    }
  } catch (err) {
    //TODO Add logging
    console.log(err);
    return "An error has occured while updating survey";
  }
}
//#endregion

//#region delete
async function deleteSurvey(id) {
  try {
    var result = await models.Survey.findByIdAndRemove(id);
    return result;
  } catch (err) {
    console.log(err);
    return "An error has occured while deleting the survey";
  }
}
//#endregion

module.exports = {
  createSurvey: createSurvey,
  updateSurvey: updateSurvey,
  deleteSurvey: deleteSurvey,
  getSurveys: getSurveys,
  getSurveyByName: getSurveyByName,
  getSurveysQuestionsByName:getSurveysQuestionsByName,
  getQuestion:getQuestion,
  updateSurveyActive: updateSurveyActive
};
