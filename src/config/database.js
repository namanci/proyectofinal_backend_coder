const MongoSingleton = require('../utils/mongoSingleton.js')

exports.connectDb = () => {
    new MongoSingleton()
}