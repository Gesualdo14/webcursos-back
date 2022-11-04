const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const answerSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    survey: {
      type: mongoose.Types.ObjectId,
      ref: "Survey",
    },
    answer: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Answer", answerSchema, "Answers")
