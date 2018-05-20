var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var models = require("../model/Survey");
var utils = require("../utils/Utils");
var surveyRepo=require("../dal/SurveyRepo");


//#region Create Update
// Create a new  survey
router.post("/", async function (req, res) {
  try {
    var survey = await surveyRepo.createSurvey(req);
    res.status(200).send(survey);
  } catch (rr) {
    console.log(err);
    return res.status(500).send("There was a problem adding the information to the database.");
  }
});

// Update the survey
router.put("/:id", async function(req, res) {
  try {
      var survey= await surveyRepo.updateSurvey(req.params.id,req.body);
 
      if ( typeof(survey)!=models.Survey)
        res.status(500).send(survey);        
      
      else res.status(200).send(survey);
    
  } catch (err) {
    // TODO Add logging 
    console.log(err);
    return res.status(500).send("There was a problem updating the survey.");
  }
});

// Toggle IsActive for the survey
router.put("/:id/isactive/:isactive", async function(req, res) {
  try {
      var survey= await surveyRepo.updateSurveyActive(req.params.id,req.params.isactive); 
      if ( typeof(survey)!=models.Survey)
        res.status(500).send(survey);              
      else res.status(200).send(survey);    
  } catch (err) {
    // TODO Add logging 
    console.log(err);
    return res.status(500).send("There was a problem updating the survey.");
  }
});
//#endregion

//#region Get 
// Get surveys
router.get("/", async function(req, res) {
  try {
    var users = await surveyRepo.getSurveys();
    res.status(200).send(users);
  } catch (err) {
    return res.status(500).send("There was a problem finding the users.");
  }
});

// Get surverys for the user(currently active surveys and users join date must be less than today )
router.get("/user/:userID", function(req, res) {
  //TODO this
  models.Survey.find({}, function(err, users) {
    if (err)
      return res.status(500).send("There was a problem finding the users.");
    res.status(200).send(users);
  });
});

// Get Survey by name
router.get("/name/:name", async function(req, res) {
  try {
    var survey = await surveyRepo.getSurveyByName(req.params.name);
    if (!survey) return res.status(404).send("No survey found by that name.");
    res.status(200).send(survey);
  } catch (err) {
    return res.status(500).send("There was a problem finding the survey");
  }
});

// Get Survey 
router.get("/:id", async function(req, res) {
  try {
    var survey = await surveyRepo.getSurvey(req.params.id);
    if (!survey) return res.status(404).send("No survey found by that id.");
    res.status(200).send(survey);
  } catch (err) {
    console.log(err);
    return res.status(500).send("There was a problem finding the survey");
  }
});

//#endregion

//#region Delete
// Delete survey by Id
router.delete("/:id", async function(req, res) {
  try {
    console.log(req.params.id);
    var result = await surveyRepo.deleteSurvey(req.params.id);
    console.log("delete result "+result);
    res.status(200).send("Survey: " + result.name + " was deleted.");
  } catch (err) {
    return res.status(500).send("There was a problem deleting the survey.");
  }
});

//#endregion



module.exports = router;





