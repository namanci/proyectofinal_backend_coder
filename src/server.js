const express = require('express')
const dotenv = require('dotenv').config()

const port = process.env.PORT || 8080
const server = express()

server.listen(port, () => {
    console.log(`Server listen at port ${port}.`)
})