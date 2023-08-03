const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const JwtStrategy = require("passport-jwt").Strategy
const User = require("../models/user")
const createFullDate = require("../helpers/createFullDate")

const jwtExtractor = (req) => {
  let token = null
  console.log({ headers: req.headers })
  if (req && req.headers["authorization"]) {
    token = req.headers["authorization"].split(" ")[1]
  }
  console.log({ token })
  return token
}

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: jwtExtractor,
      secretOrKey: process.env.JWT_SECRET_KEY,
    },
    async function (jwt_payload, done) {
      console.log({ jwt_payload })
      try {
        const foundUser = await User.findOne({ _id: jwt_payload.sub })
        done(null, foundUser)
      } catch (error) {
        done(error, null)
      }
    }
  )
)

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_BACKEND_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const foundUser = await User.findOne({ googleId: profile.id })

        console.log({ profileId: profile.id })

        if (!!foundUser) {
          return done(null, foundUser)
        } else {
          const createdUser = await User.create({
            googleId: profile.id,
            firstname: profile._json.given_name,
            lastname: profile._json.family_name,
            email: profile._json.email,
            pictureUrl: profile._json.picture,
            fullCreatedDate: createFullDate(),
          })
          return done(null, createdUser)
        }
      } catch (error) {
        console.log({ error })
        done(error, null)
      }
    }
  )
)

passport.serializeUser(function (user, done) {
  console.log({ user })
  done(null, user._id)
})

passport.deserializeUser(async function (id, done) {
  try {
    const foundUser = await User.findById(id)
    done(null, foundUser)
  } catch (error) {
    done(error, null)
  }
})

module.exports = passport
