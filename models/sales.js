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
    order_id: String,
    order_status: String,
    payer: Schema.Types.Mixed,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Sale", saleSchema, "Sales")
