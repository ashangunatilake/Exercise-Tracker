const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema({
  userId: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  date: {
    type: Date,
  },
});

module.exports = mongoose.model("Exercise", exerciseSchema);
