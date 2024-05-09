const express = require('express')
const { connectDb } = require('./config/database.js')
const logger = require('./config/logger.js')
const { cfgObj } = require('./config/configObject.js')
const { sendEmail } = require('./utils/sendEmail.js')

const port = cfgObj.port
const server = express()

connectDb()

server.listen(port, () => {
    logger.info(`Server listen at port ${port}`)
})