const mongoose = require("mongoose")
const PORT = process.env.PORT
const Course = require("../models/course")
const { ObjectId } = require("mongoose").Types

const VIDEOS_SECTION_THREE = [
  {
    title: "🔦 Mejoras a los videos del curso",
    duration: "1:49 min",
    emoji: "🔦",
  },
  {
    title: "📂 Almacenamiento en Azure Blob Storage",
    duration: "9:06 min",
    emoji: "📂",
  },
  {
    title: "🐜 Miniatura INICIAL del curso",
    duration: "5:15 min",
    emoji: "🐜",
  },
  {
    title: "👨‍🏫 Cursos en BACKEND y FRONTEND",
    duration: "31:27 min",
    emoji: "👨‍🏫",
  },
  {
    title: "💡 Llegó la solución",
    duration: "3:09 min",
    emoji: "💡",
  },
  {
    title: "🛣️ Componente IMAGE de Next JS",
    duration: "4:35 min",
    emoji: "🛣️",
  },
  {
    title: "🎨 Estilando tarjeta CURSO",
    duration: "27:41 min",
    emoji: "🎨",
  },
  {
    title: "📽️ Estilando VIDEO en el FRONT",
    duration: "9:05 min",
    emoji: "📽️",
  },
  {
    title: "🧠 Conclusiones, avances en Notion y planificación día siguiente",
    duration: "4:18 min",
    emoji: "🧠",
    free: true,
  },
]

const dbConnect = (app) => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (conn) => {
      const course = await Course.findById("6356fff6a47d67068688022e")

      for (let index = 0; index < course.sections[2].videos.length; index++) {
        const video = course.sections[2].videos[index]
        const URL = `https://webcursos.blob.core.windows.net/videos/curso_inicial/${video._id}.mp4`

        const result = await Course.updateOne(
          { _id: "6356fff6a47d67068688022e" },
          {
            $set: {
              [`sections.2.videos.${index}.videoUrl`]: URL,
            },
          }
        )
        console.log({ result })
      }

      // const result = await Course.updateOne(
      //   { _id: "6356fff6a47d67068688022e" },
      //   {
      //     $set: {
      //       "sections.1.videos": [
      //         {
      //           title: "🔐 Repaso con NOTION y acción de seguridad a futuro",
      //           duration: "2:21 min",
      //           emoji: "🔐",
      //           videoUrl:
      //             "https://webcursos.blob.core.windows.net/videos/curso_inicial/video_2_1.mp4",
      //         },
      //         {
      //           title: "🍃 Contratando CLUSTER en MongoDB Atlas",
      //           duration: "17:28 min",
      //           emoji: "🍃",
      //           videoUrl:
      //             "https://webcursos.blob.core.windows.net/videos/curso_inicial/video_2_2.mp4",
      //         },
      //         {
      //           title: "😒 Intento de conexión con nuestro CLUSTER",
      //           duration: "14:08 min",
      //           emoji: "😒",
      //           videoUrl:
      //             "https://webcursos.blob.core.windows.net/videos/curso_inicial/video_2_3.mp4",
      //         },
      //         {
      //           title: "😥 Intentando descrifrar QUÉ PASABA",
      //           duration: "9:28 min",
      //           emoji: "😥",
      //           videoUrl:
      //             "https://webcursos.blob.core.windows.net/videos/curso_inicial/video_2_4.mp4",
      //         },
      //         {
      //           title: "💡 Llegó la solución",
      //           duration: "3:09 min",
      //           emoji: "💡",
      //           videoUrl:
      //             "https://webcursos.blob.core.windows.net/videos/curso_inicial/video_2_5.mp4",
      //         },
      //         {
      //           title:
      //             "🧠 Conclusiones, avances en Notion y planificación día siguiente",
      //           duration: "2:21 min",
      //           emoji: "🧠",
      //           free: true,
      //           videoUrl:
      //             "https://webcursos.blob.core.windows.net/videos/curso_inicial/video_2_6.mp4",
      //         },
      //       ],
      //     },
      //   }
      // )

      // console.log({ result })

      // const courses = await Course.find()

      // for (const course of courses) {
      //   for (let i = 0; i < course.sections.length; i++) {
      //     const section = course.sections[i]
      //     for (let j = 0; j < section.videos.length; j++) {
      //       const _id = new ObjectId(Math.random() * 1000000000)
      //       console.log({ _id })

      //       await Course.updateOne(
      //         { _id: course._id },
      //         {
      //           $set: {
      //             [`sections.${i}.videos.${j}._id`]: _id,
      //           },
      //         }
      //       )
      //     }
      //   }
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
