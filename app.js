console.clear()

require("dotenv").config()

const express = require('express')
const errorHandler = require("./middlewares/errorHandler")
const routerProduct = require('./routers/routerProduct')
const routerUser = require('./routers/routerUser')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routerProduct)
app.use(routerUser)

app.get("/",(req, res, next) => {
    try {
        res.status(200).json({
            message: "SUCCESS_landing",
        })
    } catch (err){
        next(err)
    }
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`listen https://localhost:${port}`)
})