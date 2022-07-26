const router = require("express").Router()

const routerProduct = require('./routerProduct')
const routerUser = require('./routerUser')

router.use(routerProduct)
router.use(routerUser)

module.exports = router