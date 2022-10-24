const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/user")

router.delete("/:id", passport.authenticate("jwt"), async (req, res) => {
  const { id } = req.params

  await User.findByIdAndUpdate(id, {
    firstname: "",
    lastname: "",
    pictureUrl: "",
    googleId: "",
  })

  res.status(200).json({
    ok: true,
    message:
      "Tus datos personales fueron eliminados con éxito, solo conservamos tu correo electrónico para poder indentificar qué cursos ya has comprado 😊",
  })
})

module.exports = router
