const dotenv = require('dotenv').config()

exports.cfgObj = {
    port: process.env.PORT || 8080,
    mongo_uri: process.env.MONGO_URI,
    jwt_secret: process.env.JWT_SECRET_KEY,
    session_secret: process.env.SESSION_SECRET_KEY,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}