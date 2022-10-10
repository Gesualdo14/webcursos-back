require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")
const app = express()
const PORT = process.env.PORT
const cors = require("cors")
const fs = require("fs")
const Course = require("./models/course")
const passport = require("./passport")
const generateJWT = require("./helpers/generateJWT")
const Sale = require("./models/sales")
const path = require("path")

app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PATCH, DELETE, PUT",
    allowedHeaders: "Content-Type, Authorization",
  })
)
app.use(express.json())
app.use(
  require("express-session")({
    secret: "lkjsalkdjasldkjaslkjdas",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.get("/google357b89dfb4d4979a.html", (req, res) => {
  res.sendFile(
    "google357b89dfb4d4979a.html",
    { root: path.join(__dirname) },
    (err) => {
      if (err) {
        next(err)
      } else {
        console.log("File SENT")
      }
    }
  )
})

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_BASE_URL}/login`,
  }),
  function (req, res) {
    console.log({ user: req.user })
    const { _id, firstname, lastname, email, pictureUrl } = req.user
    // Successful authentication, redirect home.
    const userData = {
      sub: _id,
      firstname,
      lastname,
      email,
      pictureUrl,
    }
    const jwt = generateJWT(userData)
    const login_info = JSON.stringify({ jwt, user: userData })
    res.redirect(
      `${process.env.FRONTEND_BASE_URL}/profile?login_info=${login_info}`
    )
  }
)

app.get("/courses", async (req, res) => {
  console.log("HOLAAAA")
  try {
    const courses = await Course.find()
    res.status(200).json({ ok: true, data: courses })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ ok: false, error })
  }
})

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params
  const { user_id } = req.query
  console.log({ user_id, id })

  try {
    let hasBoughtTheCourse = false

    if (mongoose.isValidObjectId(user_id)) {
      const foundCourse = await Sale.exists({
        course: id,
        user: user_id,
      })
      hasBoughtTheCourse = !!foundCourse
    }

    const course = await Course.findById(id)

    res.status(200).json({
      ok: true,
      data: { ...course.toObject(), hasBoughtTheCourse },
    })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ ok: false, error })
  }
})

app.post("/courses", async (req, res) => {
  const { name } = req.body

  try {
    const result = await Course.create({ name })
    res.status(201).json({ ok: true })
  } catch (error) {
    console.log({ error })
    res.status(400).json({ ok: false, error })
  }
})

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((conn) => {
    app.listen(PORT, async () => {
      console.log(`App escuchando en puerto ${PORT}`)
    })
  })
  .catch((err) => {
    console.log({ err })
  })
