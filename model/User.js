var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  userID: { type: String, unique: true },
  timeZone: {
    type: String, enum: ["PDT", "MST", "CDT", "EDT"], required: function () {
      return "Valid Time zone please ";
    }
  },
  joinDate: { type: Date, default: Date.Now },
  isActive: { type: Boolean, default: true }
  //TODO Add IsActive field 
});
mongoose.model("User", UserSchema);

module.exports = mongoose.model("User");
