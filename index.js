const express = require('express')
const morgan = require('morgan')
const app = express()
const dotenv = require('dotenv').config()
const PORT =  process.env.PORT || 8080
const router = require('./routers/mainRtr')
require('./config/db')

app.use(express.json());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.listen(PORT, (req, res)=>{
    console.log(`Server is running on port ${PORT}`)
})
