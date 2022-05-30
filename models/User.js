const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    max: 255,
    min: 3,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 3,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 3,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
