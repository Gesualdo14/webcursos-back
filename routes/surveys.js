const express = require("express")
const router = express.Router()
const passport = require("passport")
const Survey = require("../models/survey")
const Answer = require("../models/answer")

router.get("/", async (req, res) => {
  const surveys = await Survey.find()

  res.status(201).json({
    ok: true,
    data: surveys,
  })
})

router.post("/", async (req, res) => {
  const survey = req.body

  console.log({ survey })

  await Survey.create(survey)

  res.status(201).json({
    ok: true,
    message: "Encuesta creada con éxito 😊",
  })
})

router.get("/:id/answer", passport.authenticate("jwt"), async (req, res) => {
  const { id } = req.params

  const userId = req.user._id
  const answerFilter = { survey: id, user: userId }

  const foundAnswer = await Answer.findOne(answerFilter)

  res.status(200).json({
    ok: true,
    data: foundAnswer?.answer,
  })
})
router.post("/:id/answer", passport.authenticate("jwt"), async (req, res) => {
  const { text } = req.body
  const { id } = req.params

  const userId = req.user._id
  const answerFilter = { survey: id, user: userId }

  const hasAlreadyVoted = await Answer.exists(answerFilter)
  console.log({ hasAlreadyVoted })

  if (!!hasAlreadyVoted) {
    await Answer.findOneAndUpdate(answerFilter, { answer: text })
  } else {
    await Answer.create({ survey: id, answer: text, user: userId })
  }

  res.status(201).json({
    ok: true,
    message: "Respuesta creada con éxito 😊",
  })
})

module.exports = router
