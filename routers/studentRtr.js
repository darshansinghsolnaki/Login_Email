const express = require('express')
const { studentSignup , studentLogin} = require('../controllers/studentCtr')
const router = express.Router()


router.post('/signup', studentSignup)
router.post('/login', studentLogin)

module.exports = router
