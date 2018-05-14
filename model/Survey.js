
var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
  questionType: ["FreeText", "SingleSelect"],
  questionText:String,
  questionAnswers:[String]
});
 
var surveySchema = new mongoose.Schema({
  name: { type: String, index: true ,required:true},
  questions: [questionSchema],
  launchTime: Date,
  dueTime: Date,
  createdDate:{type:Date},
  updatedDate:{type:Date},
  frequency:["W","D"], 
  number:Number ,
  isActive:{type:Boolean ,default:true}
});

mongoose.model("Question", questionSchema);
mongoose.model("Survey", surveySchema ); 

module.exports={
 Survey: mongoose.model("Survey"),
 Question: mongoose.model("Question")
}; 