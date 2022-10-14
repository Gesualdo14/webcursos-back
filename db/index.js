const mongoose = require("mongoose")
const PORT = process.env.PORT

const dbConnect = (app) => {
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
}

module.exports = dbConnect
