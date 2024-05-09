const mongoose = require('mongoose')
const logger = require('../config/logger.js')
const { cfgObj } = require('../config/configObject.js')

class MongoSingleton {
    static instance

    constructor() {
        this.connect()
    }

    static getInstance() {
        if (!this.instance) {
            logger.info('Connecting to database')
            this.instance = new MongoSingleton()
        } else {
            logger.warn('Database already connected')
        }
        return this.instance
    }

    async connect() {
        try {
            await mongoose.connect( cfgObj.mongo_uri )
            logger.info('Connected to database')
        } catch (err) {
            logger.error('Error connecting to database:', err)
        }
    }
}

module.exports = MongoSingleton