const passport = require('passport')

const isAuthenticated = passport.authenticate('jwt', { session: true })

module.exports = { isAuthenticated }