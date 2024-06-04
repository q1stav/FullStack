const mongoose = require("mongoose");

const FeedbackSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);

module.exports = Feedback;
