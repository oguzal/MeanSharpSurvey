
var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({
  questionID: { type: Schema.Types.ObjectId, index: true ,required:true},
  userID:{type:Schema.Types.ObjectId,index:true,required:true},
  createdDate:{type:Date},
  updatedDate:{type:Date},
  answer:{type:String} 
});

mongoose.model("Answer", answerSchema ); 

module.exports.Answer= mongoose.model("Answer");
