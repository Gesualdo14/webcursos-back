const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Course = require("../models/course")
const Sale = require("../models/sales")

router.get("/", async (req, res) => {
  console.log("HOLAAAA")
  try {
    const courses = await Course.find()
    res.status(200).json({ ok: true, data: courses })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ ok: false, error })
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const { user_id } = req.query
  console.log({ user_id, id })

  try {
    let hasBoughtTheCourse = false
    let foundSale
    if (mongoose.isValidObjectId(user_id)) {
      foundSale = await Sale.findOne({
        course: id,
        user: user_id,
        order_status: "COMPLETED",
      })
      hasBoughtTheCourse = !!foundSale
    }
    const howManySales = await Sale.countDocuments({ course: id })

    const course = await Course.findById(id)

    res.status(200).json({
      ok: true,
      data: {
        ...course.toObject(),
        hasBoughtTheCourse,
        howManySales,
        capture_id: foundSale?.capture_id,
      },
    })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ ok: false, error })
  }
})

router.post("/", async (req, res) => {
  const { name } = req.body

  try {
    const result = await Course.create({ name })
    res.status(201).json({ ok: true })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ ok: false, error })
  }
})

module.exports = router
