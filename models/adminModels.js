const mongoose = require("mongoose");
const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a name"],
      unique: [true, "already exists"],
    },
    password: {
      type: String,
      required: [true, "Please enter a phone number"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("admin", adminSchema);
