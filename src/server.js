const express = require('express')
const { connectDb } = require('./config/database.js')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 8080
const server = express()

connectDb()

server.listen(port, () => {
    console.log(`Server listen at port ${port}`)
})