const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

class MongoSingleton {
    static instance

    constructor() {
        this.connect()
    }

    static getInstance() {
        if (!this.instance) {
            console.log('Connecting to database')
            this.instance = new MongoSingleton()
        } else {
            console.log('Database already connected')
        }
        return this.instance
    }

    async connect() {
        try {
            await mongoose.connect(process.env.MONGO_URI)
            console.log('Connected to database')
        } catch (err) {
            console.error('Error connecting to database:', err)
        }
    }
}

module.exports = MongoSingleton