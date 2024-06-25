const express = require('express')
const router = express.Router()
const studentRouter = require('./studentRtr')


router.use('/student', studentRouter)

module.exports = router
