const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    pictureUrl: String,
    email: String,
    googleId: String,
    fullCreatedDate: {
      unixDate: Number,
      date: Date,
      day: Number,
      weekOfYear: Number,
      month: Number,
      year: Number,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("User", userSchema, "Users")
