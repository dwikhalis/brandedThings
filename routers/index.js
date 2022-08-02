const router = require("express").Router()
const routerProduct = require('./routerProduct')
const routerUser = require('./routerUser')
const routerHistory = require('./routerHistory')
const authentication = require("../middlewares/authentication")

router.get("/",(req, res, next) => {
    try {
        res.status(200).json({
            message: "SUCCESS_landing"
        })
    } catch (err){
        next(err)
    }
})

router.use("/users", routerUser)

router.use("/histories", routerHistory)

router.use("/products", authentication, routerProduct)




module.exports = router