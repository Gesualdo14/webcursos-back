const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const notificationSchema = new Schema(
  {
    params: Schema.Types.Mixed,
    query: Schema.Types.Mixed,
    body: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model(
  "Notification",
  notificationSchema,
  "Notifications"
)
