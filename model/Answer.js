
var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({
  questionID: { type: Object, index: true ,required:true},
  userID:{type:Object,index:true,required:true},
  createdDate:{type:Date},
  updatedDate:{type:Date},
  answer:{type:String} 
});

mongoose.model("Answer", answerSchema ); 

module.exports.Answer= mongoose.model("Answer");
