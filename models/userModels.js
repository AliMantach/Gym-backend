const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a name"],
  },
  email: {
    type: String,
    required: [true, "Please enter a name"],
    unique: [true , "already exists"]
  },
  password: {
    type: String,
    required: [true, "Please enter a phone number"],
  }
},
  {
    timestamps: true
  });
module.exports = mongoose.model("User", userSchema);