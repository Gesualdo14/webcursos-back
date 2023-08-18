const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const saleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userInfo: { firstname: String, lastname: String, email: String },
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    amount: Number,
    webhookReceived: Boolean,
    order_id: String,
    capture_id: String,
    order_status: String,
    paypal_links: Schema.Types.Array,
    payer: Schema.Types.Mixed,
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

module.exports = mongoose.model("Sale", saleSchema, "Sales")
