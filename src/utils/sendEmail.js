const { cfgObj } = require('../config/configObject.js')
const mailer = require('../config/mailer.js')

function sendEmail(to, subject, message) {
    const mailOptions = {
        from: `Tienda Next <${ cfgObj.gmail_user }>`,
        to: to,
        subject: subject,
        html: message
    }

    return new Promise((resolve, reject) => {
        mailer.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(info)
            }
        })
    })
}

module.exports = { sendEmail }