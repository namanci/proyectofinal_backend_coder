const bcrypt = require("bcrypt")

const saltRounds = 10

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        return hashedPassword
    } catch (error) {
        throw new Error("Password hashing error: " + error.message)
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword)
        return match
    } catch (error) {
        throw new Error("Password verification error: " + error.message)
    }
}

module.exports = { hashPassword, verifyPassword }