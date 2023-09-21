const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    unique: true,
    min: 8,
  },
  profilePic: {
    type: String,
    default: "",
  }
});

module.exports = mongoose.model("user", userSchema);