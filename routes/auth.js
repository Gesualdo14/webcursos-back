const express = require("express")
const router = express.Router()
const passport = require("passport")
const generateJWT = require("../helpers/generateJWT")

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

router.get(
  "/google/callback",
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

module.exports = router
