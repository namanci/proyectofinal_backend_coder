const logger = require("../config/logger")

function addLogger(req, res, next) {
    req.logger = logger
    req.logger.info(`Request: ${req.method} - ${req.url} from ${req.ip}`)
    next()
}

module.exports = addLogger