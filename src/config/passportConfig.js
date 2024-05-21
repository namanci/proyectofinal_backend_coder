const passport = require('passport')
const passport_jwt = require('passport-jwt')
const { cfgObj } = require('./configObject.js')
const usersRepository = require('../repositories/users.repository.js')

const JWTStrategy = passport_jwt.Strategy
const extract_jwt = passport_jwt.ExtractJwt

const initializePassport = () => {
    const cookieExtractor = (req) => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token']
        }
        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: extract_jwt.fromExtractors([cookieExtractor]),
        secretOrKey: cfgObj.jwt_secret,
    }, async (jwt_payload, done) => {
        try {
            const user = await usersRepository.getUserBy({_id: jwt_payload.id})
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error, false)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await usersRepository.getUserBy({_id: id})
            done(null, user)
        } catch (error) {
            done(error, null)
        }
    })
}

module.exports = { initializePassport }