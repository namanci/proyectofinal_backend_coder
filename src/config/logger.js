const winston = require('winston')

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        debug: 'blue'
    }
}

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors, all: true }),
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `[${level}] ${message} [${timestamp}]`
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: 'errors.log',
            level: 'error',
            format: winston.format.simple()
        })
    ],
    levels: customLevelOptions.levels
})

module.exports = logger