const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const surveySchema = new Schema(
  {
    title: String,
    possibleAnswers: [
      {
        text: String,
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Survey", surveySchema, "Surveys")
