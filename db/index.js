const mongoose = require("mongoose")
const PORT = process.env.PORT
const Course = require("../models/course")
const { ObjectId } = require("mongoose").Types

const VIDEOS_SECTION = [
  {
    title: "🤡 Armando MOCKUP para nuestra página de estudio",
    duration: "18:09 min",
    emoji: "🤡",
    free: true,
  },
  {
    title: "🎨 Estilando la página de estudio",
    duration: "28:29 min",
    emoji: "🎨",
  },
  {
    title: "🧠 Avances en Notion y planificación día siguiente",
    duration: "2:45 min",
    emoji: "🧠",
    free: true,
  },
]

const SECTION = 7

const dbConnect = (app) => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (conn) => {
      // for (video of VIDEOS_SECTION) {
      //   const result = await Course.updateOne(
      //     { _id: "6356fff6a47d67068688022e" },
      //     {
      //       $addToSet: {
      //         [`sections.${SECTION}.videos`]: video,
      //       },
      //     }
      //   )
      //   console.log({ result })
      // }

      // const course = await Course.findById("6356fff6a47d67068688022e")

      // for (
      //   let index = 0;
      //   index < course.sections[SECTION].videos.length;
      //   index++
      // ) {
      //   const video = course.sections[SECTION].videos[index]
      //   const URL = `https://webcursos.blob.core.windows.net/videos/curso_inicial/${video._id}.mp4`

      //   const result = await Course.updateOne(
      //     { _id: "6356fff6a47d67068688022e" },
      //     {
      //       $set: {
      //         [`sections.${SECTION}.videos.${index}.videoUrl`]: URL,
      //       },
      //     }
      //   )
      //   console.log({ result })
      // }

      app.listen(PORT, async () => {
        console.log(`App escuchando en puerto ${PORT}`)
      })
    })
    .catch((err) => {
      console.log({ err })
    })
}

module.exports = dbConnect
