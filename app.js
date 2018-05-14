var express = require('express');
var app = express();
var db = require('./db');

var userController = require('./controllers/UserController');
var surveyController = require('./controllers/SurveyController');

app.use('/users', userController);
app.use('/surveys', surveyController);

module.exports = app;