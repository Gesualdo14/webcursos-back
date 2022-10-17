const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const saleSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Sale", saleSchema, "Sales")
