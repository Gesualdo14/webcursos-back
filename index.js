require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const coursesRoutes = require("./routes/courses")
const paypalRoutes = require("./routes/paypal")
const authRoutes = require("./routes/auth")
const passport = require("./passport")
const path = require("path")

const dbConnect = require("./db")

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
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passport.initialize())
app.use(passport.session())

// ROUTES
app.use("/courses", coursesRoutes)
app.use("/paypal", paypalRoutes)
app.use("/auth", authRoutes)

// GOOGLE DOMAIN VERIFICATION
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

dbConnect(app)
