const router = require("express").Router()
const routerProduct = require('./routerProduct')
const routerUser = require('./routerUser')
const authentication = require("../middlewares/authentication")

router.use(routerUser)

router.use(authentication)

router.use(routerProduct)


module.exports = router