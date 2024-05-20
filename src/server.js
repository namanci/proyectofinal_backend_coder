const express = require('express')
const handlebars = require('express-handlebars')
const { connectDb } = require('./config/database.js')
const logger = require('./config/logger.js')
const { cfgObj } = require('./config/configObject.js')
const addLogger = require('./middlewares/loggerMiddleware.js')
const cookie = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const { initializePassport } = require('./config/passportConfig.js')
const serverRouter = require('./routes/index.js')

const port = cfgObj.port
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))
server.use(cookie())

server.use(session({
    secret: cfgObj.jwt_secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: cfgObj.mongo_uri,
        ttl: 14 * 24 * 60 * 60 //14d
    })
}))

initializePassport()
server.use(passport.initialize())
server.use(passport.session())
server.use(addLogger)

server.engine('hbs', handlebars.engine({ extname: '.hbs' }))
server.set('view engine', 'hbs')
server.set('views', __dirname + '/views')

server.use(serverRouter)

connectDb()

server.use((err, req, res, next) => {
    logger.error(err.stack)
    res.status(500).send('Something went wrong')
})

server.listen(port, () => {
    logger.info(`Server listen at port ${port}`)
})