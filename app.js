console.clear()

const express = require('express')
const routerProduct = require('./routers/routerProduct')
const app = express()
const port = 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routerProduct)

app.listen(port, () => {
    console.log(`listen https://localhost:${port}`)
})