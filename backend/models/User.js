const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  value: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () {
      return this.password != null;
    },
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  photoURL: {
    type: String,
  },
  scores: [ScoreSchema], // Store multiple scores with dates
  lastLogin: {
    type: Date,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
