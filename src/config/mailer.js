const nodemailer = require('nodemailer')
const { cfgObj } = require('./configObject.js')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: cfgObj.gmail_user,
        pass: cfgObj.gmail_password
    }
})

module.exports = transporter