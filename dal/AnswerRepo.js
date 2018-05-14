var models = require("../model/Answer");
var utils = require("../utils/Utils");
var surveyRepo = require("../dal/SurveyRepo");
var userRepo = require("../dal/UserRepo");

async function createAnswer(questionID, userID, answer) {
    try {
        var question = await surveyRepo.getQuestion(questionID);
        if (question == null)
            return "Invalid question id";
        var user = await userRepo.getUser(userID);
        if (user == null)
            return "Invalid user id";
        if ((question.questionType == "SingleSelect") && !question.answerChoices.contains(answer))
            return "Invalid choice";
        return await models.Answer.create({
            questionID: questionID,
            userID: userID,
            answer: answer,
            createdDate: Date.now()
        });
    } catch (err) {
        console.log(err);
        return "An error has occured while creating survey";
    }
}

// Get UnAnswered questions  by survey and user
async function getUnAnsweredBySurveyUser(surveyID, userID) {
    throw "Not implemented";
}


// Get Answers by user and survey
async function getAnswersBySurveyUser(surveyID, userID) {
    throw "Not implemented";
}

// Get Answers by  question ID
async function getAnswersByQuestion(questionID,recordCount) {
    throw "Not implemented";
}

module.exports = {
    createAnswer: createAnswer,
    updateAnswer: updateAnswer,
    getAnswer: getAnswer,
    getUnAnsweredBySurveyUser:getUnAnsweredBySurveyUser,
    getAnswersBySurveyUser:getAnswersBySurveyUser,
    getAnswersBySurvey:getAnswersBySurvey
};