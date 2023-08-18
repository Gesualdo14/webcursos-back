const mongoose = require("mongoose")
const PORT = process.env.PORT
const Sale = require("../models/sales")
const User = require("../models/user")
const createFullDate = require("../helpers/createFullDate")
// const createFullDate = require("../helpers/createFullDate")
// const { ObjectId } = require("mongoose").Types

const VIDEOS_SECTION = [
  {
    title: "🎦 Día 21 completo",
    duration: "1:13:30 hs",
    emoji: "🎦",
  },
]

const SECTION = 20

const dbConnect = (app) => {
  mongoose
    .connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async (conn) => {
      // const sales = await Sale.find()

      // for (const sale of sales) {
      //   const user = await User.findById(sale.user)
      //   await Sale.findByIdAndUpdate(sale._id, {
      //     $set: {
      //       userInfo: {
      //         firstname: user.firstname,
      //         lastname: user.lastname,
      //         email: user.email,
      //       },
      //       fullCreatedDate: createFullDate(sale.createdAt),
      //     },
      //   })
      //   console.log("DONE")
      // }
      // const users = await User.find()
      // let i = 0
      // for (const user of users) {
      //   await User.findByIdAndUpdate(user._id, {
      //     fullCreatedDate: createFullDate(user.createdAt),
      //   })
      //   console.log(i++)
      // }

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
      //   const URL = `https://webcursos.azureedge.net/videos/curso_inicial/${video._id}.mp4`

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

      // const courses = await Course.find()

      // for (let i = 0; i < courses.length; i++) {
      //   const course = courses[i]
      //   for (let j = 0; j < course.sections.length; j++) {
      //     const section = course.sections[j]
      //     for (let k = 0; k < section.videos.length; k++) {
      //       const video = section.videos[k]
      //       const newUrl = `https://webcursos.azureedge.net/${
      //         video.videoUrl.split(".net/")[1]
      //       }`

      //       const found = await Course.findOneAndUpdate(
      //         {
      //           _id: course._id,
      //         },
      //         { $set: { [`sections.${j}.videos.${k}.videoUrl`]: newUrl } }
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
