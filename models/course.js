const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const videoSchema = new Schema({
  title: String,
  videoUrl: String,
  duration: String,
  emoji: String,
  free: Boolean,
})

const courseSchema = new Schema(
  {
    name: String,
    thumbnail: String,
    description: String,
    sections: [
      {
        name: String,
        recordedAt: String,
        recordingDay: String,
        realDuration: Schema.Types.Mixed,
        videos: [videoSchema],
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Course", courseSchema, "Courses")
