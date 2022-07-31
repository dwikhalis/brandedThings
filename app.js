console.clear()

if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
}

const cors = require("cors")                        //! Untuk nerima passingan data cross platform

const express = require('express')
const errorHandler = require("./middlewares/errorHandler")
const router = require("./routers")
const app = express()
const port = process.env.PORT || 3000

app.use(cors())                                     //! middleware cors wajib taro paling atas diantara middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`listen https://localhost:${port}`)
})