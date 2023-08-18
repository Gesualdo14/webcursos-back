const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const errorSchema = new Schema({}, { strict: false, timestamps: true })
module.exports = { Error: mongoose.model("Error", errorSchema, "errors") }
