console.clear()

require("dotenv").config()

const express = require('express')
const errorHandler = require("./middlewares/errorHandler")
const router = require("./routers")
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.get("/",(req, res, next) => {
    try {
        res.status(200).json({
            message: "SUCCESS_landing",
        })
    } catch (err){
        next(err)
    }
})

// taro di tempat lain

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listen https://localhost:${port}`)
})