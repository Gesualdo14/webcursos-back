const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const courseSchema = new Schema(
  {
    name: String,
    thumbnail: String,
    videos: [{ title: String, videoUrl: String, duration: String }],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Course", courseSchema, "Courses")
